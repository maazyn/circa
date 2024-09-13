import { useState } from 'react';
import { createCollection } from '../../redux/collections';
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
  const [errors, setErrors] = useState({});



  const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors({});

      const serverResponse = await dispatch(createCollection(formData));

      if (serverResponse && serverResponse.errors) {
        setErrors(serverResponse.errors);
      } else {
        closeModal();
      }
    };

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleLocationSelect = (e) => {
      const selectedLocationIds = Array.from(e.target.selectedOptions, (option) => option.value);
      setFormData({
        ...formData,
        location_ids: selectedLocationIds
      });
    }

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
            <input
              className="input-field"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          {errors.description && <p className="error-message">{errors.description}</p>}
          </label>


          <label id="input-label">
            Add Locations now?
            {/* <span className="required-asterisk" style={{color:"red"}}> *</span> */}
            <select
              className="input-field"
              name="location_ids"
              multiple={true}
              value={formData.location_ids}
              onChange={handleLocationSelect}
              // required
            >
              <option value="" disabled>Select one or more locations</option>
              {userLocations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.title}
                </option>
              ))}
            </select>
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
