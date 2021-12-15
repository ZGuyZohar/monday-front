import { Group } from "./group.model";
import { MiniUser } from "./mini-user.model";
import { Status } from "./status.model";

export interface Board {
    _id: String,
    title: String,
    createdAt: Date,
    createdBy: MiniUser | null,
    style: Object,
    statuses: Status[],
    members: MiniUser[],
    groups: Group[],
    cmpsOrder: String[]
}