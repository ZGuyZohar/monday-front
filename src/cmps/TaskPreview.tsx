import { Task } from "../models/task.model";
import { TaskPreviewTitle } from "./TaskPreviewCmps/TaskPreviewTitle";
import { TaskStatusPreview as StatusPicker } from "./TaskPreviewCmps/TaskStatusPreview";
import { TaskDatePreview as DatePicker } from "./TaskPreviewCmps/TaskDatePreview";
import { TaskMemberPreview as MemberPicker } from "./TaskPreviewCmps/TaskMemberPreview";
import { DynamicCmp } from "../models/cmp.model";

const dynamicCmps: any = { StatusPicker, DatePicker, MemberPicker }

export function TaskPreview({ task, cmpsOrder }: { task: Task, cmpsOrder: DynamicCmp[] | undefined }) {

    const getDynamicCmp = (cmp: DynamicCmp) => {
        const {type} = cmp
        const Cmp = dynamicCmps[type]
        const payload = getProp(type)
        payload.cmp = cmp
        return <Cmp key={cmp.id} payload={payload} />
    }

    const getProp = (type: string): {taskInfo: any, cmp: null | object} => {
        const taskInfo : any = {
            StatusPicker: task.statusId,
            MemberPicker: task.members,
            DatePicker: task.dueDate
        }
        return { taskInfo: taskInfo[type], cmp: null }
    }

    return (
        <article className="flex task-preview">
            <TaskPreviewTitle title={task.title} />
            {cmpsOrder && cmpsOrder.map((cmp) => getDynamicCmp(cmp))}
        </article>
    )
}
