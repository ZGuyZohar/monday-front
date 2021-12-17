import { Group } from "../models/group.model"

export function GroupList({groups} : {groups: Group[]}) {
    console.log(groups, 'groups are');
    
    return (
        <section>
           { groups.map(group => {
                return <li>{group.title}</li>
            })
        }
        </section>
    )
}
