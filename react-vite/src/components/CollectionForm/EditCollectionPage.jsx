import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCollection, removeCollection } from "../../redux/collections";
import { editLocol } from "../../redux/locols";
import { useNavigate, useParams } from "react-router-dom";

import "./CollectionForm.css";

function EditCollectionPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  let { collectionId } = useParams();
  collectionId = Number(collectionId);

  const user = useSelector((store) => store.session.user);
  const locations = useSelector((state) => state.locations);
  const collection = useSelector((state) => state.collections[collectionId]);

  const userLocations = Object.values(locations).filter((loc) => loc.user_id === user.id);

  const [formData, setFormData] = useState({
      title: collection?.title || "",
      description: collection?.description || "",
      location_ids: collection?.locations?.map(location => location.id.toString()) || [],
    });
    //location selection ids not being a consistent data type is HUGE HEADACHE,
    //MAKE SURE THE LOC IDs ARE ALL STRINGS

    // console.log(typeof collectionId)

    const [savedLocations, setSavedLocations] = useState(formData?.location_ids);
    // const [newSavedLocations, setNewSavedLocations] = useState([]);
    const [deleteErrors, setDeleteErrors] = useState({});
    const [errors, setErrors] = useState({});
    // console.log("SAVED:", formData.location_ids)

    useEffect(() => {
      if (collection) {
        const currentLocations = collection.locations.map(location => location.id.toString());
        setFormData({
          title: collection.title || "",
          description: collection.description || "",
          location_ids: currentLocations,
        });
        setSavedLocations(currentLocations);
      }
    }, [collection]);
    console.log("PRE:", savedLocations)

    // setSavedLocations(formData.locations_ids)

    // useEffect(() => {
      //   const prevLocationIds = formData.location_ids.map(id => id.toString());
      // //const formLocations = setCurrLocations(formData.location_ids.map(id => id.toString()));
      //   const currentLocationIds = userLocations.map(loc => loc.id.toString());

      //   setLocationsToAdd(currentLocationIds.filter(id => !prevLocationIds.includes(id)));
      //   setLocationsToRemove(prevLocationIds.filter(id => !currentLocationIds.includes(id)));
      // }, [formData.location_ids]);


  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSavedLocations((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
    console.log("CHECKBOX:", savedLocations)

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    const updatedCollection = {
      title: formData.title,
      description: formData.description,
      id: collectionId,
    };

    const collectionResponse = await dispatch(editCollection(updatedCollection));
    // console.log("CHECK:", collectionResponse)
    if (collectionResponse.errors) {
      setErrors(collectionResponse.errors);
      return;
      // console.log("CHECK2:", collectionResponse.errors)

    }
    // console.log("PRE-REMOVE", locationsToRemove)
    // console.log("Dispatch payload:", {
    //   collection_id: collectionId,
    //   locations: savedLocations,
    // });
    const locolResponse = await dispatch(editLocol({
      collection_id: collectionId,
      locations: savedLocations
    }));

    console.log("POST:", locolResponse)
    // console.log("POST-REMOVE", locationsToRemove)
    // console.log(locolResponse)

    if (locolResponse && locolResponse.errors) {
      setErrors(locolResponse.errors);
      return;
    }
    navigate("/profile")
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this collection?")) {
      const deleteResponse = await dispatch(removeCollection(collectionId));
      if (deleteResponse.errors) {
        setDeleteErrors(deleteResponse.errors);
      } else {
        navigate("/profile");
      }
    }
  };



  return (
    <div className="profileUpdatePage">
        <h1>Edit this Collection</h1>
        {errors.server && <p>{errors.server}</p>}
        <form className="PU-form-container" onSubmit={handleSubmit}>

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
            Add or Remove Locations:
            {userLocations.map((location) => (
              <div key={location.id} className="checkboxContainer">
                <input
                  className="input-field"
                  type="checkbox"
                  // name="location_ids"
                  value={location.id.toString()}
                  checked={savedLocations.includes(location.id.toString())}
                  onChange={handleCheckboxChange}
                />
                <label>{location.title}</label>
              </div>
            ))}
          {errors.location_ids && <p className="error-message">{errors.location_ids}</p>}
        </label>

          <div className="profile-update-buttons">
              <button className="submit-button" type="submit">Save Changes</button>
              <button onClick={() => navigate("/profile")} className="cancel-button">Cancel</button>
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

export default EditCollectionPage;
