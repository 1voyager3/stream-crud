import { combineReducers} from "redux";
// renaming reducer as formReducer to avoid confusion with another reducers to be more descriptive name
import {reducer as formReducer} from "redux-form";
import authReducer from "./authReducer";
import streamsReducer from "./streamsReducer";

export default combineReducers( {
    auth: authReducer,
    form: formReducer,
    streams: streamsReducer
});