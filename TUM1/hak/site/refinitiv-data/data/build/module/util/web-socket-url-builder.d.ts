export interface WebSocketUrlBuilder {
    setUrl(url: string): this;
    setPort(port: number): this;
    setDefaultPathname(pathname: string): this;
    build(): string;
}
export declare class WebSocketUrlBuilderImpl implements WebSocketUrlBuilder {
    static getNewInstance(): WebSocketUrlBuilder;
    private url;
    private port;
    private defaultPathname;
    private readonly wsUrlTemplate;
    private readonly httpsProtocolPrefix;
    private readonly emptyPathname;
    setUrl(url: string): this;
    setPort(port: number): this;
    setDefaultPathname(pathname: string): this;
    build(): string;
    private checkRequired;
}
