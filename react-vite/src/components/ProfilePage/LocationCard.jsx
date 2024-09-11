import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { editLocation, removeLocation } from '../../redux/locations';
import './ProfilePage.css'
import { TiDelete } from "react-icons/ti";
import { FaCalendarCheck } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
// import DeleteLocationModal from "../DeleteLocationModal/DeleteLocationModal"
// import EditLocationModal from "../EditLocationModal/EditLocationModal"
// import LocationButton from "../LocationButton/LocationButton";
import PostLocationModal from '../LocationFormModal/PostLocationModal';
import OpenModalButton from "../OpenModalButton";



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

    console.log(theLocation.visited)
    return (
        <div className="location-card" key={theLocation.id} >
            <div className="location-up">
                {/* <p className="location-title">{theLocation.title}</p> */}
                <p className="location-detail">{theLocation.city}</p>
                {theLocation.region ? <p className="location-detail">{theLocation.region}</p> : null}
                <p className="theLocation-detail">{theLocation.country}</p>
            </div>
            <div className="location-down">
                {theLocation.type ? <p className="theLocation-detail">Type: {theLocation.type}</p> : null}

                <div className="location-modify-icons">
                    {theLocation.visited != false ? (
                        <FaCalendarCheck
                            className="LU-edit-icon"
                            onClick={handleChange}
                            style={{color: "silver"}}
                            title="Click to mark the location as visited"
                        />
                    ): (
                        <FaCalendarCheck
                            className="LU-edit-icon"
                            onClick={handleChange}
                            style={{color: "green"}}
                            title="Click to mark the location as unvisited"
                        />
                    )}
                    <TiDelete className="LU-delete-icon" onClick={handleDelete}/>
                </div>
            </div>

        </div>
    )
}

export default LocationCard
