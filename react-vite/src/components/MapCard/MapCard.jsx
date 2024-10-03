import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapCard.css';
import { fetchCurrUserLocations} from "../../redux/locations";

const MapCard = ({ defaultView }) => {
    const [locations, setLocations] = useState([]);
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);


    useEffect(() => {
        // Initializing map
        const map = L.map('map', { center: defaultView.center, zoom: defaultView.zoom }); // B-town

        // Add a tile layer (OpenStreetMap credit)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // // Fetch locations, add markers to map
        // if (sessionUser) {
        //     const userLocations = dispatch(fetchCurrUserLocations());
        //     setLocations(userLocations);

        //     // Add markers for each location
        //     locations.forEach((location) => {
        //         L.marker([location.latitude, location.longitude])
        //             .addTo(map)
        //             .bindPopup(location.name || 'Location');
        //     });
        // }


        // Cleanup function--destroy the map when the component unmounts
        return () => {
            if (map) {
                map.remove();
            }
        };
    }, [defaultView, locations]);

    return (
        <div id="map" style={{ height: '85vh', width: '100%' }}></div>
    );
};

export default MapCard;
