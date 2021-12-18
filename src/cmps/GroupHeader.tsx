import React from "react";
import { GroupHeaderTitle } from "./GroupHeadersCmps/GroupHeaderTitle";
import { HeadDatePicker } from "./GroupHeadersCmps/HeadDatePicker";
import { HeadMemberPicker } from "./GroupHeadersCmps/HeadMemberPicker";
import { HeadStatusPicker } from "./GroupHeadersCmps/HeadStatusPicker";
const dynamicCmps : any = {HeadDatePicker, HeadMemberPicker, HeadStatusPicker}

export function GroupHeader({cmpsOrder, title}: {cmpsOrder: string[] | undefined, title: string }) {

    const getDynamicCmp = (cmp: string) => {
        const Cmp = dynamicCmps['Head' + cmp]
        return <Cmp key={cmp} />
    }

    return (
        <section className="group-header flex">
          <GroupHeaderTitle title={title} />
          {cmpsOrder && cmpsOrder.map(cmp => getDynamicCmp(cmp))}
        </section>
    )
}
