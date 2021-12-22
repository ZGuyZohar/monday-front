import { Group } from "../models/group.model"
import { GroupApp } from "./GroupApp";

export function GroupList({ groups, sendEditInfo, boardId }: { groups: Group[], sendEditInfo: any, boardId: string }) {

    return (
        <section className="group-list grow">
            {groups.map(group => <GroupApp key={group.id} group={group} boardId={boardId} sendEditInfo={sendEditInfo} />)}

        </section>
    )
}
