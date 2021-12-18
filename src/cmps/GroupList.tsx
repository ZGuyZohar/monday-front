import { Group } from "../models/group.model"
import { GroupApp } from "./GroupApp";

export function GroupList({groups} : {groups: Group[]}) {
    
    return (
        <section className="group-list grow">
            {
                groups.map(group => <GroupApp key={group.id} group={group} />)
            }
        </section>
    )
}
