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
      <div className="border-2 w-1/2">

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
      </tr>
    </thead>
    <tbody>
      {myClasses.map((classes, i) => <tr className="bg-base-200">
        <th>{i+1}</th>
        <td>
          <img className="w-12 h-12" src={classes.imageURL} alt="" />
        </td>
        <td>{classes.className}</td>
        <td>{classes.stutus}</td>
        <td>{""}</td>
      </tr>)}
      
    </tbody>
  </table>
</div>
        
      </div>
    </>
  );
};

export default MyClasse;
