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
import AllUsers from "../pages/Dashboard/AllUsers";
import AddClass from "../pages/Dashboard/AddClass";
import MyClass from "../pages/Dashboard/MyClass";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";
import ManageClass from "../pages/Dashboard/ManageClass";
import Classes from "../pages/Classes/Classes";
import FeedBack from "../pages/Dashboard/FeedBack";
import SelectedClass from "../pages/Dashboard/StudentDashboard/SelectedClass";
import EnrollClass from "../pages/Dashboard/StudentDashboard/EnrollClass";
import PymentHistory from "../pages/Dashboard/StudentDashboard/PymentHistory";
import Payment from "../pages/Dashboard/StudentDashboard/Payment";

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
        element: <Instructors></Instructors>,
      },
      {
        path: "/classes",
        element: <Classes></Classes>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>{" "}
      </PrivateRoute>
    ),
    children: [
      {
        path: "userhome",
        element: <UserHome></UserHome>,
      },
      {
        path: "manage-class",
        element: (
          <AdminRoute>
            <ManageClass></ManageClass>
          </AdminRoute>
        ),
      },
      {
        path: "allusers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path:'feedback/:id',
     element: <AdminRoute><FeedBack></FeedBack></AdminRoute>
    },
      {
        path: "myclass",
        element: (
          <InstructorRoute>
            <MyClass></MyClass>
          </InstructorRoute>
        ),
      },
      {
        path: "addclasses",
        element: (
          <InstructorRoute>
            <AddClass></AddClass>
          </InstructorRoute>
        ),
      },
      {
        path: "select-class",
        element: <PrivateRoute><SelectedClass></SelectedClass></PrivateRoute>,
      },
      {
        path: "enroll-class",
        element: <PrivateRoute><EnrollClass></EnrollClass></PrivateRoute>,
      },
      {
        path: "pyment-class",
        element: <PrivateRoute><PymentHistory></PymentHistory></PrivateRoute>,
      },
      {
        path: "pyment-class/:id",
        element: <PrivateRoute><Payment></Payment></PrivateRoute>,
      },
    ],
  },
]);

// TODO: Private Route Apply
