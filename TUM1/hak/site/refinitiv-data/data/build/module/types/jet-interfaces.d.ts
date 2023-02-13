export interface JetContainerDescription {
    name: string;
    logLevel: string;
    version: string;
    containerVersion?: string;
    productVersionInfo?: string;
    product?: string;
    userAgent?: string;
    GUID: string;
    capabilities: JetDescriptionCapabilities;
    properties: JetDescriptionProps[];
    windowInfo: JetDescriptionWindow;
    plugin: JetDescriptionPlugin;
    containerType?: string;
    major: number;
    minor: number;
    build: number;
}
export interface JetDescriptionCapabilities {
    MenuItems: object;
    Actions: object;
    Events: object;
    DragAndDrop: object;
    Properties: object;
    FullChromiumNavigation: object;
}
export interface JetDescriptionProps {
    theme?: string;
    AppInfo?: string;
}
export interface JetDescriptionWindow {
    windowId: string;
    isFlexViewer: boolean;
}
export interface JetDescriptionPlugin {
    channel: string;
}
export interface JetInitOptions {
    ID?: string;
    title?: string;
}
export declare enum JetEnvironmentContainerType {
    DESKTOP = "desktop",
    WEB = "web",
    MOBILE = "mobile"
}
export interface JetSettingRequest {
    providerName: string;
    settingName: string;
}
export interface JetSettings {
    read: (handler: (setting: string | undefined) => void, data: JetSettingRequest, errorHandler: (message: string) => void) => void;
    write: (data: JetSettingRequest) => void;
    onChange: (handler: (value: string) => void, data: JetSettingRequest) => void;
}
export interface JET {
    ContainerDescription: JetContainerDescription;
    Settings?: JetSettings;
    onLoad(cb: () => void): void;
    init(options: JetInitOptions): void;
    containerType(): JetEnvironmentContainerType;
}
