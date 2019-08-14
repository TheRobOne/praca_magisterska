import axios from 'axios';

import { GET_FAILURES } from './types';

//get all failures
export const getFailures = () => dispatch => {
    axios.get('/failures')
        .then(res => {
            dispatch({
                type: GET_FAILURES,
                payload: res.data

            })
        })
        .catch(err =>
            dispatch({
              type: GET_FAILURES,
              payload: null
            })
        );
}

//add failure
export const addFailure = (failure, history) => dispatch => {
    axios.post('/failures', failure)
        .then(res => history.push('/'))
        .catch(err =>
           console.log(err)
        );
}

//update failure
export const updateFailure = (id, failure, history) => dispatch => {
    axios.put(`/failures/${id}`, failure)
        .then(res => history.push('/'))
        .catch(err => 
            console.log(err)
        );
}

//delete failure
export const deleteFailure = (id, history) => dispatch => {
    axios.delete(`/failures/${id}`)
        .then(res => history.push('/'))
        .catch(err => 
            console.log(err)
        );
}