//*------ACTION TYPES---------
// const ADD_LOCOL = 'locols/addLocol';
// const DELETE_LOCOL = 'locols/deleteLocol';
const UPDATE_LOCOL = 'locols/updateLocol';
//*-------ACTION CREATORS---------

export const updateLocol = (collectionId, locations) => ({
    type: UPDATE_LOCOL,
    payload: { collectionId, locations}

})

// export const addLocol = (locol)=> {
//     return {
//         type: ADD_LOCOL,
//         locol
//     }
// }


// export const deleteLocol = (collectionId, locationId) => {
//     return {
//         type: DELETE_LOCOL,
//         collectionId,
//         locationId
//     }
// }

//*---------THUNKS------------

//* Update saved locations in a collection (add or remove)
export const editLocol = ({ collection_id, locations }) => async (dispatch) => {
    try {
        const response = await fetch(`/api/location-collections/`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ collection_id, locations })
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(updateLocol(collection_id, locations));
            return data;
        } else {
            const errors = await response.json();
            return {errors};
        }
    } catch (err) {
        return { errors: ["An unexpected error occurred"] };
    }
};

// //* Create a location for a collection
// export const createLocol = (locolData) => async (dispatch) => {
//     try {
//         const response = await fetch(`/api/location-collections/`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(locolData)
//         });

//         if (response.ok) {
//             const newLocol = await response.json();
//             dispatch(addLocol(newLocol));
//             return newLocol;
//         } else {
//             const errors = await response.json();
//             return {errors};
//         }
//     } catch (err) {
//         return { errors: ["An unexpected error occurred"] };
//     }
// };


// //* Delete a location in a collection
// export const removeLocol = (collectionId, locationId) => async (dispatch) =>{
//     try {
//         const response = await fetch(`/api/location-collections/`, {
//             method: "DELETE",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ collection_id: collectionId, location_id: locationId })
//         })
//         if (response.ok) {
//             dispatch(deleteLocol(collectionId, locationId));
//             return response;
//         } else {
//             const errors = await response.json();
//             throw errors;
//         }
//     } catch (err) {
//         console.error("Error removing location from collection", err);
//     }

// }



//*---------REDUCERS-----------

const initialState = {};

const locolReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_LOCOL: {
            const { collectionId, locations } = action;
            const newState = { ...state };

            if (newState[collectionId]) {
                newState[collectionId].locations = locations;
            }

            return newState;
        }

        // case ADD_LOCOL: {
        //     const { collection_id, location_id } = action.locol;
        //     return {
        //         ...state,
        //         [collection_id]: {
        //             ...state[collection_id],
        //             locations: [...(state[collection_id]?.locations || []), location_id]
        //         }
        //     };
        // }
        // case DELETE_LOCOL: {
        //     const { collectionId, locationId } = action;
        //     const newState = { ...state };
        //     for (const collectionId in newState) {
        //         newState[collectionId].locations = newState[collectionId].locations.filter(
        //             locationId => locationId !== action.locationId
        //         );
        //     }

        //     return newState;
        // }
        default:
            return state;
    }
};

export default locolReducer;
