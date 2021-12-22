import { useAppSelector } from "../hooks/useAppSelector";
import { DynamicCmp } from "../models/cmp.model";
import { Task } from "../models/task.model";
import { useAppDispatch } from "../hooks/useAppDispatch";
// import { Dropdown } from "element-react";
export function AddBoardEntity() {
    const dispatch = useAppDispatch()

    const handleClick = () => {
        console.log('handleClick');

    }
    // <Dropdown splitButton={true} type="primary" onClick={handleClick} menu={(
    //     <Dropdown.Menu>
    //         <Dropdown.Item>Action 1</Dropdown.Item>
    //         <Dropdown.Item>Action 2</Dropdown.Item>
    //         <Dropdown.Item>Action 3</Dropdown.Item>
    //         <Dropdown.Item>Action 4</Dropdown.Item>
    //         <Dropdown.Item>Action 5</Dropdown.Item>
    //     </Dropdown.Menu>
    // )}>Dropdown List</Dropdown>

    //*NOTE - changing cmpsorder happens here or in workspace
    return (
        <article className="add-board-entity-button">
            <button>New Item</button>
        </article>
    )
}
