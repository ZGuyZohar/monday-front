import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk'
import { boardReducer } from './reducers/boardReducer';
import { useDispatch } from 'react-redux';


const rootReducer = combineReducers({
    boardReducer,
})



export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch <AppDispatch> ();