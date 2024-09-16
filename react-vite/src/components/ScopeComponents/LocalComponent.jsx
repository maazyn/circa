import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ScopeComponents.css";
import MapCard from "../MapCard/MapCard";

function LocalComponent() {
    // const dispatch = useDispatch();

    return (
      <div className="lcContainer">
          <section className="lcLeft">
              <div className="lc-leftTop">

              </div>
              <div className="lc-leftBottom">

              </div>
          </section>

          <section className="lcMapContainer">
            <div className="lcMap"
              data-alt="Map Functionality coming soon."
              style={{
                backgroundImage: "url('/images/demo-local.png')",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}>

            </div>
          </section>
      </div>
  );
}

  export default LocalComponent;
