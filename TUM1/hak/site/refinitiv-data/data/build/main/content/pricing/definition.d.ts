import { StreamDefinition } from '../base-interfaces/stream-definition';
import type { Params, Stream } from './stream/pricing-stream.interfaces';
export declare function Definition(universe: string | string[]): StreamDefinition<Stream>;
export declare function Definition(params: Params): StreamDefinition<Stream>;
