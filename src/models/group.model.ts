import { Task } from "./task.model";

export interface Group {
    id: string,
    title: string,
    tasks: Task[],
    style: Object,
    boardId: string
}