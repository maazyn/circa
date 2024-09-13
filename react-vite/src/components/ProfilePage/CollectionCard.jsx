import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { editCollection, removeCollection } from '../../redux/collections';
import { useNavigate } from "react-router-dom";
import './ProfilePage.css'
import { TiDelete } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";

// import EditCollectionPage from "../CollectionForm/EditCollectionPage";
// import OpenModalButton from "../OpenModalButton";



function CollectionCard({theCollection}) {
    if (!theCollection) return (<p>Loading...</p>)
    // const user = useSelector((store) => store.session.user);
    const dispatch = useDispatch();
    const navigate = useNavigate()


    const handleEdit = () => {
        navigate(`/collections/${theCollection.id}/edit`);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        return dispatch(removeCollection(theCollection.id));
    };

    // const handleChange = async (e) => {
    //     e.preventDefault();

    //     let updatedCollection = {
    //         ...theCollection,
    //         visited: !theCollection.visited
    //     }
    //     return dispatch(editCollection(updatedCollection));
    // }

    // console.log(theCollection)
    return (
        <div className="location-card" key={theCollection.id} >
            <div className="location-up">
                <p className="location-title">{theCollection.title}</p>
            </div>
            <div className="location-down">
                {theCollection.description ? <p className="theLocation-detail">{theCollection.description}</p> : null}

                <div className="collection-modify-icons">
                    <FaEdit
                        className="LU-edit-icon"
                        onClick={handleEdit}
                        style={{color: "green"}}
                        title="Edit Collection"
                    />
                    <TiDelete className="LU-delete-icon" onClick={handleDelete}/>
                </div>
            </div>

        </div>
    )
}

export default CollectionCard
