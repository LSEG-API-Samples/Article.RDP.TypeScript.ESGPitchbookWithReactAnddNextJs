import { DEFAULT_CONFIG_SCHEMA } from './config-schema';
import { ConfigSchema } from './config.interfaces';
import { LibraryConfig } from './library-config';
declare const config: LibraryConfig<ConfigSchema>;
export { config, LibraryConfig, DEFAULT_CONFIG_SCHEMA, ConfigSchema };
export { InternalSchema, Overwrite, ValidateOptions, PredefinedFormat, ValidationMethod, ConfigOptions, SchemaObj, Schema, } from './base-config';
export { ConfigEndpoint, DefaultPlatformSessionConfig, DefaultDesktopSessionConfig, StreamingType, StreamingConnectionConfig, HttpConfig, } from './config.interfaces';
