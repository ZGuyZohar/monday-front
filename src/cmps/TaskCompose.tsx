// import { Task } from "../models/task.model";
// import { TaskPreviewTitle } from "./TaskPreviewCmps/TaskPreviewTitle";
// import { TaskStatusPreview as StatusPicker } from "./TaskPreviewCmps/TaskStatusPreview";
// import { TaskDatePreview as DatePicker } from "./TaskPreviewCmps/TaskDatePreview";
// import { TaskMemberPreview as MemberPicker } from "./TaskPreviewCmps/TaskMemberPreview";
// import { DynamicCmp } from "../models/cmp.model";
import { SyntheticEvent, useEffect, useState } from "react"
import { FunctionBody } from "typescript";
import { useFormRegister } from "../hooks/useFormRegister";
import { boardService } from "../services/board-service"
// const dynamicCmps: any = { StatusPicker, DatePicker, MemberPicker }

export function TaskCompose({ addTask, groupClr }: { addTask: any, groupClr: string }) {
    // const [taskToEdit, setTaskToEdit] = useState(boardService.getEmptyTask())
    const [taskToEdit, register, setTaskToEdit] = useFormRegister(boardService.getEmptyTask())

    // useEffect(() => {
    //     console.log(taskToEdit.title);
    // }, [taskToEdit])

    const handleSubmit = async (ev: SyntheticEvent) => {
        ev.preventDefault()
        console.log('Adding...', taskToEdit);
        await addTask(taskToEdit)
        // **TODO- make sure addTask works before giving a new pointer.
        setTaskToEdit(() => boardService.getEmptyTask())
    }

    // const handleChange = ({ target }: { target: HTMLInputElement }) => {
    //     const field = target.name;
    //     const value = target.type === 'number' ? +target.value : target.value;
    //     setTaskToEdit(prevTask => ({ ...prevTask, [field]: value }))
    // }
    return (
        <form onSubmit={handleSubmit} className="task-compose">
            <span className="left-indicator" style={{backgroundColor: groupClr}}></span>
            <input type="text" placeholder="+ Add Item" {...register('title')} />
        </form>
    )
}