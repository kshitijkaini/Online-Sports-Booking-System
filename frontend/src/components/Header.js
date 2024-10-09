import { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';

const Header = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  }
  const [show, setShow] = useState(false);
  return (
    <header className="header" id="home">
      <nav className="nav container">
        <a href="/" className="nav-logo">
          Khel<span>Center</span>
        </a>
        <div className={`nav-menu ${show ? "show-menu" : ""}`} id="nav-menu">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="/" className="nav-link" onClick={() => setShow(!show)}>
                Home
              </a>
            </li>

            <li className="nav-item">
              <a
                href="/map"
                className="nav-link"
                onClick={() => setShow(!show)}
              >
                Map
              </a>
            </li>

            <li className="nav-item">
              <a
                href="/Futsal"
                className="nav-link"
                onClick={() => setShow(!show)}
              >
                Futsal
              </a>
            </li>

            <li className="nav-item">
              <a
                href="/Badminton"
                className="nav-link"
                onClick={() => setShow(!show)}
              >
                Bad-minton
              </a>
            </li>

            <li className="nav-item">
              <a
                href="/Swimming"
                className="nav-link"
                onClick={() => setShow(!show)}
              >
                Swimming
              </a>
            </li>

            <li className="nav-item">
              <a
                href="/Gym"
                className="nav-link"
                onClick={() => setShow(!show)}
              >
                Gym
              </a>
            </li>

            <div
              className="nav-close"
              id="nav-close"
              onClick={() => setShow(!show)}
            >
              <i className="ri-close-line nav-close"></i>
            </div>
          </ul>
{          console.log("fuck",user)}
          {user ? (
            <>
              <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa fa-user"></i> {user.name}
                </button> 
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="/profile">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" onClick={logout}>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <a
                href="/Register"
                className="nav-button"
                onClick={() => setShow(!show)}
              >
                Register
              </a>

              <a
                href="/login"
                className="nav-button"
                onClick={() => setShow(!show)}
              >
                Login
              </a>
            </>
          )}

          <div
            className="nav-close"
            id="nav-close"
            onClick={() => setShow(!show)}
          >
            <i className="ri-close-line nav-close"></i>
          </div>
        </div>

        <div className="nav-toggle" onClick={() => setShow(!show)}>
          <i className="ri-menu-4-line"></i>
        </div>
      </nav>
    </header>
  );
};

export default Header;
