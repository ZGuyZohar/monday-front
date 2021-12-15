export interface Comment {
    id: String,
    txt: String,
    createdAt: Date,
    byMember: Object | null
}