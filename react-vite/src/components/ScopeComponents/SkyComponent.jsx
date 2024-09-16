import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ScopeComponents.css";

function SkyComponent() {
    const user = useSelector((store) => store.session.user);
    const userLoc = user?.city
    const [loc, setLoc] = useState(userLoc || "Worcester")
    const [skyData, setSkyData] = useState(null);

    // const [error, setError] = useState(null);
    // console.log(userLoc);
    // const dispatch = useDispatch();

    // let userLocations = Object.values(locations).filter((loc) => loc.user_id === sessionUser.id);

    function handleUpdateLocation(newLocation) {
        setLoc(newLocation);
    }

    // const fetchSkyData = async () => {
    //     const url = "http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=json";
    //     try {
    //       const response = await fetch(url);
    //       if (!response.ok) {
    //         throw new Error(`HTTP error! Status: ${response.status}`);
    //       }
    //       const data = await response.json();
    //       console.log("Sunrise time:", data.dataseries[0]);
    //       setSkyData(data);
    //     } catch (err) {
    //       setError(err.message);
    //       console.error('Fetch error:', err);
    //     }
    //   };


    const fetchSkyData = async () => {
        const url = "http://www.7timer.info/bin/astro.php?lon=113.17&lat=23.09&ac=0&lang=en&unit=metric&output=internal&tzshift=0";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // const data = await response.json();
            console.log("Sky image:", response);
            setSkyData(response);
        } catch (err) {
            setError(err.message);
            console.error('Fetch error:', err);
        }
    };

    useEffect(()=> {
        if (user && !skyData) {
            fetchSkyData()
        } else if (!user && !skyData) {
            setLoc("Worcester")
            fetchSkyData()
        }
    }, [user, skyData]);


    return (
        <div className="scContainer"
            style={{
                backgroundImage:"url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0yMTgtc2FzaS0wMV8xLmpwZw.jpg')",
                backgroundPosition: "center"
            }}>
            <h2 className="sc-title">Star-Gazing Conditions - {`${userLoc ? userLoc: loc} (Demo city)`}</h2>
            <section className="scTop">
                <div className="sc-left">
                    {userLoc? (
                        <p>You are looking at data for {userLoc}</p>
                    ) : (
                        <p style={{padding:"10px"}}>
                            You are looking at demo data.
                            <br></br>
                            Sign up or log in to see data for your location.
                        </p>
                    )}
                    {/* <p id="sc-location-title">{loc}</p> */}
                    {/* <input onSubmit={handleUpdateLocation()}>Set Location</input> */}
                </div>
                <div className="sc-right">

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
