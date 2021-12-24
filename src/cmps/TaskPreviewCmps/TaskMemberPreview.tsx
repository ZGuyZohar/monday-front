import { useRef } from "react"

export function TaskMemberPreview({ payload, sendEditInfo }: { payload: any, sendEditInfo: any }) {

    const elCmp = useRef<any>(null);
    
    const setEditInfo = (): void => {
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
            members preview
        </div>
    )
}
