export type ColumnDefinition = {
    label: string
    value: any
    sticky: boolean
    cellComponent:any
    headerComponent:any
}

export class ColumnConfig {

    columnDefinition: ColumnDefinition[];

    constructor() {
        this.columnDefinition = [];
    }
}
