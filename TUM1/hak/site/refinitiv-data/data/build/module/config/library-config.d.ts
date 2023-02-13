import { Config } from 'convict';
import { BaseConfig } from './base-config';
import { CONFIG_FILE_UPDATED, NEW_CONFIG_VALUE_SET } from './contracts';
export declare class LibraryConfig<T = any> extends BaseConfig<T> {
    private get isBrowser();
    private watchedFiles;
    constructor(schema: T);
    get CONFIG_FILE_UPDATED(): typeof CONFIG_FILE_UPDATED;
    get CONFIG_SET(): typeof NEW_CONFIG_VALUE_SET;
    set<K extends string | keyof T>(name: K, value: K extends keyof T ? T[K] : any): Config<T>;
    set<K extends keyof T, K2 extends string | keyof T[K]>(name: K, value: K2 extends keyof T[K] ? T[K][K2] : any): Config<T>;
    set<K extends keyof T, K2 extends keyof T[K], K3 extends string | keyof T[K][K2]>(name: K, value: K3 extends keyof T[K][K2] ? T[K][K2][K3] : any): Config<T>;
    set<K extends keyof T, K2 extends keyof T[K], K3 extends keyof T[K][K2], K4 extends string | keyof T[K][K2][K3]>(name: K, value: K4 extends keyof T[K][K2][K3] ? T[K][K2][K3][K4] : any): Config<T>;
    getConfigFilesPath(): string[];
    notifyConfigUpdated(event?: string, data?: Partial<T>, source?: string): boolean;
    watch(): void;
    unwatch(): void;
    extendDefault(configExtend: {
        [key: string]: any;
    }): void;
    private init;
    private configFileChangedHandler;
}
