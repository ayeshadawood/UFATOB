import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";

import DashboardPage from "views/University/Dashboard/Dashboard";
import UserProfile from "views/University/Profile/Profile";
import RequestsList from "views/University/Requests/RequestsList";
import MyRequests from "views/University/MyRequests/RequestsList";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/university",
  },
  {
    path: "/requests",
    name: "Requests",
    icon: Dashboard,
    component: RequestsList,
    layout: "/university",
  },
  {
    path: "/my-requests",
    name: "My Requests",
    icon: Dashboard,
    component: MyRequests,
    layout: "/university",
  },
  {
    path: "/blockchain",
    name: "Blockchain",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/university",
  },
  {
    path: "/account",
    name: "Manage Account",
    icon: Person,
    component: UserProfile,
    layout: "/university",
  },
];

export default dashboardRoutes;
