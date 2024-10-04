import { useState, useEffect, useRef } from 'react';
import { createLocation } from '../../redux/locations';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LocationForm.css';

function PostLocationModal({ user }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const dropdownRef = useRef(null);

  const [formData, setFormData] = useState({
    user_id: user.id,
    title: "",
    type: "",
    city: "",
    region: "",
    country: "",
    lat: "",
    lng: "",
    visited: "",
  });

  const [errors, setErrors] = useState({});
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [manualEntry, setManualEntry] = useState(false); // To track manual entry in case user wants to use a custom title

  // Fetch address suggestion list using Nominatim API. Selecting from list is not necessary but benefit is it will pre-fill all fields
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


  const fetchCoordinatesFromAddress = async () => {
    const { city, region, country } = formData;
    if (city && country) {
      const query = encodeURIComponent(`${city}, ${region}, ${country}`);
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`);
        const data = await response.json();
        if (data.length > 0) {
          const { lat, lon } = data[0];
          setFormData((prevData) => ({
            ...prevData,
            lat: parseFloat(lat).toFixed(4),
            lng: parseFloat(lon).toFixed(4),
          }));
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    }
  };

  const handleClear = () => {
    setFormData({
      user_id: user.id,
      title: "",
      type: "",
      city: "",
      region: "",
      country: "",
      lat: "",
      lng: "",
      visited: "",
    });
    setErrors({});
  };

  const handleAddressSelect = (address) => {
    const { lat, lon, display_name, address: locationDetails } = address;
    setFormData((prevData) => ({
      ...prevData,
      title: display_name,
      city: locationDetails.city || "",
      region: locationDetails.state || "",
      country: locationDetails.country || "",
      lat: parseFloat(lat).toFixed(4),
      lng: parseFloat(lon).toFixed(4),
    }));
    setDropdownVisible(false);
    setManualEntry(false);
  };

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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'title') {
      setManualEntry(true);
    //   fetchAddressSuggestions(value);
    // } else if (name === 'city' || name === 'country') {
    //   setManualEntry(true);
    }
  };


  useEffect(() => {
    if (manualEntry) {
      fetchCoordinatesFromAddress();
    }
  }, [formData.city, formData.country]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    if (isDropdownVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownVisible]);


  return (
    <div className=" sm:w-[80vw] md:w-[60vw] max-w-[850px] min-h-[200px] bg-[#f9f9f9] shadow-[0_0_10px_rgba(0,0,0,0.1)] justify-center items-center m-auto pt-[30px] pb-10 px-[60px] rounded-[10px]">
      <h1 className="location-form-heading">Add a location</h1>
      {errors.server && <p className="error-message">{errors.server}</p>}
      <form className="LP-form-container " onSubmit={handleSubmit}>
        <div className="grid grid-cols-[4fr_1fr] gap-[10px] m-auto">
          <label className="relative font-light">
            Search an address or create a custom title:
            <span className="required-asterisk" style={{color:"red"}}> *</span>
            <input
              className="title-input-field font-semibold"
              type="text"
              name="title"
              value={formData.title}
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

        <div className="PU-location">
          <label id="input-label" className="font-light">
            City
            <input
              className="city-input-field font-semibold"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            {errors.city && <p className="error-message">{errors.city}</p>}
          </label>

          <label id="input-label" className="font-light">
            Region
            <input
              className="region-input-field font-semibold"
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
            />
            {errors.region && <p className="error-message">{errors.region}</p>}
          </label>

          <label id="input-label" className="font-light">
            Country
            <span className="required-asterisk" style={{color:"red"}}> *</span>
            <input
              className="country-input-field font-semibold"
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
            {errors.country && <p className="error-message">{errors.country}</p>}
          </label>
        </div>

        <div className="grid grid-cols-[1fr_1fr_3fr] gap-[10px] w-full flex-row justify-between">
          <label id="input-label" className="font-light">
            Latitude
            <input
              className="lat-input-field font-semibold"
              type="float"
              name="lat"
              value={formData.lat}
              readOnly
            />
            {errors.lat && <p className="error-message">{errors.lat}</p>}
          </label>

          <label id="lng-input-label" className="font-light">
            Longitude
            <input
              className="input-field font-semibold"
              type="float"
              name="lng"
              value={formData.lng}
              readOnly
            />
            {errors.lng && <p className="error-message">{errors.lng}</p>}
          </label>

          <label id="input-label" className="font-light">
            Type
            <span className="required-asterisk" style={{color:"red"}}> *</span>
            <select
              className="type-input-field font-medium text-[#475cc8]"
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
            </select>
            {errors.type && <p className="error-message">{errors.type}</p>}
          </label>
        </div>

        <label className="inline-flex items-center cursor-pointer relative font-light mt-[10px]">
          <input
            type="checkbox"
            name="visited"
            value={formData.visited}
            onChange={(e) => setFormData({
              ...formData,
              visited: e.target.checked
            })}
          />
          <span className="label ml-2 ">Did you visit this location?</span>
        </label>

        <div className="location-post-buttons">
          <button className="submit-button" type="submit" disabled={formData.length < 2}>Submit</button>
          <button onClick={() => closeModal()} className="cancel-button">Cancel</button>
        </div>

      </form>
    </div>
  );
}

export default PostLocationModal;
