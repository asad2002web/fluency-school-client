import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../../Shared/SocialLogin";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const onSubmit = (data) => {
console.log(data)
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);

      // updateUserProfile(data.name, data.photoURL);
      updateUserProfile(data.name, data.photoURL).then(() => {
        const saveUser = { name: data.name, email: data.email, role: 'student'};
        fetch("http://localhost:4000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              reset();
              Swal.fire(
                'Welcome!',
                'Your Registation Succesfull !',
                'success'
              )
              navigate("/");
            }
          })
          .catch((error) => console.log(error));
      });
    });
  };

  return (
    <>
      <Helmet>
        <title>Fluency | Register</title>
      </Helmet>
      <div>
        <div className="flex flex-col items-center min-h-screen py-6 pt-6 sm:justify-center sm:pt-0 bg-gray-50">
          <div>
            <h2 className="text-center text-2xl font-semibold py-4">
              Register Now
            </h2>
          </div>
          <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm pb-1 font-medium text-gray-700 mt-2"
                >
                  Name
                </label>
                <div className="flex flex-col items-start">
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    name="name"
                    className="py-2 px-2 input input-bordered w-full mt-1 block"
                  />
                  {errors.name && (
                    <span className="text-red-600">Name is required</span>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm pb-1 font-medium text-gray-700 mt-2"
                >
                  Email
                </label>
                <div className="flex flex-col items-start">
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    name="email"
                    className="py-2 px-2 input input-bordered w-full mt-1 block"
                  />{" "}
                  {errors.email && (
                    <span className="text-red-600">Email is required</span>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm pb-1 font-medium text-gray-700 mt-2"
                >
                  Password
                </label>
                <div className="flex flex-col items-start">
                  <input
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern:
                        /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                    })}
                    type="password"
                    name="password"
                    className="py-2 px-2 input input-bordered w-full mt-1 block"
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-red-600">Password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-600">
                      Password must be 6 characters
                    </p>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <p className="text-red-600">
                      Password must be less than 20 characters
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-600">
                      Password must have one Uppercase one lower case, one
                      number and one special character.
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm pb-1 font-medium text-gray-700 mt-2"
                >
                  Confirm Password
                </label>
                <div className="flex flex-col items-start">
                  <input
                    {...register("confirmPassword", {
                      required: true,
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    type="password"
                    name="confirmPassword"
                    className="py-2 px-2 input input-bordered w-full mt-1 block"
                  />
                  {errors.confirmPassword?.type && (
                    <span className="text-red-500">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="photoURL"
                  className="block text-sm pb-1 font-medium text-gray-700 mt-2"
                >
                  Upload Profile Photo URL
                </label>
                <div className="flex flex-col items-start">
                  <input
                    {...register("photoURL", { required: true })}
                    type="text"
                    name="photoURL"
                    className=" file-input file-input-bordered w-full mt-1 block"
                  />
                  {errors.photoURL && (
                    <span className="text-red-600">Photo URL is required</span>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="mobile"
                  className="block text-sm pb-1 font-medium text-gray-700 mt-2"
                >
                  Mobile Number
                </label>
                <div className="flex flex-col items-start">
                  <input
                    {...register("mobile", { required: true })}
                    type="text"
                    name="mobile"
                    className=" file-input file-input-bordered w-full mt-1 block"
                  />
                </div>
              </div>

              <div className="flex items-center mt-4">
                <button
                  type="submit"
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600 font-semibold"
                >
                  Register
                </button>
              </div>
            </form>
            <div className="mt-4 text-grey-600">
              Already have an account?{" "}
              <span>
                <Link to="/login" className="text-purple-600 hover:underline">
                  Log in
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

export default Register;
