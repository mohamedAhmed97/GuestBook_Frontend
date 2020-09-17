import React from 'react';
import axios from 'axios';
import UsersDate from './usersDate';
import Cookies from 'universal-cookie';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useAlert } from 'react-alert'

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
        axios.post(`http://localhost:3001/api/messages/${state.to}`, state, {
            headers: { Authorization: `Bearer ${cookies.get('token')}` }
        }).then((res) => {
           //console.log(res);
           alert.success("Message Sent");
        }).catch((error) => {
            console.log(error);
        });
        /* console.log(state);
        console.log(props.token); */
    }

    return (
        <React.Fragment>
            <div className="container">
                <form noValidate onSubmit={submitRequest}>
                    <div className="form-group">
                        <select className="custom-select"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="to"
                            onChange={handleChange}
                        >
                            {props.users.map((user) => (
                                <UsersDate user={user}></UsersDate>
                            ))}

                        </select>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputEmail1">title</label>
                        <input type="text"
                            className="form-control" name="title"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputEmail1">message</label>
                        <textarea className="form-control border"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            name="message"
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

            </div >
        </React.Fragment >
    );
}

export default Send;