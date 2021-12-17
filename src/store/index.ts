import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk'
import { boardReducer } from './reducers/boardReducer';
import { useDispatch } from 'react-redux';

const rootReducer = combineReducers({
    boardReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
// NEEDS FIXING - DEFINED WITH PROMISE TYPE
export const useAppDispatch = () => useDispatch<AppDispatch>()
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector