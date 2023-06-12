import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Instructors from "../pages/Instructors/Instructors";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layouts/Dashboard";
import UserHome from "../pages/Dashboard/UserHome";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/instructors",
        element: <PrivateRoute><Instructors></Instructors></PrivateRoute>,
      },
    ],
  },
  {
    path:'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard> </PrivateRoute>,
    children:[
      {
        path:"userhome",
        element:<UserHome></UserHome>
      }
    ]
  }
]);
