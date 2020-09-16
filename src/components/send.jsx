import React from 'react';
import axios from 'axios';
import UsersDate from './usersDate';

function Send(props) {
    const [state, setState] = React.useState({
        to: '',
        title: '',
        message: '',

    });
    const handleChange = ({ target }) => {
        setState({ ...state, [target.name]: target.value });
    };

    const submitRequest = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3001/api/messages/${state.to}`, state, {
            headers: { Authorization: `Bearer ${props.token}` }
        }).then((res) => {
            /* if (res.status === 200) {
                cookies.set('token', res.data.token, { path: '/' });
                cookies.set('userData', res.data.user, { path: '/' });
                props.history.replace('/home')
            } */
            console.log(res);
            //
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
                        <button className="btn btn-success p-2 mybtn" value="send" name="submit">Submit </button>
                    </div>
                </form>

            </div >
        </React.Fragment >
    );
}

export default Send;