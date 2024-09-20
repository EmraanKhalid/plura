'use client'

import SubAccountDetails from '@/components/forms/subaccount-details'
import CustomModal from '@/components/global/custom-modal'
import { Button } from '@/components/ui/button'
import { useModal } from '@/providers/modal-provider'
import { Agency, AgencySidebarOption, SubAccount, User } from '@prisma/client'
import { PlusCircleIcon } from 'lucide-react'
import React from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
    user: User &{
        Agency: |(|Agency | (null & {
            SubAccount: SubAccount[]
            SidebarOption: AgencySidebarOption[]
        }))
        | null
    }
    id: string
    className: string
}

const CreateSubAccountBtn = ({className, id, user}: Props) => {
    const {setOpen} = useModal();
    const agencyDetails = user.Agency;
    if(!agencyDetails) return;
    const handleClick = () => {
        setOpen(
            <CustomModal title='Create A Sub Account' subheading='You can Switch between subAccounts'>
                <SubAccountDetails agencyDetails={agencyDetails} userId={user.id}
                userName={user.name}/>
            </CustomModal>
        )
    }
  return (
    <Button className={twMerge("w-full flex gap-4",className)} 
    onClick={handleClick}>
        <PlusCircleIcon size={15}/>
        Create Sub Account
    </Button>
  )
}

export default CreateSubAccountBtn