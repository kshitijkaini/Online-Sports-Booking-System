import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar'


const Adduser = () => {
  const { ids } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userId:'Booked in offline',
    date: '',
    time: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    const popup = toast.loading("Please wait...")
    e.preventDefault();
    console.log("formData",formData);
    // Send data to the backend
    axios.post(`/api/futsals/addData/${ids}`, formData)
      .then((response) => {
        // Handle successful response
        console.log(response.data);
        // Reset the form
        setFormData({
          name: '',
          email: '',
          date: '',
          time: '',
        });
        toast.update(popup, { render: "Registration sucessful", type: "success", isLoading: false, autoClose: 5000 });

      })
      
      .catch((error) => {
        // Handle error
        toast.update(popup, { render: "Something went wrong! please,try again", type: "error", isLoading: false, autoClose: 5000 });
        console.error(error);
      });
  };

  return (
    <div>
        <Navbar />
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
 
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="date" className="form-label">
              Select a date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="time" className="visually-hidden">
              Time
            </label>
            <select
              className="form-select"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            >
              <option value="">Choose time...</option>
              <option value="10:00 AM-11:00 AM">10:00 AM-11:00 AM</option>
              <option value="11:00 AM-12:00 PM">11:00 AM-12:00 PM</option>
              <option value="12:00 PM-1:00 PM">12:00 PM-1:00 PM</option>
              <option value="1:00 PM-2:00 PM">1:00 PM-2:00 PM</option>
              <option value="2:00 PM-3:00 PM">2:00 PM-3:00 PM</option>
              <option value="3:00 PM-4:00 PM">3:00 PM-4:00 PM</option>
              <option value="4:00 PM-5:00 PM">4:00 PM-5:00 PM</option>
              <option value="5:00 PM-6:00 PM">5:00 PM-6:00 PM</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary col-lg-6 col-md-6 col-12">
            Book
          </button>
          <ToastContainer position="top-center" />
        </div>
      </form>
    </div>
  );
};

export default Adduser;
