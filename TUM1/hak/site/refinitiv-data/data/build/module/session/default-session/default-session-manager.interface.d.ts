import * as Session from '../../session/session.interface';
export interface DefaultSessionManager {
    getDefault(): Session.Session;
    setDefault(session: Session.Session | null): void;
}
