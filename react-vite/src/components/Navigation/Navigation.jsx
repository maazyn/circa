import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import { IoMdSettings } from "react-icons/io";
import { VscHistory } from "react-icons/vsc";

import "./Navigation.css";

function Navigation() {
  const sessionUser = useSelector((store) => store.session.user);
  const navigate = useNavigate()
  return (
    <nav className="navContainer">
      <div className="navLeft">
        <NavLink className={"logo"} to="/">
          <img className="nav-app-logo" src="/images/no-logo-yet" alt="Logo" />
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
