import { Group } from "../models/group.model"
import { GroupApp } from "./GroupApp";

export function GroupList({groups} : {groups: Group[]}) {
    
    return (
        <section>
            {
                groups.map(group => <GroupApp key={group.id} group={group} />)
            }
        </section>
    )
}
