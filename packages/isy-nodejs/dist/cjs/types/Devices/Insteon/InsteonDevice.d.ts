import { ISY } from '../../ISY.js';
import { Constructor } from '../Constructor.js';
import { InsteonRelayDevice } from './InsteonRelayDevice.js';
import 'winston';
import type { InsteonBaseDevice } from './InsteonBaseDevice.js';
export declare const InsteonLampDevice: <T extends Constructor<InsteonBaseDevice>>(IB: T) => {
    new (...args: any[]): {
        isDimmable: boolean;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: never): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: never): any;
        sendBeep(level?: number): Promise<any>;
        family: import("../../Definitions/Global/Families.js").Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        declare: any;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<import("../../Definitions/Global/Families.js").Family.Insteon, any, any, any>;
        children: import("../../ISYNode.js").ISYNode<any, any, any, any>[];
        addChild<K extends import("../../ISYNode.js").ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#125@#parentNode": import("../../ISYNode.js").ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: ISY;
        readonly nodeDefId: string;
        baseName: any;
        commands: import("../../Definitions/index.js").Command.ForAll<{}>;
        drivers: import("../../Definitions/index.js").Driver.ForAll<{
            ST: {
                name: "status";
                label: "Status";
                value: number;
                uom: import("../../Definitions/index.js").UnitOfMeasure.Percent;
            };
        }, false>;
        enabled: boolean;
        events: {
            on(eventName: "statusChanged", listener: (driver: "ST", newValue: number, oldValue: number, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter<any>;
        } & Omit<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter<any>, "on">;
        folder: string;
        hidden: boolean;
        isLoad: boolean;
        label: string;
        lastChanged: Date;
        location: string;
        logger: (msg: any, level?: keyof import("winston/lib/winston/config/index.js").CliConfigSetLevels, ...meta: any[]) => import("winston").Logger;
        name: string;
        nodeType: number;
        parent: any;
        parentAddress: any;
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: import("../../ISYNode.js").ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: never): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: "ST", value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: never, parameters?: Record<string | symbol, string | number | undefined> | string | number): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    };
} & T;
export declare const KeypadDevice: <T extends Constructor<InsteonBaseDevice>>(IB: T) => {
    new (...args: any[]): {
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: never): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: never): any;
        sendBeep(level?: number): Promise<any>;
        family: import("../../Definitions/Global/Families.js").Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        declare: any;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<import("../../Definitions/Global/Families.js").Family.Insteon, any, any, any>;
        children: import("../../ISYNode.js").ISYNode<any, any, any, any>[];
        addChild<K extends import("../../ISYNode.js").ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#125@#parentNode": import("../../ISYNode.js").ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: ISY;
        readonly nodeDefId: string;
        baseName: any;
        commands: import("../../Definitions/index.js").Command.ForAll<{}>;
        drivers: import("../../Definitions/index.js").Driver.ForAll<{
            ST: {
                name: "status";
                label: "Status";
                value: number;
                uom: import("../../Definitions/index.js").UnitOfMeasure.Percent;
            };
        }, false>;
        enabled: boolean;
        events: {
            on(eventName: "statusChanged", listener: (driver: "ST", newValue: number, oldValue: number, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter<any>;
        } & Omit<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter<any>, "on">;
        folder: string;
        hidden: boolean;
        isDimmable: boolean;
        isLoad: boolean;
        label: string;
        lastChanged: Date;
        location: string;
        logger: (msg: any, level?: keyof import("winston/lib/winston/config/index.js").CliConfigSetLevels, ...meta: any[]) => import("winston").Logger;
        name: string;
        nodeType: number;
        parent: any;
        parentAddress: any;
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: import("../../ISYNode.js").ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: never): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: "ST", value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: never, parameters?: Record<string | symbol, string | number | undefined> | string | number): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    };
} & T;
export declare class InsteonOutletDevice extends InsteonRelayDevice {
    constructor(isy: ISY, deviceNode: any);
}
//# sourceMappingURL=InsteonDevice.d.ts.map