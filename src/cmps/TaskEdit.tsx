import { useEffect } from "react";
import { DynamicCmp } from "../models/cmp.model"
import { TaskStatusEdit as StatusPicker } from "./TaskEditCmps/TaskStatusEdit"
import { TaskMemberEdit as MemberPicker } from "./TaskEditCmps/TaskMemberEdit";
import { TaskDateEdit as DatePicker } from "./TaskEditCmps/TaskDateEdit";
import { StyledTaskEdit } from "../styled-cmps/TaskEdit";

const dynamicCmps: any = { StatusPicker, MemberPicker, DatePicker }

export function TaskEdit({ editInfo }: { editInfo: any }) {

    const { top, left } = editInfo.pos

    useEffect(() => {
        console.log(editInfo, 'hey');
    }, [editInfo])

    const getDynamicCmp = () => {
        const { type } = editInfo.cmp        
        const Cmp = dynamicCmps[type]
        return <Cmp/>
    }

    return (
        <StyledTaskEdit top={top} left={left}>
                {getDynamicCmp()}
        </StyledTaskEdit>
    )
}
