import React from 'react';
import axios from 'axios';
import useConstructor from '../functions/use.constructor'
import Cookies from 'universal-cookie';
import { useAlert } from 'react-alert'
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './navBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const cookies = new Cookies();

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 18,
    },
    pos: {
        marginBottom: 12,
    },
    end: {
        textAlign: "center"
    },

}));

function Edit(props) {
    const alert = useAlert()
    const classes = useStyles();
    const [state, setState] = React.useState({
        load: false
    });
    useConstructor(() => {
        axios.get(`http://localhost:3001/api/messages/${props.match.params.id}`, {
            headers: { Authorization: `Bearer ${cookies.get('token')}` }
        }).then((res) => {
            setState({
                title: res.data.title,
                message: res.data.message,
                load: true
            })
            //console.log(state);
        }).catch((error) => {
            console.log(error);
        });

    });

    const handleChange = ({ target }) => {
        setState({ ...state, [target.name]: target.value, load: true });
        // console.log(state);
    };

    const submitRequest = (e) => {
        e.preventDefault();
        console.log(state);
        axios.patch(`http://localhost:3001/api/messages/${props.match.params.id}`,
            { title: state.title, message: state.message }, {
            headers: { Authorization: `Bearer ${cookies.get('token')}` }
        }).then((res) => {
            alert.success("Message Edited");
            props.history.replace('/')
        }).catch((error) => {
            console.log(state.data);
            console.log(error);
        });
    }

    return (
        <React.Fragment>
            <NavBar></NavBar>
            {state.load === true ?
                <div className="container">
                    <br />
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Write Reply :
                            </Typography>
                            <hr />

                            <form noValidate onSubmit={submitRequest}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">message</label>
                                    <input type="text" className="form-control border"
                                        id="exampleFormControlTextarea1"
                                        rows="3"
                                        name="title"
                                        value={state.title}
                                        onChange={handleChange}
                                    >
                                    </input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">message</label>
                                    <textarea className="form-control border"
                                        id="exampleFormControlTextarea1"
                                        rows="3"
                                        name="message"
                                        value={state.message}
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
                            <hr />
                        </CardContent>
                    </Card>
                </div >
                :
                <div>
                    Loading
                </div>
            }
        </React.Fragment >
    );
}

export default Edit;