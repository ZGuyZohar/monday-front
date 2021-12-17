import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GroupList } from '../cmps/GroupList';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { useDidMountEffect } from '../hooks/useDidMountEffect';
import { Board } from '../models/board.model';
import { loadBoards, setCurrBoard } from '../store/slices/board-slice';

export function Workspace() {
    
    const boards: Board[] = useAppSelector((state: any) => state.boardSlice.boards)
    const currBoard: Board | null = useAppSelector((state: any) => state.boardSlice.currBoard)
    const dispatch = useAppDispatch()
    const { boardId } = useParams()

    useEffect(() => {
        const initWorkspace = async () => {
            const boardRes = await dispatch(loadBoards())
            const { payload } = boardRes
            setBoard(payload)
        }
        initWorkspace()
    }, [])

    useDidMountEffect(()=> {
        setBoard()
    }, [boardId])
    
    const setBoard = (currBoards?: any  ) => {
        let id = boardId
        currBoards = (!currBoards.length || !currBoards) ? boards : currBoards
        if (!id) id = currBoards[0]._id
        dispatch(setCurrBoard(id))
    }

    return ( boards &&
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
