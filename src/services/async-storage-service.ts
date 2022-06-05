import { Board } from "../models/board.model"
import { utilService } from "./util.service"

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany
}
// ***Could be Generic type instead of any
function query<Type>(entityType: string, delay = 5000): Promise<Type> {
    var entities = JSON.parse(localStorage.getItem(entityType) as string) || []

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(entities)
        }, delay)
    })

    // return Promise.resolve(entities);
}

function get<Type extends { _id: string }>(entityType: string, entityId: string | undefined): Promise<Type | undefined> {
    return query<Type[]>(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}

function post<newEntity extends { _id: string }>(entityType: string, newEntity: newEntity): Promise<newEntity> {
    newEntity._id = utilService.makeId()
    return query<Array<newEntity>>(entityType)
        .then((entities) => {
            if (!entities) throw Error('no entities found in post method')
            if (entities.length >= 10) throw Error('Maximum tasks, delete some to create')
            entities.unshift(newEntity);
            _save<newEntity[]>(entityType, entities)
            return newEntity;
        })
}

function postMany<entityType>(entityType: string, newEntities: entityType[]) {
    return query<entityType[]>(entityType)
        .then(entities => {
            if (!entities) throw Error('no entities found in postMany method')
            entities.push(...newEntities);
            _save(entityType, entities)
            return entities;
        })
}

function put<updatedEntity extends { _id: string }>(entityType: string, updatedEntity: updatedEntity): Promise<updatedEntity> {
    return query<updatedEntity[]>(entityType)
        .then(entities => {
            if (!entities) throw Error('no entities found in put method')
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id);
            entities.splice(idx, 1, updatedEntity)
            _save<updatedEntity[]>(entityType, entities)
            return updatedEntity;
        })
}

function remove<entityType extends { _id: string }>(entityType: string, entityId: string) {
    return query<entityType[]>(entityType)
        .then(entities => {
            if (!entities) throw Error('no entities found in remove method')
            const idx = entities.findIndex(entity => entity._id === entityId);
            if (idx === -1) return Promise.reject(`Unknown Entity ${entityType} with Id: ${entityId}`)
            entities.splice(idx, 1)
            _save<entityType[]>(entityType, entities)
        })
}

function _save<entitiesType>(entityType: string, entities: entitiesType) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}


// import { Board } from "../models/board.model";


// export const storageService = {
//     query,
//     get,
//     post,
//     put,
//     remove,
//     postMany
// }
// // **PLASTER
// function query(entityType: string | any): Promise<Board[]> {
//     var entities = JSON.parse(localStorage.getItem(entityType) || 'null') || []
//     // return Promise.resolve(entities);
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(entities)
//         }, 5000)
//     })
// }

// function get(entityType: string | undefined, entityId: string | undefined) {
//     return query(entityType)
//         .then(entities => entities.find((entity: { _id: string; }) => entity._id === entityId))
// }

// function post(entityType: string, newEntity: any) {
//     newEntity._id = _makeId()
//     return query(entityType)
//         .then(entities => {
//             entities.unshift(newEntity);
//             _save(entityType, entities)
//             return newEntity;
//         })
// }

// function postMany(entityType: string, newEntities: Object[]) {
//     return query(entityType)
//         .then(entities => {
//             entities.unshift(...newEntities);
//             _save(entityType, entities)
//             return entities;
//         })
// }

// function put(entityType: string, updatedEntity: any) {
//     return query(entityType)
//         .then(entities => {
//             const idx = entities.findIndex((entity: { _id: string; }) => entity._id === updatedEntity._id);
//             entities.splice(idx, 1, updatedEntity)
//             _save(entityType, entities)
//             return updatedEntity;
//         })
// }

// function remove(entityType: string, entityId: string) {
//     return query(entityType)
//         .then(entities => {
//             const idx = entities.findIndex((entity: { _id: string; }) => entity._id === entityId);
//             entities.splice(idx, 1)
//             _save(entityType, entities)
//         })
// }

// function _save(entityType: string, entities: any) {
//     localStorage.setItem(entityType, JSON.stringify(entities))
// }

// function _makeId(length = 5) {
//     var text = "";
//     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     for (var i = 0; i < length; i++) {
//         text += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     return text;
// }