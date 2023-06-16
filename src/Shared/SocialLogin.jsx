import React, { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        const loggedGoogle = result.user;
        console.log(loggedGoogle);

        const saveUser = {
          name: loggedGoogle.displayName,
          email: loggedGoogle.email,
          photo: loggedGoogle.photoURL,
          role: 'student'
        };
        fetch("https://fluency-scholl-server-asad2002web-gmailcom.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then(() => {
            navigate(from, { replace: true });
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <button
      onClick={handleGoogleLogin}
      aria-label="Login with Google"
      type="button"
      className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
    >
      <FaGoogle></FaGoogle>
      <p>Login with Google</p>
    </button>
  );
};

export default SocialLogin;
