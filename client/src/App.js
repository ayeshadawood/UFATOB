import React, { useEffect } from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import HecPrivateRoute from './components/Routing/HecPrivateRoute';
import UniversityPrivateRoute from './components/Routing/UniversityPrivateRoute';
import UserPrivateRoute from './components/Routing/UserPrivateRoute';
import setAuthToken from './utils/setAuthToken';
import HEC from './layouts/HEC';
import University from './layouts/University';
import User from './layouts/User';
import Auth from './layouts/Auth';

const hist = createBrowserHistory();

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router history={hist}>
        <Switch>
          <HecPrivateRoute path='/hec' component={HEC} />
          <UniversityPrivateRoute path='/university' component={University} />
          <UserPrivateRoute path='/user' component={User} />
          <Route path='/' component={Auth} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
