import React from "react";
import { GroupHeaderTitle } from "./GroupHeadersCmps/GroupHeaderTitle";
import { HeadDatePicker as DatePicker } from "./GroupHeadersCmps/HeadDatePicker";
import { HeadMemberPicker as MemberPicker } from "./GroupHeadersCmps/HeadMemberPicker";
import { HeadStatusPicker as StatusPicker } from "./GroupHeadersCmps/HeadStatusPicker";
const dynamicCmps: any = { DatePicker, MemberPicker, StatusPicker}

export function GroupHeader({cmpsOrder, title}: {cmpsOrder: string[] | undefined, title: string }) {

    const getDynamicCmp = (cmp: string) => {
        const Cmp = dynamicCmps[cmp]
        return <Cmp key={cmp} />
    }

    return (
        <section className="group-header flex">
          <GroupHeaderTitle title={title} />
          {cmpsOrder && cmpsOrder.map(cmp => getDynamicCmp(cmp))}
        </section>
    )
}
