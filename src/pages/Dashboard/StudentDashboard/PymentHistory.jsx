import React from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const PymentHistory = () => {
  const {user} = useAuth()
  const [axiosSecure] = useAxiosSecure();
  const { data: payment = [], refetch } = useQuery(['payment'], async () => {
      const res = await axiosSecure.get(`/payment/${user?.email}`);
      return res.data;
  });
   
  return (
    <div className='w-[80%]'>
      <h2 className='text-3xl font-semibold my-4'>Pyment History :: {payment.length } </h2>
      {
        payment.map((pay, i)=><>
        <div className='flex border-red-400' key={i}>
          <p className='w-1/2 border-4'><strong>Class Name:</strong> {pay.className}</p>
          <p className='w-1/2 border-4'><strong>TNX ID:</strong> {pay.transactionId}</p>
        </div>
        </>)
      }
    </div>
  )
}

export default PymentHistory