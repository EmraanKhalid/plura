import AgencyDetails from '@/components/forms/agency-details'
import UserDetails from '@/components/forms/user-details'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs'
import React from 'react'

type Props = {
    params:{agencyId: string}
}

const SettingsPage = async ({params}: Props) => {
    const authUser = await currentUser();
    if(!authUser) return null
    const userDetails = await db.user.findUnique({
        where:{
            email: authUser.emailAddresses[0].emailAddress,
    },
})

    if(!userDetails) return null
    const agencyDetaills = await db.agency.findUnique({
        where:{
            id:params.agencyId,
        },
        include:{
            SubAccount: true
        }
    })
    if(!agencyDetaills) return null

    const subAccounts = agencyDetaills.SubAccount


  return (
    <div className='flex lg:!flex-row flex-col gap-4'>
        <AgencyDetails data={agencyDetaills}/>
        <UserDetails type="agency" id={params.agencyId}
        subAccounts = {subAccounts}
        userData = {userDetails}
        />
    </div>
  )
}

export default SettingsPage