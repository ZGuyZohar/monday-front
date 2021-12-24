import { useAppSelector } from "../hooks/useAppSelector";
import { DynamicCmp } from "../models/cmp.model";
import { Group } from "../models/group.model";
import { GroupHeader } from "./GroupHeader";
import { TaskPreview } from "./TaskPreview";
import { TaskCompose } from "./TaskCompose";
import { Task } from "../models/task.model";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { saveGroup, saveTask } from "../store/slices/board-slice";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { reorder, getItemStyle, getListStyle } from '../services/dnd-service'

export function GroupApp({ group, sendEditInfo, boardId }: { group: Group, sendEditInfo: any, boardId: string }) {
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

    const tasksOrderUpdated = (tasks: Task[]): void => {
        console.log('tasksOrderUpdated, tasks:', tasks);
        const groupToSave = { ...group, tasks }
        console.log('groupToSave', groupToSave);
        dispatch(saveGroup(groupToSave))
    }

    const onDragEnd = (result: any) => {
        console.log('onDragEnd', result);

        // dropped outside the list
        if (!result.destination) {
            return;
        }
        tasksOrderUpdated(reorder(group.tasks, result.source.index, result.destination.index))
    }

    return (
        <article className="group-app my-10 pr-7 flex flex-col">
            {group.id}
            <GroupHeader groupTitleUpdated={groupTitleUpdated} cmpsOrder={cmpsOrder} title={group.title} />
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided: any, snapshot: any) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {group.tasks.map((task, index) => (
                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                    {(provided: any, snapshot: any) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >

                                            <TaskPreview task={task} key={task.id} cmpsOrder={cmpsOrder} sendEditInfo={sendEditInfo} />

                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <TaskCompose addTask={addTask} />
        </article>
    );
}
