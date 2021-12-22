import { FunctionBody } from "typescript";

export function GroupHeaderTitle({ title, groupTitleUpdated }: { title: string, groupTitleUpdated: any }) {
    // make dynamic width with an initial value

    const handleChange = ({ target }: { target: HTMLInputElement }): void => {
        console.log('handleChange target.value:', target.value);
        // **ASK should i do it like that? i want to have event for updating group title, and i want to do it from
        // a smart cmp like GroupApp.
        groupTitleUpdated(target.value)
    }

    return (
        <div className="main">
            <input type="text" value={title} onChange={handleChange} />
        </div>
    )
}
