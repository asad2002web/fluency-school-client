import React from "react";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ManageClass = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: allclass = [], refetch } = useQuery(["allclass"], async () => {
    const res = await axiosSecure.get("/allclass");
    return res.data;
  });

  const handleApproved = (id) => {
      const updateApp = { stutus: 'approved' };
      axiosSecure
          .patch(`/allclass/${id}`, updateApp)
          .then((response) => {
              if (response.data.modifiedCount > 0) {

                  Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: ` is approved Now!`,
                      showConfirmButton: false,
                      timer: 1500,
                  });
                  refetch();
              }
          })
          .catch((error) => {
              console.log(error);
          });
  };

  const handleDenied = (id) => {
      const updateApp = { stutus: 'denied' };
      axiosSecure
          .patch(`/allclass/${id}`, updateApp)
          .then((response) => {
              if (response.data.modifiedCount > 0) {

                  Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: `is  denied Now!`,
                      showConfirmButton: false,
                      timer: 1500,
                  });
                  refetch();
              }
          })
          .catch((error) => {
              console.log(error);
          });
  };

  return (
    <section>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Class Info</th>
              <th>Price</th>
              <th> Available seats</th>
              <th>Status</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allclass.map((item, index) => (
              <tr
                className="bg-slate-200"
                key={item._id}
              >
                <th>{index + 1}</th>
                <td>
                  <div>
                    <div className="font-bold">{item.InstructorName}</div>
                    <div className="text-sm opacity-50">{item.email}</div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center space-x-3 gap-5">
                    <div className="avatar">
                      <div className="mask mask-squircle w-20 h-20">
                        <img src={item.imageURL} />
                      </div>
                    </div>
                    <div>
                      <div className=" text-xl">{item.className}</div>
                    </div>
                  </div>
                </td>
                <td>{item.price}</td>
                <td>{item.availableSeat}</td>
                <td>{item.stutus}</td>
                <td>
                  <div className="flex flex-col gap-3">
                    <button
                      className="btn btn-sm btn-outline btn-success"
                      onClick={() => handleApproved(item._id)}
                    >
                      approved
                    </button>
                    <button
                      className="btn btn-sm btn-outline btn-error"
                      onClick={() => handleDenied(item._id)}
                    >
                      denied
                    </button>
                    <Link to={`/dashboard/feedback/${item._id}`}>
                      <button className="btn btn-sm btn-outline btn-warning">
                        feedback
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageClass;
