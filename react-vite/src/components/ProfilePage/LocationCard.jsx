import { IoIosCheckmarkCircle } from "react-icons/io";
import './ProfilePage.css'

function LocationCard({theLocation}) {
    console.log(theLocation)
    if (!theLocation) return (<p>Loading...</p>)
    return (
        <div className="location-card" key={theLocation.id} >
            <div className="location-up">
                {/* <p className="location-title">{theLocation.title}</p> */}
                {theLocation.region? <p className="location-detail">Region: {theLocation.region}</p> : null}
                <p className="location-detail">{theLocation.city}</p>
                <p className="theLocation-detail">{theLocation.country}</p>
            </div>
            <div className="location-down">
                {theLocation.type ? <p className="theLocation-detail">Type: {theLocation.type}</p> : null}
                {theLocation.visited && theLocation.visited.length > 1 ? ( <IoIosCheckmarkCircle className="theLocation-detail"/>) : null}
            </div>
        </div>
    )
}

export default LocationCard
