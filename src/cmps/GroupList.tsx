import { Group } from "../models/group.model"
import { GroupApp } from "./GroupApp";
import { reorder, getItemStyle, getListStyle } from "../services/dnd-service";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function GroupList({ groups, sendEditInfo, boardId, groupsOrderUpdated, onTitleResize, titleSize, setTitleSize }: { groups: Group[], sendEditInfo: any, boardId: string, groupsOrderUpdated: any, onTitleResize: (currNumber: number) => void, titleSize: number, setTitleSize: Dispatch<SetStateAction<number>> | null }) {

    const onDragEnd = (result: any) => {
        console.log('onDragEnd', result);

        // dropped outside the list
        if (!result.destination) {
            return;
        }
        groupsOrderUpdated(reorder(groups, result.source.index, result.destination.index))
    }

    return (
        <section className="group-list grow">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided: any, snapshot: any) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {groups.map((group, index) => (
                                <Draggable key={group.id} draggableId={group.id} index={index}>
                                    {(provided: any, snapshot: any) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            <GroupApp onTitleResize={onTitleResize} titleSize={titleSize} setTitleSize={setTitleSize} dragHandleProps={provided.dragHandleProps} key={group.id} group={group} boardId={boardId} sendEditInfo={sendEditInfo} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>


        </section>
    )
}
