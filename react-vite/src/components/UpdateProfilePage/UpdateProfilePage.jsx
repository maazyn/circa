import { useState, useEffect, useRef } from "react";
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
        lat: user.lat || "",
        lng: user.lng || "",
        profile_img: user.profile_img || ""
    });
    const [addressSuggestions, setAddressSuggestions] = useState([]);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);
    const [errors, setErrors] = useState({});
    const [deleteErrors, setDeleteErrors] = useState({});


    // const { closeModal } = useModal();
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };



    const fetchAddressSuggestions = async () => {
        const { title } = formData;
        if (title) {
            const encodedInput = encodeURIComponent(title);
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodedInput}&format=json&addressdetails=1`);
                const data = await response.json();
                setAddressSuggestions(data);
                setDropdownVisible(true);
            } catch (error) {
                console.error("Error fetching address suggestions:", error);
            }
            } else {
            setAddressSuggestions([]);
            setDropdownVisible(false);
        }
    };

    const handleAddressSelect = (address) => {
        const { lat, lon, display_name, address: locationDetails } = address;
        setFormData((prevData) => ({
            ...prevData,
            city: locationDetails.city || "",
            region: locationDetails.state || "",
            country: locationDetails.country || "",
            lat: parseFloat(lat).toFixed(4),
            lng: parseFloat(lon).toFixed(4),
        }));
        setDropdownVisible(false);
        // setManualEntry(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverResponse = await dispatch(thunkUpdateUserProfile(formData))
        if (serverResponse ) {
            setErrors(serverResponse);
        } else {
            navigate("/");
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            const errors = await dispatch(thunkDeleteUser());
            if (errors) {
                setDeleteErrors(errors);
            } else {
                // closeModal();
                navigate("/")
            }
        }
    };



    return (
        <div className="profileUpdatePage">
            <h1>Update your Profile</h1>
            {errors.server && <p>{errors.server}</p>}
            <form className="PU-form-container" onSubmit={handleSubmit}>

                <div className="PU-name font-light">
                    <label className=" font-light">
                    First Name
                    <span className="required-asterisk" style={{color:"red"}}> *</span>
                    <input
                    className="name-input-field font-medium"
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
                    className="name-input-field font-medium"
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
                    <label id="input-label" className=" font-light">
                    Email
                    <span className="required-asterisk" style={{color:"red"}}> *</span>
                    <input
                    className="credentials-input-field font-medium"
                        type="text"
                        name="email"
                        value={formData.email}
                        readOnly
                        required
                        />
                    </label>
                    {errors.email && <p>{errors.email}</p>}

                    <label id="input-label" className=" font-light">
                    Username
                    <span className="required-asterisk" style={{color:"red"}}> *</span>
                    <input
                    className="credentials-input-field font-medium"
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


                <div className="grid grid-cols-[4fr_1fr] gap-[10px] m-auto">
                    <label className="relative font-light w-full">
                        Where do you live? Type your city and click search:
                        <span className="required-asterisk" style={{color:"red"}}> *</span>
                        <input
                        className="title-input-field font-semibold"
                        type="text"
                        name="title"
                        onChange={handleChange}
                        required
                        />
                        {errors.title && <p className="error-message">{errors.title}</p>}
                        {isDropdownVisible && addressSuggestions.length > 0 && (
                        <ul
                            ref={dropdownRef}
                            className="font-light absolute w-full max-h-[130px] overflow-y-auto z-10 bg-[#f7f2ff] border  shadow-[0_4px_6px_rgba(0,0,0,0.1)] list-none m-auto border-solid border-[#ccc]"
                        >
                            {addressSuggestions.map((suggestion, index) => (
                            <li
                                className="pb-[1px]"
                                key={index}
                                onClick={() => handleAddressSelect(suggestion)}
                            >
                                {suggestion.display_name}
                            </li>
                            ))}
                        </ul>
                        )}
                    </label>
                    <div className="button-box flex flex-row gap-[2px] justify-center items-center mt-[12px]">
                        <button type="button" onClick={fetchAddressSuggestions} className="search-button w-full align-center h-auto rounded-full text-sm font-normal border box-border border-solid border-[rgba(169,169,169)] bg-white text-black hover:bg-[#5aab57ef] hover:text-white">Search</button>
                        <button onClick={() => handleClear()} className="cancel-button w-full m-0 align-center h-auto rounded-full text-sm box-border font-normal text-black hover:bg-[#007bffef] hover:text-white hover:shadow-none">Clear</button>
                    </div>
                </div>


                <div className="PU-location" >
                    <label id="input-label" className=" font-light">
                    City
                    {/* <span className="required-asterisk" style={{color:"red"}}> *</span> */}
                    <input
                    className="city-input-field font-medium"
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        readOnly
                        />
                    </label>
                    {errors.city && <p>{errors.city}</p>}

                    <label id="input-label" className=" font-light">
                    Region
                    <input
                    className="region-input-field font-medium"
                        type="text"
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        readOnly
                        />
                    </label>
                    {errors.region && <p>{errors.region}</p>}

                    <label id="input-label" className=" font-light">
                    Country
                    {/* <span className="required-asterisk" style={{color:"red"}}> *</span> */}
                    <input
                    className="country-input-field font-medium"
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        readOnly
                        />
                    </label>
                    {errors.country && <p>{errors.country}</p>}

                    <label id="input-label" className=" font-light">
                    Latitude
                    {/* <span className="required-asterisk" style={{color:"red"}}> *</span> */}
                    <input
                    className="country-input-field font-medium"
                        type="float"
                        name="lat"
                        value={formData.lat}
                        onChange={handleChange}
                        required
                        readOnly
                        />
                    </label>
                    {errors.lat && <p>{errors.lat}</p>}

                    <label id="input-label" className=" font-light">
                    Longitude
                    {/* <span className="required-asterisk" style={{color:"red"}}> *</span> */}
                    <input
                    className="country-input-field font-medium"
                        type="float"
                        name="lng"
                        value={formData.lng}
                        onChange={handleChange}
                        required
                        readOnly
                        />
                    </label>
                    {errors.lng && <p>{errors.lng}</p>}
                </div>

                <label className=" font-light">
                Profile Image URL
                <input
                className="input-field font-medium"
                    type="text"
                    name="profile_img"
                    value={formData.profile_img}
                    onChange={handleChange}
                    />
                </label>
                {errors.profile_img && <p>{errors.profile_img}</p>}

                <div className="profile-update-buttons">
                    <button className="submit-button" type="submit">Save</button>
                    <button onClick={() => navigate("/profile")} className="cancel-button">Cancel</button>
                </div>
                <div className="delete-button-container mb-5">
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
