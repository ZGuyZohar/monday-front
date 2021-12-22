import { useAppSelector } from "../hooks/useAppSelector";
import { DynamicCmp } from "../models/cmp.model";
import { Group } from "../models/group.model";
import { GroupHeader } from "./GroupHeader";
import { TaskPreview } from "./TaskPreview";

export function GroupApp({ group, sendEditInfo }: { group: Group, sendEditInfo: any}) {

    const cmpsOrder: DynamicCmp[] | undefined = useAppSelector(state => state.boardSlice.currBoard?.cmpsOrder)
    //*NOTE - changing cmpsorder happens here or in workspace
    
    return (
        <article className="group-app my-10 pr-7 flex flex-col">
            <GroupHeader cmpsOrder={cmpsOrder} title={group.title} />
            {group.tasks.map(task => <TaskPreview task={task} key={task.id} cmpsOrder={cmpsOrder} sendEditInfo={sendEditInfo}/>)}
        </article>
    )
}
