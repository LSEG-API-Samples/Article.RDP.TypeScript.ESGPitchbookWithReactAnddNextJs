import { ConfigEndpoint } from '../config';
import { EndpointResponse } from '../delivery';
import { ApiEndpoints, Session } from '../session';
import { ContentResponse } from './base-interfaces';
import { ContentProvider } from './base-interfaces/content-provider';
export declare abstract class AbstractContentProvider implements ContentProvider {
    private session;
    abstract endpointName: string;
    abstract apiGroup: keyof ApiEndpoints;
    constructor(session: Session);
    getEndpointPath(pathName: string): string;
    getEndpointConfig(): ConfigEndpoint | undefined;
    toContentResponse<TTable = any>(endpointResponse: EndpointResponse, buildTable?: () => TTable): ContentResponse<TTable>;
}
