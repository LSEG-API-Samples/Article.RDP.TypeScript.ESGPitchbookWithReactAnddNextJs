import { IpcBusService, WorkspaceSdkBus } from '@refinitiv-data/common/build/main/interfaces/ipc-bus-service';
import { SessionRequiredParams } from '../session.interface';
export declare const PIPE_INIT_WAIT_MAX_TIMEOUT_MS = 10000;
export interface ContainerSessionParams extends SessionRequiredParams {
    readonly bus?: IpcBusService | WorkspaceSdkBus;
    readonly scope?: string;
}
