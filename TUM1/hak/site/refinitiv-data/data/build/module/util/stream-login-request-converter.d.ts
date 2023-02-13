import { Dacs } from '@refinitiv-data/common';
import { RdpAuthParams } from '../constants/stream';
import { StreamLoginParams } from '../delivery/stream/stream-connection.interface';
export declare function buildRdpSessionLoginData(params: RdpAuthParams): StreamLoginParams;
export declare function buildLocalSessionLoginData(dacs?: Dacs): StreamLoginParams;
