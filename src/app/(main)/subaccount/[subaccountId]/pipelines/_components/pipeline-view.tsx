'use client'

import LaneForm from '@/components/forms/lane-form'
import CustomModal from '@/components/global/custom-modal'
import { Button } from '@/components/ui/button'
import { LaneDetail, PipelineDetailsWithLanesCardsTagsTickets, TicketAndTags } from '@/lib/types'
import { useModal } from '@/providers/modal-provider'
import { Lane, Ticket } from '@prisma/client'
import { Flag, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { DragDropContext,DropResult,Droppable} from 'react-beautiful-dnd'
import PipelineLane from './pipeline-lane'

type Props = {
    lanes: LaneDetail[]
    pipelineId: string
    subaccountId: string
    pipelineDetails: PipelineDetailsWithLanesCardsTagsTickets
    updateLanesOrder: (lanes: Lane[]) => Promise<void>
    updateTicketOrder: (tickets: Ticket[]) => Promise<void>
}

const PipelineView = ({lanes,pipelineId,subaccountId,pipelineDetails,
    updateLanesOrder,updateTicketOrder
}: Props) => {
    const { setOpen } = useModal()
    const router = useRouter();
    const [allLanes, setAllLanes] = useState<LaneDetail[]>([]);

    useEffect(()=>{
        setAllLanes(lanes);
    },[lanes])

    const ticketsFromAllLanes: TicketAndTags[] = []
    lanes.forEach((item)=>{
        item.Tickets.forEach((i)=>{
            ticketsFromAllLanes.push(i)
        })
    })

    const [allTickets,setAllTickets] = useState(ticketsFromAllLanes);

    const handleAddLane = () => {
        setOpen(
            <CustomModal title='Create A Lane' 
            subheading='Lanes are allowd you to group tickets'>
                <LaneForm pipelineId={pipelineId}/>
            </CustomModal>
        );
    };

  return (
    <DragDropContext onDragEnd={()=>{}}>
        <div className='bg-white/60 dark:bg-background/60 rounded-xl p-4
        use-automation-zoom-in '>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl'>{pipelineDetails?.name}</h1>
                <Button className='flex items-center gap-4' onClick={handleAddLane}>
                    <Plus size={15}/>
                    Create Lane
                </Button>
            </div>
            <Droppable droppableId='lanes'
                type='lane'
                direction='horizontal'
                key="lanes">
                    {(provided)=>(
                        <div className='flex items-center gap-x-2 overflow-auto'
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        >
                            <div className='flex mt-4'>
                                {allLanes.map((lane,index)=>(
                                    <PipelineLane
                                    allTickets={allTickets}
                                    setAllTickets={setAllTickets}
                                    subaccountId={subaccountId}
                                    pipelineId={pipelineId}
                                    tickets={lane.Tickets}
                                    laneDetails={lane}
                                    index={index}
                                    key={lane.id} />
                                ))}
                                {provided.placeholder}
                            </div>
                        </div>
                    )}

                </Droppable>
                {allLanes.length === 0 && (
                    <div className="flex items-center justify-center w-full flex-col">
                        <div className='opacity-100'>
                            <Flag width="100%" height="100%" className='text-muted-foreground'/>
                        </div>
                    </div>
                )}
        </div>
    </DragDropContext>
  )
}

export default PipelineView