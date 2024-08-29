import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LandingPage.css";
import MapCard from "./MapCard";
import AuxiliaryNav from "../AuxiliaryNav/AuxiliaryNav";

function LandingPage({mode}) {
  const [mode, setMode] = useState("Local");
  // const dispatch = useDispatch();

  return (
    <>
    <div className="axNav">
    <AuxiliaryNav mode={mode} setMode={setMode} />
        {mode === "Local" && <LocalComponent />}
        {mode === "Sky" && <SkyComponent />}
        {mode === "Global" && <GlobalComponent />}
    </div>

      {/* <div className="lpMapContainer">
        <aside className="lp-section2">
          <MapCard data={data} />
        </aside>
      </div> */}

    </>
  );
}

export default LandingPage;
