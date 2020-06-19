import React, { createRef, useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../components/Navbars/UniversityNavbar';
import Footer from '../components/Footer/Footer.js';
import Sidebar from '../components/Sidebar/Sidebar.js';
import CreateProfile from '../views/University/ProfileForms/CreateProfile';
import EditProfile from '../views/University/ProfileForms/EditProfile';
import CreateRequest from '../views/University/MyRequests/CreateRequest';
import Request from '../views/University/MyRequests/Request';
import Complaint from '../views/University/MyComplaints/Complaint';
import CreateStudent from '../views/University/ManageStudents/CreateStudent';
import CreateComplaint from '../views/University/MyComplaints/CreateComplaint';
import CustomAlert from '../components/CustomAlert/CustomAlert';
import CreateTransaction from '../views/University/Transactions/CreateTransaction';
import BlockchainTransactions from '../views/University/Blockchain/BlockchainTransactions';
import CreateGroup from '../views/University/DiscussionForum/CreateGroup';
import EditGroup from '../views/University/DiscussionForum/EditGroup';
import Group from '../views/University/DiscussionForum/Group';
import Post from '../views/University/DiscussionForum/Post';
import Profile from '../views/University/Profile/Profile';

import routes from '../routes/UniversityRoutes';

import styles from '../assets/jss/material-dashboard-react/layouts/adminStyle.js';
import spikes from '../assets/images/spikes.png';

import bgImage from '../assets/img/sidebar-2.jpg';
import logo from '../assets/img/reactlogo.png';

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === '/university') {
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
    <Route path='/university/create-profile' component={CreateProfile} />
    <Route path='/university/edit-profile' component={EditProfile} />
    <Route path='/university/create-request' component={CreateRequest} />
    <Route path='/university/create-student' component={CreateStudent} />
    <Route path='/university/create-complaint' component={CreateComplaint} />
    <Route
      path='/university/create-transaction'
      component={CreateTransaction}
    />
    <Route path='/university/create-group' component={CreateGroup} />
    <Route path='/university/request/:id' component={Request} />
    <Route path='/university/complaint/:id' component={Complaint} />
    <Route
      path='/university/blockchain/:id'
      component={BlockchainTransactions}
    />
    <Route path='/university/edit-group/:id' component={EditGroup} />
    <Route path='/university/group/:id' component={Group} />
    <Route path='/university/post/:id' component={Post} />
    <Route path='/university/profile/:id' component={Profile} />
    <Redirect from='/university' to='/university/dashboard' />
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
    <div
      className={classes.wrapper}
      style={{ background: 'url(' + spikes + ')' }}
    >
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
