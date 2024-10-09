import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Newsletter from "./components/Newsletter";
import Map from "./components/Map";
import Futsalscreen from "./screens/Futsalscreen";
import Swimmingscreen from "./screens/Swimmingscreen";
import Gymscreen from "./screens/Gymscreen";
import FutsalBookingscreen from "./screens/FutsalBookingscreen";
import SwimmingBookingscreen from "./screens/SwimmingBookingscreen";
import GymBookingscreen from "./screens/GymBookingscreen";
import Registerscreen from "./screens/Registerscreen";
import Loginscreen from "./screens/Loginscreen";
import Profilescreen from "./screens/Profilescreen";
import AdminScreen from "./screens/AdminScreen";
import BusinessScreen from "./screens/RegisterBusinessScreen";
import LoginBusinessScreen from "./screens/LoginBusinessScreen";
import BadmintonScreen from "./screens/BadmintonScreen";

import Book from "./screens/BookingScreen";
import Football from "./screens/Football";
import Maps from "./screens/Maps";
import Admins from "./screens/Admin/Admins"
import Adduser from "./screens/Admin/Adduser";
import ForgetPassword from "./screens/ForgetPassword";
import PasswordReset from "./screens/PasswordReset";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <Routes>
          <Route
            path="/"
            element={ 
              <>
                <Hero />
                <About />
                <Services />
                <Newsletter />

                <Footer />
              </>
            }
          />
          <Route path="/Map" element={<Map />} />
          <Route path="/gym" element={<Gymscreen />} />
          <Route path="/Futsal" element={<Futsalscreen />} />
          <Route path="/Swimming" element={<Swimmingscreen />} />
          <Route path="/Badminton" element={<BadmintonScreen />}/>
          <Route path="/BusinessScreen" element={<BusinessScreen />}/>
          <Route exact path='/maps' element={<Maps />} />
          <Route
            path="/book/swimming/:id/:selectedDate"
            element={<SwimmingBookingscreen />}
          />

          <Route
            path="/book/futsal/:id/:selectedSlot/:selectedDate"
            element={<FutsalBookingscreen />}
          />

          <Route
            path="/book/gym/:id/:fromdate/:todate"
            element={<GymBookingscreen />} 
          />
          <Route path="/register" element={<Registerscreen />} />
          <Route path="/login" element={<Loginscreen />} />
          <Route path="/profile" element={<Profilescreen />} />
          <Route path="/admin" element={<AdminScreen />} />
          <Route path="/LoginBusinessScreen" element={<LoginBusinessScreen />} />
          <Route path="/futsal/:id" element={<Book />} />
          <Route path="/Football" element={<Football />} />
          <Route path="/dashboard/:ids" element={<Admins />} />
          <Route path="/dashboard/Adduser/:ids" element={<Adduser />} />
          <Route exact path="/password-reset" element={<PasswordReset />} />
          <Route exact path="/forgetpassword/:id" element={<ForgetPassword />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
