import _ from 'lodash';
import {
    FETCH_STREAM, FETCH_STREAMS, CREATE_STREAM, EDIT_STREAM, DELETE_STREAM
} from "../actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        // lodash function _.mapKeys is going to take the list from an array and return into an object
        // mapKeys return a big object and we want to take all the key value pairs
        // from that object and add the into the new object that gets created
            // that's why it put "..." before _.mapKeys(action.payload, 'id')
        case FETCH_STREAMS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        /*
 ...state, [action.payload.id]: action.payload}
 the same
 const newState = { ...state };
 newState[action.payload.id] = action.payload;
 return newState
 */
        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload};
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload};
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload};
        case DELETE_STREAM:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}

