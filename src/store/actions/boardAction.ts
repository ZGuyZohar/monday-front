import { Dispatch } from 'redux'
import { Board } from '../../models/board.model'
import { boardService } from '../../services/board-service'

export function loadBoards(filterBy = {}) {
    return async (dispatch: Dispatch): Promise<Board[]> => {
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
    return async (dispatch: Dispatch): Promise<void> => {
        const isAdd = !board._id
        const updatedBoard = await boardService.save(board);
        if (isAdd) dispatch({ type: 'ADD_BOARD', board: updatedBoard })
        else dispatch({ type: 'UPDATE_BOARD', board: updatedBoard })
    }
}

export function removeBoard(boardId: string) {
    return async (dispatch: Dispatch): Promise<void> => {
        await boardService.remove(boardId);
        dispatch({ type: 'REMOVE_BOARD', boardId })
    }
}

export function setBoard(boardId: string) {
    return async (dispatch: Dispatch):Promise<void> => {
        try {
            console.log(boardId, 'actions');
            
            const board = await boardService.getById(boardId)
            console.log(board, 'actions');
            if(!board) throw new Error('No board found')
            dispatch({type: 'SET_BOARD', board})
        } catch(err) {
            console.log(err)
        }
    }
}
