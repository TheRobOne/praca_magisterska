import React from 'react';

const User = (props) => {
    const { user, index } = props;

    const cursorStyle = {cursor: 'pointer'}

    if(user.role === 'admin') user.role = 'Administrator'
    else if(user.role === 'conservator') user.role = 'Konserwator'
    else user.role = 'Użytkownik'

    const userRow = (
        <tr key={user._id} onClick={props.moveToUserPage} style={cursorStyle}>
            <th scope='row'>{index + 1}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
        </tr>
    );

    return (
        <React.Fragment>
            {userRow}
        </React.Fragment>
        
    )
};

export default User;