import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LandingPage.css";
import MapCard from "./MapCard";

function SkyComponent() {
    // const dispatch = useDispatch();
    const userLoc = useSelector(user.city)
    const [loc, setLoc] = useState(userLoc)

    function handleUpdateLocation(newLocation) {
        setLoc(newLocation);
    }



    return (
      <>
      <h1>Star-Gazing Conditions Tracker</h1>
        <div className="scContainer">
            <section className="sc-top">
                <div className="sc-left">
                    <p>You are looking at weather data for: Recs?</p>
                    <p id="sc-location-title">{loc}</p>
                    <input onSubmit={handleUpdateLocation()}>Set Location</input>
                </div>
                <div className="sc-right">

                </div>
            </section>

            <section className="sc-bottom">
                <div className="sc-bottom-items">

                </div>
                {"Time: " + new Date().toLocaleTimeString()}
                <ul>
                    {conditions.map((condition) => (
                        <li key={condition.time}>
                            {`Time: ${condition.time}`}
                            {`Cloud cover: ${condition.cloud_cover}`}
                            {`Seeing: ${condition.seeing}`}
                            {`Visibility: ${condition.visibility}`}
                            {`Transparency: ${condition.transparency}`}
                            {`Precipitation: ${condition.precipitation}`}
                        </li>
                    ))}

                </ul>
            </section>


        </div>

      </>
    );
  }

  export default SkyComponent;
