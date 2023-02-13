import { ApiEndpoints, Session } from '../../session';
import { AbstractContentProvider } from '../abstract-content-provider';
import { TableBuilder } from '../base-interfaces';
import { ContentResponse } from '../base-interfaces/content-response';
import * as FundamentalAndReference from './interfaces';
export declare class FundamentalAndReferenceProviderRdp extends AbstractContentProvider {
    private tableBuilder;
    apiGroup: keyof ApiEndpoints;
    endpointName: string;
    private dataAccessor;
    constructor(session: Session, tableBuilder: TableBuilder<FundamentalAndReference.Data, FundamentalAndReference.Table>);
    private setConfig;
    getFundamentalAndReference(params: FundamentalAndReference.Params): Promise<ContentResponse<FundamentalAndReference.Table>>;
    private get mainEndpoint();
    private prepareRequest;
}
