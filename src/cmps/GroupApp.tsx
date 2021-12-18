import { useAppSelector } from "../hooks/useAppSelector";
import { Group } from "../models/group.model";
import { GroupHeader } from "./GroupHeader";
import { TaskPreview } from "./TaskPreview";

export function GroupApp({group} : {group: Group}) {

    const cmpsOrder: string[] | undefined = useAppSelector(state => state.boardSlice.currBoard?.cmpsOrder)
    //*NOTE - changing cmpsorder happens here or in workspace
    
    return (
        <article className="group-app m-10 flex flex-col">
            <GroupHeader cmpsOrder={cmpsOrder} title={group.title} />
            {group.tasks.map(task => <TaskPreview task={task} key={task.id} cmpsOrder={cmpsOrder} />)}
        </article>
    )
}
