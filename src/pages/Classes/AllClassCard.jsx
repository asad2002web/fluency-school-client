import React from "react";

const AllClassCard = ({ allclass }) => {
  const {InstructorName,availableSeat,price,className, imageURL } = allclass;
  // console.log("allclass")
  return (
    <div className="card bg-base-100 shadow mx-2 w-78">
      <figure>
        <img src={imageURL} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          Name: {className}
        </h2>
        <p>Instructor Name: {InstructorName}</p>
        <p>Available Seat: {availableSeat}</p>
        <p>Price: {price}</p>
        <p>
            <button className="btn btn-primary">Select Class</button>
        </p>
        
      </div>
    </div>
  );
};

export default AllClassCard;
