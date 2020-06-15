import React, { createRef, useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../components/Navbars/HECNavbar';
import Footer from 'components/Footer/Footer.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import CreateUniversity from '../views/HEC/ManageUniversities/CreateUniversity';
import Request from '../views/HEC/Requests/Request';
import Complaint from '../views/HEC/Complaints/Complaint';
import Settings from '../views/HEC/Settings/Settings';
import BlockchainTransactions from '../views/HEC/Blockchain/BlockchainTransactions';
import CustomAlert from '../components/CustomAlert/CustomAlert';
import CreateTransaction from '../views/HEC/Transactions/CreateTransaction';

import routes from '../routes/HecRoutes.js';

import styles from 'assets/jss/material-dashboard-react/layouts/adminStyle.js';

import bgImage from 'assets/img/sidebar-2.jpg';
import logo from 'assets/img/reactlogo.png';

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === '/hec') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Route path='/hec/create-university' component={CreateUniversity} />
    <Route path='/hec/create-transaction' component={CreateTransaction} />
    <Route path='/hec/settings' component={Settings} />
    <Route path='/hec/request/:id' component={Request} />
    <Route path='/hec/complaint/:id' component={Complaint} />
    <Route path='/hec/blockchain/:id' component={BlockchainTransactions} />
    <Redirect from='/hec' to='/hec/dashboard' />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  const classes = useStyles();

  const mainPanel = createRef();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('resize', resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy();
      }
      window.removeEventListener('resize', resizeFunction);
    };
  }, [mainPanel]);

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={'UFATOB'}
        logo={logo}
        image={bgImage}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color='blue'
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        <div className={classes.content}>
          <div className={classes.container}>
            <CustomAlert />
            {switchRoutes}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
