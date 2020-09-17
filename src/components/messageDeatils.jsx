import React from 'react';
import useConstructor from '../functions/use.constructor'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Cookies from 'universal-cookie';
import { useAlert } from 'react-alert'

const cookies = new Cookies();

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));
function MessageDeatils(props) {
    const classes = useStyles();
    const alert = useAlert()
    const [state, setState] = React.useState({
        messages: [],
        reply: '',
        load: false
    });
    useConstructor(() => {
        console.log(`http://localhost:3001/api/messages/${props.match.params.id}`);
        axios.get(`http://localhost:3001/api/messages/${props.match.params.id}`, {
            headers: { Authorization: `Bearer ${cookies.get('token')}` }
        }).then((res) => {
            setState({ messages: res.data, load: true })
        }).catch((error) => {
            console.log(error);
        });

    });
    const handleChange = ({ target }) => {
        setState({ ...state, [target.name]: target.value });
    };

    const submitRequest = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:3001/api/messages/${props.match.params.id}/reply`, state.reply, {
            headers: { Authorization: `Bearer ${cookies.get('token')}` }
        }).then((res) => {
            alert.success("Reply sent");
            props.history.replace('/')
            //
        }).catch((error) => {
            console.log(cookies.get('token'));
            console.log(`http://localhost:3001/api/messages/${props.match.params.id}/reply`);
            console.log(error);
        });
        /* console.log(state);
        console.log(props.token); */

    }
    return (
        <React.Fragment>
            {state.load ?
                <div className="container">
                    <br />
                    <div className="card">
                        <div className="card-header">
                            <h5>Title : {state.messages.title}</h5>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Mail</h5>
                            <p className="card-text">{state.messages.message}</p>
                            <hr />
                            <p className="text-center">from: {state.messages.from.email}</p>
                            <p className="text-center">name: {state.messages.from.name}</p>
                        </div>
                        <br />
                        <div className="card">
                            <div className="card-header">
                                <h5>Reply</h5>
                            </div>
                            <div className="card-body">
                                <form noValidate onSubmit={submitRequest}>
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">message</label>
                                        <textarea className="form-control border"
                                            id="exampleFormControlTextarea1"
                                            rows="3"
                                            name="reply"
                                            onChange={handleChange}
                                        >

                                        </textarea>

                                    </div>
                                    <div className="center">
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                        >
                                            Send
                                         </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div>
                    <p className="text-center">loading</p>
                </div>}

        </React.Fragment>

    );
}

export default MessageDeatils