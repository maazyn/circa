import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {  NavLink } from "react-router-dom";
import { fetchCurrUserLocations, editLocation, removeLocation } from "../../redux/locations";
import { fetchCurrUserCollections } from "../../redux/collections";
import OpenModalButton from "../OpenModalButton";
import LocationCard from "./LocationCard";
import CollectionCard from "./CollectionCard";
import AuxiliaryNav from "../AuxiliaryNav/AuxiliaryNav";
import FooterNav from "../FooterNav/FooterNav";
import PostLocationModal from "../LocationFormModal/PostLocationModal";
import PostCollectionModal from "../CollectionForm/PostCollectionModal";

function ProfilePage({mode, setMode}) {
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const locations = useSelector((state) => state.locations);
    const collections = useSelector((state) => state.collections);
    let userLocations = Object.values(locations).filter((loc) => loc.user_id === sessionUser.id);
    let userCollections = Object.values(collections).filter((coll) => coll.user_id === sessionUser.id);


    // let [selectedLocationId, setSelectedLocationId] = useState(null);
    // let [selectedCollectionId, setSelectedCollectionId] = useState(null);

    useEffect(() => {
        if (sessionUser) {
            dispatch(fetchCurrUserLocations());
            dispatch(fetchCurrUserCollections());
        }
    }, [dispatch, sessionUser]);

    useEffect(() => {
        if (sessionUser) {
            dispatch(fetchCurrUserCollections());
        }
    }, [dispatch, userCollections.length]);
    // console.log("TEST:", userCollections[0]);

    // const handleLocationClick = (locId) => {
    //     if (locId !== selectedLocationId) {
    //         selectedLocationId(locId);
    //     } else {
    //         selectedLocationId(null)
    //     }
    // };
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
        {/* <section className="ppTop">
            <div className="profile-details-container">
                <div className="profile-username">{sessionUser.username}</div>
                <div className="edit-profile-button-container">
                    <OpenModalButton
                        buttonText="Edit Profile"
                        modalComponent={<ProfileUpdateModal user={sessionUser} />}
                    />
                </div>
            </div>
        </section> */}


        <div className="ppContainer">
            <section className="ppLeft">
                <div className="ppLeft-top">
                    <div className='leftHeaderContainer'>
                        <h3 className="leftHeader">Saved Locations</h3>
                        <OpenModalButton
                            className="post-location-button"
                            buttonText="Add New"
                            modalComponent={<PostLocationModal user={sessionUser} />}
                            />
                    </div>
                </div>

                <div className="locationCards">
                    {userLocations.map(location => (
                        // <div className="location-items" >
                            <LocationCard key={location.id} theLocation={location}/>
                        // </div>
                    ))}

                </div>
            </section>


            <section className="ppRight">
                <div className="ppRight-top">
                    <div className='rightHeaderContainer'>
                        <h3 className="rightHeader">Collections</h3>
                        <OpenModalButton
                            className="post-location-button"
                            buttonText="Add New"
                            modalComponent={<PostCollectionModal user={sessionUser} userLocations={userLocations} />}
                        />
                    </div>
                </div>

                <div className='collectionCards'>
                    {userCollections.map(collection => (
                        // <div  >
                            <CollectionCard key={collection.id} className="collection-items" theCollection={collection} />
                        // </div>
                    ))}
                </div>
            </section>


        </div>
        <FooterNav/>
        </>
    );
}

export default ProfilePage;
