import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Board } from '../models/board.model';
import { useAppDispatch } from '../store';
import { loadBoards } from '../store/actions/boardAction';

export default function BoardApp() {
    const boards: Board[] | null = useSelector((state:any) => state.boardReducer.boards)
    const dispatch = useDispatch()

    
    useEffect(() => {
        const setBoards = async () => {
            dispatch(loadBoards())
            console.log(boards)
        }
        setBoards()
    }, [])

    return (
        <section>
            
        </section>
    )
}