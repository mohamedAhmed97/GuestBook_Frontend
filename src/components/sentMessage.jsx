import React from 'react';
import { Link } from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
function SentMessage(props) {
    return (
        <React.Fragment>
            <TableCell component="th" scope="row">
                <Link to={`/sent/message/${props.message._id}`}>{props.message.message}</Link>
            </TableCell>
            <TableCell component="th" scope="row">
                <button className="btn btn-danger" onClick={() => props.deleteMessage(props.message)} >
                    <DeleteRoundedIcon />
                </button>
            </TableCell>
            <TableCell component="th" scope="row">
                <Link to={`/edit/message/${props.message._id}`}>
                    <button className="btn btn-primary" >
                        <i className="fas fa-edit"></i>
                    </button>
                </Link>
            </TableCell>
        </React.Fragment>
    );
}

export default SentMessage;