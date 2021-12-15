import { Todo } from "./todo.model";

export interface Checklist {
    id: String,
    title: String,
    todos: Todo[]
}