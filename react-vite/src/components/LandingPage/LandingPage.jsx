import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import "./LandingPage.css";
// import MapCard from "../MapCard/MapCard";
import AuxiliaryNav from "../AuxiliaryNav/AuxiliaryNav";

import LocalComponent from "../ScopeComponents/LocalComponent";
import SkyComponent from "../ScopeComponents/SkyComponent";
import GlobalComponent from "../ScopeComponents/GlobalComponent";
import FooterNav from "../FooterNav/FooterNav";
import { useMode } from "../../context/ModeContext";

function LandingPage() {
  // const [mode, setMode] = useState("Local");
  const { mode, setMode } = useMode();

  useEffect(() => {
    if (!mode) setMode("Local");
  }, [mode, setMode]);

  return (
    <>
      <div className="axNav">
        <AuxiliaryNav />
      </div>

      <div className="lpContainer">
        {mode === "Local" &&  <LocalComponent />}
        {mode === "Sky" && <SkyComponent />}
        {mode === "Global" && <GlobalComponent />}
      </div>

      <FooterNav/>
    </>
  );
}

export default LandingPage;
