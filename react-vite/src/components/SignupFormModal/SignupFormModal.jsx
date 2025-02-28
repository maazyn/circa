import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import { useNavigate } from "react-router-dom";

import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    city: '',
    region: '',
    country: '',
    lat: '',
    lng: '',
    profile_img: '',
    password: '',
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [fetchError, setFetchError] = useState("");
  const [coordinatesFetched, setCoordinatesFetched] = useState(false);
  const { closeModal } = useModal();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const fetchCoordinates = async () => {
    setFetchError("");
    const { city } = formData;
    if (!city.trim()) {
      setFetchError("Please enter a city before fetching coordinates.");
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&format=json&limit=1`);
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        setFormData((prevData) => ({
          ...prevData,
          lat: parseFloat(lat).toFixed(4),
          lng: parseFloat(lon).toFixed(4),
        }));
        setCoordinatesFetched(true);
      } else {
        setFormData((prevData) => ({ ...prevData, lat: "", lng: "" }));
        setFetchError("Coordinates not found for the provided city.");
        setCoordinatesFetched(false);
      }
    } catch (error) {
      console.error("Failed to fetch coordinates:", error);
      setFetchError("Failed to fetch coordinates. Please try again.");
      setCoordinatesFetched(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }
    if (!coordinatesFetched) {
      setErrors({coordinates:"Please fetch coordinates before submitting."});
      return;
    }

    const serverResponse = await dispatch(thunkSignup(formData));

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="modal-content">
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form className="form-container" onSubmit={handleSubmit}>

        <label className=" font-light">
          First Name
          <span className="required-asterisk" style={{color:"red"}}> *</span>
          <input
          className="input-field font-medium"
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </label>
        {errors.first_name && <p>{errors.first_name}</p>}

        <label className=" font-light">
          Last Name
          <span className="required-asterisk" style={{color:"red"}}> *</span>
          <input
          className="input-field font-medium"
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </label>
        {errors.last_name && <p>{errors.last_name}</p>}


        <label className=" font-light">
          Email
          <span className="required-asterisk" style={{color:"red"}}> *</span>
          <input
          className="input-field font-medium"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}

        <label className=" font-light">
          Username
          <span className="required-asterisk" style={{color:"red"}}> *</span>
          <input
          className="input-field font-medium"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}

        <div className="PU-location">
          <label className=" font-light">
            City
            <span className="required-asterisk" style={{color:"red"}}> *</span>
            <input
            className="input-field font-medium"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </label>
          {errors.city && <p>{errors.city}</p>}

          <label className=" font-light">
            Region
            <input
            className="input-field font-medium"
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
            />
          </label>
          {errors.region && <p>{errors.region}</p>}

          <label className=" font-light">
            Country
            <span className="required-asterisk" style={{color:"red"}}> *</span>
            <input
            className="input-field font-medium"
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </label>
          {errors.country && <p>{errors.country}</p>}
        </div>


        <div className="PU-location">
          <div className="flex items-center gap-2 w-[100px] text-center">
            <button type="button" className="form-button p-[5px] font-light text-sm h-[35px] " onClick={fetchCoordinates}>Get</button>
          </div>
          <label id="input-label" className=" font-light">
            Latitude
            <span className="required-asterisk" style={{color:"red"}}> *</span>
            <input
            className="country-input-field font-medium"
              type="float"
              name="lat"
              value={formData.lat}
              // onChange={handleChange}
              required
              readOnly
              />
            </label>
            {errors.lat && <p>{errors.lat}</p>}

            <label id="input-label" className=" font-light">
            Longitude
            <span className="required-asterisk" style={{color:"red"}}> *</span>
            <input
            className="country-input-field font-medium"
              type="float"
              name="lng"
              value={formData.lng}
              // onChange={handleChange}
              required
              readOnly
              />
          </label>
          {errors.lng && <p>{errors.lng}</p>}
        </div>
        <label className=" font-light">
          Profile Image Url
          <input
          className="input-field font-medium"
            type="text"
            name="profile_img"
            value={formData.profile_img}
            onChange={handleChange}
          />
        </label>
        {errors.profile_img && <p>{errors.profile_img}</p>}

        <label className=" font-light">
          Password
          <span className="required-asterisk" style={{color:"red"}}> *</span>
          <input
          className="input-field font-medium"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}

        <label className=" font-light">
          Confirm Password
          <span className="required-asterisk" style={{color:"red"}}> *</span>
          <input
          className="input-field font-medium"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

        <button className="form-button" type="submit">Sign Up</button>
        <button onClick={() => closeModal()} className="form-button">Cancel</button>

      </form>
    </div>
  );
}

export default SignupFormModal;
