import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkUpdateUserProfile, thunkDeleteUser } from "../../redux/session";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import "./UpdateProfilePage.css";

function UpdateProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.session.user);
  const [formData, setFormData] = useState({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email,
        username: user.username,
        city: user.city || "",
        region: user.region || "",
        country: user.country || "",
        profile_img: user.profile_img || ""
    });
    const [errors, setErrors] = useState({});
    const [deleteErrors, setDeleteErrors] = useState({});


    const { closeModal } = useModal();
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverResponse = await dispatch(thunkUpdateUserProfile(formData))
        if (serverResponse ) {
            setErrors(serverResponse);
        } else {
            closeModal();
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
          const errors = await dispatch(thunkDeleteUser());
          if (errors) {
            setDeleteErrors(errors);
          } else {
            closeModal();
            navigate("/")
          }
        }
      };



  return (
    <div className="profileUpdatePage">
        <h1>Update your Profile</h1>
        {errors.server && <p>{errors.server}</p>}
        <form className="PU-form-container" onSubmit={handleSubmit}>

            <div className="PU-name">
                <label>
                First Name
                <input
                className="name-input-field"
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
                className="name-input-field"
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    />
                </label>
                {errors.last_name && <p>{errors.last_name}</p>}
            </div>

            <div className="PU-readOnly">
                <label id="input-label">
                Email
                <input
                className="credentials-input-field"
                    type="text"
                    name="email"
                    value={formData.email}
                    readOnly
                    required
                    />
                </label>
                {errors.email && <p>{errors.email}</p>}

                <label id="input-label">
                Username
                <input
                className="credentials-input-field"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    readOnly
                    required
                    />
                </label>
                {errors.username && <p>{errors.username}</p>}
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
                    required
                    />
                </label>
                {errors.city && <p>{errors.city}</p>}

                <label id="input-label">
                Region
                <input
                className="region-input-field"
                    type="text"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    />
                </label>
                {errors.region && <p>{errors.region}</p>}

                <label id="input-label">
                Country
                <input
                className="country-input-field"
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    />
                </label>
                {errors.country && <p>{errors.country}</p>}
            </div>

            <label>
            Profile Image URL
            <input
            className="input-field"
                type="text"
                name="profile_img"
                value={formData.profile_img}
                onChange={handleChange}
                />
            </label>
            {errors.profile_img && <p>{errors.profile_img}</p>}

            <div className="profile-update-buttons">
                <button className="submit-button" type="submit">Save Changes</button>
                <button onClick={() => closeModal()} className="cancel-button">Cancel</button>
            </div>
            <div className="delete-button-container">
                {user.id !== 1? (
                    <button onClick={handleDelete} className="profile-delete-button">Delete User</button>
                ): null}
            </div>
            {deleteErrors.server && (<p className="error-message">{deleteErrors.server}</p>)}
        </form>
    </div>
  );
}

export default UpdateProfilePage;
