import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";

function SwimmingBookingscreen() {
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [swimming, setswimming] = useState();

  const { id, selectedDate } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const data = (
          await axios.post("/api/swimmings/getswimmingbyid", { swimmingid: id })
        ).data;

        setswimming(data);
        setloading(false);
        console.log(data);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    };
    fetchData();
  }, []);

  async function bookSwimming() {
    const swimmingbookingDetails = {
      swimming,
      user: JSON.parse(localStorage.getItem("currentUser")).name,
      swimmingid: swimming._id,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,

      price: swimming.price,
      totalamount: swimming.price,
    };

    try {
      const result = await axios.post(
        "/api/swimmingbookings/bookSwimming",
        swimmingbookingDetails
      );
    } catch (error) {}
  }

  return (
    <div className="m-5">
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <div>
          <div className="book-row">
            <div>
              <h1 style={{ color: "#00a65a" }}>{swimming.name}</h1>

              <h1>Booking Details</h1>
              <hr />
              <b>
                <p>
                  Name:{JSON.parse(localStorage.getItem("currentUser")).name}
                </p>
                <p>Date:{selectedDate}</p>
              </b>

              <div>
                <b>
                  <h1>Amount</h1>
                  <hr />

                  <p>Price:{swimming.price}</p>
                  <p>Total amount:{swimming.price}</p>
                </b>

                <div>
                  <button className="newsletter-button" onClick={bookSwimming}>
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SwimmingBookingscreen;
