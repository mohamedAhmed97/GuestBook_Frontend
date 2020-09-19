import React from 'react';
import axios from 'axios';
import UsersDate from './usersDate';
import Cookies from 'universal-cookie';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useAlert } from 'react-alert'
import Container from '@material-ui/core/Container';
import "./styles/send.css"

const cookies = new Cookies();

function Send(props) {
    const alert = useAlert()
    const useStyles = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(1),
        },
    }));
    const [state, setState] = React.useState({
        to: '',
        title: '',
        message: '',

    });
    const classes = useStyles();

    const handleChange = ({ target }) => {
        setState({ ...state, [target.name]: target.value });
    };

    const submitRequest = (e) => {
        e.preventDefault();
        console.log(state);
        if (!state.to|| state.to === "0") {
            alert.error("Select User");
        } else {
            axios.post(`http://localhost:3001/api/messages/${state.to}`, state, {
                headers: { Authorization: `Bearer ${cookies.get('token')}` }
            }).then((res) => {
                //console.log(res);
                alert.success("Message Sent");
            }).catch((error) => {
                console.log(error);
            });
        }


    }

    return (
        <React.Fragment>
            <Container maxWidth="sm">
                <h2>Send Email</h2>
                <hr></hr>
                <form onSubmit={submitRequest}>
                    <label className="send_label send_input">Select User</label>
                    <select className="custom-select"
                        labelid="demo-simple-select-label"
                        id="demo-simple-select"
                        name="to"
                        onChange={handleChange}
                        required
                    >
                        <option value="0" selected="selected">Select User</option>
                        {props.users.map((user) => (
                            <UsersDate key={user._id} user={user}></UsersDate>
                        ))}

                    </select>

                    <label className="send_label">Your Title</label>
                    <input type="text"
                        className="form-control send_input" name="title"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter Your Title"
                        onChange={handleChange}
                    />

                    <label className="send_label">message</label>
                    <textarea className="form-control border"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        name="message"
                        onChange={handleChange}
                    >
                    </textarea>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        Send
                        </Button>
                </form>
            </Container>
        </React.Fragment>
    );
}

export default Send;