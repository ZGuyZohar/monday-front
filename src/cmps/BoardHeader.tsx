import { BoardFilterBy } from "../models/boardFilterBy.model"
import AddBtn from "./AddBtn"
import BoardFilter from "./BoardFilter"

export default function BoardHeader({ onAddGroup, onAddNewItem, onBoardFilter }: { onAddGroup: () => void, onAddNewItem: () => void, onBoardFilter: (filterBy: BoardFilterBy) => void }) {

    return (
        <header className="board-header">
            <AddBtn onAddGroup={onAddGroup} onAddNewItem={onAddNewItem} />
            <BoardFilter filter={onBoardFilter} />
        </header>
    )
}