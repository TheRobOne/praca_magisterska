import axios from 'axios';

import { GET_ROOMS } from './types';

//get all buildings
export const getRooms = (building) => dispatch => {
    axios.get(`/rooms/building/${building}`)
        .then(res => {
            dispatch({
                type: GET_ROOMS,
                payload: res.data

            })
        })
        .catch(err =>
            dispatch({
              type: GET_ROOMS,
              payload: null
            })
        );
}