import { OMMStreamRequestParams } from '../../../delivery';
import { RequestParams } from './streaming-chain.interface';
export declare const getItemStreamInitParams: (name: string, params?: RequestParams | undefined) => OMMStreamRequestParams;
export declare const getNextChainRecordName: (name: string) => string;
export declare const generateChainRecordsNames: (name: string, nameGuessingQuantity: number) => string[];
