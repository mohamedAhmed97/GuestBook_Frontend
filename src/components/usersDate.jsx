import React from 'react';

function UsersDate(props) {
    return (
        <option key={props.user._id} value={props.user._id}>{props.user.name}</option>
    );
}

export default UsersDate;