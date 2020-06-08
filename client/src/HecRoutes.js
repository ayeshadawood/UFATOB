import Dashboard from "@material-ui/icons/Dashboard";

import DashboardPage from "views/HEC/Dashboard/Dashboard";
import UniversitiesList from "views/HEC/Universities/UniversitiesList";
import RequestsList from "views/HEC/Requests/RequestsList";
import ComplaintsList from "views/HEC/Complaints/ComplaintsList";
import Blockchain from "views/HEC/Blockchain/Blockchain";
import NetworkNodes from "views/HEC/ManageNetworkNodes/NetworkNodes";
import ViewContracts from "views/HEC/ViewContracts/ViewContracts";

const HecRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/hec",
  },
  {
    path: "/blockchain",
    name: "Blockchain",
    icon: Dashboard,
    component: Blockchain,
    layout: "/hec",
  },
  {
    path: "/manage-nodes",
    name: "Manage network nodes",
    icon: Dashboard,
    component: NetworkNodes,
    layout: "/hec",
  },
  {
    path: "/view-contracts",
    name: "View contracts",
    icon: Dashboard,
    component: ViewContracts,
    layout: "/hec",
  },
  // {
  //   path: "/universities",
  //   name: "Universities",
  //   icon: Dashboard,
  //   component: UniversitiesList,
  //   layout: "/hec",
  // },
  {
    path: "/requests",
    name: "Requests",
    icon: Dashboard,
    component: RequestsList,
    layout: "/hec",
  },
  {
    path: "/complaints",
    name: "Complaints",
    icon: Dashboard,
    component: ComplaintsList,
    layout: "/hec",
  },
];

export default HecRoutes;
