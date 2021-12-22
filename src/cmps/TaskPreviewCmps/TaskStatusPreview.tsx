import { useEffect, useMemo, useRef, useState } from "react"
import { Status } from "../../models/status.model"


export function TaskStatusPreview({ payload, sendEditInfo }: { payload: any, sendEditInfo: any }) {
    const [status, setStatus] = useState(null)
    const { statuses } = payload.cmp.info
    const elCmp = useRef<any>(null)



    useEffect(() => {
        let currId: string = payload.taskInfo
        if (!currId) currId = statuses[3].id
        setLabelById(currId)
        console.log(payload);

    }, [])

    const setLabelById = (id: string) => {
        const status = statuses.find((currStatus: Status) => currStatus.id === id)
        setStatus(status)
    }

    const getColor = () => {

    }

    const setEditInfo = () : void => {
        const { cmp } = payload
        const modalPos = {
            left: elCmp.current.offsetLeft + (elCmp.current.offsetWidth / 2),
            top: elCmp.current.offsetTop + 20
        }
        const cmpToSend = {
            id: cmp.id,
            info: cmp.info,
            type: cmp.type
        }

        const editInfo = {
            pos: modalPos,
            cmp: cmpToSend
        }
        sendEditInfo(editInfo)
    }

    return (
        <div ref={elCmp} onClick={() => setEditInfo()} style={{ width: `${payload.cmp.styles.width || 130}px` }} className="mx-2 px-2 dynamic-preview" >
            status preview

        </div>
    )
}
