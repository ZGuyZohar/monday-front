import { Link } from "react-router-dom";
import { MiniBoard } from "../models/mini-board.model";
export function WorkspaceNav({miniBoards} : {miniBoards: MiniBoard[]}) {
    
    return (
        <aside className="workspace-nav">
            <ul className="board-list">
                {miniBoards.map(board => (
                    <Link to={'/board/' + board.boardId} key={board.boardId}>{board.title}</Link>
                ))}
            </ul>
        </aside>
    )
}
