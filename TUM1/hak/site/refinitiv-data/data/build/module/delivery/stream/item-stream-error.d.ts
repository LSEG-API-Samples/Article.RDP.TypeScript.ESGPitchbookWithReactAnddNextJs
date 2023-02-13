export declare class ItemStreamError<T> extends Error {
    readonly response: T;
    constructor(m: string, response: T);
}
