import React from 'react'

const InstractorsCard = ({instructor}) => {
  const {photo,email,name} = instructor;
  return (
    <div className="card bg-base-100 shadow mx-2 w-78">
      <figure>
        <img src={photo} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          Instructor Name: {name}
        </h2>
        <p>Instructor Email: {email}</p>
        
      </div>
    </div>
  )
}

export default InstractorsCard