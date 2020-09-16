import React from 'react';

function UsersDate(props) {
    return (
        <option value={props.user._id}>{props.user.name}</option>
    );
}

export default UsersDate;