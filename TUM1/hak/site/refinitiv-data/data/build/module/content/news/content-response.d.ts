import { ContentObjectResponse } from '../base-interfaces';
export interface NewsContentObjectResponse<TTable> extends ContentObjectResponse<TTable> {
    news?: any;
}
