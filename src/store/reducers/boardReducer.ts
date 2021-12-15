import { Board } from "../../models/board.model";

const INITIAL_STATE = {
    boards: []
}

export function boardReducer(state = INITIAL_STATE, action: {type: string, board: Board, boards: Board[], boardId: string}) {

    switch (action.type) {
        case 'SET_BOARDS':
            return {
                ...state,
                boards: action.boards
            }
        case 'ADD_BOARD':
            return {
                ...state,
                boards: [...state.boards, action.board]
            }
        case 'UPDATE_BOARD':
            const board: Board = action.board;
            return {
                ...state,
                boards: state.boards.map((currBoard:Board) => currBoard._id === board._id ? board : currBoard)
            }
        case 'DELETE_BOARD':
            return {
                ...state,
                boards: state.boards.filter((board: Board) => board._id !== action.boardId)
            }
        default:
            return state
    }
}