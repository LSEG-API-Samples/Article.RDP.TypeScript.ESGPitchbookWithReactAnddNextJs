import { EndpointResponse } from '../../delivery/endpoint-request';
import { Session } from '../../session';
import { DataAccessor, DataAccessorContentBody, DataAccessorContentQuery, DataAccessorRequest } from './data-accessor.interface';
export declare class DataAccessorImpl implements DataAccessor {
    private session;
    constructor(session: Session);
    getData<TRequest extends DataAccessorRequest<DataAccessorContentQuery, DataAccessorContentBody>>(request: TRequest): Promise<EndpointResponse>;
}
