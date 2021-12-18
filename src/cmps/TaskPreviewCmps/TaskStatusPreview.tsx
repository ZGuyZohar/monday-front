import { useEffect, useState } from "react"
import { Status } from "../../models/status.model"
export function TaskStatusPreview({ payload }: { payload: any }) {
    
    const [status, setStatus] = useState(null)
    const statuses = payload.cmp.info.statuses

    useEffect(()=>{ 
        let currId : string = payload.taskInfo
        if(!currId) currId = statuses[3].id
        setLabelById(currId)
    }, [])

    const setLabelById = (id: string) => {
        const status = statuses.find((currStatus: Status) => currStatus.id === id)
        setStatus(status)
    }

    const getColor = () => {

    }

    return (
        <div style={{ width: `${payload.cmp.styles.width || 130 }px` }} className="mx-2 px-2 dynamic-preview" >
            status preview
        </div>
    )
}
