import React from 'react';
import useConstructor from '../functions/use.constructor'
import axios from 'axios'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function SentMessageDeatils(props) {
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
                        {state.reply !== null ?
                            <div className="card">
                                <div className="card-header">
                                    <h5>Reply</h5>
                                </div>
                                <div className="card-body">
                                    <div className="card-header">
                                        <h5>Title : {state.messages.title}</h5>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">reply</h5>
                                        <p className="card-text">{state.messages.reply}</p>
                                        <hr />
                                        <p className="text-center">from: {state.messages.from.email}</p>
                                        <p className="text-center">name: {state.messages.from.name}</p>
                                    </div>
                                </div>
                            </div>

                            :
                            <p>No Reply</p>
                        }
                    </div>
                </div>

                :
                <div>
                    <p className="text-center">loading</p>
                </div>}

        </React.Fragment>

    );
}

export default SentMessageDeatils