import React, { useEffect } from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import PrivateRoute from './components/Routing/PrivateRoute';
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
          <PrivateRoute path='/hec' component={HEC} />
          <PrivateRoute path='/university' component={University} />
          <PrivateRoute path='/user' component={User} />
          <Route path='/' component={Auth} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
