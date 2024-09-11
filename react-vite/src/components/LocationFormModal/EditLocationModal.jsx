// import { useState } from 'react';
// import { editLocation } from '../../redux/locations';
// import { useDispatch } from 'react-redux';
// import { useModal } from '../../context/Modal';
// import { useNavigate } from "react-router-dom";

// // import { useParams } from "react-router-dom"
// import "./LocationForm.css"


// function EditLocationModal({ theLocation }) {
//     const dispatch = useDispatch();
//     const user = useSelector((store) => store.session.user);

//     const { closeModal } = useModal();

//     const [formData, setFormData] = useState({
//       // user_id: user.first_name || "",
//       title: user.title || "",
//       // googleId: StringField('Latitude', validators=[DataRequired())
//       lat: user.lat || "",
//       lng: user.lng || "",
//       type: user.type || "",
//       city: user.city || "",
//       region: user.region || "",
//       country: user.country || "",
//       // continent: user.continent || "",
//       visited: user.visited || "",
//   });
//     const [errors, setErrors] = useState({});


//     const navigate = useNavigate()

//     const handleChange = (e) => {
//         setFormData({
//         ...formData,
//         [e.target.name]: e.target.value,
//         });
//     };


//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       const serverResponse = await dispatch(editLocation(formData))
//       if (serverResponse ) {
//           setErrors(serverResponse);
//       } else {
//           closeModal();
//       }
//   };


//     return (
//       <div className='location-form-parent'>
//         <h1 className="location-form-heading">Edit your saved location</h1>
//         {errors.server && <p>{errors.server}</p>}
//         <form className="LU-form-container" onSubmit={handleSubmit}>

//             <div className="LU-name">
//                 <label>
//                 Title
//                 <input
//                 className="name-input-field"
//                     type="text"
//                     name="first_name"
//                     value={formData.first_name}
//                     onChange={handleChange}
//                     required
//                     />
//                 </label>
//                 {errors.first_name && <p>{errors.first_name}</p>}

//                 <label>
//                 Latitude
//                 <input
//                 className="name-input-field"
//                     type="text"
//                     name="last_name"
//                     value={formData.last_name}
//                     onChange={handleChange}
//                     required
//                     />
//                 </label>
//                 {errors.last_name && <p>{errors.last_name}</p>}
//             </div>

//             <div className="PU-readOnly">
//                 <label id="input-label">
//                 Longitude
//                 <input
//                 className="credentials-input-field"
//                     type="text"
//                     name="email"
//                     value={formData.email}
//                     readOnly
//                     required
//                     />
//                 </label>
//                 {errors.email && <p>{errors.email}</p>}

//                 <label id="input-label">
//                 Type
//                 <input
//                 className="credentials-input-field"
//                     type="text"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     readOnly
//                     required
//                     />
//                 </label>
//                 {errors.username && <p>{errors.username}</p>}
//             </div>

//             <div className="PU-location">
//                 <label id="input-label">
//                 City
//                 <input
//                 className="city-input-field"
//                     type="text"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                     required
//                     />
//                 </label>
//                 {errors.city && <p>{errors.city}</p>}

//                 <label id="input-label">
//                 Region
//                 <input
//                 className="region-input-field"
//                     type="text"
//                     name="region"
//                     value={formData.region}
//                     onChange={handleChange}
//                     />
//                 </label>
//                 {errors.region && <p>{errors.region}</p>}

//                 <label id="input-label">
//                 Country
//                 <input
//                 className="country-input-field"
//                     type="text"
//                     name="country"
//                     value={formData.country}
//                     onChange={handleChange}
//                     />
//                 </label>
//                 {errors.country && <p>{errors.country}</p>}
//             </div>

//             <label>
//             Visited
//             <input
//             className="input-field"
//                 type="text"
//                 name="profile_img"
//                 value={formData.profile_img}
//                 onChange={handleChange}
//                 />
//             </label>
//             {errors.profile_img && <p>{errors.profile_img}</p>}

//             <div className="location-update-buttons">
//                 <button className="submit-button" type="submit">Save Changes</button>
//                 <button onClick={() => closeModal()} className="cancel-button">Cancel</button>
//             </div>
//             <div className="delete-button-container">
//                 {user.id !== 1? (
//                     <button onClick={handleDelete} className="location-delete-button">Delete Location</button>
//                 ): null}
//             </div>
//             {deleteErrors.server && (<p className="error-message">{deleteErrors.server}</p>)}
//           </form>
//       </div>
//     )
// }

// export default EditLocationModal;
