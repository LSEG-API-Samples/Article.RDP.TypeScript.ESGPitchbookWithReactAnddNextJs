import type { ContentDefinition } from '../../../base-interfaces';
import * as Bond from '../bond';
import type { Table } from '../financial-contracts.interface';
import type { FinancialInstrument, Params, RepoUnderlyingContractInstrument, RepoUnderlyingPricingParameters } from './interfaces';
export declare const REPO_INSTRUMENT_TYPE = "Repo";
export declare function Definition(params: Params): ContentDefinition<Table, FinancialInstrument>;
export interface RepoUnderlyingContractParams extends Bond.InstrumentDefinition {
    pricingParameters?: RepoUnderlyingPricingParameters;
}
export declare function RepoUnderlyingContract(params: string | RepoUnderlyingContractParams): RepoUnderlyingContractInstrument;
