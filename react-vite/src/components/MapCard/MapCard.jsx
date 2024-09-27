import "./MapCard.css";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useState, useCallback, useEffect } from "react";

const containerStyle = {
//   width: '600px',
//   height: '400px',
//   display: 'flex',
//   boxSizing: 'border-box',
//   position: 'relative',
//   borderRadius: '10px',

    // height: '75vh',
    height: '100%',
    width: '60vw',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    boxSizing: 'border-box',
    position: 'relative',
    borderRadius: '10px',
    // margin: '0px 5px 10px 5px',
};

const center = {
  lat: 42.3601,
  lng: -71.0589
};


function MapCard({ data }) {
    const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    // console.log("Google API Key:", googleApiKey);

    if (!data) {
        return <div>Loading...</div>;
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: googleApiKey
    })

    const [map, setMap] = useState(null)
    const defaultZoom = 13;

    const onLoad = useCallback(function callback(map) {
        setMap(map);
    }, []);


    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);


    return isLoaded ? (
        <div >
            <GoogleMap
                // className="lcMap"
                mapContainerStyle={containerStyle}
                center={center}
                zoom={defaultZoom}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
            {/* {data && data.map((place, index) => (
            <Marker
                key={index}
                position={{ lat: place.lat, lng: place.lng }}
                title={place.name}
            />
            ))} */}
            </GoogleMap>
        </div>
    ) : <div>Loading Google Map...</div>;
}

export default MapCard;
