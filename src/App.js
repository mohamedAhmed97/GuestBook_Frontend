import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './components/login'
import Register from './components/register';
import notfound from './components/notfound';
import Home from './components/home';
import PrivateRoute from 'private-route-react';
import isLoggedIn from './functions/isLoggedIn'
function App(props) {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/login" component={(props) => (
          <Login {...props}></Login>
        )} />
        <Route path="/signup" component={Register} />
        <Route path="/404" component={notfound} />
        <PrivateRoute path={'/home'} component={Home} isAbleToAccessRoute={isLoggedIn} redirectPath={'/login'} />
        <Route path="/" exact component={Login} />
        <Redirect to="/404" />

      </Switch>
    </React.Fragment>
  );
}

export default App;
