import React, { useEffect, useState } from "react";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data);
      });
  }, []);
  return (
    <>
      <div>Totall Users : {allUsers.length}</div>
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
          {allUsers.map((user, i) => (
            <tbody>
              <tr className="bg-base-200">
                <td>{i + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td> <button  className="btn btn-ghost bg-orange-600">Make Admin</button></td>
                <td> <button  className="btn btn-ghost bg-orange-600">Make Instructor</button></td>
               
               
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
};

export default AllUsers;
