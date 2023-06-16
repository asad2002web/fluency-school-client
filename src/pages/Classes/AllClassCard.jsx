import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const AllClassCard = ({ allclass }) => {
  const { _id, InstructorName, availableSeat, price, className, imageURL } =
    allclass;
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [error, setError] = useState("");
  const handleSelect = () => {
    const selected = {
      InstructorName,
      availableSeat: parseInt(availableSeat),
      price,
      className,
      imageURL,
      user: user?.email,
    };

    axiosSecure
      .post("/select", selected)
      .then((response) => {
        console.log(response);
        if (response.data.insertedId) {
          Swal.fire("", "Class Added!", "success");
        }
      })
      .catch((error) => {
        setError(error);
        toast.warn("Allready added !", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 500,
        });
      });
  };


  return (
    <div className="card bg-base-100 shadow mx-2 w-78">
      <figure>
        <img src={imageURL} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Name: {className}</h2>
        <p>Instructor Name: {InstructorName}</p>
        <p>Available Seat: {availableSeat}</p>
        <p>Price: {price}</p>
        <p>
          <button onClick={() => handleSelect(_id)} className="btn btn-primary">
            Select Class
          </button>
        </p>
      </div>
    </div>
  );
};

export default AllClassCard;
