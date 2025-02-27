import { NavLink, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useForecast } from '../../context/ForecastContext';

// import { IoMdSettings } from "react-icons/io";
import { MdAddToPhotos } from "react-icons/md";
import { FaToggleOn } from "react-icons/fa";
import { FaToggleOff } from "react-icons/fa";
import { FaTemperatureArrowUp } from "react-icons/fa6";
import { FaTemperatureArrowDown } from "react-icons/fa6";
import { FaCloudRain } from "react-icons/fa6";

import "./Navigation.css";

function Navigation() {

  const sessionUser = useSelector((store) => store.session.user);
  const { forecastStatus, setWeatherData, forecastToggle, weatherData, setError } = useForecast();
  // const [forecastStatus, setForecastStatus] = useState(false);
  // const [weatherData, setWeatherData] = useState(null);
  // const [error, setError] = useState(null);
  const navigate = useNavigate()

  // const forecastToggle = () => {
  //   setForecastStatus(!forecastStatus);
  // };

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
    if (sessionUser && forecastStatus) {
      fetchWeatherData();
    }
  }, [sessionUser, forecastStatus])

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

      {sessionUser && forecastStatus ? (
        <div className="navCenter transition-transform">
            <div className="weather-data" >
              <button className="weather-icons-rain text-xl" onClick={forecastToggle}><FaToggleOn /> </button>
              <div className="weather-icons-high"><FaTemperatureArrowUp /> </div>
              <p>{Math.round(weatherData?.timelines.daily[0].values["temperatureMax"]) || 'N/A'}°C</p>
              <div className="weather-icons-low"><FaTemperatureArrowDown /> </div>
              <p>{Math.round(weatherData?.timelines.daily[0].values["temperatureMin"]) || 'N/A'}°C</p>
              <div className="weather-icons-rain"><FaCloudRain /> </div>
              <p>{Math.round(weatherData?.timelines.daily[0].values["precipitationProbabilityAvg"]) || 'N/A'}%</p>
            </div>
        </div>
      ) : (
        <div className="flex gap-2 align-center items-center">
          <button className="weather-icons-rain text-xl" onClick={forecastToggle}><FaToggleOff /> </button>
          <p className="gap-2 font-thin text-sm text-black">weather forecast</p>
        </div>
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
