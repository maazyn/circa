import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LandingPage.css";
// import MapCard from "../MapCard/MapCard";
import AuxiliaryNav from "../AuxiliaryNav/AuxiliaryNav";

import LocalComponent from "./LocalComponent";
import SkyComponent from "./SkyComponent";
import GlobalComponent from "./GlobalComponent";


function LandingPage() {
  const [mode, setMode] = useState("Local");
  // const dispatch = useDispatch();

  return (
    <>
      <div className="axNav">
        <AuxiliaryNav mode={mode} setMode={setMode} />
      </div>

      <div className="lpContainer">
        {mode === "Local" &&  <LocalComponent />}
        {mode === "Sky" && <SkyComponent />}
        {mode === "Global" && <GlobalComponent />}
      </div>

    </>
  );
}

export default LandingPage;
