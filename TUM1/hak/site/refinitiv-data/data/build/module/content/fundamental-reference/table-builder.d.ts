import { Logger } from '../../logger';
import { TableBuilder } from '../base-interfaces';
import { Data, Table } from './interfaces';
export declare class TableBuilderImp implements TableBuilder<Data, Table> {
    private defaultTable;
    private log;
    constructor(defaultTable?: Table, log?: Logger);
    build(data: Data): Table;
    private isTransformable;
    private checkDuplicates;
    private doBuild;
}
