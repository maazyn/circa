import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
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

        <label>
          First Name
          <input
          className="input-field"
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </label>
        {errors.first_name && <p>{errors.first_name}</p>}

        <label>
          Last Name
          <input
          className="input-field"
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </label>
        {errors.last_name && <p>{errors.last_name}</p>}


        <label>
          Email
          <input
          className="input-field"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}

        <label>
          Username
          <input
          className="input-field"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}

        <label>
          City
          <input
          className="input-field"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </label>
        {errors.city && <p>{errors.city}</p>}

        <label>
          Region
          <input
          className="input-field"
            type="text"
            name="region"
            value={formData.region}
            onChange={handleChange}
          />
        </label>
        {errors.region && <p>{errors.region}</p>}

        <label>
          Country
          <input
          className="input-field"
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </label>
        {errors.country && <p>{errors.country}</p>}

        <label>
          Profile Image Url
          <input
          className="input-field"
            type="text"
            name="profile_img"
            value={formData.profile_img}
            onChange={handleChange}
          />
        </label>
        {errors.profile_img && <p>{errors.profile_img}</p>}

        <label>
          Password
          <input
          className="input-field"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}

        <label>
          Confirm Password
          <input
          className="input-field"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

        <button className="form-button" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
