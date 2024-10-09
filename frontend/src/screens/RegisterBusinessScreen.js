import React, { useState, useEffect } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';



const BusinessScreen = () => {
  const [name, setname] = useState('');
  const [imageurls, setImages] = useState('');
  const [priceperhour, setPricePerHour] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [gamemode, setGameMode] = useState('');
  const [currentBookings, setCurrentBookings] = useState('');
  const [description, setDescription] = useState('');
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [facilityType, setFacilityType] = useState('futsal');
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const [clickedPosition, setClickedPosition] = useState(null);

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [success, setsuccess] = useState();


  const defaultMarker = new L.Icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
  });


  //geolocate
  function LocateControl() {
    const map = useMapEvents({
      locationfound(e) {
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return (
      <div style={{ float: 'right' }} className="leaflet-bar leaflet-control leaflet-control-custom">
        <a
          className="leaflet-control-locate leaflet-bar-part leaflet-bar-part-single"
          onClick={() => {
            map.locate();
          }}
        >
          <i className="fas fa-map-marker-alt"></i>
        </a>
      </div>
    );
  }

  const handleClick = (event) => {
    const { lat, lng } = event.latlng;
    setClickedPosition(event.latlng);
    setLongitude(lat);
    setLatitude(lng);
  };
  //

  const handleSubmit = (event) => {
    event.preventDefault();

  };


  async function register() {
      // Email validation regex pattern
      const emailRegex = /^[a-z0-9]+@gmail\.com$/;
    const ids = toast.loading("Please wait...")
    if (password === cpassword && emailRegex.test(email)) {
      var formData = new FormData();
      formData.append("facilityType", facilityType);
      formData.append("name", name);
      //formData.append("imageurls", imageurls);
      Array.from(imageurls).forEach((imageurls, index) => {
        if (index < 3) { // limit the number of images to 3
          formData.append('imageurls', imageurls);
        }
      });
      formData.append("priceperhour", priceperhour);
      formData.append("location", location);
      formData.append("phone", phone);
      formData.append("gamemode", gamemode);
      formData.append("currentBookings", currentBookings);
      formData.append("description", description);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("cpassword", cpassword);
      formData.append("longitude", longitude);
      formData.append("latitude", latitude);
      const user = {
        name,
        imageurls,
        priceperhour,
        location,
        phone,
        gamemode,
        currentBookings,
        description,
        email,
        password,
        cpassword,
        longitude,
        latitude
      };
      console.log(user, "formData")
      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }

        setloading(true);
        const result = (await axios.post("/api/futsals/saveSportCentre", formData, config)).data;
        setloading(false);
        setsuccess(true);
        setname('');
        setImages('');
        setPricePerHour('');
        setLocation('');
        setPhone('');
        setGameMode('');
        setCurrentBookings('');
        setDescription('');
        setemail('');
        setpassword('');
        setcpassword('');
        setLongitude('');
        setLatitude('');
        toast.update(ids, { render: "Registration sucessful", type: "success", isLoading: false, autoClose: 5000 });
      } catch (error) {
        toast.update(ids, { render: "Something went wrong! please,try again", type: "error", isLoading: false, autoClose: 5000 });
        console.log(error);
        setloading(false);
        seterror(true);
      }
    } else {
     toast.update(ids, { render: "Given data is not in correct format", type: "error", isLoading: false, autoClose: 5000 });
    }
  }
  return (
    <>
      {loading && <Loader />}
      {error && <Error />}
      <div className="register-row justify-content-center mt5">
        <div className="col-md-5 mt-5">
          {success && <Success message="Registration success" />}
          <h1>Register</h1>
          <label htmlFor="facilityType">Facility Type:</label>
          <select id="facilityType" className="form-control" value={facilityType} onChange={(event) => setFacilityType(event.target.value)}>
            <option value="futsal">Futsal</option>
            <option value="gym">Gym</option>
            <option value="swimming-pool">Swimming Pool</option>
            <option value="Bad-minton">Bad-minton</option>
          </select>


          <label htmlFor="sportCentreName" >Sport Centre Name:</label>
          <input type="text" id="sportCentreName" name="name" className="form-control" value={name} onChange={(event) => setname(event.target.value)} />

          <label htmlFor="imageurls">Images:</label>
          <input type="file" multiple id="images" name="imageurls" className="form-control" onChange={(event) => setImages(event.target.files)} />

          <label htmlFor="priceperhour">Price per Hour:</label>
          <input type="number" id="priceperhour" className="form-control" value={priceperhour} onChange={(event) => setPricePerHour(event.target.value)} />

          <label htmlFor="location">Location:</label>
          <input type="text" id="location" className="form-control" value={location} onChange={(event) => setLocation(event.target.value)} />

          <label htmlFor="phoneNo">Phone No.:</label>
          <input type="tel" id="phoneNo" className="form-control" value={phone} onChange={(event) => setPhone(event.target.value)} />

          <label htmlFor="gameMode">Game Mode:</label>
          <input type="text" id="gamemode" className="form-control" value={gamemode} onChange={(event) => setGameMode(event.target.value)} />

          <label htmlFor="currentBookings">Current Bookings:</label>
          <input type="text" id="currentBookings" className="form-control" value={currentBookings} onChange={(event) => setCurrentBookings(event.target.value)} />

          <label htmlFor="description">Description:</label>
          <textarea id="description" className="form-control" value={description} onChange={(event) => setDescription(event.target.value)} />

          <input
            type="text"
            className="form-control"
            placeholder="e.g.vcjabck1@gmail.com"
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
          
          <div>
            <MapContainer
              className="leaflet-map"
              center={[27.704405267645072, 85.31921281203175]}
              zoom={17}
              scrollWheelZoom={true}
              style={{ height: '60vh' }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocateControl />
              {clickedPosition && (
                <Marker position={clickedPosition} icon={defaultMarker}>
                  <Popup>Clicked at {clickedPosition.lat}, {clickedPosition.lng}</Popup>
                </Marker>
              )}
              <MapEvents onClick={handleClick} />
            </MapContainer>
            <div>
              <label htmlFor="longitude">longitude of your location:</label>
              <input type="text" id="longitude" className="form-control" value={longitude} onChange={(event) => setLongitude(event.target.value)} />

              <label htmlFor="latitude">latitude of your location:</label>
              <input type="text" id="currentBookings" className="form-control" value={latitude} onChange={(event) => setLatitude(event.target.value)} />
            </div>
          </div>

          <button className="newsletter-button" onClick={register}>
            Register
          </button>
          <ToastContainer position="top-center" />

        </div>
      </div>
    </>
  );
};





const MapEvents = ({ onClick }) => {
  useMapEvents({
    click: onClick,
  });
  return null;
};

export default BusinessScreen;




