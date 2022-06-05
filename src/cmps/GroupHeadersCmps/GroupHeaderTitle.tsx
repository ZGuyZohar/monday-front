import { FunctionBody } from "typescript";
import ReactTooltip from 'react-tooltip';
import { Dispatch, MouseEventHandler, SetStateAction, SyntheticEvent, useEffect, useState } from "react";
import ResizeHandle from '../ResizeHandle'

export function GroupHeaderTitle({ title, groupTitleUpdated, color, dragHandleProps, titleSize, setTitleSize, onTitleResize }: { title: string, groupTitleUpdated: any, color: string, dragHandleProps: any, titleSize: number, setTitleSize: Dispatch<SetStateAction<number>> | null, onTitleResize: (currSize: number) => void }) {


    return (
        <div className="main group-header-title" style={{ minWidth: `${titleSize}px` }}>
            <div style={{ color }}>
                <span {...dragHandleProps} className="group-drag-icon" data-for="drag" data-tip="Drag group">X</span>
                {title}</div>
            <ReactTooltip id='drag' />
            <ResizeHandle size={titleSize} setSize={setTitleSize} onUpCb={onTitleResize} />
        </div>
    )
}
