import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/authProvider";

import SocialLogin from "../../Shared/SocialLogin";

const Login = () => {
  return (
    <>
      <div>
        <div className="px-4 flex flex-col items-center min-h-screen py-6 pt-6 sm:justify-center sm:pt-0 bg-gray-50">
          <div>
            <h2 className="text-center text-2xl font-semibold py-4">
              Login Now
            </h2>
          </div>
          <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
            <form>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xl pb-1 font-medium text-gray-700 mt-2"
                >
                  Email
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="email"
                    name="email"
                    className="py-2 px-2 input input-bordered w-full mt-1 block"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-xl pb-1 font-medium text-gray-700 mt-2"
                >
                  Password
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="password"
                    name="password"
                    className="py-2 px-2 input input-bordered w-full mt-1 block"
                  />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600 font-semibold">
                  Login
                </button>
              </div>
            </form>
            <div className="mt-4 text-grey-600">
              Don't have an account?{" "}
              <span>
                <Link
                  to="/register"
                  className="text-purple-600 hover:underline"
                >
                  Register
                </Link>
              </span>
            </div>
            <div className="flex items-center w-full my-4">
              <hr className="w-full" />
              <p className="px-3 ">OR</p>
              <hr className="w-full" />
            </div>
            <div className="my-6 space-y-2">
              <SocialLogin></SocialLogin>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
