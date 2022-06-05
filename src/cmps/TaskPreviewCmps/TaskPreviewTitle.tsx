
export function TaskPreviewTitle({ title, size }: { title: string, size: number }) {
    return (
        <div className="main" style={{ minWidth: size }}>
            {title}
        </div>
    )
}
