import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {  NavLink } from "react-router-dom";
import { fetchCurrUserLocations, editLocation, removeLocation } from "../../redux/locations";
import OpenModalButton from "../OpenModalButton";
import ProfileUpdateModal from "../UpdateProfilePage";
import LocationCard from "./LocationCard";
// import CollectionCard from "./CollectionCard";
import AuxiliaryNav from "../AuxiliaryNav/AuxiliaryNav";
import FooterNav from "../FooterNav/FooterNav";

function ProfilePage({mode, setMode}) {
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const locations = useSelector((state) => state.locations);
    let userLocations = Object.values(locations).filter((loc) => loc.user_id === sessionUser.id);


    let [selectedLocationId, setSelectedLocationId] = useState(null);
    // let [selectedCollectionId, setSelectedCollectionId] = useState(null);

    useEffect(() => {
        if (sessionUser) {
            dispatch(fetchCurrUserLocations());
            // dispatch(fetchCurrUserCollections());
        }
    }, [dispatch, sessionUser]);

    console.log("TEST:", userLocations[0]);

    const handleLocationClick = (locId) => {
        if (locId !== selectedLocationId) {
            selectedLocationId(locId);
        } else {
            selectedLocationId(null)
        }
    };
    // const handleCollectionClick = (collId) => {
    //     if (collId !== selectedCollectionId) {
    //         selectedCollectionId(locId);
    //     } else {
    //         selectedCollectionId(null)
    //     }
    // };


    return (
        <>
        <div className="axNav">
            <AuxiliaryNav mode={mode} setMode={setMode} />
        </div>
            <section className="ppTop">
                <div className="profile-details-container">
                    <div className="profile-username">{sessionUser.username}</div>
                    <div className="edit-profile-button-container">
                            <OpenModalButton
                                buttonText="Edit Profile"
                                modalComponent={<ProfileUpdateModal user={sessionUser} />}
                            />
                    </div>
                </div>
            </section>

        <div className="ppContainer">
            <section className="ppLeft">
                <div className='leftHeaderContainer'>
                    <h3 className="leftHeader">Saved Locations</h3>
                </div>
                <div className="locationCards">
                    {userLocations.map(location => (
                        <div className="location-items" key={location.id}>
                            <LocationCard theLocation={location}/>
                        </div>
                    ))}

                </div>
            </section>




            <section className="ppRight">
                <div className='rightHeaderContainer'>
                    <h3 className="rightHeader">Collections</h3>
                </div>

                {/* <div className='collectionCards'>
                    {Object.values(collection).map(collection => (
                        <div className="collection-item" key={collection.id}>
                            <CollectionCard collectionData={collectionId}/>
                        </div>
                    ))}
                </div> */}

            </section>


        </div>
        <FooterNav/>
        </>
    );
}

export default ProfilePage;
