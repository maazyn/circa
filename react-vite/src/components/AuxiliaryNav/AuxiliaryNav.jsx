// import { NavLink, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import { IoFilter } from "react-icons/io";
// import { WiStars } from "react-icons/wi";


import "./AuxiliaryNav.css";

function AuxiliaryNav() {
  // const sessionUser = useSelector((store) => store.session.user);
  // const navigate = useNavigate()
  return (
    <nav>
      <div className="axnavContainer">
        <div className="axnav-Left">
          <input className="axnav-search" type="text" placeholder="Search"></input>
          <IoFilter className="filter-icon" />
        </div>


        <div className="axnav-Right" >
          <div className="axnavButtons">
            <button>Local</button>
            {/* <WiStars onClick={() => setScope("Sky")}/> note to self: dont forget to set up scope state management in LandingPage */}
            <button>Global</button>
          </div>
        </div>
      </div>
  </nav>
  );
}

export default AuxiliaryNav;
