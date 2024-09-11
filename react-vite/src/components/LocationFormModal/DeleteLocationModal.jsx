// import { useDispatch } from 'react-redux';
// import { removeLocations } from '../../redux/locations';
// import { useModal } from '../../context/Modal';


// function DeleteLocationModal({reviewId}) {
//     const dispatch = useDispatch();
//     const { closeModal } = useModal();
//     // console.log(locationId);

//     const handleDelete = async (e) => {
//         e.preventDefault();
//         return dispatch(removeLocation(locationId)).then(closeModal());
//     };

//     return (
//         <div className="location-form-parent">
//             <h1 className="location-form-heading">Confirm Delete</h1>
//             <h2 id="delete-subheading">Are you sure you want to remove this location?</h2>
//             <div className="location-buttons">
//                 <button className="cancel-button" type="submit" onClick={handleDelete}>Yes (Delete Location)</button>
//                 <button className="submit-button" onClick={closeModal}>No (Keep Location)</button>
//             </div>
//         </div>
//     )
// }

// export default DeleteLocationModal;
