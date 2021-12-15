import { httpService } from './http-service.js'

import { Board } from '../models/board.model.js'
import { Checklist } from '../models/checklist.model.js'
import { Comment } from '../models/comment.model.js'
import { Group } from '../models/group.model.js'
import { Status } from '../models/status.model.js'
import { Task } from '../models/task.model.js'
import { Todo } from '../models/todo.model.js'
import { storageService } from './async-storage-service'


const BOARD_URL = '/board/'
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
    getEmptyGroup
}

function query(filterBy = {}) {
    // return httpService.get(BOARD_URL)
    return storageService.query(BOARD_KEY)
    // TODO GETBOARD IF NONE FOUND
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
        createdAt: new Date(),
        createdBy: null,
        style: {},
        statuses: _getStatuses(),
        members: [],
        groups: [],
        cmpsOrder: ['status-picker', 'member-picker', 'date-picker']
    }
}

function getEmptyGroup(): Group {
    return {
        id: '',
        title: '',
        tasks: [],
        style: {}
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
        }
    }
}

function getEmptyComment(): Comment {
    return {
        id:'',
        txt: '',
        createdAt: new Date(),
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
    ]
}

function _makeId(length: Number = 5): String {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

// function getColors() {}