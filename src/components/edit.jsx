import React from 'react';
import axios from 'axios';
import useConstructor from '../functions/use.constructor'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function Edit(props) {
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
    const [state, setState] = React.useState({
        load: false
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
            /* if (res.status === 200) {
                cookies.set('token', res.data.token, { path: '/' });
                cookies.set('userData', res.data.user, { path: '/' });
                props.history.replace('/home')
            } */
            console.log(res);
            //
        }).catch((error) => {
            console.log(state.data);
            console.log(error);
        });
        /* console.log(state);
        console.log(props.token); */

    }

    return (
        <React.Fragment>
            {state.load == true ?
                <div className="container">
                    <form noValidate onSubmit={submitRequest}>
                        <div className="form-group">
                            <label for="exampleInputEmail1">title</label>
                            <input type="text"
                                className="form-control"
                                name="title"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                value={state.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">message</label>
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
                            <button className="btn btn-success p-2 mybtn" value="send" name="submit">Submit </button>
                        </div>
                    </form>

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