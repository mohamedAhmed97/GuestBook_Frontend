import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useConstructor from '../functions/use.constructor'
import axios from 'axios'
import TableCell from '@material-ui/core/TableCell';
import SentMessage from './sentMessage'
import { useAlert } from 'react-alert'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },

});

function SentMessages(props) {
    const classes = useStyles();
    const alert = useAlert()
    const [state, setState] = React.useState({
        messages: [],
    });
    useConstructor(() => {
        axios.get('http://localhost:3001/api/users/sentMessages', {
            headers: { Authorization: `Bearer ${props.token}` }
        }).then((res) => {
            setState({ messages: res.data })
        }).catch((error) => {
            console.log(error);
        });

    });
    const deleteMessage = (message) => {
        //clone & edit
        const messages = state.messages.filter((m) => message._id !== m._id)
        //setstate
        setState({ messages })
        //delete
        axios.delete(`http://localhost:3001/api/messages/${message._id}`, {
            headers: { Authorization: `Bearer ${props.token}` }
        }).then((res) => {
            alert.success("Message Deleted");
            props.history.replace('/')
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>message</TableCell>
                        <TableCell>delete</TableCell>
                        <TableCell>edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state.messages.map((row) => (
                        <TableRow key={row.name}>
                            <SentMessage message={row} deleteMessage={deleteMessage}></SentMessage>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default SentMessages;