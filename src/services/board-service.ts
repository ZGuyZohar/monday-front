// import { httpService } from './http-service.js'

import { Board } from '../models/board.model.js'
import { Checklist } from '../models/checklist.model.js'
import { Comment } from '../models/comment.model.js'
import { Group } from '../models/group.model.js'
import { Status } from '../models/status.model.js'
import { Task } from '../models/task.model.js'
import { Todo } from '../models/todo.model.js'
import { storageService } from './async-storage-service'
import { DynamicCmp } from '../models/cmp.model.js'


// const BOARD_URL = '/board/'
const BOARD_KEY = 'boardDb'
export const boardService = {
    query,
    getById,
    remove,
    save,
    getEmptyBoard,
    getEmptyTodo,
    getEmptyStatus,
    getEmptyCheckList,
    getEmptyComment,
    getEmptyTask,
    getEmptyGroup,
    saveTask,
    saveGroup
}

async function query(filterBy = {}) {
    // return httpService.get(BOARD_URL)
    let boards: Board[] = await storageService.query(BOARD_KEY)
    if (!boards || !boards.length) {
        let board = getMockBoard()
        board = await storageService.post(BOARD_KEY, getMockBoard())
        boards.unshift(board)
    }
    return boards
}

function getById(id: string) {
    // return httpService.get(BOARD_URL + id)
    return storageService.get(BOARD_KEY, id)
}

function remove(id: string) {
    // return httpService.delete(BOARD_URL + id)
    return storageService.remove(BOARD_KEY, id)
}

function save(board: Board) {
    if (board._id) {
        // return httpService.put(BOARD_URL + board._id, board)
        return storageService.put(BOARD_KEY, board)
    } else {
        // return httpService.post(BOARD_URL, board)
        return storageService.post(BOARD_KEY, board)
    }
}


function getEmptyBoard(): Board {
    return {
        _id: '',
        title: '',
        createdAt: Date.now(),
        createdBy: null,
        style: {},
        members: [],
        groups: [],
        cmpsOrder: [
            {
                id: _makeId(),
                type: 'StatusPicker',
                info: {
                    statuses: _getStatuses()
                },
                styles: {
                    width: 130,
                    maxWidth: 250
                }
            },
            {
                id: _makeId(),
                type: 'MemberPicker',
                info: {

                },
                styles: {
                    width: 130,
                    maxWidth: 250

                }
            },
            {
                id: _makeId(),
                type: 'DatePicker',
                info: {},
                styles: {
                    width: 130,
                    maxWidth: 250
                }
            }
        ]
    }
}

function getEmptyGroup(): Group {
    return {
        id: '',
        title: '',
        tasks: [],
        style: {},
        boardId: ''
    }
}

function getEmptyTask(): Task {
    return {
        id: '',
        title: '',
        description: '',
        comments: [],
        checklists: [],
        members: [],
        dueDate: null,
        statusId: '',
        style: {
            bgColor: ''
        },
        groupId: '',
        boardId: ''
    }
}

function getEmptyComment(): Comment {
    return {
        id: '',
        txt: '',
        createdAt: Date.now(),
        byMember: null
    }
}

function getEmptyCheckList(): Checklist {
    return {
        id: '',
        title: 'Checklist',
        todos: [getEmptyTodo()]
    }
}
function getEmptyTodo(): Todo {
    return {
        id: '',
        title: '',
        isDone: false
    }
}

function getEmptyStatus(): Status {
    return {
        id: '',
        status: '',
        color: ''
    }
}

function _getStatuses(): Status[] {
    return [
        {
            id: _makeId(),
            status: 'Done',
            color: '#40d698'
        },
        {
            id: _makeId(),
            status: 'Working on it',
            color: '#fdab3d'
        },
        {
            id: _makeId(),
            status: 'Stuck',
            color: '#e2445c'
        },
        {
            id: _makeId(),
            status: '',
            color: '#c4c4c4'
        },
    ]
}

function getEmptyCmp(): DynamicCmp {
    return {
        id: _makeId(),
        type: '',
        info: {},
        styles: {}
    }
}

function _makeId(length: Number = 5): string {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

// function getColors() {}

function getMockBoard() {
    const board = getEmptyBoard()
    board.title = 'My Board'
    board.groups = [getEmptyGroup()]
    board.groups[0].id = 'g101'
    board.groups[0].tasks = [getEmptyTask(), getEmptyTask()]
    board.groups[0].tasks[0].id = 't101'
    board.groups[0].tasks[0].boardId = board._id
    board.groups[0].tasks[0].groupId = board.groups[0].id
    board.groups[0].tasks[1].id = 't102'
    board.groups[0].tasks[1].boardId = board._id
    board.groups[0].tasks[0].groupId = board.groups[0].id
    board.groups[0].tasks[0].title = 'Do this'
    board.groups[0].tasks[1].title = 'Do that'
    board.groups[0].title = 'My group'
    return board
}

async function saveTask(task: Task) {
    const boards = await query()
    const { groupId, boardId, id } = task
    console.log(groupId, boardId, id, boards);

    const boardIdx = boards.findIndex(board => board._id === boardId)
    const groupIdx = boards[boardIdx].groups.findIndex(group => group.id === groupId)
    const currBoard = boards[boardIdx]
    const tasks = boards[boardIdx].groups[groupIdx].tasks
    if (task.id) {
        const taskIdx = tasks.findIndex(task => task.id === id)
        tasks.splice(taskIdx, 1, task)
        // return httpService.put(BOARD_URL + board._id, board)
        // return task
    } else {
        task.id = _makeId()
        tasks.push(task)
        // return httpService.post(BOARD_URL, board)
        // storageService.post(BOARD_KEY, boards)
    }
    console.log('saving currBoard:', currBoard);
    storageService.put(BOARD_KEY, currBoard)
    return task
}

async function saveGroup(group: Group) {
    let groupIdx = -1
    const boards = await query()
    const { id } = group
    const boardIdx = boards.findIndex(board => {
        groupIdx = board.groups.findIndex(group => (
            group.id === id
        ))
        if (groupIdx === -1) return false
        else return true
    })
    const currBoard = boards[boardIdx]
    currBoard.groups.splice(groupIdx, 1, group)
    storageService.put(BOARD_KEY, currBoard)
    return group
}