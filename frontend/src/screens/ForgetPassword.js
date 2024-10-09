import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgetPassword() {

  const { id } = useParams();

  const history = useNavigate();

  const [data2, setData] = useState(false);

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const userValid = async () => {
    const res = await axios.get(`/api/users/forgotpassword/${id}`);
    const { data } = res;

    if (data.status == 201) {
      console.log("user valid");
    } else {
      history("*");
    }
  };


  const setval = (e) => {
    setPassword(e.target.value);
  };

  const sendpassword = async (e) => {
    const ids = toast.loading("Please wait...")

    e.preventDefault();

    if (password === "") {
      alert("password is required!");
    } else if (password.length < 4) {
      alert("password must be 4 char!");
    } else {
      const res = await axios.post(`/api/users/forgotpassword/change/${id}`, { password });
      const { data } = res;

      if (data.status == 201) {
        setPassword("");
        setMessage(true);
        toast.update(ids, { render: "Now,you have a new password", type: "success", isLoading: false, autoClose: 5000 });

      } else {
        toast.update(ids, { render: "! Token Expired generate new LInk", type: "error", isLoading: false, autoClose: 5000 });

      }
    }
  };

  useEffect(() => {
    userValid();
    setTimeout(() => {
      setData(true);
    }, 3000);
  }, []);

  return (
    <>
      <div className="register-row justify-content-center mt5">
        <div className="col-md-5 mt-5">
          <section>
            <div className="form_data">
              <div>
                <p> New Password</p>
              </div>

              <form>
                {message ? <p style={{ color: "green", fontWeight: "bold" }}>Password Succesfulyy Update </p> : ""}
                <div>
                  <input className="form-control" type="password" value={password} onChange={setval} name="password" id="password" placeholder='Enter Your new password' />
                </div>

                <button className="newsletter-button" onClick={sendpassword}>Send</button>
                <ToastContainer position="top-center" />
              </form>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;

