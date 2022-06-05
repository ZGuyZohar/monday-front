import { DynamicCmp } from "./cmp.model";
import { Group } from "./group.model";
import { MiniUser } from "./mini-user.model";

export interface Board {
    _id: string
    title: string
    createdAt: number
    createdBy: MiniUser | null
    style: Object
    members: MiniUser[]
    groups: Group[]
    cmpsOrder: DynamicCmp[]
    titleSize: number

}