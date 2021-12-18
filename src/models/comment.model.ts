export interface Comment {
    id: string,
    txt: string,
    createdAt: number,
    byMember: Object | null
}