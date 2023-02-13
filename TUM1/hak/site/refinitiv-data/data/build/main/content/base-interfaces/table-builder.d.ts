export interface TableBuilder<TData = any, TTable = any> {
    build(data: TData): TTable;
}
export interface TableInterface<TRow> {
    [key: string]: TRow;
}
