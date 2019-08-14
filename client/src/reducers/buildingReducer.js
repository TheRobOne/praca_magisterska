import { GET_BUILDINGS } from '../actions/types';

const initialState = {
    buildings: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_BUILDINGS:
            return {
                ...state,
                buildings: action.payload
            }
        default:
            return state;
    }
}