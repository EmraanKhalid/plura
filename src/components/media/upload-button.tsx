'use client'
import UploadMediaForm from '@/components/forms/upload-media'
import CustomModal from '@/components/global/custom-modal'
import { Button } from '@/components/ui/button'
import { useModal } from '@/providers/modal-provider'
import React from 'react'

type Props = {
    subaccountId: string
}

const MediaUploadButton = ({subaccountId}: Props) => {
    const {isOpen, setOpen, setClose} = useModal();
    const handleClick = () =>{
        setOpen(
            <CustomModal title='Upload Media' subheading='Upload A file to your Media bucket'
            >
                <UploadMediaForm subaccountId={subaccountId}></UploadMediaForm>
            </CustomModal>
        );
    }

  return (
    <Button onClick={handleClick}>Upload</Button>
  )
}

export default MediaUploadButton