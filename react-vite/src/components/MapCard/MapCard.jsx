import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapCard.css';
import { fetchCurrUserLocations} from "../../redux/locations";

const MapCard = ({ defaultView }) => {
    const [mapInstance, setMapInstance] = useState(null);
    const [locations, setLocations] = useState([]);
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);


    useEffect(() => {
        // Initializing map
        const map = L.map('map', {
            center: defaultView.center,
            zoom: defaultView.zoom,
            zoomControl: true,
            scrollWheelZoom: true,
            interactive: true
        });

        // Add a tile layer (OpenStreetMap credit)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        setMapInstance(map); // Saving map instance bc Openstreetmaps will give me problems otherwise


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
    }, [defaultView]);

    useEffect(() => {
        if (sessionUser && mapInstance) {
            dispatch(fetchCurrUserLocations()).then((fetchedLocations) => {
                setLocations(fetchedLocations?.title);

                fetchedLocations?.forEach((location) => {
                    L.marker([location.latitude, location.longitude])
                        .addTo(mapInstance)
                        .bindPopup(location.name || 'Location');
                });
            });
        }
    }, [sessionUser, mapInstance, dispatch]);

    return (
        <div id="map" style={{ height: '85vh', width: '100%' }}></div>
    );
};

export default MapCard;
