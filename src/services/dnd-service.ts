// a little function to help us with reordering the result
export const reorder = (list: any, startIndex: any, endIndex: any) => {
    const reorderedList = JSON.parse(JSON.stringify(list))
    const removed = reorderedList.splice(startIndex, 1);
    reorderedList.splice(endIndex, 0, removed[0]);
    console.log('reorderedList', reorderedList);
    return reorderedList
};

const grid = 8;

export const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
});

export const getListStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    // width: 250
});
