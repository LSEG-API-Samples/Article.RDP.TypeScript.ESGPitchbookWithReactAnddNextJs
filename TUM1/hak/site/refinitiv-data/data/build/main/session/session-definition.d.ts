import { Session, SessionDefinition } from './session.interface';
export declare class SessionDefinitionImpl implements SessionDefinition {
    private sessionCreator;
    constructor(sessionCreator: () => Session);
    getSession(): Session;
}
