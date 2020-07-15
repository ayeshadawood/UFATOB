import DashboardIcon from '@material-ui/icons/Dashboard';

import Dashboard from '../views/User/Dashboard/Dashboard';
import Requests from '../views/User/Requests/Requests';
import Complaints from '../views/User/Complaints/Complaints';
import Settings from '../views/User/Settings/Settings';
import Transactions from '../views/User/Transactions/Transactions';
import Groups from '../views/User/DiscussionForum/Groups';
import Profiles from '../views/User/Profiles/Profiles';
import MyConversations from '../views/User/MyConversations/MyConversations';

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
    path: '/discussion-forum',
    name: 'Discussion forum',
    icon: DashboardIcon,
    component: Groups,
    layout: '/user',
  },
  {
    path: '/profiles',
    name: 'Profiles',
    icon: DashboardIcon,
    component: Profiles,
    layout: '/user',
  },
  {
    path: '/my-conversations',
    name: 'Chat',
    icon: DashboardIcon,
    component: MyConversations,
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
