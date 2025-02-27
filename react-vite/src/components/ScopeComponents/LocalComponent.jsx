import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapCard from "../MapCard/MapCard";
// import { fetchCurrUserLocations } from "../../redux/locations";

function LocalComponent() {
  const defaultView = {
    center: [42.3601, -71.0589],
    zoom: 13  // B-town
  }

  // const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const locations = useSelector((state) => state.locations);
  // const userLocations = user && locations ? Object.values(locations).filter((location) => location.user_id === user.id) : [];
  const filteredLocations = user && locations ? Object.values(locations).filter((location) => location.user_id === user.id && (!user.country || location.country === user.country)) : [];

  // useEffect(() => {
  //   if (user) {
  //     dispatch(fetchCurrUserLocations());
  //   }
  // }, [dispatch, user]);

  return (
    <div className="grid grid-cols-[2fr_4fr] w-full items-start gap-5 py-4 box-border h-[85vh] rounded-lg">
      <section className="flex flex-col w-full h-full bg-gray-100 shadow-md rounded-lg p-3 gap-3">
        <div className="bg-white rounded-lg h-[15vh] flex items-center justify-center">
        </div>
        <div className="bg-white rounded-lg p-3 overflow-y-auto h-[60vh] flex-grow space-y-2">
          {filteredLocations.map((location) => (
            <div key={location.id} className="bg-gray-50 rounded-md p-3 space-y-1">
              {location.title && location.title !== location.city && location.title !== location.country && (<p className="font-normal text-sm text-gray-500 ">{location.title}</p>)}
              {location.city && <p className="text-sm text-gray-500 ">{location.city}</p>}
              {location.region && <p className="text-xs text-gray-400">{location.region}</p>}
            </div>
          ))}
        </div>
      </section>
      <section className="w-full h-full z-10">
        <MapCard defaultView={defaultView} localLocations={filteredLocations}/>
      </section>
    </div>
  );
}

export default LocalComponent;
