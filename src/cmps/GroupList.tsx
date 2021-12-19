import { Group } from "../models/group.model"
import { GroupApp } from "./GroupApp";

export function GroupList({ groups, boardId }: { groups: Group[], boardId: string }) {

    return (
        <section className="group-list grow">
            {
                groups.map(group => <GroupApp key={group.id} boardId={boardId} group={group} />)
            }
        </section>
    )
}
