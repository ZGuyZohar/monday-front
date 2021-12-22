import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GroupList } from '../cmps/GroupList';
import { WorkspaceNav } from '../cmps/WorkspaceNav';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { useDidMountEffect } from '../hooks/useDidMountEffect';
import { Board } from '../models/board.model';
import { MiniBoard } from '../models/mini-board.model';
import { loadBoards, setCurrBoard, addGroup } from '../store/slices/board-slice';
import { AddBoardEntity } from '../cmps/AddBoardEntity';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

export function Workspace() {

    const boards: Board[] = useAppSelector((state: any) => state.boardSlice.boards)
    const currBoard: Board | null = useAppSelector((state: any) => state.boardSlice.currBoard)
    const dispatch = useAppDispatch()
    const { boardId } = useParams()
    const navigate = useNavigate()

    const miniBoards: MiniBoard[] = useMemo(() => {
        return boards.map(board => {
            console.log(board);
            return ({ boardId: board._id, title: board.title })
        })
    }, [boards?.length])

    useEffect(() => {
        const initWorkspace = async () => {
            const boardRes = await dispatch(loadBoards())
            const { payload } = boardRes
            setBoard(payload)
        }
        initWorkspace()
    }, [])

    useEffect(() => {
        dispatch(setCurrBoard(boardId))
    }, [boardId])

    const setBoard = (currBoards?: Board[] | any) => {
        currBoards = (!currBoards?.length || !currBoards) ? boards : currBoards
        console.log('currBoards', currBoards);

        if (!boardId) {
            console.log('currBoards[0]._id', currBoards);
            navigate('../board/' + currBoards[0]._id)
        }
    }

    const onAddGroup = (): any => {
        dispatch(addGroup(boardId))
    }

    return (boards &&
        <section className="workspace flex grow">
            {miniBoards && <WorkspaceNav miniBoards={miniBoards} />}
            <div className="group-container flex flex-col grow">
                <AddBoardEntity onAddGroup={onAddGroup} />
                {/* BOARD HEADER WILL BE HERE */}
                {currBoard && <GroupList boardId={currBoard._id} groups={currBoard.groups} />}
            </div>

        </section>
    )
}
