import { useDispatch } from "react-redux";
import { editLocation, removeLocation } from '../../redux/locations';
import './ProfilePage.css'
import { TiDelete } from "react-icons/ti";
import { FaCalendarCheck } from "react-icons/fa";
// import DeleteLocationModal from "../DeleteLocationModal/DeleteLocationModal"
// import EditLocationModal from "../EditLocationModal/EditLocationModal"
// import LocationButton from "../LocationButton/LocationButton";
// import PostLocationModal from '../LocationFormModal/PostLocationModal';
// import OpenModalButton from "../OpenModalButton";



function LocationCard({theLocation}) {
    if (!theLocation) return (<p>Loading...</p>)
    // const user = useSelector((store) => store.session.user);
    const dispatch = useDispatch();

    // let checkLocationVisited = theLocation.visited


    const handleDelete = async (e) => {
        e.preventDefault();
        return dispatch(removeLocation(theLocation.id));
    };

    const handleChange = async (e) => {
        e.preventDefault();

        let updatedLocation = {
            ...theLocation,
            visited: !theLocation.visited
        }
        return dispatch(editLocation(updatedLocation));
    }

    // console.log(theLocation.visited)
    return (
        <div className="location-card" key={theLocation.id} >
            <div className="location-up">
            {theLocation.title !== theLocation.city && theLocation.title !== theLocation.country ? <p className="location-title">{theLocation.title}</p>: null}
                {/* <br></br> */}
                {theLocation.city ? <p className="location-detail">{theLocation.city}</p>: null}
                {theLocation.region ? <p className="location-detail">{theLocation.region}</p> : null}
                <p className="location-detail">{theLocation.country}</p>
            </div>
            <div className="location-down">
                {theLocation.type ? <p className="theLocation-detail">Type: {theLocation.type}</p> : null}

                <div className="location-modify-icons">
                    {theLocation.visited ? (
                        <FaCalendarCheck
                            className="LU-edit-icon"
                            onClick={handleChange}
                            style={{color: "green"}}
                            title="Click to mark the location as unvisited"
                        />
                    ): (
                        <FaCalendarCheck
                            className="LU-edit-icon"
                            onClick={handleChange}
                            style={{color: "silver"}}
                            title="Click to mark the location as visited"

                        />
                    )}
                    <TiDelete className="LU-delete-icon" onClick={handleDelete}/>
                </div>
            </div>

        </div>
    )
}

export default LocationCard
