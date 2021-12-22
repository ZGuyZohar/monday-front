import { Group } from "../models/group.model"
import { GroupApp } from "./GroupApp";

export function GroupList({ groups, sendEditInfo }: { groups: Group[], sendEditInfo: any}) {
    
    return (
        <section className="group-list grow">
            {groups.map(group => <GroupApp key={group.id} group={group} sendEditInfo={sendEditInfo} />) }
        </section>
    )
}
