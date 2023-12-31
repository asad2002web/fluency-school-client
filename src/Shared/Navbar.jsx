import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../src/assets/logo/logo-white.png";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { logOut, user } = useAuth();
  // console.log(user);
  // sing out
  const handleSignOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };
  const navOptions = (
    <>
      <li>
        <Link>Home</Link>
      </li>
      <li>
        <Link to='/instructors'>Instructors</Link>
      </li>
      <li>
        <Link to='/classes'>Classes</Link>
      </li>
      {
        user ? <li>
        <Link to='/dashboard'>Dashboard</Link>
      </li> : ''
      }
    </>
  );
  return (
    <div className="navbar bg-slate-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu text-xl menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navOptions}
          </ul>
        </div>
        <Link to="/" className=" normal-case text-xl">
          <img src={Logo} alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-xl">{navOptions}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
          <img
          src={user?.photoURL}
          
          title={user.displayName}
          alt=""
          className="w-10 h-10 rounded-full mr-4 "
        />
          <Link onClick={handleSignOut} to="/" className="btn">
            Log Out
          </Link> </>
        ) : (
          <Link to="/login" className="btn">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
