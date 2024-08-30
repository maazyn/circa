//*------ACTION TYPES---------
const LOAD_LOCATIONS = "locations/loadLocations"
// const LOAD_LOCATION = "locations/loadLocation"
const ADD_LOCATION = 'locations/addLocation';
const UPDATE_LOCATION = 'locations/updateLocation';
const DELETE_LOCATION = 'locations/deleteLocation';

//*-------ACTION CREATORS---------
export const loadLocations = (locations) => {
    return {
        type: LOAD_LOCATIONS,
        locations
    }
}

export const addLocation = (location)=> {
    return {
        type: ADD_LOCATION,
        location
    }
}

export const updateLocation = (location) => {
    return {
        type: UPDATE_LOCATION,
        location
    }
}

export const deleteLocation = (locationId) => {
    return {
        type: DELETE_LOCATION,
        locationId
    }
}


//*---------THUNKS------------

//* Get current user's locations
export const fetchCurrUserLocations = () => async (dispatch) => {
    const response = await fetch("/api/locations/")
    const locations = await response.json()
    dispatch(loadLocations(locations.Locations))
    // return locations
}




//* Create a saved location
export const createLocation = (location) => async (dispatch) => {
    try {
        const response = await fetch(`/api/locations/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(location)
        });

        if (response.ok) {
            const newLocation = await response.json();
            dispatch(addLocation(newLocation));
            return newLocation;
        } else {
            const errors = await response.json();
            throw errors;
        }
    } catch (err) {
        console.error("Error adding a new location", err);
    }
};

//* Update a location by id
export const editLocation = (location) => async dispatch => {
    try {
        const response = await fetch(`/api/locations/${location.id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(location)
        })

        if (response.ok) {
            const updatedLocation = await response.json()
            dispatch(updateLocation(updatedLocation))
        } else {
            console.error("Error updating location")

        }
    } catch (err) {
        console.error("Error loading location", err)
    }
}

//* Delete a location by id
export const removeLocation = (locationId) => async (dispatch) =>{
    const response = await fetch(`/api/locations/${locationId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(deleteLocation(locationId));
        return response;
    } else {
        const errors = await response.json();
        throw errors;
    }

}


//*---------REDUCERS-----------

const initialState = {};

const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_LOCATIONS: {
            const newState = {}
            action.locations?.forEach((location) => {
                newState[location.id] = location
            });
            return newState;
        }
        case ADD_LOCATION: {
            return {
                ...state,
                [action.location.id]: action.location,
            };
        }
        case UPDATE_LOCATION: {
            const updatedState = { ...state };
            updatedState[action.location.id] = action.location;
            return updatedState;

        }
        case DELETE_LOCATION: {
            const newState = { ...state };
            delete newState[action.locationId];
            return newState;
        }
        default:
            return state;
    }
};

export default locationReducer;
