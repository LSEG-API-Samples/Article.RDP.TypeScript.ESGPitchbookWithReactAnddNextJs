import { StreamDefinition } from '../../base-interfaces/stream-definition';
import type { Params, Stream } from './service-directory.interface';
export declare function Definition(): StreamDefinition<Stream>;
export declare function Definition(params: Params): StreamDefinition<Stream>;
