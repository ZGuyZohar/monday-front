import { useAppSelector } from "../hooks/useAppSelector";
import { DynamicCmp } from "../models/cmp.model";
import { Task } from "../models/task.model";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { ChangeEvent, ChangeEventHandler, MouseEvent, MouseEventHandler, SyntheticEvent } from "react";
// import { Dropdown } from "element-react";
import { useRef, useState, useEffect } from "react";
// import { Dropdown } from 'element-react';
export function AddBoardEntity({ onAddGroup }: { onAddGroup: any }) {
    const dispatch = useAppDispatch()

    // const selectElement = useRef();

    // const handleInput = (e: SyntheticEvent) => {
    //     console.log('handleChange, event:', e);
    //     console.log(e.nativeEvent.target);
    //     console.log('selectElement', selectElement);

    // }

    const [state, setState] = useState({ dropdownAction: '' });
    const handleInput = (event: any) => {
        // setState({ ...state, [event.target.name]: event.target.value.trim() });
        switch (event.target.value) {
            case 'insertTable':
                
                break;
            case 'insertGroup':
                onAddGroup()
                break;
        
            default:
                break;
        }
        
    };
    // const selectElement = useRef<HTMLSelectElement>(null);
    // useEffect(() => {
    //     console.log('state', state);
    //     switch (state.dropdownAction) {
    //         case 'insertTable':

    //             break;
    //         case 'insertGroup':
    //             insertGroup()
    //             break;

    //         default:
    //             break;
    //     }
    // }, [state.dropdownAction])
    
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
            <select name="dropdownAction" onChange={event => handleInput(event)}>
                <option value="insertGroup">New group of Items</option>
                <option value="insertTable">Import Items</option>
            </select>
        </article>
    )
}
