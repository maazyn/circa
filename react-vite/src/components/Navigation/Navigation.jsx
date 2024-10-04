import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

// import { IoMdSettings } from "react-icons/io";
import { MdAddToPhotos } from "react-icons/md";
import { FaTemperatureArrowUp } from "react-icons/fa6";
import { FaTemperatureArrowDown } from "react-icons/fa6";
import { FaCloudRain } from "react-icons/fa6";

import "./Navigation.css";

function Navigation() {

  const sessionUser = useSelector((store) => store.session.user);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate()


  const fetchWeatherData = async () => {
    try {
      const response = await fetch('/api/weather/forecast');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      console.error('Fetch error:', err);
    }
  };


  useEffect(() => {
    if (sessionUser && !weatherData) {
      fetchWeatherData();
    }
  }, [sessionUser, weatherData])

  const windowAlert = async () => {
    window.confirm("Feature coming soon!");
  };

  return (
    <nav className="navContainer">
      <div className="navLeft">
        <NavLink className={"logo"} to="/">
          <img className="nav-app-logo" src="/images/circa-logo.png" alt="Circa-Logo" />
          {/* <span>Circa</span> */}
        </NavLink>
      </div>

      {sessionUser ? (
        <div className="navCenter">
            <div className="weather-data" >
              <div className="weather-icons-high"><FaTemperatureArrowUp /> </div>
              <p>{Math.round(weatherData?.timelines.daily[0].values["temperatureMax"]) || 'N/A'}°C</p>
              <div className="weather-icons-low"><FaTemperatureArrowDown /> </div>
              <p>{Math.round(weatherData?.timelines.daily[0].values["temperatureMin"]) || 'N/A'}°C</p>
              <div className="weather-icons-rain"><FaCloudRain /> </div>
              <p>{Math.round(weatherData?.timelines.daily[0].values["precipitationProbabilityAvg"]) || 'N/A'}%</p>
            </div>
        </div>
      ) : (
        null
      )}

      <div className="navRight" >
        {sessionUser ? (
          <>
            {/* <div>
              <IoMdSettings className="settings-history-logos" onClick={() => navigate("/settings")} />
            </div> */}
            <div>
              <MdAddToPhotos className="history-logo" onClick={windowAlert} />
            </div>
            <ProfileButton />
          </>
        ) : (
          <div className="nav-user-menu items-center h-auto m-auto">
            <OpenModalMenuItem
              itemText="Log In"
              // onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <p className="pb-[2px] font-light">/</p>
            <OpenModalMenuItem
              itemText="Sign Up"
              // onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </div>
  </nav>
  );
}

export default Navigation;
