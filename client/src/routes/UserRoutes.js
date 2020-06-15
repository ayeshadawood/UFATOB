import DashboardIcon from '@material-ui/icons/Dashboard';

import Dashboard from '../views/User/Dashboard/Dashboard';
import Requests from '../views/User/Requests/Requests';
import Complaints from '../views/User/Complaints/Complaints';
import Settings from '../views/User/Settings/Settings';
import Transactions from '../views/User/Transactions/Transactions';

const UserRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: DashboardIcon,
    component: Dashboard,
    layout: '/user',
  },
  {
    path: '/transactions',
    name: 'My Transactions',
    icon: DashboardIcon,
    component: Transactions,
    layout: '/user',
  },
  {
    path: '/requests',
    name: 'Requests',
    icon: DashboardIcon,
    component: Requests,
    layout: '/user',
  },
  {
    path: '/complaints',
    name: 'Complaints',
    icon: DashboardIcon,
    component: Complaints,
    layout: '/user',
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: DashboardIcon,
    component: Settings,
    layout: '/user',
  },
];

export default UserRoutes;
