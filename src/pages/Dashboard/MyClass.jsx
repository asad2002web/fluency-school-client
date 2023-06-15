import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const MyClasse = () => {
  const { user } = useAuth();

  const [axiosSecure] = useAxiosSecure();
  const { data: allclass = [], refetch } = useQuery(['allclass'], async () => {
      const res = await axiosSecure.get(`/myclass/${user?.email}`)
      return res.data;
      refetch()
  })
//  handle Delete
const handleDelete = (id) => {

  Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
      if (result.isConfirmed) {
          axiosSecure.delete(`/myclass/${id}`, {
              method: 'DELETE'
          })
              .then(data => {
                  if (data.data.deletedCount) {
                      Swal.fire(
                          'Deleted!',
                          'Your Toy has been deleted.',
                          'success'

                      )
                      refetch()
                  }
              })
      }
  })

}
  return (
    <>
      <div>
        <h2 className="my-4 text-2xl font-semibold">
          Totall classess : {allclass.length}
        </h2>
      </div>
      <hr />
      <div className="border-2 w-2/3">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Stutus</th>
                <th>FeedBack</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allclass.map((classes, i) => (
                <tr className="bg-base-200">
                  <th>{i + 1}</th>
                  <td>
                    <img className="w-12 h-12" src={classes.imageURL} alt="" />
                  </td>
                  <td>{classes.className}</td>
                  <td>{classes?.stutus}</td>
                  <td>{classes?.feedback}</td>
                  <td><button onClick={()=>handleDelete(classes._id)} className="btn btn-square bg-indigo-200">
  <FaTrash></FaTrash>
</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyClasse;
