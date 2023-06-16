import React from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import CheckoutForm from "./Payment/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_PK);

const Payment = () => {
  const { id } = useParams();
  //   console.log(id);
  const [axiosSecure] = useAxiosSecure();
  const { data: select = [], refetch } = useQuery(["select"], async () => {
    const res = await axiosSecure.get(`/selected/${id}`);
    return res.data;
  });

  const newItem = select?.find((item) => item._id === id);

  return (
    <>
      <div className="w-1/2">
        {select.map((item) => (
          <>
            <h2 className="text-2xl font-semibold">
              Class Name: {item.className}
            </h2>
            <h2 className="text-xl">Instructor Name: {item.InstructorName}</h2>
            <h2 className="text-xl">Price Payment: {item.price}</h2>
            <Elements stripe={stripePromise}>
        <CheckoutForm price={item.price}></CheckoutForm>
      </Elements>
          </>
        ))}
      </div>
      <div className="my-6"></div>
      
    </>
  );
};

export default Payment;
