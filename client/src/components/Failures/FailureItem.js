import React from 'react';
import { withRouter } from 'react-router-dom';

const FailureItem = (props) => {    

    const { failure } = props;

    const cursorStyle = {cursor: 'pointer'}

    const failureItem = (
        <tr key={failure._id} onClick={props.moveToFailurePage} style={cursorStyle}>
            <th scope='row'>{props.index + 1}</th>
            <td>{failure.date}</td>
            <td>{failure.building}</td>
            <td>{failure.roomNumber}</td>
            <td>{failure.authorEmail}</td>
            <td>{failure.title}</td>
            <td>{failure.state}</td>
        </tr>
    );

    return (
        <React.Fragment>
            {failureItem}
        </React.Fragment>
        
    )
}

export default (withRouter(FailureItem));