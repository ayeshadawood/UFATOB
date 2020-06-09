/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import BubbleChart from '@material-ui/icons/BubbleChart';
import LocationOn from '@material-ui/icons/LocationOn';
import Notifications from '@material-ui/icons/Notifications';
import Unarchive from '@material-ui/icons/Unarchive';
import Language from '@material-ui/icons/Language';
// core components/views for Admin layout
import DashboardPage from 'views/University/Dashboard/Dashboard';
import UserProfile from 'views/University/Profile/Profile';
import TableList from 'views/TableList/TableList.js';
import Typography from 'views/Typography/Typography.js';
import Icons from 'views/Icons/Icons.js';
import Maps from 'views/Maps/Maps.js';
import NotificationsPage from 'views/Notifications/Notifications.js';
import UniversitiesList from 'views/HEC/Universities/UniversitiesList';
// import AddInstitution from "views/HEC/UniversitiesForms/AddInstitution";
// import RequestsList from "views/University/Requests/RequestsList";
import ComplaintsList from 'views/HEC/Complaints/ComplaintsList';
// import MyRequests from 'views/University/MyRequests/RequestsList';
// import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
// import RTLPage from "views/RTLPage/RTLPage.js";

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin',
  },
  // {
  //   path: "/requests",
  //   name: "Requests",
  //   icon: Dashboard,
  //   component: RequestsList,
  //   layout: "/admin",
  // },
  // {
  //   path: '/my-requests',
  //   name: 'My Requests',
  //   icon: Dashboard,
  //   component: MyRequests,
  //   layout: '/admin',
  // },
  // {
  //   path: "/complaints",
  //   name: "Complaints",
  //   icon: Dashboard,
  //   component: ComplaintsList,
  //   layout: "/admin",
  // },
  // {
  //   path: "/universities",
  //   name: "Universities",
  //   icon: Dashboard,
  //   component: UniversitiesList,
  //   layout: "/admin",
  // },
  // {
  //   path: "/add-institution",
  //   name: "Add Institution",
  //   icon: Dashboard,
  //   component: AddInstitution,
  //   layout: "/admin",
  // },
  {
    path: '/blockchain',
    name: 'Blockchain',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin',
  },
  {
    path: '/user',
    name: 'Manage Account',
    icon: Person,
    component: UserProfile,
    layout: '/admin',
  },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "content_paste",
  //   component: TableList,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin",
  // },
];

export default dashboardRoutes;
