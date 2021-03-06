import React from 'react';
import useConstructor from '../functions/use.constructor'
import axios from 'axios'
import Cookies from 'universal-cookie';
import NavBar from './navBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
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

function SentMessageDeatils(props) {
    const classes = useStyles();
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
            <NavBar></NavBar>

            {state.load ?
                <div className="container">
                    {console.log(state.messages.reply)}
                    <br />
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Title : {state.messages.title}
                            </Typography>
                            <hr />
                            <Typography className={classes.pos} color="textSecondary">
                                Message
                            </Typography>
                            <Typography variant="body2" component="p">
                                {state.messages.message}
                            </Typography>
                            <hr />
                            <Typography className={classes.end} variant="body2" component="p">
                                from: {state.messages.from.email}
                                <br />
                                name: {state.messages.from.name}
                            </Typography>
                        </CardContent>
                    </Card>
                    <br />
                    {state.messages.reply ?
                        <Card className={classes.root}>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Reply :
                                 </Typography>
                                <hr />
                                <Typography variant="body2" component="p">
                                    {state.messages.reply}
                                </Typography>
                                <hr />
                                <Typography className={classes.end} variant="body2" component="p">
                                    from: {state.messages.from.email}
                                    <br />
                                    name: {state.messages.from.name}
                                </Typography>
                            </CardContent>
                        </Card>
                        :
                        <Card className={classes.root}>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    No Reply Yet
                                 </Typography>
                            </CardContent>
                        </Card>
                    }


                </div>

                :
                <div>
                    <p className="text-center">loading</p>
                </div>
            }

        </React.Fragment >

    );
}

export default SentMessageDeatils