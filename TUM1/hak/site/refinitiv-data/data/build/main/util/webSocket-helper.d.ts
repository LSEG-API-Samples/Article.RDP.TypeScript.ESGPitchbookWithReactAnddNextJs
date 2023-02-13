import WebSocket from 'isomorphic-ws';
import { socketCreator } from '../delivery/stream/stream-connection.interface';
export declare const prepareSocketCreator: (wsEndpoint: string, protocol: string, options?: WebSocket.ClientOptions | undefined) => socketCreator;
