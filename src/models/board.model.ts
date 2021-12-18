import { Group } from "./group.model";
import { MiniUser } from "./mini-user.model";
import { Status } from "./status.model";

export interface Board {
    _id: string,
    title: string,
    createdAt: number,
    createdBy: MiniUser | null,
    style: Object,
    statuses: Status[],
    members: MiniUser[],
    groups: Group[],
    cmpsOrder: string[]
}