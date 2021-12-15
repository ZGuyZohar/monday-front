import { Board } from '../../models/board.model'
import { boardService } from '../../services/board-service'

export function loadBoards(filterBy = {}) {
    return async (dispatch: any) => {
        const boards = await boardService.query(filterBy)
        const action = {
            type: 'SET_BOARDS',
            boards
        }
        dispatch(action)
        return boards
    }
}

export function saveBoard(board: Board) {
    return async (dispatch: any) => {
        const isAdd = !board._id
        const updatedBoard = await boardService.save(board);
        if (isAdd) dispatch({ type: 'ADD_BOARD', board: updatedBoard })
        else dispatch({ type: 'UPDATE_BOARD', board: updatedBoard })
    }
}

export function removeBoard(boardId: string) {
    return async (dispatch: any) => {
        await boardService.remove(boardId);
        dispatch({ type: 'REMOVE_BOARD', boardId })
    }
}
