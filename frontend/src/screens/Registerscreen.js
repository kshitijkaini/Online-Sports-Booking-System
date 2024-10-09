import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Registerscreen() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");


  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [success, setsuccess] = useState();

  async function register() {
    
    // Email validation regex pattern
    const emailRegex = /^[a-z0-9]+@gmail\.com$/;

    const ids = toast.loading("Please wait...")

    if (password === cpassword && emailRegex.test(email)) {
      const user = {
        name,
        email,
        password,
        cpassword,
      }
      try {
        setloading(true);
        const result = (await axios.post("/api/users/register", user)).data;
        setloading(false);
        setsuccess(true);
        setname("");
        setemail("");
        setpassword("");
        setcpassword("");
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(true);
      }
    } else {
      toast.update(ids, { render: "Given data is not in correct format", type: "error", isLoading: false, autoClose: 5000 });

    }
  }
  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}

      <div className="register-row justify-content-center mt5">
        <div className="col-md-5 mt-5">
          {success && <Success message="Registration success" />}
          <div>
            <h1>Register</h1>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="e.g.vcjabck1@gmail.com "
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="confirm password"
              value={cpassword}
              onChange={(e) => {
                setcpassword(e.target.value);
              }}
            />
            <button className="newsletter-button" onClick={register}>
              Register
            </button>
            <ToastContainer position="top-center" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
