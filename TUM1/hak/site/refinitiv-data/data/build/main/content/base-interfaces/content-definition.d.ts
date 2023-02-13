import type { Session } from '../../session';
import type { ContentResponse } from './content-response';
export interface ContentDefinition<TTable = any, TParam = any> {
    getData(session?: Session): Promise<ContentResponse<TTable>>;
}
