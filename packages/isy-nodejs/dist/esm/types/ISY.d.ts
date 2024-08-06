import WebSocket from 'faye-websocket';
import { type ParserOptions } from 'xml2js';
import { EventEmitter } from 'events';
import { Logger } from 'winston';
import { Category } from './Definitions/Global/Categories.js';
import { Family } from './Definitions/Global/Families.js';
import type { NodeInfo } from './Model/NodeInfo.js';
import { ELKAlarmPanelDevice } from './Devices/Elk/ElkAlarmPanelDevice.js';
import { ElkAlarmSensorDevice } from "./Devices/Elk/ElkAlarmSensorDevice.js";
import { InsteonBaseDevice } from './Devices/Insteon/InsteonBaseDevice.js';
import { InsteonOutletDevice } from './Devices/Insteon/InsteonDevice.js';
import { InsteonDimmableDevice } from './Devices/Insteon/InsteonDimmableDevice.js';
import { InsteonDimmerOutletDevice } from './Devices/Insteon/InsteonDimmerOutletDevice.js';
import { InsteonDimmerSwitchDevice } from './Devices/Insteon/InsteonDimmerSwitchDevice.js';
import { InsteonDoorWindowSensorDevice } from './Devices/Insteon/InsteonDoorWindowSensorDevice.js';
import { InsteonFanDevice, InsteonFanMotorDevice } from './Devices/Insteon/InsteonFanDevice.js';
import { InsteonKeypadButtonDevice } from './Devices/Insteon/InsteonKeypadDevice.js';
import { InsteonKeypadDimmerDevice } from "./Devices/Insteon/InsteonKeypadDimmerDevice.js";
import { InsteonKeypadRelayDevice } from "./Devices/Insteon/InsteonKeypadRelayDevice.js";
import { InsteonLeakSensorDevice } from './Devices/Insteon/InsteonLeakSensorDevice.js';
import { InsteonLockDevice } from './Devices/Insteon/InsteonLockDevice.js';
import { InsteonMotionSensorDevice } from './Devices/Insteon/InsteonMotionSensorDevice.js';
import { InsteonOnOffOutletDevice } from './Devices/Insteon/InsteonOnOffOutletDevice.js';
import { InsteonRelayDevice } from './Devices/Insteon/InsteonRelayDevice.js';
import { InsteonSmokeSensorDevice } from './Devices/Insteon/InsteonSmokeSensorDevice.js';
import { InsteonThermostatDevice } from './Devices/Insteon/InsteonThermostatDevice.js';
import { NodeType, Props, States, VariableType } from './ISYConstants.js';
import { ISYNode, ISYDeviceNode, type ISYDevice } from './ISYNode.js';
import { ISYScene } from './ISYScene.js';
import { ISYVariable } from './ISYVariable.js';
import * as Utils from './Utils.js';
export { Category as Categories, ELKAlarmPanelDevice, ElkAlarmSensorDevice, Family, InsteonBaseDevice, InsteonDimmableDevice, InsteonDimmerOutletDevice, InsteonDimmerSwitchDevice, InsteonDoorWindowSensorDevice, InsteonFanDevice, InsteonFanMotorDevice, InsteonKeypadButtonDevice, InsteonKeypadDimmerDevice, InsteonKeypadRelayDevice, InsteonLeakSensorDevice, InsteonLockDevice, InsteonMotionSensorDevice, InsteonOnOffOutletDevice, InsteonOutletDevice, InsteonRelayDevice, InsteonSmokeSensorDevice, InsteonThermostatDevice, ISYDeviceNode as ISYDevice, ISYNode, ISYScene, ISYVariable, NodeType, Props, States, Utils, VariableType };
export declare let Controls: {};
export declare class ISY extends EventEmitter implements Disposable {
    readonly deviceList: Map<string, ISYDevice<any>>;
    readonly deviceMap: Map<string, string[]>;
    readonly sceneList: Map<string, ISYScene>;
    readonly folderMap: Map<string, string>;
    webSocket: WebSocket.Client;
    readonly zoneMap: Map<string, ElkAlarmSensorDevice>;
    readonly protocol: string;
    readonly host: string;
    readonly port: number;
    get address(): string;
    id: string;
    vendorName: string;
    productId: number;
    productName: string;
    readonly credentials: {
        username: string;
        password: string;
    };
    readonly variableList: Map<string, ISYVariable<VariableType>>;
    nodesLoaded: boolean;
    readonly wsprotocol: 'ws' | 'wss';
    readonly elkEnabled: boolean;
    get isDebugEnabled(): boolean;
    readonly displayNameFormat: string;
    guardianTimer: any;
    elkAlarmPanel: ELKAlarmPanelDevice;
    logger: Logger;
    lastActivity: any;
    model: any;
    serverVersion: any;
    readonly storagePath: string;
    readonly enableWebSocket: boolean;
    configInfo: any;
    static instance: ISY;
    constructor(config: {
        host: string;
        port: number;
        protocol: 'http' | 'https';
        username: string;
        password: string;
        enableWebSocket?: boolean;
        displayNameFormat?: string;
        elkEnabled?: boolean;
    }, logger?: Logger, storagePath?: string);
    [Symbol.dispose](): void;
    emit(event: 'InitializeCompleted' | 'NodeAdded' | 'NodeRemoved' | 'NodeChanged', node?: ISYNode<any>): boolean;
    on(event: 'InitializeCompleted' | 'NodeAdded' | 'NodeRemoved' | 'NodeChanged', listener: (node?: ISYNode<any>) => void): this;
    sendRequest(url: string, options?: {
        parserOptions?: ParserOptions;
        trailingSlash: boolean;
        requestLogLevel?: any;
        responseLogLevel?: any;
    }): Promise<any>;
    nodeChangedHandler(node: ELKAlarmPanelDevice | ElkAlarmSensorDevice, propertyName?: any): void;
    getElkAlarmPanel(): ELKAlarmPanelDevice;
    loadNodes(): Promise<any>;
    readFolderNodes(result: {
        nodes: {
            folder: any;
        };
    }): Promise<void>;
    readSceneNodes(result: {
        nodes: {
            group: any;
        };
    }): Promise<void>;
    readDeviceNodes(obj: {
        nodes: {
            node: NodeInfo[];
        };
    }): Promise<void>;
    loadElkNodes(result: any): void;
    loadElkInitialStatus(result: any): void;
    finishInitialize(success: boolean): void;
    guardian(): void;
    variableChangedHandler(variable: {
        id: string;
        type: string;
    }): void;
    checkForFailure(response: any): boolean;
    loadVariables(type: VariableType): Promise<any>;
    loadConfig(): Promise<any>;
    getVariableList(): Map<string, ISYVariable<VariableType>>;
    getVariable<P extends VariableType>(type: P, id: number): ISYVariable<P>;
    createVariableKey(type: VariableType, id: number): string;
    createVariables(type: VariableType, result: any): void;
    setVariableValues(result: any): void;
    refreshStatuses(): Promise<void>;
    initialize(): Promise<any>;
    handleInitializeError(step: string, reason: any): Promise<any>;
    handleWebSocketMessage(event: {
        data: any;
    }): void;
    initializeWebSocket(): void;
    getDevice<T extends ISYDevice<any, any, any> = ISYDevice<any, any, any>>(address: string, parentsOnly?: boolean): T;
    getScene(address: string): ISYScene;
    sendISYCommand(path: string): Promise<any>;
    sendNodeCommand<P extends string | symbol>(node: ISYNode<any>, command: string, parameters?: (Record<P, string | number> | string | number)): Promise<any>;
    sendGetVariable(id: any, type: any, handleResult: (arg0: number, arg1: number) => void): Promise<void>;
    sendSetVariable(id: any, type: any, value: any, handleResult: {
        (success: any): void;
        (arg0: boolean): void;
        (arg0: boolean): void;
    }): Promise<any>;
}
//# sourceMappingURL=ISY.d.ts.map