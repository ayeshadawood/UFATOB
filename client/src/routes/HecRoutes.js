import Dashboard from '@material-ui/icons/Dashboard';

import DashboardPage from 'views/HEC/Dashboard/Dashboard';
import Blockchain from 'views/HEC/Blockchain/Blockchain';
import ManageUniversities from '../views/HEC/ManageUniversities/ManageUniversities';
import Requests from '../views/HEC/Requests/Requests';
import Complaints from '../views/HEC/Complaints/Complaints';
import Settings from '../views/HEC/Settings/Settings';
import Transactions from '../views/HEC/Transactions/Transactions';
import Groups from '../views/HEC/DiscussionForum/Groups';

const HecRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/hec',
  },
  {
    path: '/blockchains',
    name: 'Blockchains',
    icon: Dashboard,
    component: Blockchain,
    layout: '/hec',
  },
  {
    path: '/transactions',
    name: 'Manage Transactions',
    icon: Dashboard,
    component: Transactions,
    layout: '/hec',
  },
  {
    path: '/requests',
    name: 'Manage Requests',
    icon: Dashboard,
    component: Requests,
    layout: '/hec',
  },
  {
    path: '/complaints',
    name: 'Manage Complaints',
    icon: Dashboard,
    component: Complaints,
    layout: '/hec',
  },
  {
    path: '/manage-universities',
    name: 'Manage Universities',
    icon: Dashboard,
    component: ManageUniversities,
    layout: '/hec',
  },
  {
    path: '/discussion-forum',
    name: 'Discussion forum',
    icon: Dashboard,
    component: Groups,
    layout: '/hec',
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: Dashboard,
    component: Settings,
    layout: '/hec',
  },
];

export default HecRoutes;
