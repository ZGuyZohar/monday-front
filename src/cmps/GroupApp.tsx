import { useAppSelector } from "../hooks/useAppSelector";
import { Group } from "../models/group.model";
import { GroupHeader } from "./GroupHeader";
import { TaskPreview } from "./TaskPreview";

export function GroupApp({group} : {group: Group}) {

    const cmpsOrder: string[] | undefined = useAppSelector(state => state.boardSlice.currBoard?.cmpsOrder)
    //*NOTE - changing cmpsorder happens here or in workspace
    
    return (
        <article className="group-app m-10">
            <GroupHeader cmpsOrder={cmpsOrder} title={group.title} />
            {/* {group.tasks.map(task => <TaskPreview/>)} */}
        </article>
    )
}

{/* <div className="task-main">
    <TaskTitleHeader />>
        tasks.map(task => <TaskPreviewTitle />)
</div>
<div className="task-cmps">
       cmpOrder.map(cmp => <DynamicCmpHeader />)
       tasks.map(task => <TaskPreview />)
</div> */}