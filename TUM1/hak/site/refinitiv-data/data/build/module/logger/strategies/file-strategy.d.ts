import { TransportStrategy } from './transport-strategy.interface';
export declare class FileStrategy implements TransportStrategy {
    private get configuration();
    private prevConfig?;
    private writer?;
    constructor();
    write(methodName: string, ...args: any[]): void;
    initialize(): void;
    private applyConfig;
    private buildStreamMessage;
    private getStackTrace;
    private fileNameGenerator;
}
