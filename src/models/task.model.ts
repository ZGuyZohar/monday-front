import { Checklist } from "./checklist.model";

export interface Task {
    id: string,
    title: string,
    description: string,
    comments: [],
    checklists: Checklist[],
    members: [],
    dueDate: null,
    statusId: string,
    style: {
        bgColor: string
    },
    groupId: string
}