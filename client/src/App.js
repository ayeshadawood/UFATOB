import React, { useEffect } from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import PrivateRoute from './components/Routing/PrivateRoute';

import setAuthToken from './utils/setAuthToken';

import HEC from './layouts/HEC';
import User from './layouts/User';
import Admin from './layouts/Admin';
import Auth from './layouts/Auth';
import RTL from './layouts/RTL';
import University from './layouts/University';

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
          <PrivateRoute path='/user' component={User} />
          <Route path='/' component={Auth} />
          <Route path='/admin' component={Admin} />
          <Route path='/university' component={University} />
          <Route path='/rtl' component={RTL} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
