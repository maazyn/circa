// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import "./ScopeComponents.css";
// import MapCard from "../MapCard/MapCard";

function GlobalComponent() {
    // const dispatch = useDispatch();

    return (
      <div className="gcContainer">
          <section className="gcLeft">
              <div className="gc-leftTop">

              </div>
              <div className="gc-leftBottom">

              </div>
          </section>

          <section className="gcMapContainer">
            <div className="gcMap"
              data-alt="Map Functionality coming soon."
              style={{
                backgroundImage: "url('/images/demo-global.png')",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}>

            </div>
          </section>
      </div>
    );
  }

  export default GlobalComponent;
