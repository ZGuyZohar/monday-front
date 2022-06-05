import { Dispatch, MouseEventHandler, SetStateAction, useState } from 'react';
import ReactTooltip from 'react-tooltip';


export default function ResizeHandle({ size, setSize, onUpCb }: { size: number, setSize: Dispatch<SetStateAction<number>> | null, onUpCb: (currSize: number) => void }) {

    const handler = (mouseDownEvent: any) => {
        const startSize = size
        const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };
        let currSize = 0

        function onMouseMove(mouseMoveEvent: MouseEvent) {
            currSize = startSize - startPosition.x + mouseMoveEvent.pageX
            if (setSize) setSize(currSize);
            document.body.removeEventListener("mouseup", onMouseUp);
            document.body.addEventListener("mouseup", onMouseUp, { once: true });
        }
        function onMouseUp() {
            document.body.removeEventListener("mousemove", onMouseMove);
            onUpCb(currSize)
            // uncomment the following line if not using `{ once: true }`
        }

        document.body.addEventListener("mousemove", onMouseMove);
    };


    return (
        <div onMouseDown={handler} data-for="main" data-tip="Resize Column" onClick={(ev) => { ev.stopPropagation(); console.log('Hey') }} className="resize-handle">
            <ReactTooltip id='main' />
        </div>
    )
}