import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ScopeComponents.css";
import MapCard from "../MapCard/MapCard";

function LocalComponent() {
  const placesData = [
    { lat: 42.3601, lng: -71.0589, name: 'Boston' },  // Example place
    { lat: 42.3736, lng: -71.1097, name: 'Cambridge' }  // Anotha example
  ];
  return (
    <div className="lcContainer">
        <section className="lcLeft">
            <div className="lc-leftTop">

            </div>
            <div className="lc-leftBottom">

            </div>
        </section>

        <section className="lcMapContainer">
          <MapCard data={placesData}/>
        </section>
    </div>
  );
}

  export default LocalComponent;
