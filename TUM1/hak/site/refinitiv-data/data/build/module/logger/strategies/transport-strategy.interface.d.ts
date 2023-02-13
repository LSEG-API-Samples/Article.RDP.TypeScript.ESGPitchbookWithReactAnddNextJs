export interface TransportStrategy {
    write(methodName: string, ...args: any[]): void;
    initialize(): void;
}
