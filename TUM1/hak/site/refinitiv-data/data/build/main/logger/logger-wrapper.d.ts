import { RootLogger } from 'loglevel';
import { TransportStrategy } from './strategies/transport-strategy.interface';
export declare class LoggerWrapper {
    private logger;
    private get configuration();
    private filter;
    private environment;
    private namespaces;
    private transports;
    constructor(logger: RootLogger);
    getWrappedLogger(): RootLogger;
    register(transport: TransportStrategy): void;
    private modifyMethodFactory;
    private formatLogMessage;
    private applyLevel;
    private applyFilter;
    private getFilterFromLocalStorage;
    private enabled;
    private setupListeners;
    private handleStorageEvent;
}
