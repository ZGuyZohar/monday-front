import { Todo } from "./todo.model";

export interface Checklist {
    id: string,
    title: string,
    todos: Todo[]
}