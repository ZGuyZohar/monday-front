import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GroupList } from '../cmps/GroupList';
import { TaskEdit } from '../cmps/TaskEdit';
import { WorkspaceNav } from '../cmps/WorkspaceNav';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { Board } from '../models/board.model';
import { DynamicCmp } from '../models/cmp.model';
import { MiniBoard } from '../models/mini-board.model';
import { loadBoards, setCurrBoard, addGroup, saveBoard, addNewItem, setFilterBy, boardForDisplay, saveGroup } from '../store/slices/board-slice';
import { Group } from '../models/group.model';
import BoardHeader from '../cmps/BoardHeader';
import { BoardFilterBy } from '../models/boardFilterBy.model';
import Loader from '../cmps/Loader';

export function Workspace() {

    const boards: Board[] = useAppSelector((state: any) => state.boardSlice.boards)
    // const currBoard: Board | null = useAppSelector((state: any) => state.boardSlice.currBoard)
    const currBoard: Board | null = useAppSelector(boardForDisplay)
    const dispatch = useAppDispatch()
    const { boardId } = useParams()
    const navigate = useNavigate()
    const [editInfo, setEditInfo] = useState<DynamicCmp | null>(null)

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

    const onAddGroup = () => {
        dispatch(addGroup(boardId))
    }

    const onAddNewItem = () => {
        console.log('onAddNewItem()');
        dispatch(addNewItem(boardId))
    }

    const onBoardFilter = (filterBy: BoardFilterBy) => {
        console.log('onBoardFilter()', filterBy);
        dispatch(setFilterBy(filterBy))
    }

    const sendEditInfo = (editInfo: any) => {
        console.log(editInfo, 'editinfo');

        setEditInfo(editInfo)
    }

    const groupsOrderUpdated = (groups: Group[]): void => {
        console.log('groupOrderUpdated, groups:', groups);
        const boardToSave = { ...currBoard, groups }
        console.log('boardToSave', boardToSave);
        dispatch(saveBoard({ boardToSave, isUpdateCurr: true }))
    }

    const [titleSize, setTitleSize] = useState(0)

    useEffect(() => {
        console.log('currBoard', currBoard);
        if (currBoard) setTitleSize(currBoard.titleSize)
    }, [currBoard])

    const onTitleResize = useCallback((currSize: number): void => {
        const boardToSave = { ...currBoard, titleSize: currSize }
        dispatch(saveBoard({ boardToSave, isUpdateCurr: true }))
    }, [currBoard])

    return (boards &&
        <section className="workspace flex grow">
            {miniBoards && <WorkspaceNav miniBoards={miniBoards} />}
            {!currBoard && <Loader />}
            {currBoard && <div className='board-container'>
                <BoardHeader onBoardFilter={onBoardFilter} onAddGroup={onAddGroup} onAddNewItem={onAddNewItem} />
                <div className="group-container flex flex-col grow">
                    {/* BOARD HEADER WILL BE HERE */}
                    {currBoard && <GroupList titleSize={titleSize} setTitleSize={setTitleSize} onTitleResize={onTitleResize} groupsOrderUpdated={groupsOrderUpdated} sendEditInfo={sendEditInfo} boardId={currBoard._id} groups={currBoard.groups} />}
                    {editInfo && <TaskEdit editInfo={editInfo} />}
                </div>
            </div>}

        </section>
    )
}
