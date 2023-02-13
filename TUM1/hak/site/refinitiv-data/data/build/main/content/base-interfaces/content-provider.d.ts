import { ConfigEndpoint } from '../../config';
import { EndpointResponse } from '../../delivery';
import { ApiEndpoints } from '../../session';
import { ContentResponse } from './content-response';
export interface ContentProvider {
    readonly apiGroup: keyof ApiEndpoints;
    readonly endpointName: string;
    getEndpointPath(pathName: string): string;
    getEndpointConfig(): ConfigEndpoint | undefined;
    toContentResponse<TTable>(endpointResponse: EndpointResponse, buildTable?: () => TTable): ContentResponse<TTable>;
}
