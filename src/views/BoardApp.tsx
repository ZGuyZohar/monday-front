import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Board } from '../models/board.model';
import { loadBoards } from '../store/actions/boardAction';

export default function BoardApp() {
    const boards: Board[] | null = useSelector((state:any) => state.boardReducer.boards)
    const dispatch = useDispatch()

    
    useEffect(() => {
        const setBoards = async () => {
            dispatch(loadBoards())
        }
        setBoards()
    }, [])

    return (
        <section>
            <h1 className="text-3xl font-bold underline">
               board app here!
               </h1> 
        </section>
    )
}
