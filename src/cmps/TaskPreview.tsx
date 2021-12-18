import { Task } from "../models/task.model";
import { TaskPreviewTitle } from "./TaskPreviewCmps/TaskPreviewTitle";
import { TaskStatusPreview as StatusPicker } from "./TaskPreviewCmps/TaskStatusPreview";
import { TaskDatePreview as DatePicker } from "./TaskPreviewCmps/TaskDatePreview";
import { TaskMemberPreview as MemberPicker } from "./TaskPreviewCmps/TaskMemberPreview";
const dynamicCmps: any = { StatusPicker, DatePicker, MemberPicker }

export function TaskPreview({ task, cmpsOrder }: { task: Task, cmpsOrder: string[] | undefined }) {

    const getDynamicCmp = (cmp: string) => {
        const Cmp = dynamicCmps[cmp]
        return <Cmp key={cmp} />
    }

    return (
        <article className="flex">
            <TaskPreviewTitle title={task.title} />
            {cmpsOrder && cmpsOrder.map((cmp) => getDynamicCmp(cmp))}
        </article>
    )
}
