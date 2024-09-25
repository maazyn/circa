import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { MdFilterAlt } from "react-icons/md";
import { WiStars } from "react-icons/wi";
import { IoSearchSharp } from "react-icons/io5";
import SearchBar from "../SearchBar/SearchBar";
import { useMode } from "../../context/ModeContext";

import "./AuxiliaryNav.css";

function AuxiliaryNav() {
  const navigate = useNavigate()
  const {mode, setMode} = useMode();
  const [searchResults, setSearchResults] = useState({
    locations: [],
    collections: [],
    users: []
  });
  const dropdownRef = useRef(null);

  const handleMode = async (newMode) => {
    navigate("/");
    setMode(newMode);
  }

  const handleSearch = async (query) => {
    if (!query) {
      setSearchResults({
        locations: [],
        collections: [],
        users: []
      });
      return;
    }

    try {
      const response = await fetch(`/api/search?query=${query}`)
      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      console.error("Search error:", err)
    }
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearchResults({ locations: [], collections: [], users: [] });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav>
      <div className="axnavContainer">
        <div className="axnavLeft">
          <div id="filter-icon-container">
            <MdFilterAlt id="filter-icon" />
          </div>
          {/* <SearchBar className="axnav-search"/>
          <IoSearchSharp id="search-icon" /> */}
          {/* <input className="axnav-search" type="text" placeholder=" Search...in the works"></input> */}

          <SearchBar className="axnav-search" onSearch={handleSearch} />
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
          )}
        </div>


        <div className="axnavRight" >
          <div className="axnavButtons" mode={mode}>
            <button
              onClick={() => handleMode("Local")}
              style={{
                boxShadow: mode === "Local" ? "0px 0px 3px 0px rgb(57, 57, 57)" : "none",
                backgroundColor: mode === "Local" ? "white": "#a89a9a",
                color: mode === "Local" ? "black" : "white"
              }}
            >Local</button>

            <WiStars
              id="sky-icon" onClick={() => handleMode("Sky")}
              style={{
                boxShadow: mode === "Sky" ? "0px 0px 3px 0px rgb(57, 57, 57)" : "none",
                backgroundColor: mode === "Sky" ? "white": "#a89a9a",
                color: mode === "Sky" ? "black" : "white"

              }}
            />

              {/* note to self: dont forget to set up scope state management in LandingPage */}
            <button
              onClick={() => handleMode("Global")}
              style={{
                boxShadow: mode === "Global" ? "0px 0px 3px 0px rgb(57, 57, 57)" : "none",
                backgroundColor: mode === "Global" ? "white": "#a89a9a",
                color: mode === "Global" ? "black" : "white"
              }}            >Global</button>
          </div>
        </div>
      </div>
  </nav>
  );
}

export default AuxiliaryNav;
