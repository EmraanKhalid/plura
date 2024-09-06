import React from 'react'

const Page = ({params}:{params:{agencyId:String}}) => {
  return (
    <div>{params.agencyId}</div>
  )
}

export default Page