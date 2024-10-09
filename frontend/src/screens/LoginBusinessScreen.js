import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

function LoginBusinessScreen() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [facilityType, setFacilityType] = useState('futsal');

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();

    async function Login() {
        const user = {
            facilityType,
            email,
            password,
        };
        try {
            setloading(true);
            const result = (await axios.post("/api/futsals/loginbusiness", user)).data;
            setloading(false);

            localStorage.setItem("currentUser", JSON.stringify(result));
            console.log(result);
            window.location.href = `/dashboard/${result._id}`;
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
                        <label htmlFor="facilityType">Facility Type:</label>
                        <select id="facilityType" className="form-control" value={facilityType} onChange={(event) => setFacilityType(event.target.value)}>
                            <option value="futsal">Futsal</option>
                            <option value="gym">Gym</option>
                            <option value="swimming-pool">Swimming Pool</option>
                            <option value="Bad-minton">Bad-minton</option>
                        </select>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="email"
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginBusinessScreen;
