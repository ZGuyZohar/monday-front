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
import { utilService } from './util.service.js'


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
    getEmptyCmp,
    saveTask,
    saveGroup,
    addGroup: _generateAddGroup(),
    addNewItem
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

function getById(id: string | undefined) {
    // return httpService.get(BOARD_URL + id)
    return storageService.get<Board>(BOARD_KEY, id)
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
        titleSize: 200,
        title: '',
        createdAt: Date.now(),
        createdBy: null,
        style: {},
        members: [],
        groups: [],
        cmpsOrder: [
            {
                id: utilService.makeId(),
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
                id: utilService.makeId(),
                type: 'MemberPicker',
                info: {

                },
                styles: {
                    width: 130,
                    maxWidth: 250

                }
            },
            {
                id: utilService.makeId(),
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
        title: 'New Group',
        tasks: [],
        style: {},
        boardId: '',
        color: ''
    }
}

function getEmptyTask(): Task {
    return {
        id: '',
        title: '',
        description: '',
        comments: [],
        checklists: [],
        cmpMembersMap: {},
        dueDate: null,
        cmpStatusMap: {},
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
            id: utilService.makeId(),
            status: 'Done',
            color: '#40d698'
        },
        {
            id: utilService.makeId(),
            status: 'Working on it',
            color: '#fdab3d'
        },
        {
            id: utilService.makeId(),
            status: 'Stuck',
            color: '#e2445c'
        },
        {
            id: utilService.makeId(),
            status: '',
            color: '#c4c4c4'
        },
    ]
}

function getEmptyCmp(): DynamicCmp {
    return {
        id: '',
        type: 'StatusPicker',
        info: {},
        styles: {}
    }
}


// function getColors() {}

function getMockBoard() {
    const board = getEmptyBoard()
    board.title = 'My Board'
    board.groups = [getEmptyGroup()]
    board.groups[0].color = 'rgb(196, 196, 196)'
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
    board.groups[0].tasks[1].cmpStatusMap[board.cmpsOrder[0].id] = board.cmpsOrder[0].info.statuses[0].id
    board.groups[0].tasks[0].cmpStatusMap[board.cmpsOrder[0].id] = board.cmpsOrder[0].info.statuses[1].id
    board.groups[0].title = 'My group'
    return board
}

async function saveTask(task: Task) {
    const { groupId, boardId, id } = task
    const currBoard = await getById(boardId)
    if (!currBoard) throw Error(`currBoard not found with id ${boardId}`)

    const groupIdx = currBoard.groups.findIndex((group: Group) => group.id === groupId)
    if (!groupIdx) throw Error(`groupId ${groupId} does not exist on currBoard.groups`)
    const tasks = currBoard.groups[groupIdx].tasks

    if (task.id) {
        const taskIdx = tasks?.findIndex((task: Task) => task.id === id)
        if (!taskIdx) throw Error(`taskId ${id} does not exist on currBoard.groups[${groupIdx}]`)
        tasks?.splice(taskIdx, 1, task)
        // return httpService.put(BOARD_URL + board._id, board)
        // return task
    } else {
        task.id = utilService.makeId()
        tasks?.push(task)
        // return httpService.post(BOARD_URL, board)
        // storageService.post(BOARD_KEY, boards)
    }

    console.log('saving currBoard:', currBoard);
    storageService.put<Board>(BOARD_KEY, currBoard)
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

function _generateAddGroup() {
    const _fillGroupClrs = () => {
        groupClrs.push(
            'rgb(255, 100, 46)',
            'rgb(162, 93, 220)',
            'rgb(3, 127, 76)',
            'rgb(3, 127, 76)',
            'rgb(226, 68, 92)',
            'rgb(87, 155, 252)',
            'rgb(253, 171, 61)',
            'rgb(255, 21, 138)',
            'rgb(196, 196, 196)'
        )
    }

    const groupClrs: string[] = []
    _fillGroupClrs()

    return async (boardId: string | undefined) => {
        console.log('insertGroup, boardId:', boardId);

        const color = groupClrs.shift() as string
        if (!groupClrs.length) _fillGroupClrs()

        const board = await getById(boardId)
        if (!board) throw Error(`Board not found with id ${boardId}`)
        const addedGroup = { ...getEmptyGroup(), color }

        addedGroup.id = utilService.makeId()
        board.groups.unshift(addedGroup)
        storageService.put(BOARD_KEY, board)
        return Promise.resolve(addedGroup)
    }
}

async function addNewItem(boardId: string | undefined) {
    console.log('addNewItem, boardId:', boardId);
    const board = await getById(boardId)
    if (!board) throw Error(`Board not found with id ${boardId}`)

    const taskToInsert = { ...getEmptyTask(), id: utilService.makeId(), title: 'New Item' }
    board.groups[0].tasks.unshift(taskToInsert)

    await storageService.put(BOARD_KEY, board)
    return Promise.resolve(taskToInsert)
}