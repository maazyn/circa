import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapCard.css';
import { fetchCurrUserLocations} from "../../redux/locations";

const MapCard = ({ defaultView }) => {
    const [mapInstance, setMapInstance] = useState(null);
    const [loc, setLoc] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const locations = useSelector((state) => state.locations);
    // const userLocations = (Object.values(locations).filter((location) => location.user_id === user.id));
    // let collLocations = theCollection?.locations;

    const userLocations = user && locations ? Object.values(locations).filter((location) => location.user_id === user.id) : [];
    // console.log("TEST1: ", locations)
    // console.log("TEST2: ", userLocations)

    useEffect(() => {
        if (user) {
            dispatch(fetchCurrUserLocations());
        }
    }, [dispatch, user]);


    useEffect(() => {
        // Initializing map
        if (user) {
            const map = L.map('map', {
                center: defaultView.center,
                zoom: defaultView.zoom,
                zoomControl: true,
                scrollWheelZoom: true,
                interactive: true
            });

            userLocations?.forEach((location) => {
                L.marker([location.lat, location.lng])
                .addTo(map)
                .bindPopup(location.title || 'Location');
            });

            // Add a tile layer (OpenStreetMap credit)
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            setMapInstance(map); // Saving map instance bc Openstreetmaps will give me problems otherwise



            // Cleanup function--destroy the map when the component unmounts
            return () => {
                if (map) {
                    map.remove();
                }
            };
        }
    }, [defaultView]);

    // useEffect(() => {
    //     if (sessionUser && mapInstance) {
    //         dispatch(fetchCurrUserLocations()).then((fetchedLocations) => {
    //             setLocations(fetchedLocations?.title);

    //             fetchedLocations?.forEach((location) => {
    //                 L.marker([location.latitude, location.longitude])
    //                     .addTo(mapInstance)
    //                     .bindPopup(location.name || 'Location');
    //             });
    //         });
    //     }
    // }, [sessionUser, mapInstance, dispatch]);

    return user ? (
        <div id="map" style={{ height: '85vh', width: '100%' }}></div>
    ): (
        <section className="lcMapContainer">
            <div className="lcMap"
                data-alt="Log-in or Sign-up for full map functionality"
                style={{
                backgroundImage: "url('/images/demo-global.png')",
                backgroundPosition: "center",
                backgroundSize: "cover",
                }}>

            </div>
        </section>
    )
};

export default MapCard;
