import axios from 'axios';

import { GET_BUILDINGS } from './types';

//get all buildings
export const getBuildings = () => dispatch => {
    axios.get('/buildings')
        .then(res => {
            dispatch({
                type: GET_BUILDINGS,
                payload: res.data

            })
        })
        .catch(err =>
            dispatch({
              type: GET_BUILDINGS,
              payload: null
            })
        );
}