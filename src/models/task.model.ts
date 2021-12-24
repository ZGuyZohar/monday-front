import { Checklist } from "./checklist.model";

export interface Task {
    id: string,
    title: string,
    description: string,
    comments: [],
    checklists: Checklist[],
    cmpMembersMap: Record<string, []>,
    dueDate: number | null,
    cmpStatusMap: Record<string, string>,
    style: {
        bgColor: string
    },
    groupId: string | null,
    boardId: string | undefined,
}