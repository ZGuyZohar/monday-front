
export function GroupHeaderTitle({title} : {title: string}) {
    // make dynamic width with an initial value
    return (
        <div className="main mx-2">
            {title}
        </div>
    )
}
