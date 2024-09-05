import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { FaUserCircle } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { IoLogOut } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  return (
    <>
      <button className="profileButton"onClick={toggleMenu}>
        {user && user.profile_img.length > 1 ? ( <img className="profile-nav-image" src={user.profile_img}  />) : (<CgProfile />)} {/*if user image null, default to generic profile button*/}
      </button>
      {showMenu && (
        <div className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
            <a className="user-info" href="/home">
              <img className="user-info-image" src={user.profile_img} />
              <p  className="user-info-name" >{user.first_name} {user.last_name}</p>
            </a>
              <hr></hr>

              <a href="/home" class="profile-menu-link">
                <div className="profile-menu-icon"><FaUserEdit /></div>
                <p>Edit Profile</p>
                <span>></span>
              </a>

              <a href="/history" class="profile-menu-link">
                <div className="profile-menu-icon"><FaHistory /></div>
                <p>History</p>
                <span>></span>
              </a>

              <a href="/settings" class="profile-menu-link">
                <div className="profile-menu-icon"><IoMdSettings /></div>
                <p>Settings</p>
                <span>></span>
              </a>

              <a onClick={logout} class="profile-menu-link">
                <div className="profile-menu-icon"><IoLogOut /></div>
                <p>Logout</p>
                <span>></span>
              </a>

              {/* <div>
                <button onClick={logout}>Log Out</button>
              </div> */}
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </div>
      )}
    </>
  );
}

export default ProfileButton;
