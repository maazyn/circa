import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeCollection } from '../../redux/collections';
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
    const [deleteErrors, setDeleteErrors] = useState({});

    const handleCollectionClick = () => {
        navigate(`/collections/${theCollection.id}`)
    };

    const handleEdit = () => {
        navigate(`/collections/${theCollection.id}/edit`);
    };

    // const handleDelete = async (e) => {
    //     e.preventDefault();
    //     return dispatch(removeCollection(theCollection.id));
    // };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this collection?")) {
            const deleteResponse = await dispatch(removeCollection(theCollection.id));
            if (deleteResponse.errors) {
                setDeleteErrors(deleteResponse.errors);
            } else {
                navigate("/profile");
            }
        }
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
        <div className="collection-card transition-transform duration-[0.2s] hover:scale-[1.03]" key={theCollection.id} onClick={handleCollectionClick} >
            <div className="location-up">
                <p className="location-title">{theCollection.title}</p>
            </div>
            <div className="location-down overflow-hidden">
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
