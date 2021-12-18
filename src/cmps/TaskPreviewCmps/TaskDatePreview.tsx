
export function TaskDatePreview({ payload }: { payload: any }) {

    return (
        <div style={{ width: `${payload.cmp.styles.width || 130 }px` }} className="mx-2 px-2 dynamic-preview" >
            date preview
        </div>
    )
}
