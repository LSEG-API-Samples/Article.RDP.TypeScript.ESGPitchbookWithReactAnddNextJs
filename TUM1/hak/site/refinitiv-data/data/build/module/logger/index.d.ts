import { Logger, LoggingMethod, LogLevelNumbers, MethodFactory, RootLogger } from 'loglevel';
import { LoggerWrapper } from './logger-wrapper';
export { LogLevel } from '../config/config.interfaces';
export { Logger, LoggingMethod, MethodFactory, RootLogger, LoggerWrapper, LogLevelNumbers };
declare let logger: RootLogger;
export { logger };
