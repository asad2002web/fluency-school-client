import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import InstractorsCard from "./InstractorsCard";

const Instructors = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: instructors = [], refetch } = useQuery(
    ["instructors"],
    async () => {
      const res = await axiosSecure.get("/instructors");
      return res.data;
    }
  );
  return (
    <div>
      <div className="my-5 text-2xl text-center font-semibold">
        Here are Our Provide Classes: {instructors.length}
      </div>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3  md:mx-auto w-full mt-10'>
                {instructors.map((instructor) => <InstractorsCard instructor={instructor} key={instructor._id}></InstractorsCard> )}
               
            </div>
    </div>
  );
};

export default Instructors;
