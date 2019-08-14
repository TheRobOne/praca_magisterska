import { combineReducers } from 'redux';
import failureReducer from './failureReducer';
import buildingReducer from './buildingReducer';
import roomReducer from './roomReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    failure: failureReducer,
    room: roomReducer,
    building: buildingReducer,
    auth: authReducer,
    errors: errorReducer
});