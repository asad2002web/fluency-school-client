import { FaBookOpen, FaBookReader, FaHome, FaPaypal, FaUsers } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructors";

const Dashboard = () => {
  const { user } = useAuth();
  // TODO: load data from the server to have dynamic isAdmin based on Data
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor()
  // const isInstructors = true;
  return (
    <section>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <Outlet></Outlet>
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            {user && isAdmin ? (
              <>
               <li className="text-xl font-semibold">
                  <img className="w-24" src={user.photoURL} alt="" />
                </li>
                <li className="text-xl font-semibold my-4">Admin</li>
                <li className="text-xl my-5">{user.email}</li>
                <li>
                  <Link to="manage-class">
                    <FaBookReader></FaBookReader> Manage Classes
                  </Link>
                </li>
                <li>
                  <Link to="allusers">
                    <FaUsers></FaUsers> Manage Users
                  </Link>
                </li>
              </>
            ) : user && isInstructor ? (
              <>
               <li className="text-xl font-semibold">
                  <img className="w-24" src={user.photoURL} alt="" />
                </li>
                <li className="text-xl my-5">{user.email}</li>
                <li className="text-xl font-semibold my-4">Instructor</li>
                <li>
                  <Link to="addclasses">
                    <FaBookReader></FaBookReader> Add A Class
                  </Link>
                </li>
                <li>
                  <Link to="myclass">
                    <FaBookOpen></FaBookOpen> My Classes
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="text-xl font-semibold">
                  <img className="w-24" src={user.photoURL} alt="" />
                </li>
                <li className="text-xl my-5">{user.email}</li>
                <li className="text-xl font-semibold my-5">Student</li>
                <li>
                  <Link to="select-class">
                    <FaBookReader></FaBookReader> My Selected Class
                  </Link>
                </li>
                <li>
                  <Link to="enroll-class">
                    <FaUsers></FaUsers> My Enrolled Class
                  </Link>
                </li>
                <li>
                  <Link to="pyment-class">
                    <FaPaypal></FaPaypal> Pyment History
                  </Link>
                </li>
              </>
            )}

            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <FaHome></FaHome> Home
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
