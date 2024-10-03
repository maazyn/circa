// import "./MapCard.css";
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
// import { useState, useCallback, useEffect, useMemo } from "react";

// const containerStyle = {
// //   width: '600px',
// //   height: '400px',
// //   display: 'flex',
// //   boxSizing: 'border-box',
// //   position: 'relative',
// //   borderRadius: '10px',

//     // height: '75vh',
//     height: '100%',
//     width: '60vw',
//     flexDirection: 'row',
//     display: 'flex',
//     justifyContent: 'center',
//     boxSizing: 'border-box',
//     position: 'relative',
//     borderRadius: '10px',
//     // margin: '0px 5px 10px 5px',
// };

// const center = {
//     lat: 42.3601,
//     lng: -71.0589
// };

// function MapCard({ data }) {
//     const [googleApiKey, setGoogleApiKey] = useState(null);
//     const [isLoaded, setIsLoaded] = useState(false);


//     const fetchKey = async () => {
//         try {
//             const response = await fetch('/api/map/google-key');
//             // console.log(response)
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             const data = await response.json();
//             setGoogleApiKey(data.key);
//         } catch (err) {
//             console.error('Fetch error:', err);
//         }
//     };


//     useEffect(()=> {
//         if (!googleApiKey) {
//             fetchKey();
//         }
//     }, [googleApiKey]);

//     const loaderOptions = useMemo(() => ({
//         id: 'google-map-script',
//         googleMapsApiKey: googleApiKey || ''
//     }), [googleApiKey]);

//     const apiLoader = useJsApiLoader(loaderOptions);

//     // const apiLoader = useJsApiLoader({
//     //     id: 'google-map-script',
//     //     googleMapsApiKey: googleApiKey
//     // });

//     useEffect(() => {
//         if (apiLoader.isLoaded) {
//             setIsLoaded(true);
//         }
//     }, [apiLoader.isLoaded]);

//     const [map, setMap] = useState(null);
//     const defaultZoom = 13;

//     const onLoad = useCallback(function callback(map) {
//         setMap(map);
//     }, []);

//     const onUnmount = useCallback(function callback(map) {
//         setMap(null);
//     }, []);

//     return isLoaded ? (
//         <div>
//             <GoogleMap
//                 mapContainerStyle={containerStyle}
//                 center={center}
//                 zoom={defaultZoom}
//                 onLoad={onLoad}
//                 onUnmount={onUnmount}
//             >
//             {/* {data && data.map((place, index) => (
//             <Marker
//                 key={index}
//                 position={{ lat: place.lat, lng: place.lng }}
//                 title={place.name}
//             />
//             ))} */}
//             </GoogleMap>
//         </div>
//     ) : <div>Loading Google Map...</div>;
// }

// export default MapCard;
