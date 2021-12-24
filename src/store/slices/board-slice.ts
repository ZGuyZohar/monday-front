import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Board } from '../../models/board.model'
import { boardService } from '../../services/board-service'
import type { RootState } from '..'
import { Task } from '../../models/task.model'
import { Group } from '../../models/group.model'

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
    async ({ boardToSave, isUpdateCurr }: { boardToSave: any, isUpdateCurr: boolean }) => {
        boardService.save(boardToSave);
        return { boardToSave, isUpdateCurr }
    }
)

export const removeBoard = createAsyncThunk(
    'REMOVE_BOARD',
    async (boardId: string) => {
        boardService.remove(boardId);
        return boardId
    }
)

export const saveTask = createAsyncThunk(
    'SAVE_TASK',
    async (task: Task) => {

        const savedTask = await boardService.saveTask(task);
        return savedTask
    }
)

export const saveGroup = createAsyncThunk(
    'SAVE_GROUP',
    async (group: Group) => {
        const savedGroup = await boardService.saveGroup(group);
        return savedGroup
    }
)

export const addGroup = createAsyncThunk(
    'INSERT_GROUP',
    async (boardId: string | undefined) => {
        // const boardId = "123"
        const addedGroup = await boardService.addGroup(boardId);
        return addedGroup
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
            const { boardToSave, isUpdateCurr } = action.payload
            if (boardToSave._id) {
                const foundIdx = state.boards.findIndex(board => board._id === boardToSave._id)
                console.log('boardToSave', boardToSave);
                state.boards.splice(foundIdx, 1, boardToSave)
            } else state.boards.push(boardToSave)

            if (isUpdateCurr) state.currBoard = boardToSave
        })

        builder.addCase(removeBoard.fulfilled, (state, action) => {
            const boardId = action.payload
            const foundIdx = state.boards.findIndex(board => board._id === boardId)
            state.boards.splice(foundIdx, 1)
        })
        builder.addCase(saveTask.fulfilled, (state, action) => {
            const { currBoard } = state
            const task = action.payload
            const { groupId, id } = task
            const groupIdx: any = currBoard?.groups.findIndex(group => group.id === groupId)
            const taskIdx: any = currBoard?.groups[groupIdx].tasks.findIndex(task => task.id === id)
            if (taskIdx === -1) currBoard?.groups[groupIdx].tasks.push(task)
            else currBoard?.groups[groupIdx].tasks.splice(taskIdx, 1, task)
        })
        builder.addCase(saveGroup.fulfilled, (state, action) => {
            const { currBoard } = state
            const group = action.payload
            const { id } = action.payload
            const groupIdx: any = currBoard?.groups.findIndex(group => (
                group.id === id
            ))
            if (groupIdx !== -1) currBoard?.groups.splice(groupIdx, 1, group)
        })
        builder.addCase(addGroup.fulfilled, (state, action) => {
            const addedGroup = action.payload
            state.currBoard?.groups.unshift(addedGroup)
        })
    },
})

// export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const boards = (state: RootState) => state.boardSlice.boards

export default boardSlice.reducer