import type { Session } from '../../session/session.interface';
import { DefaultSessionManager } from './default-session-manager.interface';
export declare class DefaultSessionManagerImpl implements DefaultSessionManager {
    private log;
    static getInstance(): DefaultSessionManager;
    private static instance;
    private defaultSession;
    private constructor();
    getDefault: () => Session;
    setDefault: (session: Session | null) => void;
}
