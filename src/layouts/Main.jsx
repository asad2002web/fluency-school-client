import React from "react";
import Navbar from "../Shared/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Main = () => {
  return (
    <div className="px-12 bg-slate-100">
      <Navbar></Navbar>
      <div className='md:min-h-[calc(100vh-361px)] bg-slate-100'>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
};

export default Main;
