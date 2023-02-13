import { TableInterface } from '../../base-interfaces';
import { ContentDefinition } from '../../base-interfaces/content-definition';
import { ExtendedParams } from '../../base-interfaces/extended-params';
import * as Bond from './bond';
import * as BondFuture from './bond-future';
import * as CapFloor from './cap-floor';
import * as CDS from './cds';
import * as FxCross from './fx-cross';
import * as IRSwap from './ir-swap';
import * as Option from './option';
import * as Repo from './repo';
import * as Swaption from './swaption';
import * as TermDeposit from './term-deposit';
export declare type FinancialContractsDefinitions = Array<ContentDefinition<any, FinancialInstrument>>;
export interface Params extends FinancialInstrumentParams {
    definitions: FinancialContractsDefinitions;
}
export interface FinancialInstrumentParams extends ExtendedParams {
    fields?: string[];
    outputs?: Outputs[];
}
export interface Content extends FinancialInstrumentParams {
    universe: FinancialInstrument[];
    pricingParameters?: Array<Bond.PricingParameters | Option.PricingParameters | CDS.PricingParameters | IRSwap.PricingParameters | Repo.PricingParameters | FxCross.PricingParameters | Swaption.PricingParameters | CapFloor.PricingParameters | TermDeposit.PricingParameters | BondFuture.PricingParameters>;
}
export interface FinancialInstrument {
    instrumentType: string;
    instrumentDefinition: Bond.InstrumentDefinition | Option.InstrumentDefinition | CDS.InstrumentDefinition | IRSwap.InstrumentDefinition | Repo.InstrumentDefinition | FxCross.InstrumentDefinition | Swaption.InstrumentDefinition | CapFloor.InstrumentDefinition | TermDeposit.InstrumentDefinition | BondFuture.InstrumentDefinition;
    pricingParameters?: Bond.PricingParameters | Option.PricingParameters | CDS.PricingParameters | IRSwap.PricingParameters | Repo.PricingParameters | FxCross.PricingParameters | Swaption.PricingParameters | CapFloor.PricingParameters | TermDeposit.PricingParameters | BondFuture.PricingParameters;
}
export declare enum Outputs {
    Headers = "Headers",
    Statuses = "Statuses",
    Data = "Data",
    MarketData = "MarketData"
}
export declare type Table = TableInterface<TableRow>;
export interface TableRow {
    [key: string]: any;
}
