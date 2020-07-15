import DashboardIcon from '@material-ui/icons/Dashboard';

import Dashboard from '../views/HEC/Dashboard/Dashboard';
import Blockchain from '../views/HEC/Blockchain/Blockchain';
import ManageUniversities from '../views/HEC/ManageUniversities/ManageUniversities';
import Requests from '../views/HEC/Requests/Requests';
import Complaints from '../views/HEC/Complaints/Complaints';
import Settings from '../views/HEC/Settings/Settings';
import Transactions from '../views/HEC/Transactions/Transactions';
import Groups from '../views/HEC/DiscussionForum/Groups';
import Profiles from '../views/HEC/Profiles/Profiles';
import MyConversations from '../views/HEC/MyConversations/MyConversations';

const HecRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: DashboardIcon,
    component: Dashboard,
    layout: '/hec',
  },
  {
    path: '/blockchains',
    name: 'Blockchains',
    icon: DashboardIcon,
    component: Blockchain,
    layout: '/hec',
  },
  {
    path: '/transactions',
    name: 'Manage Transactions',
    icon: DashboardIcon,
    component: Transactions,
    layout: '/hec',
  },
  {
    path: '/requests',
    name: 'Manage Requests',
    icon: DashboardIcon,
    component: Requests,
    layout: '/hec',
  },
  {
    path: '/complaints',
    name: 'Manage Complaints',
    icon: DashboardIcon,
    component: Complaints,
    layout: '/hec',
  },
  {
    path: '/manage-universities',
    name: 'Manage Universities',
    icon: DashboardIcon,
    component: ManageUniversities,
    layout: '/hec',
  },
  {
    path: '/discussion-forum',
    name: 'Discussion forum',
    icon: DashboardIcon,
    component: Groups,
    layout: '/hec',
  },
  {
    path: '/profiles',
    name: 'Profiles',
    icon: DashboardIcon,
    component: Profiles,
    layout: '/hec',
  },
  {
    path: '/my-conversations',
    name: 'Chat',
    icon: DashboardIcon,
    component: MyConversations,
    layout: '/hec',
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: DashboardIcon,
    component: Settings,
    layout: '/hec',
  },
];

export default HecRoutes;
