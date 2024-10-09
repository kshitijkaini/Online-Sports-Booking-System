import React, { useState, useEffect } from "react";

import { Tabs } from "antd";
import axios from "axios";

function AdminScreen() {
  const { TabPane } = Tabs;
  return (
    <div className="row7">
      <h2 className="text-center">Admin Panel for Gym</h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Gym Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Gym" key="2">
          <h1>Gym</h1>
        </TabPane>
        <TabPane tab="Add Gym" key="3">
          <AddGym />
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default AdminScreen;

export function Bookings() {
  return (
    <div>
      <div>
        <h1>Gym Bookings</h1>
        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Booking id</th>

              <th>User id</th>

              <th>Gym</th>

              <th>From</th>
              <th>To</th>

              <th>Status</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}

export function Users() {
  const [users, setusers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await (await axios.get("/api/users/getallusers")).data;
        setusers(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div>
      <div>
        <h1>Users</h1>
        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>User id</th>

              <th> name</th>

              <th>email</th>

              <th>isAdmin</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "Yes" : "No"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//for adding gym
export function AddGym() {
  const [name, setname] = useState("");
  const [location, setlocation] = useState();
  const [phone, setphone] = useState();
  const [pricepermonth, setpricepermonth] = useState();
  const [imageurl1, setimageurl1] = useState();
  const [imageurl2, setimageurl2] = useState();
  const [imageurl3, setimageurl3] = useState();

  function AddGym() {
    const newgym = {
      name,
      location,
      phone,
      pricepermonth,
      imageurls: [imageurl1, imageurl2, imageurl3],
    };
    console.log(newgym);
  }

  return (
    <div className="row7">
      <div>
        <input
          type="text"
          className="form-control"
          placeholder="Gym Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="location"
          value={location}
          onChange={(e) => setlocation(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="phone"
          value={phone}
          onChange={(e) => setphone(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="pricepermonth"
          value={pricepermonth}
          onChange={(e) => setpricepermonth(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          className="form-control"
          placeholder="imgaeurl1"
          value={imageurl1}
          onChange={(e) => setimageurl1(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="imageurl2"
          value={imageurl2}
          onChange={(e) => setimageurl2(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="imageurl3"
          value={imageurl3}
          onChange={(e) => setimageurl3(e.target.value)}
        />
        <div className="text-right">
          <button className="newsletter-button" onClick={AddGym}>
            Add Gym
          </button>
        </div>
      </div>
    </div>
  );
}
