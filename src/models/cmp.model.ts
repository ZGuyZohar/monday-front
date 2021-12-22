export type CmpTypes = 'StatusPicker' | 'MemberPicker' | 'DatePicker' 
export interface DynamicCmp {
    id: string,
    type: CmpTypes,
    info: any,
    styles: object
}