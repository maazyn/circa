import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { MdFilterAlt } from "react-icons/md";
import { WiStars } from "react-icons/wi";
import { useMode } from "../../context/ModeContext";
import { useForecast } from '../../context/ForecastContext';

// import { IoSearchSharp } from "react-icons/io5";
// import SearchBar from "../SearchBar/SearchBar";
import { FaToggleOn } from "react-icons/fa";
import { FaToggleOff } from "react-icons/fa";
import { FaTemperatureArrowUp } from "react-icons/fa6";
import { FaTemperatureArrowDown } from "react-icons/fa6";
import { FaCloudRain } from "react-icons/fa6";
import "./AuxiliaryNav.css";

function AuxiliaryNav() {
  const sessionUser = useSelector((store) => store.session.user);
  const {mode, setMode} = useMode();
  const navigate = useNavigate();
  const { forecastStatus, setWeatherData, forecastToggle, weatherData, setError } = useForecast();

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

  // const [searchResults, setSearchResults] = useState({
  //   locations: [],
  //   collections: [],
  //   users: []
  // });
  // const dropdownRef = useRef(null);

  const handleMode = async (newMode) => {
    navigate("/");
    setMode(newMode);
  }

  // const handleSearch = async (query) => {
  //   if (!query) {
  //     setSearchResults({
  //       locations: [],
  //       collections: [],
  //       users: []
  //     });
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`/api/search?query=${query}`)
  //     const data = await response.json();
  //     setSearchResults(data);
  //   } catch (err) {
  //     console.error("Search error:", err)
  //   }
  // };


  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setSearchResults({ locations: [], collections: [], users: [] });
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <nav>
      <div className="axnavContainer">
        <div className="axnavLeft">
          {sessionUser && forecastStatus ? (
            <div className="transition-transform">
                <div className="weather-data border-black px-3 py-1 h-[27px] rounded-md bg-white items-center boxShadow: 0px 0px 3px 0px rgb(57, 57, 57)" >
                  <button className="weather-icons-rain text-xl mx-1" onClick={forecastToggle}><FaToggleOn /> </button>
                  <div className="weather-icons-high"><FaTemperatureArrowUp /> </div>
                  <p>{Math.round(weatherData?.timelines.daily[0].values["temperatureMax"]) || 'N/A'}°C</p>
                  <div className="weather-icons-low"><FaTemperatureArrowDown /> </div>
                  <p>{Math.round(weatherData?.timelines.daily[0].values["temperatureMin"]) || 'N/A'}°C</p>
                  <div className="weather-icons-rain"><FaCloudRain /> </div>
                  <p>{Math.round(weatherData?.timelines.daily[0].values["precipitationProbabilityAvg"]) || 'N/A'}%</p>
                </div>
            </div>
          ) : (
            <div className="border-black px-3 py-1 h-[27px] rounded-md flex flex-row gap-2 align-center items-center bg-[#AFC0F2]">
              <button className="weather-icons-rain text-xl mx-1" onClick={forecastToggle}><FaToggleOff /> </button>
              <p className="gap-2 text-md  text-white font-normal">weather forecast</p>
            </div>
          )}
          {/* <SearchBar className="axnav-search" onSearch={handleSearch} />
          {(searchResults?.collections?.length > 0 ||
            searchResults?.locations?.length > 0 ||
            searchResults?.users?.length > 0) && (
            <div className="searchDropdown" ref={dropdownRef}>
            {searchResults?.collections?.length > 0 && (
              searchResults.collections.map((collection) => (
                <div id="coll-dropdown" key={collection.id}>{collection.title} <span>Collection</span></div>
              ))
            )}
            {searchResults?.locations?.length > 0 && (
              searchResults.locations.map((location) => (
                <div id="loc-dropdown" key={location.id}>{location.title} <span>Place</span></div>
              ))
            )}
            {searchResults?.users?.length > 0 && (
              searchResults.users.map((user) => (
                <div id="user-dropdown" key={user.id}>{user.username} <span>USER</span></div>
              ))
            )}
          </div>
          )} */}
        </div>


        <div className="axnavRight" >
          <div className="axnavButtons" mode={mode}>
            <button
              onClick={() => handleMode("Local")}
              style={{
                boxShadow: mode === "Local" ? "0px 0px 3px 0px rgb(57, 57, 57)" : "none",
                backgroundColor: mode === "Local" ? "white": "rgb(175, 192, 242)",
                color: mode === "Local" ? "black" : "white"
              }}
            >Local</button>

            <WiStars
              id="sky-icon" onClick={() => handleMode("Sky")}
              style={{
                boxShadow: mode === "Sky" ? "0px 0px 3px 0px rgb(57, 57, 57)" : "none",
                backgroundColor: mode === "Sky" ? "white": "rgb(175, 192, 242)",
                color: mode === "Sky" ? "black" : "white"

              }}
            />

              {/* note to self: dont forget to set up scope state management in LandingPage */}
            <button
              onClick={() => handleMode("Global")}
              style={{
                boxShadow: mode === "Global" ? "0px 0px 3px 0px rgb(57, 57, 57)" : "none",
                backgroundColor: mode === "Global" ? "white": "rgb(175, 192, 242)",
                color: mode === "Global" ? "black" : "white"
              }}            >Global</button>
          </div>
        </div>
      </div>
  </nav>
  );
}

export default AuxiliaryNav;
