import React, { useState, useEffect } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";


function Futsal({ futsal, selectedDate, selectedSlot }) {

  const [selectedDates, setSelectedDates] = useState('');
  const [selectedTimes, setSelectedTimes] = useState([]);
  //............................
  const [bookings, setOptions] = useState([
    {
      id: 1,
      date: '2023-04-30',
      time: '10:00 AM-11:00 AM'
    }
  ]);

  //.......................................
  //sending data to backend











  //.............
  const handleDateChange = (event) => {
    setSelectedDates(event.target.value);
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

  const [show, setShow] = useState(false);
  const [showBookNow, setShowBookNow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleBookNowShow = () => setShowBookNow(true);
  const handleBookNowClose = () => setShowBookNow(false);

  /*for timeslots */

  const TimeSlot = ({ time, selected, booked, onClick }) => {
    let className = "timeslot";

    if (selected) {
      className += " selected";
    } else if (booked) {
      className += " booked";
    } else {
      className += " available";
    }

    return (
      <div className={className} onClick={onClick}>
        {time}
      </div>
    );
  };

 // {futsal.imageurls[0]}
  return (
    <div className="futsal-row">
      <div className="col-md-4">
        <img src={`http://localhost:5000/images/${futsal.imageurls[0]}`} className="smallimg" />
      </div>
      <div className="futsal-text">
        <h1>{futsal.name}</h1>
        <b>
          <p>Price per hour: {futsal.priceperhour}</p>
          <p>Location: {futsal.location}</p>
          <p>Phone: {futsal.phone}</p>
          <p>gamemode:{futsal.gamemode}</p>
        </b>
      </div>
      <div style={{ float: "right" }}>
        {/* {
          <Link to="#" onClick={handleBookNowShow}>
            <button className="newsletter-button">Book Now</button>
          </Link>
        } */}

        <button className="newsletter-button" onClick={handleShow}>
          {" "}
          View Details
        </button>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{futsal.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
        
            {futsal.imageurls.map((url) => {

              return (
                <Carousel.Item>
                  <img className="d-block w-100 bigimg" src={`http://localhost:5000/images/${url}`} />
                  
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{futsal.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showBookNow} onHide={handleBookNowClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{futsal.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {/* <div>
            <div>
              <h2>Book Appointment</h2>
              <label htmlFor="date-picker">Select a date:</label>
              <input type="date" id="date-picker" value={selectedDates} onChange={handleDateChange} />
              <br />
              <label>Select time slots:</label>
              <br />
              {availableTimeSlots.map((timeSlot) => {
                const isBooked = bookings.some((booking) => booking.date === selectedDates && booking.time === timeSlot);
                const isSelected = selectedTimes.includes(timeSlot);
                const isDisabled = selectedDate === '' || isBooked;
                const buttonColor = isBooked ? 'grey' : isSelected ? '#90EE90' : 'white';
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

              <br />
              {selectedDates !== '' && selectedTimes.length > 0 && (
                <p>
                  You have selected {selectedTimes.length} time slots on {selectedDates}: {selectedTimes.join(', ')}.
                </p>
              )}
            </div>

          </div>
          <p>{futsal.description}</p> */}
        </Modal.Body>
        <Modal.Footer>
          {/* <Link
            to={`/book/futsal/${futsal._id}/${selectedSlot}/${selectedDate}`}
          >
            {selectedDates !== '' && selectedTimes !== '' && (
              <button

                className="newsletter-button"
              >
                Book Now
              </button>
            )}
          </Link> */}
        </Modal.Footer>
      </Modal>
      {/* //......... */}
      {
          <Link to={`http://localhost:3000/futsal/${futsal._id}`} onClick={handleBookNowShow}>
            <button className="newsletter-button">Book Now</button>
          </Link>
        }
    </div>
  );
}

export default Futsal;