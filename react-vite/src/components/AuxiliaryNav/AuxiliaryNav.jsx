// import { NavLink, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
import { MdFilterAlt } from "react-icons/md";
import { WiStars } from "react-icons/wi";
import { IoSearchSharp } from "react-icons/io5";



import "./AuxiliaryNav.css";

function AuxiliaryNav({ mode, setMode }) {
  // const navigate = useNavigate()

  return (
    <nav>
      <div className="axnavContainer">
        <div className="axnavLeft">
          <IoSearchSharp id="search-icon" />
          <input className="axnav-search" type="text" placeholder=" Search..."></input>
          <div id="filter-icon-container">
            <MdFilterAlt id="filter-icon" />
          </div>
        </div>


        <div className="axnavRight" >
          <div className="axnavButtons" mode={mode}>
            <button
              onClick={() => setMode("Local")}
              style={{
                boxShadow: mode === "Local" ? "0px 0px 3px 0px rgb(57, 57, 57)" : "none",
                backgroundColor: mode === "Local" ? "white": "#a89a9a",
                color: mode === "Local" ? "black" : "white"
              }}
            >Local</button>

            <WiStars
              id="sky-icon" onClick={() => setMode("Sky")}
              style={{
                boxShadow: mode === "Sky" ? "0px 0px 3px 0px rgb(57, 57, 57)" : "none",
                backgroundColor: mode === "Sky" ? "white": "#a89a9a",
                color: mode === "Sky" ? "black" : "white"

              }}
            />

              {/* note to self: dont forget to set up scope state management in LandingPage */}
            <button
              onClick={() => setMode("Global")}
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
