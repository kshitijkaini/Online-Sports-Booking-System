import React, { useState } from 'react'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





function PasswordReset() {

    const [email, setEmail] = useState("");

    const [message, setMessage] = useState("");

    const setVal = (e) => {
        setEmail(e.target.value);
    };

    const sendLink = async (e) => {
        const ids = toast.loading("Please wait...")
        e.preventDefault();

        if (email === "") {
            toast.update(ids, { render: "email is required!", type: "error", isLoading: false, autoClose: 5000 });

        } else if (!email.includes("@")) {
            toast.update(ids, { render: "includes @ in your email!", type: "error", isLoading: false, autoClose: 5000 });

        } else {
            console.log(email)
            const response = await axios.post("/api/users/sendpasswordlink", { email });
            const { data } = response;
            setEmail('')
            toast.update(ids, { render: "password-reset link is sent", type: "success", isLoading: false, autoClose: 5000 });

            console.log(data);
            if (data.status == 201) {
                setEmail("");
                setMessage(true);
            } else {
                toast.update(ids, { render: "Invalid user", type: "error", isLoading: false, autoClose: 5000 });

            }
        }
    };

    return (
        <>
            <div className="register-row justify-content-center mt5">
                <div className="col-md-5 mt-5">
                    <div>
                        <p>Enter your email</p>
                    </div>

                    {message ? <p style={{ color: "green", fontWeight: "bold" }}>pasword reset link send Succsfully in Your Email</p> : ""}
                    <form>
                        <div >
                            <input
                                className="form-control"
                                type="email"
                                onChange={setVal}
                                value={email}
                                name="email"
                                placeholder="enter your registered gmail"
                                required />
                        </div>
                        <button className="newsletter-button" onClick={sendLink}>Send</button>
                        <ToastContainer position="top-center" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default PasswordReset
