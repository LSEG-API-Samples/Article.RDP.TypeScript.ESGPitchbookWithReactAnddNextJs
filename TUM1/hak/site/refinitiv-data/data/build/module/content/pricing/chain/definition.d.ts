import type { StreamDefinition } from '../../base-interfaces';
import type { Params, Stream } from './streaming-chain.interface';
export declare function Definition(name: string): StreamDefinition<Stream>;
export declare function Definition(params: Params): StreamDefinition<Stream>;
