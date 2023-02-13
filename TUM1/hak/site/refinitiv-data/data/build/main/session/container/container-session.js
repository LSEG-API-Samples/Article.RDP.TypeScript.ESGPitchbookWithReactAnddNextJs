"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerSession = void 0;
const container_session_1 = require("../../constants/container-session");
const error_messages_1 = require("../../constants/error-messages");
const logger_1 = require("../../logger");
const state_manager_interface_1 = require("../../state/state-manager.interface");
const detect_container_1 = require("../../util/detect-container");
const validate_required_1 = require("../../util/validate-required");
const abstract_session_1 = require("../abstract/abstract-session");
const session_definition_1 = require("../session-definition");
const session_interface_1 = require("../session.interface");
const container_session_params_interface_1 = require("./container-session-params.interface");
const transport_http_1 = require("./transport-http");
const transport_mix_1 = require("./transport-mix");
const transport_pipe_1 = require("./transport-pipe");
class ContainerSession extends abstract_session_1.AbstractSession {
    constructor(sessionParams) {
        super();
        this.sessionParams = sessionParams;
        this.rdpUrlRoot = '';
        this.pipeState = { ready: false };
        this.log = logger_1.logger.getLogger('session:container');
        this.log.info('Create session');
        validate_required_1.validateRequired(sessionParams, ['appKey'], 'ContainerSessionParams');
    }
    static Definition(params) {
        const sessionParams = typeof params === 'string' ? { appKey: params } : params;
        return new session_definition_1.SessionDefinitionImpl(() => new ContainerSession(sessionParams));
    }
    getOverriddenEndpoints() {
        return {};
    }
    get cookieJarSupport() {
        return true;
    }
    async getSocketCreators(api, protocol) {
        await this.checkPipeErrors();
        const execEnv = await detect_container_1.detectContainer();
        return [this.transportStrategy.getStreamTransport(api, protocol, execEnv)];
    }
    getStreamLoginParams() {
        return this.transportStrategy.getStreamLoginParams();
    }
    async request(requestParams) {
        await this.checkPipeErrors();
        return this.transportStrategy.request(requestParams);
    }
    async initialize() {
        try {
            this.transportStrategy = await this.createTransport();
            this.rdpUrlRoot = this.transportStrategy.rdpUrlRoot;
            await this.transportStrategy.initialize();
            await this.transportStrategy.authorize(this.getAuthParams());
            this.sessionEventsEmitter.emit(session_interface_1.SessionEvent.EventReceived, this, session_interface_1.SessionEventCode.AuthenticationSucceeded);
        }
        catch (error) {
            this.sessionEventsEmitter.emit(session_interface_1.SessionEvent.EventReceived, this, session_interface_1.SessionEventCode.AuthenticationFailed, error);
            this.sessionEventsEmitter.emit(session_interface_1.SessionEvent.Error, error, this);
            throw error;
        }
    }
    async cleanUp() {
        var _a;
        await super.cleanUp();
        (_a = this.transportStrategy) === null || _a === void 0 ? void 0 : _a.cleanUp();
    }
    getAuthParams() {
        return {
            appKey: this.sessionParams.appKey,
            scope: this.sessionParams.scope || container_session_1.APP_DEFAULT_SCOPE,
        };
    }
    async createTransport() {
        const execEnv = await detect_container_1.detectContainer();
        const { appKey, bus } = this.sessionParams;
        this.log.debug('Execution env:', execEnv);
        switch (execEnv) {
            case container_session_1.ExecutionContainer.RTK:
            case container_session_1.ExecutionContainer.SXS_WEB:
            case container_session_1.ExecutionContainer.WORKSPACE_SDK:
            case container_session_1.ExecutionContainer.WEB_RW_OR_EIKON:
                return new transport_mix_1.TransportMix({ bus, execEnv, appKey });
            case container_session_1.ExecutionContainer.DESKTOP_RW_1_9:
            case container_session_1.ExecutionContainer.DESKTOP_RW_NON_1_9_OR_EIKON:
                this.checkPipePromise = this.checkPipeAvailableAndSwitch(execEnv);
                return new transport_http_1.TransportHttp({ appKey });
            default: {
                const error = new Error(error_messages_1.ErrorMessages.WRONG_TRANSPORT_TYPE);
                this.log.error(error);
                throw error;
            }
        }
    }
    async checkPipeAvailableAndSwitch(executionEnv) {
        this.log.debug(`Start checking if 'pipe' transport is available`);
        if (this.state === state_manager_interface_1.State.Closed) {
            this.log.debug(`Session is closed. Skip checking 'pipe' transport`);
            return;
        }
        try {
            const busOptions = executionEnv === container_session_1.ExecutionContainer.DESKTOP_RW_1_9 ? { disableStringify: true } : void 0;
            const pipeTransport = new transport_pipe_1.TransportPipe(this.sessionParams.bus, busOptions);
            await Promise.race([this.doSwitch(pipeTransport), this.waitMaxFor(container_session_params_interface_1.PIPE_INIT_WAIT_MAX_TIMEOUT_MS)]);
        }
        catch (error) {
            this.log.debug('Pipe channel:', error);
            this.pipeState.error = error;
        }
    }
    waitMaxFor(timeout) {
        return new Promise((res, rej) => {
            const checkErrorByTimeout = new Error(error_messages_1.ErrorMessages.STREAMING_NOT_READY_OR_UNAVAILABLE);
            setTimeout(() => rej(checkErrorByTimeout), timeout);
        });
    }
    async doSwitch(transport) {
        await transport.initialize();
        this.pipeState.ready = true;
        await transport.authorize(this.getAuthParams());
        await this.switchToPipe(transport);
        this.pipeState.error = undefined;
    }
    async switchToPipe(transport) {
        if (this.state === state_manager_interface_1.State.Closed) {
            this.log.info(`Session is closed. Switching to 'pipe' is canceled`);
            return;
        }
        await this.transportStrategy.cleanUp();
        this.rdpUrlRoot = transport.rdpUrlRoot;
        this.transportStrategy = transport;
        this.log.info(`Switched to 'pipe' transport`);
    }
    async checkPipeErrors() {
        await this.checkPipePromise;
        if (this.pipeState.ready && this.pipeState.error) {
            throw this.pipeState.error;
        }
    }
}
exports.ContainerSession = ContainerSession;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFpbmVyLXNlc3Npb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2Vzc2lvbi9jb250YWluZXIvY29udGFpbmVyLXNlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEseUVBQTBGO0FBQzFGLG1FQUErRDtBQUUvRCx5Q0FBc0M7QUFDdEMsaUZBQTREO0FBQzVELGtFQUE4RDtBQUM5RCxvRUFBZ0U7QUFDaEUsbUVBQStEO0FBQy9ELDhEQUE4RDtBQUM5RCw0REFBc0k7QUFDdEksNkZBQTZHO0FBQzdHLHFEQUFpRDtBQUNqRCxtREFBK0M7QUFDL0MscURBQWlEO0FBR2pELE1BQWEsZ0JBQWlCLFNBQVEsa0NBQWU7SUFlakQsWUFBb0IsYUFBcUM7UUFDckQsS0FBSyxFQUFFLENBQUM7UUFEUSxrQkFBYSxHQUFiLGFBQWEsQ0FBd0I7UUFObEQsZUFBVSxHQUFXLEVBQUUsQ0FBQztRQUd2QixjQUFTLEdBQW1CLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDO1FBS2pELElBQUksQ0FBQyxHQUFHLEdBQUcsZUFBTSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRWpELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFaEMsb0NBQWdCLENBQUMsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBbkJNLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBdUM7UUFDNUQsTUFBTSxhQUFhLEdBQUcsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBRS9FLE9BQU8sSUFBSSwwQ0FBcUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7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