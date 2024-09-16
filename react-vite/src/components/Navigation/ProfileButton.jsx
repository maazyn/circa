import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { FaUserCircle } from 'react-icons/fa';
import { FaUserAlt } from "react-icons/fa";
import { thunkLogout } from "../../redux/session";
import { TbUserEdit } from "react-icons/tb";
import { RiHistoryLine } from "react-icons/ri";
import { AiOutlineSetting } from "react-icons/ai";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const navigate = useNavigate();
  const ulRef = useRef();

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
    navigate("/");
    closeMenu();
  };

  return (
    <>
      <button className="profileButton"onClick={toggleMenu}>
        {user && user.profile_img.length > 1 ? ( <img className="profile-nav-image" src={user.profile_img}  />) : (<FaUserAlt className="default-profile-icon"/>)} {/*if user image null, default to generic profile button*/}
      </button>
      {showMenu && (
        <div className={"profile-dropdown"} ref={ulRef}>
          {user && (
            <>
              <a href="/profile" className="user-info">
                <img className="user-info-image" src={user.profile_img} />
                <p  className="user-info-name" >{user.first_name} {user.last_name}</p>
              </a>
              <hr id="user-info-hr"></hr>

              <a href="/edit-profile" className="profile-menu-link">
                <div className="profile-menu-icon"><TbUserEdit /></div>
                <p>Edit Profile</p>
                <span>&gt;</span>
              </a>

              <a href="/history" className="profile-menu-link">
                <div className="profile-menu-icon"><RiHistoryLine /></div>
                <p>History</p>
                <span>&gt;</span>
              </a>

              <a href="/settings" className="profile-menu-link">
                <div className="profile-menu-icon"><AiOutlineSetting /></div>
                <p>Settings</p>
                <span>&gt;</span>
              </a>

              <a onClick={logout} className="profile-menu-link">
                <div className="profile-menu-icon"><RiLogoutBoxRLine /></div>
                <p>Logout</p>
                <span>&gt;</span>
              </a>

              {/* <div>
                <button onClick={logout}>Log Out</button>
              </div> */}
            </>
          )}

        </div>
      )}
    </>
  );
}

export default ProfileButton;
