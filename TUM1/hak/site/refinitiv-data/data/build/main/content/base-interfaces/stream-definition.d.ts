import { Session } from '../../session';
export interface StreamDefinition<TStream> {
    getStream(session?: Session, api?: string): TStream;
}
