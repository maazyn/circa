import { useState } from 'react';
import { createLocation } from '../../redux/locations';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import "./LocationForm.css"


function PostLocationModal({ user }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

    const [formData, setFormData] = useState({
      user_id: user.id,
      title: "",
      // googleId: "",
      type: "",
      city: "",
      region: "",
      country: "",
      lat: "",
      lng: "",
      // continent: "",
      visited: "",
  });
  const [errors, setErrors] = useState({});



  const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors({});

      const serverResponse = await dispatch(createLocation(formData));

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


    return (
      <div className="location-form-parent">
        <h1 className="location-form-heading">Add a location</h1>
        {errors.server && <p className="error-message">{errors.server}</p>}
        <form className="LP-form-container" onSubmit={handleSubmit}>
        <div className="PU-name">
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
            Type
            <span className="required-asterisk" style={{color:"red"}}> *</span>
            <select
              className="type-input-field"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a location type</option>
              <option value="city">City</option>
              <option value="country">Country</option>
              <option value="culture">Culture</option>
              <option value="nature">Nature</option>
              {/* <option value="monument">Monument</option> */}
              {/* <option value="restaurant">Restaurant</option> */}
              {/* <option value="beach">Beach</option> */}
            </select>
          {errors.type && <p className="error-message">{errors.type}</p>}
          </label>
        </div>

        <div className="PU-location">
          <label id="input-label">
            City
            <input
              className="city-input-field"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          {errors.city && <p className="error-message">{errors.city}</p>}
          </label>

          <label id="input-label">
            Region
            <input
              className="region-input-field"
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
            />
          {errors.region && <p className="error-message">{errors.region}</p>}
          </label>

          <label id="input-label">
            Country
            <span className="required-asterisk" style={{color:"red"}}> *</span>
            <input
              className="country-input-field"
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          {errors.country && <p className="error-message">{errors.country}</p>}
          </label>
        </div>

        <div className="PU-location-geo">
          <label id="input-label">
            Latitude
            <input
              className="lat-input-field"
              type="float"
              name="lat"
              value={formData.lat}
              onChange={handleChange}
            />
          {errors.lat && <p className="error-message">{errors.lat}</p>}
          </label>

            <label id="lng-input-label">
              Longitude
              <input
                className="input-field"
                type="float"
                name="lng"
                value={formData.lng}
                onChange={handleChange}
              />
            {errors.lng && <p className="error-message">{errors.lng}</p>}
            </label>
        </div>


        <label id="checkbox-input-label">
          Have you been to this place?
          <input
            className="checkbox-input-field"
            type="checkbox"
            name="visited"
            checked={formData.visited}
            onChange={(e) =>
              setFormData({ ...formData, visited: e.target.checked })
            }
          />
        </label>

        <div className="location-post-buttons">
          <button className="submit-button" type="submit" disabled={formData.length < 2}>Submit</button>
          <button onClick={() => closeModal()} className="cancel-button">Cancel</button>
        </div>

      </form>
    </div>
  )
}

export default PostLocationModal;
