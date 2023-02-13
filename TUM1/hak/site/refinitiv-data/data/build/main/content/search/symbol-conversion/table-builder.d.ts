import { Logger } from '../../../logger';
import { TableBuilder } from '../../base-interfaces';
import { Data, DataWithParams, Table } from './interfaces';
export declare class TableBuilderImp implements TableBuilder<Data, Table> {
    private defaultTable;
    private log;
    constructor(defaultTable?: Table, log?: Logger);
    build({ data, params }: DataWithParams): Table;
    private isTransformable;
    private doBuild;
    private getSymbolConversionResponseItem;
}
