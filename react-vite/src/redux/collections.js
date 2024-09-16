//*------ACTION TYPES---------
const LOAD_COLLECTIONS = "locations/loadCollections"
// const LOAD_COLLECTION = "collections/loadCollection"
const ADD_COLLECTION = 'locations/addCollection';
const UPDATE_COLLECTION = 'locations/updateCollection';
const DELETE_COLLECTION = 'locations/deleteCollection';

//*-------ACTION CREATORS---------
export const loadCollections = (collections) => {
    return {
        type: LOAD_COLLECTIONS,
        collections
    }
}

export const addCollection = (collection)=> {
    return {
        type: ADD_COLLECTION,
        collection
    }
}

export const updateCollection = (collection) => {
    return {
        type: UPDATE_COLLECTION,
        collection
    }
}

export const deleteCollection = (collectionId) => {
    return {
        type: DELETE_COLLECTION,
        collectionId
    }
}


//*---------THUNKS------------

//* Get current user's collections
export const fetchCurrUserCollections = () => async (dispatch) => {
    const response = await fetch("/api/collections/")
    const data = await response.json()

    if (response.ok) {
        // console.log("TestTest:", data.collections);
        dispatch(loadCollections(data.collections));
    } else {
        console.error("Error fetching collections", data.errors);
    }
}




//* Create a collection
export const createCollection = (collection) => async (dispatch) => {
    try {
        const response = await fetch(`/api/collections/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(collection)
        });

        if (response.ok) {
            const newCollection = await response.json();
            dispatch(addCollection(newCollection));
            return newCollection;
        } else {
            const errors = await response.json();
            return {errors};
        }
    } catch (err) {
        // console.error("Error adding a new collection", err);
        return { errors: ["An unexpected error occurred"] };
    }
};

//* Update a collection by id
export const editCollection = (collection) => async dispatch => {
    try {
        const response = await fetch(`/api/collections/${collection.id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(collection)
        })

        if (response.ok) {
            const updatedCollection = await response.json()
            dispatch(updateCollection(updatedCollection))
            return updatedCollection;
        } else {
            const error = await response.json();
            console.error("Error updating collection", error)
            return { errors: error };
        }
    } catch (err) {
        console.error("Error loading collection", err)
    }
}

//* Delete a collection by id
export const removeCollection = (collectionId) => async (dispatch) =>{
    const response = await fetch(`/api/collections/${collectionId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(deleteCollection(collectionId));
        return response;
    } else {
        const errors = await response.json();
        throw errors;
    }

}


//*---------REDUCERS-----------

const initialState = {};

const collectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_COLLECTIONS: {
            const newState = {}
            action.collections?.forEach((collection) => {
                newState[collection.id] = collection
            });
            return newState;
        }
        case ADD_COLLECTION: {
            return {
                ...state,
                [action.collection.id]: action.collection,
            };
        }
        case UPDATE_COLLECTION: {
            const updatedState = { ...state };
            updatedState[action.collection.id] = action.collection;
            return updatedState;

        }
        case DELETE_COLLECTION: {
            const newState = { ...state };
            delete newState[action.collectionId];
            return newState;
        }
        default:
            return state;
    }
};

export default collectionReducer;
