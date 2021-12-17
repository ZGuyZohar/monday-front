import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Board } from '../../models/board.model'
import { boardService } from '../../services/board-service'
import type { RootState } from '..'

export interface BoardState {
    boards: Board[],
    currBoard: Board | null
}

const initialState: BoardState = {
    boards: [],
    currBoard: null
}

export const loadBoards = createAsyncThunk(
    'SET_BOARDS',
    async (filterBy: {} = {}) => {
        return await boardService.query(filterBy)
    }
)

export const setCurrBoard = createAsyncThunk(
    'SET_BOARD',
    async (boardId: string | undefined) => {
        if (!boardId) return
        return await boardService.getById(boardId)
    }
)

export const saveBoard = createAsyncThunk(
    'SAVE_BOARD',
    async (board: Board) => {
        boardService.save(board);
        return board
    }
)

export const removeBoard = createAsyncThunk(
    'REMOVE_BOARD',
    async (boardId: string) => {
        boardService.remove(boardId);
        return boardId
    }
)


export const boardSlice = createSlice({
        name: 'boards',
        initialState,
        reducers: {
            // loadBoards: (state) => {
            //     boardService.query().then(boards => {
            //         state.boards = boards
            //         return boards
            //     })
            //     }
            // }
        },
        extraReducers: (builder) => {
            builder.addCase(loadBoards.fulfilled, (state, action) => {
                state.boards = action.payload
            })

            builder.addCase(setCurrBoard.fulfilled, (state, action) => {
                state.currBoard = action.payload
            })

            builder.addCase(saveBoard.fulfilled, (state, action) => {
                const boardToSave = action.payload
                if (boardToSave._id) {
                    const foundIdx = state.boards.findIndex(board => board._id === boardToSave._id)
                    state.boards.splice(foundIdx, 1, boardToSave)
                } else state.boards.push(action.payload)
            })

            builder.addCase(removeBoard.fulfilled, (state, action) => {
                const boardId = action.payload
                const foundIdx = state.boards.findIndex(board => board._id === boardId)
                state.boards.splice(foundIdx, 1)
            })
        },
    })

// export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const boards = (state: RootState) => state.boardSlice.boards

export default boardSlice.reducer