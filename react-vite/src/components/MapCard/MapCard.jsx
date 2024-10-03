import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapCard.css';

const MapCard = ({ defaultView }) => {
    console.log(defaultView ? defaultView.center : "defaultView is undefined");


    useEffect(() => {
        // Initializing map
        let map = L.map('map', { center: defaultView.center, zoom: defaultView.zoom }); // B-town

        // Add a tile layer (OpenStreetMap credit)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // Cleanup function to destroy the map when the component unmounts
        return () => {
            if (map) {
                map.remove();
            }
        };
    }, []);

    return (
        <div id="map" class=""></div>
    );
};

export default MapCard;
