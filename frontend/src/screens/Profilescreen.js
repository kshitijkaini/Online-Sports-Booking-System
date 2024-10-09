import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

const { TabPane } = Tabs;

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  const items = [
    {
      key: "1",
      label: `My Profile`,
      children: <MyProfile />,
    },
    {
      key: "2",
      label: `My Bookings`,
      children: <MyBookings />,
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={() => {}}>
        {items.map((item) => (
          <TabPane tab={item.label} key={item.key}>
            {item.children}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export default Profilescreen;

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [gymbookings, setgymbookings] = useState([]);

  useEffect(() => {
    const getGymBookings = async () => {
      try {
        const response = await axios.post(
          "/api/gymbookings/getgymbookingsbyuserid",
          {
            userid: user._id,
          }
        );
        console.log(response.data);
        setgymbookings(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (user) {
      getGymBookings();
    }
  }, [user]);

  return (
    <div>
      <div className="row7">
        <div className="col-md-6">
          {gymbookings.length > 0 ? (
            gymbookings.map((gymbooking) => {
              return (
                <div className="bs">
                  <h1>{gymbooking.gym}</h1>
                  <h1>BookingId:{gymbooking._id}</h1>
                  <h1>Amount:{gymbooking.totalamount}</h1>
                  <h1>
                    Status:
                    {gymbooking.status === "booked" ? "CONFIRMED" : "CANCELLED"}
                  </h1>
                </div>
              );
            })
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function MyProfile() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <div>
      <h1>My Profile</h1>
      <br />
      <h1>Name:{user.name}</h1>
      <h1>Email:{user.email}</h1>
      <h1>isAdmin:{user.isAdmin ? "YES" : "NO"}</h1>
    </div>
  );
}
