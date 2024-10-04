import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrUserLocations} from "../../redux/locations";
import { fetchCurrUserCollections } from "../../redux/collections";
import OpenModalButton from "../OpenModalButton";
import LocationCard from "./LocationCard";
import CollectionCard from "./CollectionCard";
import AuxiliaryNav from "../AuxiliaryNav/AuxiliaryNav";
import FooterNav from "../FooterNav/FooterNav";
import PostLocationModal from "../LocationFormModal/PostLocationModal";
import PostCollectionModal from "../CollectionForm/PostCollectionModal";
import { useNavigate } from "react-router-dom";

function ProfilePage({mode, setMode}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
    }, [dispatch, sessionUser, userCollections.length]);

    // useEffect(() => {
    //     if (sessionUser) {
    //         dispatch(fetchCurrUserCollections());
    //     }
    // }, [dispatch, userCollections.length]);

    // console.log("TEST:", userCollections[0]);

    // const handleLocationClick = (locId) => {
    //     if (locId !== selectedLocationId) {
    //         selectedLocationId(locId);
    //     } else {
    //         selectedLocationId(null)
    //     }
    // };



    return (
        <>
        <div className="axNav">
            <AuxiliaryNav mode={mode} setMode={setMode} />
        </div>


        <div className="ppContainer h-[85vh] ">
            <section className="ppLeft">
                <div className="ppLeft-top">
                    <div className='leftHeaderContainer'>
                        <h3 className="leftHeader w-full text-[17px] mt-2">All Locations</h3>
                        <OpenModalButton
                            className="post-location-button"
                            buttonText="Add"
                            modalComponent={<PostLocationModal user={sessionUser} />}
                        />
                    </div>
                </div>

                <div className="locationCards">
                    {userLocations.map(location => (
                        <LocationCard key={location.id} theLocation={location}/>
                    ))}

                </div>
            </section>


            <section className="ppRight">
                <div className="ppRight-top">
                    <div className='rightHeaderContainer'>
                        <h3 className="rightHeader w-full text-[17px] mt-2">Collections</h3>
                        <OpenModalButton
                            className="post-location-button"
                            buttonText="Add"
                            modalComponent={<PostCollectionModal user={sessionUser} userLocations={userLocations} />}
                        />
                    </div>
                </div>

                <div className='collectionCards cursor-pointer '>
                    {userCollections.map(collection => (
                        <CollectionCard key={collection.id} className="collection-items " theCollection={collection}/>
                    ))}
                </div>
            </section>


        </div>
        <FooterNav/>
        </>
    );
}

export default ProfilePage;
