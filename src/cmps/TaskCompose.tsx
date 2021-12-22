// import { Task } from "../models/task.model";
// import { TaskPreviewTitle } from "./TaskPreviewCmps/TaskPreviewTitle";
// import { TaskStatusPreview as StatusPicker } from "./TaskPreviewCmps/TaskStatusPreview";
// import { TaskDatePreview as DatePicker } from "./TaskPreviewCmps/TaskDatePreview";
// import { TaskMemberPreview as MemberPicker } from "./TaskPreviewCmps/TaskMemberPreview";
// import { DynamicCmp } from "../models/cmp.model";
import { useEffect, useState } from "react"
import { FunctionBody } from "typescript";
import { boardService } from "../services/board-service"
// const dynamicCmps: any = { StatusPicker, DatePicker, MemberPicker }

export function TaskCompose({ addTask }: { addTask: any }) {
    const [taskToEdit, setTaskToEdit] = useState(boardService.getEmptyTask())

    useEffect(() => {
        console.log(taskToEdit.title);
    }, [taskToEdit])

    const handleSubmit = async ({ key }: { key: string }) => {
        if (key !== 'Enter') return
        console.log('Adding...');
        await addTask(taskToEdit)
        // **TODO- make sure addTask works before giving a new pointer.
        setTaskToEdit(() => boardService.getEmptyTask())
    }

    const handleChange = ({ target }: { target: HTMLInputElement }) => {
        const field = target.name;
        const value = target.type === 'number' ? +target.value : target.value;
        setTaskToEdit(prevTask => ({ ...prevTask, [field]: value }))
    }
    return (
        <article className="task-compose">
            <input type="text" placeholder="+ Add Item" value={taskToEdit.title} name="title" onChange={handleChange} onKeyUp={e => handleSubmit(e)} />
        </article>
    )
}