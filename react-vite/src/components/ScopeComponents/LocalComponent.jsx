import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ScopeComponents.css";
import MapCard from "../MapCard/MapCard";

function LocalComponent() {
  const defaultView = {
    center: [42.3601, -71.0589],
    zoom: 13  // B-town
  }


  return (
    <div className="lcContainer">
        <section className="lcLeft">
            <div className="lc-leftTop">

            </div>
            <div className="lc-leftBottom">

            </div>
        </section>

        <section className="lcMapContainer">
          <MapCard defaultView={defaultView}/>
        </section>
    </div>
  );
}

  export default LocalComponent;
