import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCollection, removeCollection } from "../../redux/collections";
import { useNavigate, useParams } from "react-router-dom";

import "./CollectionForm.css";

function EditCollectionPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { collectionId } = useParams();

  const user = useSelector((store) => store.session.user);
  const locations = useSelector((state) => state.locations);
  const collection = useSelector((state) => state.collections[collectionId]);

  let userLocations = Object.values(locations).filter((loc) => loc.user_id === user.id);

  const [formData, setFormData] = useState({
        title: collection?.title || "",
        description: collection?.description || "",
        location_ids: collection?.location_ids || [],
    });
    const [errors, setErrors] = useState({});
    const [deleteErrors, setDeleteErrors] = useState({});



    useEffect(() => {
        if (collection) {
            setFormData({
                title: collection.title,
                description: collection.description,
                location_ids: collection.location_ids || [],
            });
        }
    }, [collection]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const updatedCollection = {
          ...formData,
          id: collectionId,
        };

        const serverResponse = await dispatch(editCollection(updatedCollection));

        if (serverResponse.errors) {
          setErrors(serverResponse.errors);
        } else {
          closeModal();
        }
    };

    const handleLocationSelect = (e) => {
        const selectedLocationIds = Array.from(e.target.selectedOptions, (option) => option.value);
        setFormData({
          ...formData,
          location_ids: selectedLocationIds
        });
    }

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this collection?")) {
          const deleteResponse = await dispatch(removeCollection(collectionId));
          if (deleteResponse.errors) {
            setDeleteErrors(deleteResponse.errors);
          } else {
            closeModal();
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

export default EditCollectionPage;
