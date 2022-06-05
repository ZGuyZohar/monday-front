import ResizeHandle from "../ResizeHandle"

export function HeadDatePicker({ styles }: { styles: { width: number } }) {

    const onSetSize = () => {
        console.log('onSetSize');
    }

    const onUpCb = () => {
        console.log('onUpCb');
    }

    return (
        <div style={{ width: `${styles.width}px` }} className="mx-2 px-2 dynamic-preview">
            Date Picker
            {/* <ResizeHandle size={styles.width} setSize={onSetSize} onUpCb={onUpCb} /> */}
        </div>
    )
}
