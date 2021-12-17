import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GroupList } from '../cmps/GroupList';
import { Board } from '../models/board.model';
import { useAppDispatch } from '../store';
import { loadBoards, setBoard } from '../store/actions/boardAction';

export default function BoardApp() {
    
    const boards: Board[] = useSelector((state: any) => state.boardReducer.boards)
    const currBoard: Board | null = useSelector((state: any) => state.boardReducer.currBoard)
    const dispatch = useAppDispatch()
    const { boardId } = useParams()

    useEffect(() => {
        const initWorkspace = async () => {
            dispatch(loadBoards())
            console.log(boards,' from init');
            
            // .then((boards)=>console.log(boards,'FROM THEN!'))
            setCurrBoard()
        }
        initWorkspace()
    }, [])
    
    useEffect(() => {
        setCurrBoard()
    }, [boardId])
    
    const setCurrBoard = () => {
        let id = boardId
        if (!id) id = boards[0]._id
        console.log(id);
        dispatch(setBoard(id))
    }

    return (
        <section>
            <aside className="workspace-nav"></aside>
            {currBoard && <GroupList groups={currBoard.groups} />}

            {/* <section className="main-layout">
                <div className="task-main">
                    <TaskTitleHeader />>
                    tasks.map(task => <TaskPreviewTitle />)
                </div>
                <div className="task-cmps">
                   cmpOrder.map(cmp => <DynamicCmpHeader/>)
                   tasks.map(task => <TaskPreview/>) 
                </div>
            </section> */}
        </section>
    )
}
