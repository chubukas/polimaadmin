import { lazy } from "react";

import { Page404 } from "../pages/404";
// import { Login } from "../pages/Login";

const HomePage = lazy(() => import("../pages/Home"));
const Locations = lazy(() => import("../pages/Locations/Locations"));
const AddLocations = lazy(() => import("../pages/Locations/AddLocations"));
const ViewLocation = lazy(() => import("../pages/Locations/ViewLocation"));
const Parties = lazy(() => import("../pages/Parties/Parties"));
const Positions = lazy(() => import("../pages/Positions/Positions"));
const SinglePolitician = lazy(() =>
  import("../pages/Politicians/SinglePolitician")
);
const Settings = lazy(() => import("../pages/Settings"));
const Profile = lazy(() => import("../pages/Admin/Profile"));
const Admins = lazy(() => import("../pages/Admin/Admins"));
const SingleAdmin = lazy(() => import("../pages/Admin/SingleAdmin"));
const VerificationPage = lazy(() => import("../pages/Auth/Verification"));
const ForgotPassword = lazy(() => import("../pages/Auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/Auth/ResetPassword"));
const Politicians = lazy(() => import("../pages/Politicians/Politicians"));
const AddPoliticians = lazy(() => import("../pages/Politicians/AddPolitician"));
const Promises = lazy(() => import("../pages/Promises/Promises"));
const AddPromises = lazy(() => import("../pages/Promises/AddPromises"));
const ViewPromises = lazy(() => import("../pages/Promises/ViewPromises"));

export const routes = [
  // {
  //   path: "/",
  //   name: "Login",
  //   exact: true,
  //   component: Login,
  //   privateRoute: false,
  // },
  {
    path: "/",
    name: "Dashboard",
    exact: true,
    component: HomePage,
    privateRoute: true,
  },
  {
    path: "/Activation/:activationToken",
    name: "VerificationPage",
    exact: true,
    component: VerificationPage,
    privateRoute: false,
  },
  {
    path: "/forgotPassword",
    name: "Forgot Password",
    exact: true,
    component: ForgotPassword,
    privateRoute: false,
  },
  {
    path: "/resetPassword/:resetToken",
    name: "Reset Password",
    exact: true,
    component: ResetPassword,
    privateRoute: false,
  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    exact: true,
    component: HomePage,
    privateRoute: true,
  },
  {
    path: "/Locations",
    name: "Locations",
    exact: true,
    component: Locations,
    privateRoute: true,
  },
  {
    path: "/Locations/AddLocations",
    name: "AddLocations",
    exact: true,
    component: AddLocations,
    privateRoute: true,
  },
  {
    path: "/Locations/ViewLocation/:slug",
    name: "ViewLocation",
    exact: true,
    component: ViewLocation,
    privateRoute: true,
  },
  {
    path: "/Parties",
    name: "Parties",
    exact: true,
    component: Parties,
    privateRoute: true,
  },
  {
    path: "/Positions",
    name: "Positions",
    exact: true,
    component: Positions,
    privateRoute: true,
  },
  {
    path: "/Settings",
    name: "Settings",
    exact: true,
    component: Settings,
    privateRoute: true,
  },
  {
    path: "/Profile",
    name: "Profile",
    exact: true,
    component: Profile,
    privateRoute: true,
  },
  {
    path: "/Admins",
    name: "Admins",
    exact: true,
    component: Admins,
    privateRoute: true,
  },
  {
    path: "/Admins/SingleAdmin/:id",
    name: "SingleAdmin",
    exact: true,
    component: SingleAdmin,
    privateRoute: true,
  },
  {
    path: "/Politicians",
    name: "Politicians",
    exact: true,
    component: Politicians,
    privateRoute: true,
  },
  {
    path: "/Politicians/AddPolitician",
    name: "AddPolitician",
    exact: true,
    component: AddPoliticians,
    privateRoute: true,
  },
  {
    path: "/Politicians/singlePolitician/:Id",
    name: "SinglePolitician",
    exact: true,
    component: SinglePolitician,
    privateRoute: true,
  },
  {
    path: "/Promises",
    name: "Promises",
    exact: true,
    component: Promises,
    privateRoute: true,
  },
  {
    path: "/Promises/AddPromises",
    name: "AddPromises",
    exact: true,
    component: AddPromises,
    privateRoute: true,
  },
  {
    path: "/Promises/ViewPromises/:id",
    name: "ViewPromises",
    exact: true,
    component: ViewPromises,
    privateRoute: true,
  },

  {
    component: Page404,
  },
];
