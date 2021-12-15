import { Task } from "./task.model";

export interface Group {
    id: String,
    title: String,
    tasks: Task[],
    style: Object
}