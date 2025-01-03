import { ISY } from '../../ISY.js';
import { Constructor } from '../Constructor.js';
import { InsteonRelayDevice } from './InsteonRelayDevice.js';
import 'winston';
import type { InsteonBaseDevice } from './InsteonBaseDevice.js';
export declare const InsteonLampDevice: <T extends Constructor<InsteonBaseDevice>>(IB: T) => {
    new (...args: any[]): {
        isDimmable: boolean;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../ISY.js").UnitOfMeasure, driver?: "ST"): any;
        convertTo(value: any, uom: import("../../ISY.js").UnitOfMeasure, propertyName?: "ST"): any;
        sendBeep(level?: number): Promise<any>;
        family: import("../../ISY.js").Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../ISY.js").Category.Insteon;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<import("../../ISY.js").Family.Insteon, any, any, any>;
        children: import("../../ISYNode.js").ISYNode<any, any, any, any>[];
        addChild<K extends import("../../ISYNode.js").ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#168@#parentNode": import("../../ISYNode.js").ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: ISY;
        readonly nodeDefId: string;
        commands: import("../../ISY.js").Command.ForAll<{}>;
        drivers: import("../../ISY.js").Driver.ForAll<{
            ST: import("../../ISY.js").Driver.Signature<import("../../ISY.js").UnitOfMeasure, any, import("../../ISY.js").UnitOfMeasure, "ST", "ST">;
        }, false>;
        enabled: boolean;
        events: import("@matter/general").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "STChanged" | "STInitialized", listener: (driver: "ST", newValue: any, oldValue: any, formatted: string, uom: import("../../ISY.js").UnitOfMeasure) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        }>;
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
        parentType: import("../../NodeType.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: import("../../ISYNode.js").ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../ISY.js").DriverState): void;
        convert(value: any, from: import("../../ISY.js").UnitOfMeasure, to: import("../../ISY.js").UnitOfMeasure): any;
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
        handlePropertyChange(propertyName: "ST", value: any, uom: import("../../ISY.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../ISY.js").DriverState | import("../../ISY.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../ISY.js").DriverState[]>;
        readProperty(propertyName: "ST"): Promise<import("../../ISY.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: never): Promise<any>;
        sendCommand(command: never, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: never, value: string | number): Promise<any>;
        sendCommand(command: never, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    };
} & T;
export declare const KeypadDevice: <T extends Constructor<InsteonBaseDevice>>(IB: T) => {
    new (...args: any[]): {
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../ISY.js").UnitOfMeasure, driver?: "ST"): any;
        convertTo(value: any, uom: import("../../ISY.js").UnitOfMeasure, propertyName?: "ST"): any;
        sendBeep(level?: number): Promise<any>;
        family: import("../../ISY.js").Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../ISY.js").Category.Insteon;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<import("../../ISY.js").Family.Insteon, any, any, any>;
        children: import("../../ISYNode.js").ISYNode<any, any, any, any>[];
        addChild<K extends import("../../ISYNode.js").ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#168@#parentNode": import("../../ISYNode.js").ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: ISY;
        readonly nodeDefId: string;
        commands: import("../../ISY.js").Command.ForAll<{}>;
        drivers: import("../../ISY.js").Driver.ForAll<{
            ST: import("../../ISY.js").Driver.Signature<import("../../ISY.js").UnitOfMeasure, any, import("../../ISY.js").UnitOfMeasure, "ST", "ST">;
        }, false>;
        enabled: boolean;
        events: import("@matter/general").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "STChanged" | "STInitialized", listener: (driver: "ST", newValue: any, oldValue: any, formatted: string, uom: import("../../ISY.js").UnitOfMeasure) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        }>;
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
        parentType: import("../../NodeType.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: import("../../ISYNode.js").ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../ISY.js").DriverState): void;
        convert(value: any, from: import("../../ISY.js").UnitOfMeasure, to: import("../../ISY.js").UnitOfMeasure): any;
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
        handlePropertyChange(propertyName: "ST", value: any, uom: import("../../ISY.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../ISY.js").DriverState | import("../../ISY.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../ISY.js").DriverState[]>;
        readProperty(propertyName: "ST"): Promise<import("../../ISY.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: never): Promise<any>;
        sendCommand(command: never, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: never, value: string | number): Promise<any>;
        sendCommand(command: never, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    };
} & T;
export declare class InsteonOutletDevice extends InsteonRelayDevice {
    constructor(isy: ISY, deviceNode: any);
}
//# sourceMappingURL=InsteonDevice.d.ts.map