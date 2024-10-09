import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";

function GymBookingscreen() {
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [gym, setgym] = useState();
  const [packageType, setPackageType] = useState("monthly"); // default value is monthly

  const { id, fromdate, todate } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const data = (await axios.post("/api/gyms/getgymbyid", { gymid: id }))
          .data;

        setgym(data);
        setloading(false);
        console.log(data);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    };
    fetchData();
  }, [id]);

  async function bookGym() {
    const gymbookingDetails = {
      gym,
      user: JSON.parse(localStorage.getItem("currentUser")).name,
      gymid: gym._id,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      package: packageType,
      pricepermonth: gym.pricepermonth,
      totalamount: calculateAmount(),
    };

    try {
      const result = await axios.post(
        "/api/gymbookings/bookgym",
        gymbookingDetails
      );
    } catch (error) {}
  }

  const handlePackageChange = (event) => {
    setPackageType(event.target.value);
  };

  const calculateAmount = () => {
    let pricePerMonth = gym.pricepermonth;
    let totalMonths;
    switch (packageType) {
      case "monthly":
        totalMonths = 1;
        break;
      case "quarterly":
        totalMonths = 3;
        break;
      case "yearly":
        totalMonths = 12;
        break;
      default:
        totalMonths = 1;
        break;
    }
    let totalAmount = pricePerMonth * totalMonths;
    return totalAmount;
  };

  return (
    <div className="m-5">
      {loading ? (
        <h1>
          <Loader />
        </h1>
      ) : error ? (
        <h1>
          <Error />
        </h1>
      ) : (
        <div>
          <div className="book-row">
            <div>
              <h1 style={{ color: "#00a65a" }}>{gym.name}</h1>

              <h1>Booking Details</h1>
              <hr />
              <b>
                <p>
                  Name:{JSON.parse(localStorage.getItem("currentUser")).name}
                </p>
              </b>

              <div>
                <h1>Select Package:</h1>
                <label className="mon">
                  <input
                    type="radio"
                    value="monthly"
                    checked={packageType === "monthly"}
                    onChange={handlePackageChange}
                  />
                  Monthly
                </label>
                <label className="mon">
                  <input
                    type="radio"
                    value="quarterly"
                    checked={packageType === "quarterly"}
                    onChange={handlePackageChange}
                  />
                  Quarterly
                </label>
                <label className="mon">
                  <input
                    type="radio"
                    value="yearly"
                    checked={packageType === "yearly"}
                    onChange={handlePackageChange}
                  />
                  Yearly
                </label>

                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total Time:</p>
                  <p>Price per month: {gym.pricepermonth}</p>
                  <p>Package selected: {packageType}</p>
                  <p>Total amount: {calculateAmount()}</p>
                </b>

                <div>
                  <button className="newsletter-button " onClick={bookGym}>
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

export default GymBookingscreen;
