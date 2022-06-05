import React, { Dispatch, SetStateAction } from "react";
import { FunctionBody } from "typescript";
import { DynamicCmp } from "../models/cmp.model";
import { GroupHeaderTitle } from "./GroupHeadersCmps/GroupHeaderTitle";
import { HeadDatePicker as DatePicker } from "./GroupHeadersCmps/HeadDatePicker";
import { HeadMemberPicker as MemberPicker } from "./GroupHeadersCmps/HeadMemberPicker";
import { HeadStatusPicker as StatusPicker } from "./GroupHeadersCmps/HeadStatusPicker";
const dynamicCmps: any = { DatePicker, MemberPicker, StatusPicker }

export function GroupHeader({ cmpsOrder, title, groupTitleUpdated, color, dragHandleProps, titleSize, setTitleSize, onTitleResize }: { cmpsOrder: DynamicCmp[] | undefined, title: string, groupTitleUpdated: any, color: string, dragHandleProps: any, titleSize: number, setTitleSize: Dispatch<SetStateAction<number>> | null, onTitleResize: (currSize: number) => void }) {

    const getDynamicCmp = (cmp: DynamicCmp) => {
        const Cmp = dynamicCmps[cmp.type]
        return <Cmp key={cmp.id} styles={cmp.styles} />
    }

    return (
        <article className="group-header flex">
            <GroupHeaderTitle onTitleResize={onTitleResize} titleSize={titleSize} setTitleSize={setTitleSize} dragHandleProps={dragHandleProps} color={color} groupTitleUpdated={groupTitleUpdated} title={title} />
            {cmpsOrder && cmpsOrder.map(cmp => getDynamicCmp(cmp))}
        </article>
    )
}
