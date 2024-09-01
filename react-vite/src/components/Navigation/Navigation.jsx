import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import { IoMdSettings } from "react-icons/io";
import { VscHistory } from "react-icons/vsc";
import { TOMORROW_API_KEY } from '../../../../x-apis/apiKeys';

import "./Navigation.css";

function Navigation() {

  const sessionUser = useSelector((store) => store.session.user);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate()


  const fetchWeatherData = async () => {
    const options = { method: "GET"};
    try {
      const response = await fetch(`https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=${TOMORROW_API_KEY}`, options);
      const data = response.json();
      setWeatherData(data)
    } catch(err) {
      setError(err)
      console.error(err)
    }
  };

  useEffect(() => {

    fetchWeatherData();
  }, [])

  return (
    <nav className="navContainer">
      <div className="navLeft">
        <NavLink className={"logo"} to="/">
          <img className="nav-app-logo" src="/images/circa-logo.png" alt="Circa-Logo" />
        </NavLink>
      </div>

      {/* <div className="navCenter">
        <p>Weather</p>
      </div> */}

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
