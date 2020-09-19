import React from 'react';
import { Link } from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
function Message(props) {
    return (
        <React.Fragment>
            <TableCell component="th" scope="row">
                <Link to={`/message/${props.message._id}`}>{props.message.title}</Link>
            </TableCell>
            <TableCell component="th" scope="row">
                <button className="btn btn-danger" onClick={() => props.deleteMessage(props.message)} >
                    <DeleteRoundedIcon />
                </button>

            </TableCell>
        </React.Fragment>
    );
}

export default Message;