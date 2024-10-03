// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import "./ScopeComponents.css";
import MapCard from "../MapCard/MapCard";

function GlobalComponent() {
    // const placesData = [
    //   { lat: 42.3601, lng: -71.0589, name: 'Boston' },  // Example place
    //   { lat: 42.3736, lng: -71.1097, name: 'Cambridge' }  // Anotha example
    // ];

    const defaultView = {
      center: [42.3601, -71.0589],
      zoom: 4  // B-town
    }

    return (
      <div className="gcContainer">
          <section className="gcLeft">
              <div className="gc-leftTop">

              </div>
              <div className="gc-leftBottom">

              </div>
          </section>

          <section className="gcMapContainer">
          <MapCard defaultView={defaultView}/>

          </section>
      </div>
    );
  }

  export default GlobalComponent;
