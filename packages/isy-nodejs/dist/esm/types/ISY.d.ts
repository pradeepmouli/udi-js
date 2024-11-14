import WebSocket from 'faye-websocket';
import { type ParserOptions } from 'xml2js';
import { type AxiosRequestConfig } from 'axios';
import { EventEmitter } from 'events';
import { Logger } from 'winston';
import { ELKAlarmPanelDevice } from './Devices/Elk/ElkAlarmPanelDevice.js';
import { ElkAlarmSensorDevice } from './Devices/Elk/ElkAlarmSensorDevice.js';
import { VariableType } from './ISYConstants.js';
import { type ISYDevice } from './ISYDevice.js';
import { ISYNode } from './ISYNode.js';
import { ISYScene } from './ISYScene.js';
import { ISYVariable } from './ISYVariable.js';
import * as Utils from './Utils.js';
import type { Config } from './Model/Config.js';
export declare let Controls: {};
interface ISYConfig {
    displayNameFormat?: string;
    elkEnabled?: boolean;
    enableWebSocket?: boolean;
    host: string;
    password: string;
    port: number;
    protocol: 'http' | 'https';
    username: string;
    socketPath?: string;
}
export declare class ISY extends EventEmitter implements Disposable {
    #private;
    readonly credentials: {
        username: string;
        password: string;
    };
    readonly deviceList: Map<string, ISYDevice<any, any, any, any>>;
    readonly deviceMap: Map<string, string[]>;
    readonly displayNameFormat: string;
    readonly elkEnabled: boolean;
    readonly enableWebSocket: boolean;
    readonly folderMap: Map<string, string>;
    readonly host: string;
    readonly nodeMap: Map<string, ISYNode<any, any, any, any>>;
    readonly port: number;
    readonly protocol: string;
    readonly sceneList: Map<string, ISYScene>;
    readonly storagePath: string;
    readonly variableList: Map<string, ISYVariable<VariableType>>;
    readonly wsprotocol: 'ws' | 'wss';
    readonly zoneMap: Map<string, ElkAlarmSensorDevice>;
    static instance: ISY;
    configInfo: Config;
    elkAlarmPanel: ELKAlarmPanelDevice;
    guardianTimer: any;
    id: string;
    lastActivity: any;
    logger: Logger;
    model: any;
    nodesLoaded: boolean;
    productId: number;
    productName: string;
    firmwareVersion: any;
    vendorName: string;
    webSocket: WebSocket.Client;
    apiVersion: string;
    socketPath: string;
    get axiosOptions(): AxiosRequestConfig;
    constructor(config: ISYConfig, logger?: Logger, storagePath?: string);
    get address(): string;
    get isDebugEnabled(): boolean;
    [Symbol.dispose](): void;
    emit(event: 'InitializeCompleted' | 'NodeAdded' | 'NodeRemoved' | 'NodeChanged', node?: ISYNode<any, any, any, any>): boolean;
    getDevice<T extends ISYDevice<any, any, any, any> = ISYDevice<any, any, any, any>>(address: string, parentsOnly?: boolean): T;
    getElkAlarmPanel(): ELKAlarmPanelDevice;
    getNode<T extends ISYNode<any, any, any, any> = ISYNode<any, any, any, any>>(address: string, parentsOnly?: boolean): T;
    getScene(address: string): ISYScene;
    getVariable<P extends VariableType>(type: P, id: number): ISYVariable<P>;
    getVariableList(): Map<string, ISYVariable<VariableType>>;
    handleInitializeError(step: string, reason: any): Promise<any>;
    handleWebSocketMessage(event: {
        data: any;
    }): void;
    initialize(): Promise<boolean>;
    initializeWebSocket(): Promise<void>;
    loadConfig(): Promise<any>;
    loadNodes(): Promise<any>;
    loadVariables(type: VariableType): Promise<any>;
    nodeChangedHandler(node: ELKAlarmPanelDevice | ElkAlarmSensorDevice, propertyName?: any): void;
    on(event: 'initializeCompleted', listener: () => void): this;
    on(event: 'nodeAdded' | 'nodeRemoved' | 'nodeChanged', listener: (node?: ISYNode<any, any, any, any>) => void): this;
    refreshStatuses(): Promise<void>;
    sendGetVariable(id: any, type: any, handleResult: (arg0: number, arg1: number) => void): Promise<void>;
    sendISYCommand(path: string): Promise<any>;
    sendNodeCommand<P extends string | symbol, N extends ISYNode<any, any, any, any>>(node: N, command: string, parameters?: Record<P, string | number> | string | number): Promise<any>;
    sendRequest(url: string, options?: {
        parserOptions?: ParserOptions;
        trailingSlash: boolean;
        requestLogLevel?: Utils.LogLevel;
        responseLogLevel?: Utils.LogLevel;
        errorLogLevel?: Utils.LogLevel;
        throwOnError?: boolean;
    } & Utils.ISYRequestConfig): Promise<any>;
    sendSetVariable(id: any, type: any, value: any, handleResult: {
        (success: any): void;
        (arg0: boolean): void;
        (arg0: boolean): void;
    }): Promise<any>;
    close(): void;
}
export declare namespace ISY {
    interface Config extends ISYConfig {
    }
}
export {};
//# sourceMappingURL=ISY.d.ts.map