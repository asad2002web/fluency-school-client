import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import AllClassCard from "./AllClassCard";

const Classes = () => {

  const [axiosSecure] = useAxiosSecure();
  const { data: classes = [], refetch } = useQuery(['allclass'], async () => {
      const res = await axiosSecure.get('/allclass');
      return res.data;
  });
  
  const approveClass = classes.filter((item) => item.stutus === 'approved');

  return (
    <div>
      <div>
        <h2 className="my-5 text-2xl text-center font-semibold">
          Here are Our Classes: {approveClass.length}
        </h2>
      </div>
     <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3  md:mx-auto w-full mt-10'>
                {approveClass.map((allclass) => <AllClassCard allclass={allclass} key={allclass._id}></AllClassCard> )}
               
            </div>
    </div>
  );
};

export default Classes;
