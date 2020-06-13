import Dashboard from '@material-ui/icons/Dashboard';

import DashboardPage from 'views/HEC/Dashboard/Dashboard';
import UniversitiesList from 'views/HEC/Universities/UniversitiesList';
// import RequestsList from 'views/HEC/Requests/RequestsList';
import ComplaintsList from 'views/HEC/Complaints/ComplaintsList';
import Blockchain from 'views/HEC/Blockchain/Blockchain';
import NetworkNodes from 'views/HEC/ManageNetworkNodes/NetworkNodes';
import ViewContracts from 'views/HEC/ViewContracts/ViewContracts';
import ManageUniversities from '../views/HEC/ManageUniversities/ManageUniversities';
import Requests from '../views/HEC/Requests/Requests';

const HecRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/hec',
  },
  {
    path: '/blockchain',
    name: 'Blockchain',
    icon: Dashboard,
    component: Blockchain,
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
    component: ComplaintsList,
    layout: '/hec',
  },
  {
    path: '/manage-universities',
    name: 'Manage Universities',
    icon: Dashboard,
    component: ManageUniversities,
    layout: '/hec',
  },
];

export default HecRoutes;
