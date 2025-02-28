// import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ScopeComponents.css";
import MapCard from "../MapCard/MapCard";
import SearchCard from "../LandingPage/SearchCard";


function GlobalComponent() {
    // const placesData = [
    //   { lat: 42.3601, lng: -71.0589, name: 'Boston' },  // Example place
    //   { lat: 42.3736, lng: -71.1097, name: 'Cambridge' }  // Anotha example
    // ];

    const defaultView = {
      center: [42.3601, -71.0589],
      zoom: 4  // B-town
    }

    // const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const locations = useSelector((state) => state.locations);
    const filteredLocations = user && locations ? Object.values(locations).filter((location) => location.user_id === user.id && (location.country !== user.country)) : [];

    return (
      <div className="grid grid-cols-[2fr_4fr] w-full items-start gap-5 py-4 box-border h-[85vh] rounded-lg">
        <section className="flex flex-col w-full h-full bg-gray-100 shadow-md rounded-lg p-3 gap-3">
          <div className="bg-white rounded-lg h-[15vh] flex items-center justify-center">
            
          </div>
          <div className="bg-white rounded-lg p-3 overflow-y-auto h-[60vh] flex-grow space-y-2">
            {filteredLocations.map((location) => (
              <div key={location.id} className="bg-gray-50 rounded-md p-3 space-y-1">
                <div className="flex items-center">
                  {location.city && <span className="text-sm text-gray-500">{location.city}</span>}
                  {location.city && location.country && <span className="mr-1 text-gray-500">,</span>}
                  {location.country && <span className="text-sm text-gray-500">{location.country}</span>}
                </div>
                {/* {location.city && <span className="text-sm text-gray-400 ">{location.city}</span>}
                {location.country && <span className="text-sm text-gray-400">{location.country}</span>} */}
                {/* {location.region && <p className="text-xs">{location.region}</p>} */}
                {location.continent && <p className="text-xs text-gray-400">{location.continent}</p>}
              </div>
            ))}
          </div>
        </section>
        <section className="w-full h-full z-10">
          <MapCard defaultView={defaultView} globalLocations={filteredLocations} />
        </section>
      </div>
    );
  }

  export default GlobalComponent;
