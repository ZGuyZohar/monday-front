import { useAppSelector } from "../hooks/useAppSelector";
import { DynamicCmp } from "../models/cmp.model";
import { Group } from "../models/group.model";
import { GroupHeader } from "./GroupHeader";
import { TaskPreview } from "./TaskPreview";
import { TaskCompose } from "./TaskCompose";
import { Task } from "../models/task.model";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { saveGroup, saveTask } from "../store/slices/board-slice";

export function GroupApp({ group, boardId }: { group: Group, boardId: string }) {
    const dispatch = useAppDispatch()
    const cmpsOrder: DynamicCmp[] | undefined = useAppSelector(state => state.boardSlice.currBoard?.cmpsOrder)

    //*NOTE - changing cmpsorder happens here or in workspace
    const addTask = (task: Task): void => {
        if (!task.groupId) task.groupId = group.id
        if (!task.boardId) task.boardId = boardId
        dispatch(saveTask(task))
    }

    const groupTitleUpdated = (title: string): void => {
        console.log('groupTitleUpdated, title:', title);
        const groupToSave = { ...group, title }
        dispatch(saveGroup(groupToSave))
    }

    return (
        <article className="group-app my-10 flex flex-col">
            <GroupHeader groupTitleUpdated={groupTitleUpdated} cmpsOrder={cmpsOrder} title={group.title} />
            {group.tasks.map(task => <TaskPreview task={task} key={task.id} cmpsOrder={cmpsOrder} />)}
            <TaskCompose addTask={addTask} />
        </article>
    )
}
