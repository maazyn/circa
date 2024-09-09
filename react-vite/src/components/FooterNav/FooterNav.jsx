// import { NavLink, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";




import "./FooterNav.css";

function FooterNav({ mode, setMode }) {
  // const navigate = useNavigate()

  return (
    <div className="footer">
      <div className="footerItems">

        <div className="footLeft">
          <h4>Resources</h4>
          <a href="#">R 1</a>
          <a href="#">R 2</a>
          <a href="#">R 3</a>
        </div>

        <div className="footRight">
          <h4>Contact</h4>
          <a href="#">About</a>
          <a href="#">Email</a>
          <a href="#">Projects</a>
          {/* <p>Developed by Maazin Sherif</p> */}
        </div>
      </div>

        <div className="footBottom">
        <p>Developed by Maazin Sherif.</p>
        </div>

  </div>

  );
}

export default FooterNav;
