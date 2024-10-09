import { useState, useEffect, useRef } from 'react';
import myKey from "./KhaltiKey.js";
import KhaltiCheckout from "khalti-checkout-web";
import React from 'react'
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";



const Book = (props) => {
  let { id } = useParams();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [futsals, setFutsals] = useState([]);
  const [selectedData, setSelectedData] = useState();
  const [receipt, setReceipt] = useState(false);

  const pdfRef = useRef();


  const user = JSON.parse(localStorage.getItem("currentUser"));
  const _id = user._id;

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('img/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('invoice.pdf');

    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (
          await axios.post("/api/futsals/getfutsalbyid", { futsalid: id })
        ).data;

        setFutsals(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);





  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setLoading(true);
  //       const { data } = await axios.get("/api/futsals/getallfutsals");
  //       setFutsals(data.futsals);
  //       setLoading(false);
  //     } catch (error) {
  //       setError(true);
  //       console.log(error);
  //       setLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, []);



  //..khalti
  let config = {

    // replace this key with yours
    "publicKey": myKey.publicTestKey,
    "productIdentity": "1234567890",
    "productName": "Drogon",
    "productUrl": "http://gameofthrones.com/buy/Dragons",
    "eventHandler": {
      onSuccess(payload) {
        // hit merchant api for initiating verfication
        console.log(payload);
        let data = {
          token: payload.token,
          amount: payload.amount,
        };
        const ids = toast.loading("Please wait...")
        axios
          .post('/api/futsals/khalti', data)
          .then((response) => {
            console.log(response.data);
            //toast.update(ids, { render: "payment sucessful", type: "success", isLoading: false, autoClose: 5000 });
            console.log("suck", selectedTimes.length)
            let updatedSelectedData = [];
            for (let i = 0; i < selectedTimes.length; i++) {
              let obj = {
                date: selectedDate,
                time: selectedTimes[i]
              };
              updatedSelectedData.push(obj);
            }
            setSelectedData(updatedSelectedData);
            const detail = {
              selectedDatas: updatedSelectedData,
              bookedUsers: [user]
            }
            const selectedData = selectedTimes.map((time) => ({ date: selectedDate, time }));
            const updatedBookings = [...bookings, ...selectedData];
            setOptions(updatedBookings);
            // send selectedDate and selectedTimes to backend here
            toast.update(ids, { render: "payment sucessful", type: "success", isLoading: false, autoClose: 5000 });

            console.log('fuck', detail);
            console.log("id:", id);
            console.log("_id:", _id);
            axios.post(`/api/futsals/selectedData/${id}/${_id}`, detail)
              .then((response) => {
                console.log(response.data);
                setShow(true);
                // setShowBookNow(true);  
              })
              .catch((error) => {
                console.log(error);
              })

          })
          .catch((error) => {
            console.log(error);
            toast.update(ids, { render: "Something went wrong! please,try again", type: "error", isLoading: false, autoClose: 5000 });
          });
      },
      // onError handler is optional
      onError(error) {
        // handle errors
        console.log(error);
      },
      onClose() {
        console.log('widget is closing');
      }
    },
    "paymentPreference": ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
  };
  let checkout = new KhaltiCheckout(config);
  let buttonStyles = {
    backgroundColor: "purple",
    padding: "10px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    border: "1px solid white",
  };
  //..khalti
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimes, setSelectedTimes] = useState([]);
  //..........
  const [bookings, setOptions] = useState([]);
  useEffect(() => {
    async function fetchOptions() {
      try {
        let token = localStorage.getItem("usersdatatoken");
        const res = await fetch(`/api/futsals/getdetails/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,
            Accept: "application/json"

          }
        });

        const data = await res.json();
        console.log(data);
        setOptions(data)
        console.log("resInsideRenderPage", data["result"])
        //console.log("diffDaysInsideRenderPage",diffDays)           

      }
      catch (err) {
        console.log(err);
      }
    }
    fetchOptions();
  }, []);
  //.......................................
  //sending data to backend









  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setSelectedTimes([]);
  };

  const handleTimeClick = (event) => {
    const timeSlot = event.target.value;
    const index = selectedTimes.indexOf(timeSlot);

    if (index === -1) {
      // time slot not yet selected, add to selectedTimes
      setSelectedTimes([...selectedTimes, timeSlot]);
    } else {
      // time slot already selected, remove from selectedTimes
      const newSelectedTimes = [...selectedTimes];
      newSelectedTimes.splice(index, 1);
      setSelectedTimes(newSelectedTimes);
    }
  };

  const availableTimeSlots = ['10:00 AM-11:00 AM', '11:00 AM-12:00 PM', '12:00 PM-1:00 PM', '1:00 PM-2:00 PM', '2:00 PM-3:00 PM', '3:00 PM-4:00 PM', '4:00 PM-5:00 PM', '5:00 PM-6:00 PM'];

  //bootstrap
  const [showModal, setShow] = useState(false);
  const [showBookNow, setShowBookNow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const handleBookNowShow = () => setShowBookNow(true);
  // const handleBookNowClose = () => setShowBookNow(false);


  return (
    <>
      <div>
        <div className='flex-timeslot'>
          <h2>Book {futsals.facilityType}</h2>
        </div>
        <div className='flex-timeslot'>
          <label htmlFor="date-picker">Select a date:</label>
          <input type="date" id="date-picker" value={selectedDate} onChange={handleDateChange} />
        </div>
        <br />
        <label>Select time slots:</label>
        <br />
        <div className='flex-timeslot-gridish'>
          {availableTimeSlots.map((timeSlot) => {
            const isBooked = bookings.some((booking) => booking.date === selectedDate && booking.time === timeSlot);
            const isSelected = selectedTimes.includes(timeSlot);
            const isDisabled = selectedDate === '' || isBooked;
            const buttonColor = isBooked ? 'grey' : isSelected ? '#01b763' : 'white';
            return (
              <button
                key={timeSlot}
                value={timeSlot}
                onClick={handleTimeClick}
                disabled={isDisabled}
                style={{ backgroundColor: buttonColor }}
              >
                {timeSlot}
              </button>
            );
          })}
        </div>
        <br />
        {selectedDate !== '' && selectedTimes.length > 0 && (
          <div className='flex-timeslot'>
            <p>
              You have selected {selectedTimes.length} time slots on {selectedDate}: {selectedTimes.join(', ')}.
            </p>
          </div>
        )}
        <>
          {selectedDate !== '' && selectedTimes.length !== 0 && (
            <div className='flex-timeslot'>
              <button

                onClick={() => checkout.show({ amount: ((selectedTimes.length)) * (futsals.priceperhour * 100) })}
                style={buttonStyles}
              >
                Book Via Khalti
              </button>
              <ToastContainer position="top-center" /> 
            </div>
          )}
        </>


      </div>


      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Booking receipt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="m-5" >
            <div>
              <div className="book-row">
                <div ref={pdfRef}>
                  <h1 style={{ color: "#00a65a" }}>{futsals.name}</h1>

                  <h1>Booking Details</h1>
                  <hr />
                  <b>
                    <h2>{futsals.name}</h2>
                    <p>Name:{user.name}</p>
                    <p>User id:{user._id}</p>
                    <p>Date:{selectedDate}</p>
                    <p>Time:{selectedTimes}</p>
                  </b>

                  <div>
                    <b>
                      <h1>Amount</h1>
                      <hr />
                      <p>Price per hour:{futsals.priceperhour}</p>
                      <p>Total amount:{((selectedTimes.length)) * (futsals.priceperhour)}</p>
                    </b>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={downloadPDF}>Download receipt</Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Book;
