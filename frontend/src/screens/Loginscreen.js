import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Loginscreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState(""); 

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
 
  async function Login() {
    const user = {
      email,
      password,
    };  
    try {
      setloading(true);
      const result = (await axios.post("/api/users/login", user)).data;
      setloading(false);

      localStorage.setItem("currentUser", JSON.stringify(result));
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(true);
    }
  }
  return (
    <div>
      {loading && <Loader />}
      <div className="register-row justify-content-center mt5">
        <div className="col-md-5 mt-5">
          {error && <Error message="Invalid Credentionals" />}
          <div>
            <h1>Login</h1>

            <input
              type="text"
              className="form-control"
              placeholder="gmail"
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

            <button className="newsletter-button" onClick={Login}>
              Login
            </button>
            <p>Don't have an Account? <NavLink to="/register">Sign Up</NavLink> </p>
          <p style={{color:"black"}}>Forgot Password  <NavLink to="/password-reset">Click Here</NavLink> </p>
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
