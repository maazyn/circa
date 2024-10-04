import { useState } from 'react';
import { createCollection } from '../../redux/collections';
import {editLocol } from '../../redux/locols'
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import "./CollectionForm.css"


function PostCollectionModal({ user, userLocations }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [formData, setFormData] = useState({
    user_id: user.id,
    title: "",
    description: "",
    location_ids: [],
  });

  // const [savedLocations, setSavedLocations] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      location_ids: checked
        ? [...prevState.location_ids, value]
        : prevState.location_ids.filter(id => id !== value)
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const serverResponse = await dispatch(createCollection(formData));
    if (serverResponse && serverResponse.errors) {
      setErrors(serverResponse.errors);
      return;
    }
    const collectionId = serverResponse.id;

    const locolResponse = await dispatch(editLocol({
      collection_id: collectionId,
      locations: formData.location_ids
    }));
    if (locolResponse && locolResponse.errors) {
      setErrors(locolResponse.errors);
      return;
    }
    closeModal()

  };


  // const handleLocationSelect = (e) => {
  //   const selectedLocationIds = Array.from(e.target.selectedOptions, (option) => option.value);
  //   setFormData({
  //     ...formData,
  //     location_ids: selectedLocationIds
  //   });
  // }

  return (
    <div className="location-form-parent">
      <h1 className="location-form-heading">Add a collection</h1>
      {errors.server && <p className="error-message">{errors.server}</p>}
      <form className="LP-form-container" onSubmit={handleSubmit}>
        <label>
          Title
          <span className="required-asterisk" style={{color:"red"}}> *</span>
          <input
            className="title-input-field"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            />
          {errors.title && <p className="error-message">{errors.title}</p>}
        </label>


        <label id="input-label">
          Description
          <span className="required-asterisk" style={{color:"red"}}> *</span>
          <input
            className="input-field"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        {errors.description && <p className="error-message">{errors.description}</p>}
        </label>

        <p style={{color: "blue", fontWeight:"bold", marginBottom:"0px"}}>Add from your Saved Locations:</p>
        <label id="pcoll-input-label">
          {userLocations.map((location) => (
            <div key={location.id} className="checkboxContainer">
              <input
                className="coll-input-field"
                type="checkbox"
                // name="location_ids"
                value={location.id.toString()}
                checked={formData.location_ids.includes(location.id.toString())}
                onChange={handleCheckboxChange}
              />
              <label className="coll-item">{location.title}</label>
            </div>
          ))}
          {errors.location_ids && <p className="error-message">{errors.location_ids}</p>}
        </label>


        <div className="location-post-buttons">
          <button className="submit-button" type="submit" disabled={formData.length < 2}>Submit</button>
          <button onClick={() => closeModal()} className="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default PostCollectionModal;
