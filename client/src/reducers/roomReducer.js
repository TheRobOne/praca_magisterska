import { GET_ROOMS } from '../actions/types';

const initialState = {
    rooms_list: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ROOMS:
            return {
                ...state,
                rooms_list: action.payload
            }
        default:
            return state;
    }
}