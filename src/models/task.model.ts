import { Checklist } from "./checklist.model";

export interface Task {
    id: String,
    title: String,
    description: String,
    comments: [],
    checklists: Checklist[],
    members: [],
    dueDate: null,
    statusId: String,
    style: {
        bgColor: String
    },
    groupId: string
}