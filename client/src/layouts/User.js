import React, { createRef, useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../components/Navbars/UserNavbar';
import Footer from '../components/Footer/Footer.js';
import Sidebar from '../components/Sidebar/Sidebar.js';
import CreateProfile from '../views/User/ProfileForms/CreateProfile';
import EditProfile from '../views/User/ProfileForms/EditProfile';
import AddExperience from '../views/User/ProfileForms/AddExperience';
import AddEducation from '../views/User/ProfileForms/AddEducation';
import Request from '../views/User/Requests/Request';
import CreateRequest from '../views/User/Requests/CreateRequest';
import CreateComplaint from '../views/User/Complaints/CreateComplaint';
import Complaint from '../views/User/Complaints/Complaint';
import CustomAlert from '../components/CustomAlert/CustomAlert';
import CreateGroup from '../views/User/DiscussionForum/CreateGroup';
import EditGroup from '../views/User/DiscussionForum/EditGroup';
import Group from '../views/User/DiscussionForum/Group';
import Post from '../views/User/DiscussionForum/Post';
import Profile from '../views/User/Profile/Profile';
// import NewProfile from '../views/User/NewProfile/Profile';

import routes from '../routes/UserRoutes';

import styles from '../assets/jss/material-dashboard-react/layouts/adminStyle.js';
import spikes from '../assets/images/spikes.png';

import bgImage from '../assets/img/sidebar-2.jpg';
import logo from '../assets/img/reactlogo.png';

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === '/user') {
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
    <Route path='/user/create-profile' component={CreateProfile} />
    <Route path='/user/edit-profile' component={EditProfile} />
    <Route path='/user/add-experience' component={AddExperience} />
    <Route path='/user/add-education' component={AddEducation} />
    <Route path='/user/create-request' component={CreateRequest} />
    <Route path='/user/create-complaint' component={CreateComplaint} />
    <Route path='/user/create-group' component={CreateGroup} />
    <Route path='/user/request/:id' component={Request} />
    <Route path='/user/complaint/:id' component={Complaint} />
    <Route path='/user/edit-group/:id' component={EditGroup} />
    <Route path='/user/group/:id' component={Group} />
    <Route path='/user/post/:id' component={Post} />
    <Route path='/user/profile/:id' component={Profile} />
    <Redirect from='/user' to='/user/dashboard' />
    {/* <Route path='/user/newprofile' component={NewProfile} /> */}
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
