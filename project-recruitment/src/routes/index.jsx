import { Navigate } from "react-router-dom";
import LayoutDefault from "../layout/LayoutDefault/LayoutDefault";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Search from "../pages/Search";
import JobDetail from "../components/JobDetail";
import Company from "../pages/Company";
import CompanyDetail from "../components/CompanyDetail";
import Register from "../pages/Register";
import Logout from "../pages/Logout";
import PrivateRouter from "../components/PrivateRouter";
import LayoutAdmin from "../layout/LayoutAdmin";
import DashBoard from "../pages/Admin/Dashboard";
import InfoCompany from "../pages/Admin/InfoCompany";
import JobManager from "../pages/Admin/JobManager";
import CreateJob from "../pages/Admin/JobManager/CreateJob";
import DetailJobAdmin from "../pages/Admin/JobManager/DetailJob";
import CVManage from "../pages/Admin/CV-manage";
import DetailCVAmin from "../pages/Admin/CV-manage/DetailCVAdmin";

export const routes = [
  // Public
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "job/:id",
        element: <JobDetail />,
      },
      {
        path: "company",
        element: <Company />,
      },
      {
        path: "company/:id",
        element: <CompanyDetail />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },

  //End Public

  // Private
  {
    element: <PrivateRouter />,
    children: [
      {
        element: <LayoutAdmin />,
        children: [
          {
            path: "admin",
            element: <DashBoard />,
          },
          {
            path: "info-company",
            element: <InfoCompany />,
          },
          {
            path: "job-manager",
            element: <JobManager />,
          },
          {
            path: "create-job",
            element: <CreateJob />,
          },
          {
            path: "detail-job/:id",
            element: <DetailJobAdmin />,
          },
          {
            path: "cv-manage",
            element: <CVManage />,
          },
          {
            path: "detail-cv/:id",
            element: <DetailCVAmin />,
          },
        ],
      },
    ],
  },
];
