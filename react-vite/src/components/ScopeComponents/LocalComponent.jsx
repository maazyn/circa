import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import "./ScopeComponents.css";
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
              <h4 className="text-left text-red-800 border-green-900 z-10">TEST WORLD</h4>
              <p className="border-red-800 font-bold text-red-900">CHECK</p>
              <div className="text-red-500 bg-black p-4">
                Tailwind should style this div.
              </div>
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
