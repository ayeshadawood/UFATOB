import DashboardIcon from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';

import Dashboard from '../views/University/Dashboard/Dashboard';
import Requests from '../views/University/Requests/Requests';
import Complaints from '../views/University/Complaints/Complaints';
import MyRequests from '../views/University/MyRequests/Requests';
import MyComplaints from '../views/University/MyComplaints/Complaints';
import Settings from '../views/University/Settings/Settings';
import ManageStudents from '../views/University/ManageStudents/ManageStudents';
import Transactions from '../views/University/Transactions/Transactions';
import Blockchain from '../views/University/Blockchain/Blockchain';
import Groups from '../views/University/DiscussionForum/Groups';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: DashboardIcon,
    component: Dashboard,
    layout: '/university',
  },
  {
    path: '/blockchains',
    name: 'Blockchains',
    icon: DashboardIcon,
    component: Blockchain,
    layout: '/university',
  },
  {
    path: '/transactions',
    name: 'Manage Transactions',
    icon: DashboardIcon,
    component: Transactions,
    layout: '/university',
  },
  {
    path: '/requests',
    name: 'Manage Requests',
    icon: DashboardIcon,
    component: Requests,
    layout: '/university',
  },
  {
    path: '/complaints',
    name: 'Manage Complaints',
    icon: DashboardIcon,
    component: Complaints,
    layout: '/university',
  },
  {
    path: '/my-requests',
    name: 'My Requests',
    icon: DashboardIcon,
    component: MyRequests,
    layout: '/university',
  },
  {
    path: '/my-complaints',
    name: 'My Complaints',
    icon: DashboardIcon,
    component: MyComplaints,
    layout: '/university',
  },
  {
    path: '/manage-students',
    name: 'Manage Students',
    icon: DashboardIcon,
    component: ManageStudents,
    layout: '/university',
  },
  {
    path: '/discussion-forum',
    name: 'Discussion forum',
    icon: DashboardIcon,
    component: Groups,
    layout: '/university',
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: DashboardIcon,
    component: Settings,
    layout: '/university',
  },
];

export default dashboardRoutes;
