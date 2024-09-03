import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import { IoMdSettings } from "react-icons/io";
import { VscHistory } from "react-icons/vsc";
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
      const response = await fetch('/api/weather/');
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


  // useEffect(() => {
  //   fetchWeatherData();
  // }, [])

  return (
    <nav className="navContainer">
      <div className="navLeft">
        <NavLink className={"logo"} to="/">
          <img className="nav-app-logo" src="/images/circa-logo.png" alt="Circa-Logo" />
        </NavLink>
      </div>

      <div className="navCenter">
        {sessionUser ? (
          <div className="weather-data" >
            <div className="weather-icons-high"><FaTemperatureArrowUp /> </div>
            <p>{weatherData?.timelines.daily[0].values["temperatureMax"] || 'N/A'}°C</p>
            <div className="weather-icons-low"><FaTemperatureArrowDown /> </div>
            <p>{weatherData?.timelines.daily[0].values["temperatureMin"] || 'N/A'}°C</p>
            <div className="weather-icons-rain"><FaCloudRain /> </div>
            <p>{weatherData?.timelines.daily[0].values["precipitationProbabilityAvg"] || 'N/A'}%</p>
          </div>
        ) : (
          null
        )}
      </div>

      <div className="navRight" >
      {sessionUser && (
        <>
          <div>
            <IoMdSettings className="settings-history-logos" onClick={() => navigate("/settings")} />
          </div>
          <div>
            <VscHistory className="settings-history-logos" onClick={() => navigate("/history")} />
          </div>
        </>
      )}
        <ProfileButton />
      </div>
  </nav>
  );
}

export default Navigation;
