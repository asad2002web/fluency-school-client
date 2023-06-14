import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const MyClasse = () => {
    const {user} = useAuth()
  const [myClasses, setMyClasses] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/addedClass/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMyClasses(data);
      });
  }, []);
  return (
    <>
      <div>Totall classess : {myClasses.length}</div>
      <hr />
      <div classesName="overflow-x-auto w-full">
        <table classesName="table">
          {/* head */}
          <thead className="w-full">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Stutus</th>
              <th>FeedBack</th>
            </tr>
          </thead>
          {myClasses.map((user, i) => (
            <tbody key={i}>
              <tr className="bg-base-200">
                <td>{i + 1}</td>
                <td> <img className="w-12 h-12" src={user.imageURL} alt="" /> </td>
                <td>{user.InstructorName}</td>
                <td>{user.stutus}</td>
                <td>{""}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
};

export default MyClasse;
