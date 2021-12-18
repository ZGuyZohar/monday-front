import { DynamicCmp } from "../../models/cmp.model";

export function HeadStatusPicker({styles}: {styles: { width: number } }) {
   

    return (
        <div style={{ width: `${styles.width}px` } } className="mx-2 px-2 dynamic-preview">
            Status Picker
        </div>
    )
}
