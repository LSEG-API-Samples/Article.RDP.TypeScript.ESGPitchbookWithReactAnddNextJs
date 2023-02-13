import { ChainRecord, ChainRecordFieldResponse, DisplayTemplateType } from './chain-record.interface';
export declare class ChainRecordImpl implements ChainRecord {
    private data;
    get linkFields(): string[];
    nextCR: string | undefined;
    prevCR: string | undefined;
    displayTemplate: DisplayTemplateType;
    private linkFieldsValues;
    private isValidRecord;
    private fieldNames;
    constructor(data: ChainRecordFieldResponse);
    get isValidChainRecord(): boolean;
    updateChainRecord(data: ChainRecordFieldResponse): number[];
    private parseChainRecord;
    private detectDisplayTemplate;
    private initFields;
    private isValidDisplayTemplate;
    private isValidNumberCharsChainRecord;
    private getFieldNames;
    private generateLinkFieldNames;
    private getLinkFieldsValues;
    private updateData;
}
