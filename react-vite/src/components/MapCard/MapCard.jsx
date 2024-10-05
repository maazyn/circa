import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapCard.css';
import { fetchCurrUserLocations} from "../../redux/locations";
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const MapCard = ({ defaultView }) => {
    const [mapInstance, setMapInstance] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const locations = useSelector((state) => state.locations);
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

            const defaultIcon = L.icon({
                iconUrl: markerIcon,
                iconRetinaUrl: markerIconRetina,
                shadowUrl: markerShadow,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
            L.Marker.prototype.options.icon = defaultIcon;

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
    //     if (user && mapInstance) {
    //         dispatch(fetchCurrUserLocations()).then((fetchedLocations) => {
    //             setLocations(fetchedLocations?.title);

    //             fetchedLocations?.forEach((location) => {
    //                 L.marker([location.latitude, location.longitude])
    //                     .addTo(mapInstance)
    //                     .bindPopup(location.name || 'Location');
    //             });
    //         });
    //     }
    // }, [user, mapInstance, dispatch]);

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
