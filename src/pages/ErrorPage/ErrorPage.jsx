import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div class="h-screen w-screen bg-gray-100 flex items-center">
      <div class="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
        <div class="max-w-md">
          <img src="https://i.ibb.co/87pY9Vr/pngegg.png" alt="" />
          <p class="text-2xl md:text-3xl font-light leading-normal">
            Sorry we couldn't find this page.{" "}
          </p>
          <p class="mb-8">
            But dont worry, you can find plenty of other things on our homepage.
          </p>

          <Link
            to="/"
            class="mx-auto block text-center px-4 py-2 text-sm font-medium  text-white  rounded-lg w-1/2 bg-blue-600 active:bg-blue-600 hover:bg-blue-700"
          >
            back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
