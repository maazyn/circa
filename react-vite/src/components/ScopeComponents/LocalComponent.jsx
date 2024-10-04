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
    <div className="grid grid-cols-[2fr_4fr] w-full flex-col items-center gap-5 pt-[5px] box-border h-[80vh] rounded-[7px]">
        <section className="grid grid-rows-[1fr_4fr] w-full h-full bg-[rgba(180,182,221,0.777)] shadow-[0_2px_5px_rgb(128,128,128)] rounded-[10px] box-border p-2 gap-2">
            <div className="flex flex-col h-full w-full justify-center items-center bg-[rgba(255,255,255,0.777)] rounded-[10px] box-border">
              {/* <h4 className="text-left text-red-800 border-green-900 z-10">TEST WORLD</h4>
              <p className="border-red-800 font-bold text-red-900">CHECK</p>
              <div className="text-red-500 bg-black p-4">
                Tailwind should style this div.
              </div> */}
            </div>
            <div className="flex flex-col h-full w-full justify-center items-center bg-[rgba(255,255,255,0.777)] rounded-[10px] box-border">

            </div>
        </section>

        <section className=" w-[100%] h-[100%] flex-row z-[1]">
          <MapCard defaultView={defaultView} />
        </section>
    </div>
  );
}

  export default LocalComponent;
