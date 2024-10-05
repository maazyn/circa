import { useState } from "react";
import { useDispatch } from "react-redux";
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
    profile_img: '',
    password: '',
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
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

        <label className=" font-light">
          City
          <input
          className="input-field font-medium"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
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
          <input
          className="input-field font-medium"
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </label>
        {errors.country && <p>{errors.country}</p>}

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
