
  // const userLocations = user && locations ? Object.values(locations).filter((location) => location.user_id === user.id) : [];


//   return (
//     <div className="grid grid-cols-[2fr_4fr] w-full items-start gap-5 p-4 box-border h-[85vh] rounded-[7px]">
//         <section className="flex flex-col w-full h-full bg-[rgba(180,182,221,0.777)] shadow-[0_2px_5px_rgb(128,128,128)] rounded-[10px] p-3 gap-3">
//             <div className="TopLocationComponent flex w-full h-[15vh] justify-center items-center bg-[rgba(255,255,255,0.777)] rounded-[10px]">
//             </div>
//             <div className="BottomLocationComponent flex-grow px-[3] bg-[rgba(255,255,255,0.777)] rounded-[10px] space-y-2 overflow-y-auto h-[60vh]">
//               {userLocations.map(location => (
//                 <div key={location.id} className=" bg-white rounded-md px-[3] space-y-1">
//                     {location.title !== location.city && location.title !== location.country ? <p className="font-semibold text-sm">{location.title}</p>: null}
//                     {location.city ? <p className="text-xs">{location.city}</p>: null}
//                     {location.region ? <p className="text-xs">{location.region}</p> : null}
//                 </div>
//               ))}
//           </div>
//         </section>

//         <section className=" w-[full] h-[full] flex-row z-[1]">
//           <MapCard defaultView={defaultView} />
//         </section>
//     </div>
//   );
// }






import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapCard from "../MapCard/MapCard";
import { fetchCurrUserLocations } from "../../redux/locations";

function LocalComponent() {
  const defaultView = {
    center: [42.3601, -71.0589],
    zoom: 13  // B-town
  }

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const locations = useSelector((state) => state.locations);
  // const userLocations = user && locations ? Object.values(locations).filter((location) => location.user_id === user.id) : [];
  const filteredLocations = user && locations ? Object.values(locations).filter((location) => location.user_id === user.id && (!user.country || location.country === user.country)) : [];

  useEffect(() => {
    if (user) {
      dispatch(fetchCurrUserLocations());
    }
  }, [dispatch, user]);

  return (
    <div className="grid grid-cols-[2fr_4fr] w-full items-start gap-5 py-4 box-border h-[85vh] rounded-lg">
      <section className="flex flex-col w-full h-full bg-gray-100 shadow-md rounded-lg p-3 gap-3">
        <div className="bg-white rounded-lg h-[15vh] flex items-center justify-center">
        </div>
        <div className="bg-white rounded-lg p-3 overflow-y-auto h-[60vh] flex-grow space-y-2">
          {filteredLocations.map((location) => (
            <div key={location.id} className="bg-gray-50 rounded-md p-3 space-y-1">
              {location.title && location.title !== location.city && location.title !== location.country && (<p className="font-normal text-sm text-gray-400 ">{location.title}</p>)}
              {location.city && <p className="text-sm text-gray-400 ">{location.city}</p>}
              {location.region && <p className="text-xs">{location.region}</p>}
            </div>
          ))}
        </div>
      </section>
      <section className="w-full h-full z-10">
        <MapCard defaultView={defaultView} />
      </section>
    </div>
  );
}

export default LocalComponent;
