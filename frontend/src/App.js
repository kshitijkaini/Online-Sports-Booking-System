import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Registerscreen from "./screens/Registerscreen";
import Loginscreen from "./screens/Loginscreen";
import Profilescreen from "./screens/Profilescreen";
import BusinessScreen from "./screens/RegisterBusinessScreen";
import LoginBusinessScreen from "./screens/LoginBusinessScreen";
import BadmintonScreen from "./screens/BadmintonScreen";
//booking import
import Book from "./screens/BookingScreen";
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
          <Route path="/register" element={<Registerscreen />} />
          <Route path="/login" element={<Loginscreen />} />
          <Route path="/profile" element={<Profilescreen />} />
          <Route path="/LoginBusinessScreen" element={<LoginBusinessScreen />} />
          {/* imp Booking */}
          <Route path="/futsal/:id" element={<Book />} />
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
