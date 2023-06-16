// import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllUsers = () => {
  // const [allUsers, setAllUsers] = useState([]);
  let isMakeAdminDisabled = false;
  let isMakeInstructorDisabled = false;

  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await fetch("https://fluency-scholl-server-asad2002web-gmailcom.vercel.app/users");
    return res.json();
  });
  // useEffect(() => {
  //   fetch("http://localhost:4000/users")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setAllUsers(data);
  //     });
  // }, []);

  const handleMakeAdmin = (user) => {
    fetch(`http://localhost:4000/users/admin/${user._id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ role: 'admin' })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
      isMakeInstructorDisabled = true
  };

  const handleMakeInstructor = (user) => {
    fetch(`http://localhost:4000/${user._id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ role: 'instructor' })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
      isMakeAdminDisabled = true;
  };

  return (
    <>
      <div>Totall Users : {users.length}</div>
      <hr />
      <div className="overflow-x-auto w-3/4">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Make Admin</th>
              <th>Make Instructor</th>
            </tr>
          </thead>
          {users.map((user, i) => (
            <tbody key={i}>
              <tr className="bg-base-200">
                <td>{i + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "admin"
                  ) : (
                    <button onClick={() => handleMakeAdmin(user)} disabled={isMakeAdminDisabled} className="btn btn-ghost bg-orange-600">
                    Make Admin
                  </button>
                  )}
                </td>
                <td>
                {user.role === "instructor" ? (
                    "instructor"
                  ) : (
                    <button onClick={() => handleMakeInstructor(user)} disabled={isMakeInstructorDisabled} className="btn btn-ghost bg-orange-600">
                    Make Admin
                  </button>
                  )}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
};

export default AllUsers;
