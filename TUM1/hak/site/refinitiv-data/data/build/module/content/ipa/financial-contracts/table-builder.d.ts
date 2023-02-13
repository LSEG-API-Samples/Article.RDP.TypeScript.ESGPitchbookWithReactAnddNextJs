import { Logger } from '../../../logger';
import { TableBuilder } from '../../base-interfaces';
import { Data, Table } from './financial-contracts.interface';
export declare class TableBuilderImp implements TableBuilder<Data, Table> {
    private defaultTable;
    private log;
    constructor(defaultTable?: any, log?: Logger);
    build(data: Data): Table;
    private isTransformable;
    private doBuild;
}
