import React from 'react'
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const EnrollClass = () => {
  const {user} = useAuth()
  const [axiosSecure] = useAxiosSecure();
  const { data: enrolled = [], refetch } = useQuery(['enroll'], async () => {
      const res = await axiosSecure.get(`/payment/${user?.email}`);
      return res.data;
  });
  return (
    <div className='w-[80%] bg-slate-200 p-6'>
      <div><h3 className='text-2xl font-semibold my-4'>Enroll Class :: {enrolled.length}</h3></div>
      <div>
        <table className='table'>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Coarse Name</th>
          </tr>
          {
            enrolled.map((enroll, i)=><tr key={i}>
            <th>{i +1}</th>
            <th>
              <img className='w-16 h-16 rounded-md' src={enroll.imageURL} alt="" />
            </th>
            <th>{user?.displayName}</th>
            <th>{enroll.className}</th>
          </tr>)
          }
        </table>
      </div>
    </div>
  )
}

export default EnrollClass