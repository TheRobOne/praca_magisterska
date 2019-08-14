import { GET_FAILURES } from '../actions/types';

const initialState = {
    failures: [],
    failureById: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_FAILURES:
            return {
                ...state,
                failures: action.payload
            }
        default:
            return state;
    }
}