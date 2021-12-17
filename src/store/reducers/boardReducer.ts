import { Board } from "../../models/board.model";

const INITIAL_STATE = {
    boards: [],
    currBoard: null
}

export function boardReducer(state = INITIAL_STATE, action: any) {

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
        case 'SET_BOARD': 
            const currBoard : Board = action.board 
            return {
                ...state,
                currBoard
            }
        default:
            return state
    }
}