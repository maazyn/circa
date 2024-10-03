import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./ScopeComponents.css";

function SkyComponent() {
    const user = useSelector((store) => store.session.user);
    const [city, setCity] = useState(user.city);
    const [country, setCountry] = useState(user.Country);

    const [lat, setLat] = useState(user.city || "23.09")
    const [lng, setLng] = useState(user.city || "113.17")
    const [skyData, setSkyData] = useState(null);
    const [error, setError] = useState({});

    // const [error, setError] = useState(null);
    // console.log(userLoc);
    // const dispatch = useDispatch();

    // let userLocations = Object.values(locations).filter((loc) => loc.user_id === sessionUser.id);

    function handleUpdateLocation(lt, lg) {
        setLat(lt);
        setLng(lg);
    }

    const fetchCoordinates = async () => {
        if (city && country) {
            const query = encodeURIComponent(`${city}, ${country}`);
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`);
                const data = await response.json();
                if (data.length > 0) {
                    const { lat, lon } = data[0];
                    console.log(lat, lon)
                    setLat(parseFloat(lat).toFixed(3));
                    setLng(parseFloat(lon).toFixed(3));
                }
                console.log("COORDINATES:", lat, lng)

            } catch (error) {
                console.error("Error fetching coordinates:", error);
            }
        } else if (city && !country) {
            const query = encodeURIComponent(`${city}`);
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`);
                const data = await response.json();
                if (data.length > 0) {
                    if (data.length > 0) {
                        const { lat, lon } = data[0];
                        setLat(parseFloat(lat).toFixed(4));
                        setLng(parseFloat(lon).toFixed(4));
                    }
                }
            } catch (error) {
                console.error("Error fetching coordinates:", error);
            }
        }
    };

    useEffect(() => {
        console.log("Updated COORDINATES:", city, country);
    }, [city, country]);

    useEffect(() => {
        console.log("Updated COORDINATES:", lat, lng);
    }, [lat, lng]);

    const fetchSkyData = async () => {
        console.log("GEOLOC:", lat, lng)
        const url = `http://www.7timer.info/bin/astro.php?lon=${lng}&lat=${lat}&ac=0&lang=en&unit=metric&output=internal&tzshift=0`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log("Sunrise time:", response);
            setSkyData(response);
        } catch (err) {
            setError(err.message);
            console.error('Fetch error:', err);
        }
    };

    // const fetchSkyData = async () => {
    //     try {
    //         const response = await fetch('/api/weather/sky-conditions');
    //         // console.log(response)
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }
    //         setSkyData(response);
    //     } catch (err) {
    //         setError(err.message);
    //         console.error('Fetch error:', err);
    //     }
    // };


    // useEffect(()=> {
    //     if (user && !skyData) {
    //         fetchCoordinates()
    //         fetchSkyData()
    //     } else if (!user && !skyData) {
    //         fetchSkyData()
    //     }
    // }, [user, skyData]);


    useEffect(() => {
        if (user && lat && lng && !skyData) {
            fetchSkyData();
        }
    }, [lat, lng, skyData]);


    return (
        <div className="scContainer"
            style={{
                backgroundImage:"url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0yMTgtc2FzaS0wMV8xLmpwZw.jpg')",
                backgroundPosition: "center"
            }}>
            <h2 className="sc-title">Star-Gazing Conditions Tracker</h2>
            <section className="scTop">
                <div className="sc-left text-center items-center">
                    {user.city? (
                        <p className="px-[15px]">You are looking at data for <span className="font-bold" >{user.city}</span></p>
                    ) : (
                        <p className="p-[10px]">
                            You are looking at demo data.
                            <br></br>
                            Sign up or log in to see data for your location.
                        </p>
                    )}
                    {/* <p id="sc-location-title">{loc}</p> */}
                    {/* <input onSubmit={handleUpdateLocation()}>Set Location</input> */}
                </div>
                <div className="sc-right text-center items-center">
                    <p className="px-[15px]">Recents /<span className="" >Favorites</span></p>

                </div>
            </section>

            <section className="scBottom" >
                    <img className="sky-data-img" src={skyData?.url} />
                    <small>Credit: 7timer</small>
                {/* <div className="sky-data">
                </div> */}

                    {/* {"Time: " + new Date().toLocaleTimeString()}
                     <li>{`Cloud cover: ${skyData?.dataseries[0].cloudcover}`}</li>
                    <li>{`Seeing: ${skyData?.dataseries[0].seeing}`}</li>
                    <li>{`Transparency: ${skyData?.dataseries[0].transparency}`}</li> */}

            </section>
        </div>
    );
  }

  export default SkyComponent;
