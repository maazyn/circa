// import { NavLink, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
// import { WiStars } from "react-icons/wi";


import "./AuxiliaryNav.css";

function AuxiliaryNav({ mode, setMode }) {
  // const navigate = useNavigate()

  return (
    <nav>
      <div className="axnavContainer">
        <div className="axnav-Left">
          <input className="axnav-search" type="text" placeholder="Search"></input>
          <IoFilter className="filter-icon" />
        </div>


        <div className="axnav-Right" >
          <div className="axnavButtons" mode={mode}>
            <button onClick={() => setMode("Local")}>Local</button>
            <WiStars onClick={() => setMode("Sky")}/> note to self: dont forget to set up scope state management in LandingPage
            <button onClick={() => setMode("Global")}>Global</button>
          </div>
        </div>
      </div>
  </nav>
  );
}

export default AuxiliaryNav;
