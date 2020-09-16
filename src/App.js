import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './components/login'
import Register from './components/register';
import notfound from './components/notfound';
import Home from './components/home';
import PrivateRoute from 'private-route-react';
import isLoggedIn from './functions/isLoggedIn'
import MessageDeatils from './components/messageDeatils';
import SentMessageDeatils from './components/sentMessageDetails';
import Edit from './components/edit';
function App(props) {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/login" component={(props) => (
          <Login {...props}></Login>
        )} />
        <Route path="/signup" component={Register} />
        <Route path="/404" component={notfound} />
        <PrivateRoute path={'/'} exact
          component={Home}
          isAbleToAccessRoute={isLoggedIn}
          redirectPath={'/login'}
        />

        <PrivateRoute path={'/message/:id'}
          component={MessageDeatils}
          isAbleToAccessRoute={isLoggedIn}
          redirectPath={'/login'}
          {...props}
        />
        <PrivateRoute path={'/sent/message/:id'}
          component={SentMessageDeatils}
          isAbleToAccessRoute={isLoggedIn}
          redirectPath={'/login'}
          {...props}
        />

        <PrivateRoute path={'/edit/message/:id'}
          component={Edit}
          isAbleToAccessRoute={isLoggedIn}
          redirectPath={'/login'}
          {...props}
        />

        <Redirect to="/404" />

      </Switch>
    </React.Fragment>
  );
}

export default App;
