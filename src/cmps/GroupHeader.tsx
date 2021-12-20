import React from "react";
import { FunctionBody } from "typescript";
import { DynamicCmp } from "../models/cmp.model";
import { GroupHeaderTitle } from "./GroupHeadersCmps/GroupHeaderTitle";
import { HeadDatePicker as DatePicker } from "./GroupHeadersCmps/HeadDatePicker";
import { HeadMemberPicker as MemberPicker } from "./GroupHeadersCmps/HeadMemberPicker";
import { HeadStatusPicker as StatusPicker } from "./GroupHeadersCmps/HeadStatusPicker";
const dynamicCmps: any = { DatePicker, MemberPicker, StatusPicker }

export function GroupHeader({ cmpsOrder, title, groupTitleUpdated }: { cmpsOrder: DynamicCmp[] | undefined, title: string, groupTitleUpdated: any }) {

    const getDynamicCmp = (cmp: DynamicCmp) => {
        console.log(cmp);
        const Cmp = dynamicCmps[cmp.type]
        return <Cmp key={cmp.id} styles={cmp.styles} />
    }

    return (
        <article className="group-header flex">
            <GroupHeaderTitle groupTitleUpdated={groupTitleUpdated} title={title} />
            {cmpsOrder && cmpsOrder.map(cmp => getDynamicCmp(cmp))}
        </article>
    )
}
