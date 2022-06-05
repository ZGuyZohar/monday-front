import { Task } from "../models/task.model";
import { TaskPreviewTitle } from "./TaskPreviewCmps/TaskPreviewTitle";
import { TaskStatusPreview as StatusPicker } from "./TaskPreviewCmps/TaskStatusPreview";
import { TaskDatePreview as DatePicker } from "./TaskPreviewCmps/TaskDatePreview";
import { TaskMemberPreview as MemberPicker } from "./TaskPreviewCmps/TaskMemberPreview";
import { CmpTypes, DynamicCmp } from "../models/cmp.model";

const dynamicCmps: any = { StatusPicker, DatePicker, MemberPicker }
interface TaskInfo {
    StatusPicker: Record<string, string>,
    MemberPicker: Record<string, []>,
    DatePicker: null | number
}

export function TaskPreview({ task, cmpsOrder, sendEditInfo, groupClr, size }: { task: Task, cmpsOrder: DynamicCmp[] | undefined, sendEditInfo: any, groupClr: string, size: number }) {

    const getDynamicCmp = (cmp: DynamicCmp) => {
        const { type } = cmp
        const Cmp = dynamicCmps[type]
        const payload = getInfo(type)


        payload.cmp = cmp
        return <Cmp key={cmp.id} sendEditInfo={sendEditInfo} payload={payload} />
    }

    const getInfo = (type: CmpTypes): any => {
        const taskInfo: TaskInfo = {
            StatusPicker: task.cmpStatusMap,
            MemberPicker: task.cmpMembersMap,
            DatePicker: task.dueDate
        }

        return { taskInfo: taskInfo[type], cmp: null }
    }

    return (
        <article className="flex task-preview">
            <div className="left-indicator" style={{ backgroundColor: groupClr }}></div>
            <TaskPreviewTitle size={size} title={task.title} />
            {cmpsOrder && cmpsOrder.map((cmp) => getDynamicCmp(cmp))}
        </article>
    )
}
