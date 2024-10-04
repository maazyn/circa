import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./ScopeComponents.css";

function SkyComponent() {
    const user = useSelector((store) => store.session.user);
    const [currCity, setCurrCity] = useState(user.city);
    const [lat, setLat] = useState(user.lat || "23.09")
    const [lng, setLng] = useState(user.lng || "113.17")
    // const [lat, setLat] = useState("23.09")
    // const [lng, setLng] = useState("113.17")
    const [skyData, setSkyData] = useState(null);
    const [error, setError] = useState({});


    function handleUpdateLocation(lt, lg, city) {
        setLat(lt);
        setLng(lg);
        setCurrCity(city)
    }

    const fetchSkyData = async () => {
        console.log("GEOLOC:", lat, lng)
        const url = `http://www.7timer.info/bin/astro.php?lon=${lng}&lat=${lat}&ac=0&lang=en&unit=metric&output=internal&tzshift=0`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // console.log("Sunrise time:", response);
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


    useEffect(()=> {
        if (user && !skyData) {
            fetchSkyData()
        } else if (!user && !skyData) {
            fetchSkyData()
        }
    }, [user, skyData]);


    // useEffect(() => {
    //     if (user && lat && lng && !skyData) {
    //         fetchSkyData();
    //     }
    // }, [lat, lng, skyData]);


    return (
        <div className="flex flex-col w-full h-full  items-center gap-5 px-0 py-[50px] rounded-[7px]"
            style={{
                backgroundImage:"url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0yMTgtc2FzaS0wMV8xLmpwZw.jpg')",
                backgroundPosition: "center"
            }}>
            <h2 className="sc-title text-xl py-[5px]">Star-Gazing Conditions Tracker</h2>
            <section className="w-full flex flex-col justify-center items-center box-border mb-[10px] rounded-[7px]" >
                    <img className="h-auto w-[80%] bg-transparent border shadow-[0_0px_10px_0px_rgb(255,255,255)] rounded-[10px] border-solid border-white" src={skyData?.url} />
                    <small className="text-[white] mt-[5px]">Credit: 7timer</small>
            </section>
            <section className="w-[70%] flex h-auto flex-row justify-center box-border gap-5 rounded-[7px]">
                <div className="flex w-6/12 h-[100px] flex-row justify-center border bg-[rgba(219,200,200,0.777)] shadow-[0_2px_5px_0px_rgb(255,255,255)] rounded-[7px] border-solid border-white text-center items-center">
                    {user.city? (
                        <p className="px-[15px] text-black">You are looking at forecast data for
                        <br></br>
                        <span className="font-bold text-2xl text-blue-800" >{currCity}</span>
                        </p>
                    ) : (
                        <p className="p-[10px] text-white">
                            You are looking at demo data.
                            <br></br>
                            Sign up or log in to see data for your location.
                        </p>
                    )}
                    {/* <p id="sc-location-title">{loc}</p> */}
                    {/* <input onSubmit={handleUpdateLocation()}>Set Location</input> */}
                </div>
                <div className="flex w-6/12 h-[100px] flex-row justify-center border bg-[rgba(219,200,200,0.777)] shadow-[0_2px_5px_0px_rgb(255,255,255)] rounded-[7px] border-solid border-white text-center items-center">
                    <p className="px-[15px] text-black">Recents /<span className="" > Favorites</span></p>

                </div>
            </section>


        </div>
    );
  }

  export default SkyComponent;
