import type { StreamDefinition } from '../../base-interfaces/stream-definition';
import type { Params, Stream } from './metadata-stream.interface';
export declare function Definition(): StreamDefinition<Stream>;
export declare function Definition(params: Params): StreamDefinition<Stream>;
