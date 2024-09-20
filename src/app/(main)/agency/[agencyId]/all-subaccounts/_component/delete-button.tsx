'use client'
import { deleteSubAccount, getSubaccountDetails, saveActivityLogsNotification } from '@/lib/queries'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
    subaccountId: string
}

const DeleteButton = ({subaccountId}: Props) => {
    const router = useRouter();
    const deleteBtn = async () => {
        const response = await getSubaccountDetails(subaccountId);
        await saveActivityLogsNotification({agencyId:undefined, 
            description: `Deleted a Sub Account | ${response?.name}`,
            subaccountId
        })
        await deleteSubAccount(subaccountId);
        router.refresh();

    }
  return (
    <div onClick={deleteBtn}>Delete Sub Account</div>
  )
}

export default DeleteButton