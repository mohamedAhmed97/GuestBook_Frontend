import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Send from './send';
import useConstructor from '../functions/use.constructor'
import axios from 'axios'
import Cookies from 'universal-cookie';
import MessagesTable from './messages';
import SentMessages from './sentMessages';
const cookies = new Cookies();


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function Home() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [state, setState] = React.useState({
        users: [],
    });
    useConstructor(() => {
        axios.get('http://localhost:3001/api/users').then((res) => {
            setState({ ...state, users: res.data });
        }).catch((error) => {
            console.log(error);
        });
    });
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Send Message" {...a11yProps(0)} />
                    <Tab label="Messages Box" {...a11yProps(1)} />
                    <Tab label="Sent Message" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Send users={state.users} token={cookies.get('token')}></Send>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <MessagesTable users={state.users} token={cookies.get('token')}></MessagesTable>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <SentMessages users={state.users} token={cookies.get('token')}></SentMessages>
            </TabPanel>
        </div>
    );
}