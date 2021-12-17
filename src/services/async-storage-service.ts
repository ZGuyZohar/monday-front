import { Board } from "../models/board.model";


export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany
}

function query(entityType: string) {
    var entities = JSON.parse(localStorage.getItem(entityType) || 'null') || []
    return Promise.resolve(entities);
}

function get(entityType: string, entityId: string) {
    return query(entityType)
        .then(entities => entities.find((entity: { _id: string; }) => entity._id === entityId))
}

function post(entityType: string, newEntity : any) {
    newEntity._id = _makeId()
    return query(entityType)
        .then(entities => {
            entities.unshift(newEntity);
            _save(entityType, entities)
            return newEntity;
        })
}

function postMany(entityType: string, newEntities: Object[]) {
    return query(entityType)
        .then(entities => {
            entities.unshift(...newEntities);
            _save(entityType, entities)
            return entities;
        })
}

function put(entityType: string, updatedEntity: any) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex((entity: { _id: string; }) => entity._id === updatedEntity._id);
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity;
        })
}

function remove(entityType: string, entityId: string) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex((entity: { _id: string; }) => entity._id === entityId);
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}

function _save(entityType: string, entities: any) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}