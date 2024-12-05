import * as Cluster from '@matter/types/cluster';
import { ClusterBehavior, MutableEndpoint, SupportedBehaviors } from '@matter/main';
import type { Converter } from '../../Converters.js';
import { Family } from '../../Definitions/index.js';
import type { Constructor } from '../../Devices/Constructor.js';
import { Devices, Insteon } from '../../Devices/index.js';
import { CommandsOf, DriversOf, ISYNode } from '../../ISYNode.js';
import type { PathsWithLimit } from '../../Utils.js';
export type AttributeMapping<B, D> = B extends {
    cluster: {
        attributes: infer E extends {
            [K in string]: Cluster.ClusterType.Attribute;
        };
    };
} ? Partial<Record<keyof E, keyof DriversOf<D> | {
    driver: keyof DriversOf<D>;
    converter?: Converter.KnownConverters;
}>> : never;
export type ClusterMapping<B, T extends ISYNode<any, any, any, any>> = {
    attributes?: ClusterAttributeMapping<B, T>;
    commands?: ClusterCommandMapping<B, T>;
};
export type ClusterAttributeMapping<A, K> = {
    [key in keyof Cluster.ClusterType.AttributesOf<A>]: {
        driver: Extract<keyof DriversOf<K>, string>;
        converter?: Converter.KnownConverters;
    } | Extract<keyof DriversOf<K>, string>;
};
export type ClusterCommandMapping<A, K> = {
    [key in keyof Cluster.ClusterType.CommandsOf<A>]: {
        command: keyof CommandsOf<K>;
        parameters?: parameterMapping;
    } | keyof CommandsOf<K>;
};
export type CommandMapping<B, D> = B extends ({
    cluster: {
        commands: infer E extends {
            [K in string]: Cluster.ClusterType.Command;
        };
    };
}) ? Partial<Record<keyof E, keyof CommandsOf<D> | {
    command: keyof CommandsOf<D>;
    parameters?: parameterMapping;
}>> : never;
export interface DeviceToClusterMap<T extends ISYNode<Family, any, any, any>, D extends MutableEndpoint> {
    deviceType: D;
    mapping: EndpointMapping<D, T>;
}
export interface Mapping<T extends ISYNode, D extends MutableEndpoint> {
    deviceType: D;
    nodeType?: T;
    mapping?: {
        [K in keyof D['behaviors']]?: {
            attributes?: {
                [K2 in keyof Cluster.ClusterType.AttributesOf<D['behaviors'][K]>]: {
                    driver: keyof DriversOf<T>;
                    converter?: Converter.KnownConverters;
                } | keyof DriversOf<T>;
            };
            commands?: {
                [K2 in keyof Cluster.ClusterType.CommandsOf<D['behaviors'][K]>]: {
                    command: keyof CommandsOf<T>;
                    converter?: Converter.KnownConverters;
                } | keyof CommandsOf<T>;
            };
        };
    };
}
export type EndpointMapping<A extends MutableEndpoint, D extends ISYNode<Family, any, any, any>> = {
    [K in StringKeys<A['behaviors']>]?: ClusterMapping<A['behaviors'][K], D>;
};
export type EndpointMapping1<A extends MutableEndpoint, K> = {
    attributes?: SBAttributeMapping<A['behaviors'], K>;
    commands?: SBCommandMapping<A['behaviors'], K>;
};
type SupportedFamily = Family.Insteon | Family.ZWave | Family.ZigBee;
export type FamilyToClusterMap<T extends SupportedFamily> = {
    Family: T;
} & {
    [Type in keyof Devices.Insteon]?: Devices.Insteon[Type] extends {
        Node: Constructor<ISYNode<any, any, any, any>>;
    } ? DeviceToClusterMap<InstanceType<Devices.Insteon[Type]["Node"]>, MutableEndpoint> : undefined;
};
export declare function add<const F extends SupportedFamily, const T extends ISYNode<F>, const D extends MutableEndpoint>(familyToClusterMap: FamilyToClusterMap<F>, deviceClass: Constructor<T>, mapping: DeviceToClusterMap<T, D>): {
    Family: F;
    Base?: undefined;
    OnOffOutlet?: undefined;
    Dimmable?: undefined;
    Fan?: undefined;
    Relay?: undefined;
    LeakSensor?: undefined;
    MotionSensor?: undefined;
    SmokeSensor?: undefined;
    DoorWindowSensor?: undefined;
    DimmerOutlet?: undefined;
    AlertModuleArmed?: DeviceToClusterMap<{
        readonly commands: {
            DON: () => Promise<any>;
            DOF: () => Promise<any>;
            QUERY: () => Promise<any>;
            BEEP: (value?: number) => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "AlertModuleArmed";
        on(): Promise<any>;
        off(): Promise<any>;
        query(): Promise<any>;
        beep(value?: number): Promise<any>;
        writeChanges(): Promise<any>;
        readonly status: import("../../Definitions/Insteon/index.js").OnLevelRelay;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.AlertModuleArmed.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.AlertModuleArmed.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.AlertModuleArmed.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, oldValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "beepTriggered", listener: (command: "BEEP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "offTriggered", listener: (command: "DOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "onTriggered", listener: (command: "DON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "BEEP" | "DOF" | "DON" | "QUERY" | "WDU"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.AlertModuleArmed.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "ERR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.AlertModuleArmed.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.AlertModuleArmed.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.AlertModuleArmed.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.AlertModuleArmed.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    AlertModuleSiren?: DeviceToClusterMap<{
        readonly commands: {
            DON: (onLevel?: number) => Promise<any>;
            DOF: () => Promise<any>;
            DFOF: () => Promise<any>;
            DFON: () => Promise<any>;
            QUERY: () => Promise<any>;
            BEEP: (value?: number) => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "AlertModuleSiren" | "AlertModuleSiren_ADV";
        on(onLevel?: number): Promise<any>;
        off(): Promise<any>;
        fastOff(): Promise<any>;
        fastOn(): Promise<any>;
        query(): Promise<any>;
        beep(value?: number): Promise<any>;
        writeChanges(): Promise<any>;
        readonly status: import("../../Definitions/Insteon/index.js").OnLevelRelay;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.AlertModuleSiren.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.AlertModuleSiren.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.AlertModuleSiren.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, oldValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "beepTriggered", listener: (command: "BEEP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fastOffTriggered", listener: (command: "DFOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fastOnTriggered", listener: (command: "DFON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "offTriggered", listener: (command: "DOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "onTriggered", listener: (command: "DON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "BEEP" | "DFOF" | "DFON" | "DOF" | "DON" | "QUERY" | "WDU"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.AlertModuleSiren.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "ERR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.AlertModuleSiren.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.AlertModuleSiren.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.AlertModuleSiren.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.AlertModuleSiren.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    BallastRelayLampSwitch?: DeviceToClusterMap<{
        readonly commands: {
            DON: (value?: (0 | 100)) => Promise<any>;
            DOF: () => Promise<any>;
            DFOF: () => Promise<any>;
            DFON: () => Promise<any>;
            QUERY: () => Promise<any>;
            BEEP: (value?: number) => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "BallastRelayLampSwitch" | "BallastRelayLampSwitch_ADV";
        on(value?: (0 | 100)): Promise<any>;
        off(): Promise<any>;
        fastOff(): Promise<any>;
        fastOn(): Promise<any>;
        query(): Promise<any>;
        beep(value?: number): Promise<any>;
        writeChanges(): Promise<any>;
        readonly status: import("../../Definitions/Insteon/index.js").Sml;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.BallastRelayLampSwitch.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.BallastRelayLampSwitch.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.BallastRelayLampSwitch.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: import("../../Definitions/Insteon/index.js").Sml, oldValue: import("../../Definitions/Insteon/index.js").Sml, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "beepTriggered", listener: (command: "BEEP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fastOffTriggered", listener: (command: "DFOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fastOnTriggered", listener: (command: "DFON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "offTriggered", listener: (command: "DOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "onTriggered", listener: (command: "DON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "BEEP" | "DFOF" | "DFON" | "DOF" | "DON" | "QUERY" | "WDU"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.BallastRelayLampSwitch.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "ERR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.BallastRelayLampSwitch.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.BallastRelayLampSwitch.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.BallastRelayLampSwitch.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.BallastRelayLampSwitch.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    BinaryAlarm?: DeviceToClusterMap<{
        readonly commands: {
            QUERY: () => Promise<any>;
            BEEP: (value?: number) => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "BinaryAlarm" | "BinaryAlarm_ADV";
        query(): Promise<any>;
        beep(value?: number): Promise<any>;
        writeChanges(): Promise<any>;
        readonly status: import("../../Definitions/Insteon/index.js").OnLevelRelay;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.BinaryAlarm.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.BinaryAlarm.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.BinaryAlarm.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, oldValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "beepTriggered", listener: (command: "BEEP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "BEEP" | "QUERY" | "WDU"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.BinaryAlarm.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "ERR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.BinaryAlarm.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.BinaryAlarm.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.BinaryAlarm.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.BinaryAlarm.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    BinaryControl?: DeviceToClusterMap<{
        readonly commands: {
            QUERY: () => Promise<any>;
            BEEP: (value?: number) => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "BinaryControl" | "BinaryControl_ADV";
        query(): Promise<any>;
        beep(value?: number): Promise<any>;
        writeChanges(): Promise<any>;
        readonly status: import("../../Definitions/Insteon/index.js").OnLevelRelay;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.BinaryControl.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.BinaryControl.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.BinaryControl.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, oldValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "beepTriggered", listener: (command: "BEEP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "BEEP" | "QUERY" | "WDU"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.BinaryControl.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "ERR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.BinaryControl.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.BinaryControl.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.BinaryControl.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.BinaryControl.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    DimmerLamp?: DeviceToClusterMap<{
        readonly commands: {
            DON: (value?: number) => Promise<any>;
            DOF: () => Promise<any>;
            DFOF: () => Promise<any>;
            DFON: () => Promise<any>;
            BRT: () => Promise<any>;
            DIM: () => Promise<any>;
            FDUP: () => Promise<any>;
            FDDOWN: () => Promise<any>;
            FDSTOP: () => Promise<any>;
            QUERY: () => Promise<any>;
            BEEP: (value?: number) => Promise<any>;
            OL: (value: number) => Promise<any>;
            RR: (value: import("../../Definitions/Insteon/index.js").RampRate) => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "DimmerLampOnly";
        on(value?: number): Promise<any>;
        off(): Promise<any>;
        fastOff(): Promise<any>;
        fastOn(): Promise<any>;
        brighten(): Promise<any>;
        dim(): Promise<any>;
        fadeUp(): Promise<any>;
        fadeDown(): Promise<any>;
        fadeStop(): Promise<any>;
        query(): Promise<any>;
        beep(value?: number): Promise<any>;
        updateOnLevel(value: number): Promise<any>;
        updateRampRate(value: import("../../Definitions/Insteon/index.js").RampRate): Promise<any>;
        writeChanges(): Promise<any>;
        readonly status: number;
        readonly onLevel: number;
        readonly rampRate: import("../../Definitions/Insteon/index.js").RampRate;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.DimmerLamp.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.DimmerLamp.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.DimmerLamp.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: number, oldValue: number, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "beepTriggered", listener: (command: "BEEP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "brightenTriggered", listener: (command: "BRT") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "dimTriggered", listener: (command: "DIM") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fadeDownTriggered", listener: (command: "FDDOWN") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fadeStopTriggered", listener: (command: "FDSTOP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fadeUpTriggered", listener: (command: "FDUP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fastOffTriggered", listener: (command: "DFOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fastOnTriggered", listener: (command: "DFON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "offTriggered", listener: (command: "DOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "onTriggered", listener: (command: "DON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "BEEP" | "BRT" | "DIM" | "FDDOWN" | "FDSTOP" | "FDUP" | "DFOF" | "DFON" | "DOF" | "DON" | "OL" | "QUERY" | "RR" | "WDU"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.DimmerLamp.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "ERR" | "OL" | "RR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.DimmerLamp.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.DimmerLamp.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.DimmerLamp.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.DimmerLamp.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    DimmerLampSwitch?: DeviceToClusterMap<{
        readonly commands: {
            DON: (value?: number) => Promise<any>;
            DOF: () => Promise<any>;
            DFOF: () => Promise<any>;
            DFON: () => Promise<any>;
            BRT: () => Promise<any>;
            DIM: () => Promise<any>;
            FDUP: () => Promise<any>;
            FDDOWN: () => Promise<any>;
            FDSTOP: () => Promise<any>;
            QUERY: () => Promise<any>;
            BEEP: (value?: number) => Promise<any>;
            OL: (value: number) => Promise<any>;
            RR: (value: import("../../Definitions/Insteon/index.js").RampRate) => Promise<any>;
            BL: (value: number) => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "DimmerLampSwitch" | "DimmerLampSwitch_ADV";
        on(value?: number): Promise<any>;
        off(): Promise<any>;
        fastOff(): Promise<any>;
        fastOn(): Promise<any>;
        brighten(): Promise<any>;
        dim(): Promise<any>;
        fadeUp(): Promise<any>;
        fadeDown(): Promise<any>;
        fadeStop(): Promise<any>;
        query(): Promise<any>;
        beep(value?: number): Promise<any>;
        updateOnLevel(value: number): Promise<any>;
        updateRampRate(value: import("../../Definitions/Insteon/index.js").RampRate): Promise<any>;
        backlight(value: number): Promise<any>;
        writeChanges(): Promise<any>;
        readonly status: number;
        readonly onLevel: number;
        readonly rampRate: import("../../Definitions/Insteon/index.js").RampRate;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.DimmerLampSwitch.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.DimmerLampSwitch.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.DimmerLampSwitch.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: number, oldValue: number, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "beepTriggered", listener: (command: "BEEP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "brightenTriggered", listener: (command: "BRT") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "dimTriggered", listener: (command: "DIM") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fadeDownTriggered", listener: (command: "FDDOWN") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fadeStopTriggered", listener: (command: "FDSTOP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fadeUpTriggered", listener: (command: "FDUP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fastOffTriggered", listener: (command: "DFOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fastOnTriggered", listener: (command: "DFON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "offTriggered", listener: (command: "DOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "onTriggered", listener: (command: "DON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "backlightTriggered", listener: (command: "BL") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "BEEP" | "BRT" | "DIM" | "FDDOWN" | "FDSTOP" | "FDUP" | "DFOF" | "DFON" | "DOF" | "DON" | "OL" | "QUERY" | "RR" | "WDU" | "BL"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.DimmerLampSwitch.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "ERR" | "OL" | "RR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.DimmerLampSwitch.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.DimmerLampSwitch.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.DimmerLampSwitch.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.DimmerLampSwitch.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    DimmerLampSwitchLed?: DeviceToClusterMap<{
        readonly commands: {
            DON: (value?: number) => Promise<any>;
            DOF: () => Promise<any>;
            DFOF: () => Promise<any>;
            DFON: () => Promise<any>;
            BRT: () => Promise<any>;
            DIM: () => Promise<any>;
            FDUP: () => Promise<any>;
            FDDOWN: () => Promise<any>;
            FDSTOP: () => Promise<any>;
            QUERY: () => Promise<any>;
            BEEP: (value?: number) => Promise<any>;
            OL: (value: number) => Promise<any>;
            RR: (value: import("../../Definitions/Insteon/index.js").RampRate) => Promise<any>;
            LED: (value: import("../../Definitions/Insteon/index.js").I3RgbLed) => Promise<any>;
            BL: (value: number) => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "DimmerLampSwitchLED" | "DimmerLampSwitchLED_ADV";
        on(value?: number): Promise<any>;
        off(): Promise<any>;
        fastOff(): Promise<any>;
        fastOn(): Promise<any>;
        brighten(): Promise<any>;
        dim(): Promise<any>;
        fadeUp(): Promise<any>;
        fadeDown(): Promise<any>;
        fadeStop(): Promise<any>;
        query(): Promise<any>;
        beep(value?: number): Promise<any>;
        updateOnLevel(value: number): Promise<any>;
        updateRampRate(value: import("../../Definitions/Insteon/index.js").RampRate): Promise<any>;
        led(value: import("../../Definitions/Insteon/index.js").I3RgbLed): Promise<any>;
        backlight(value: number): Promise<any>;
        writeChanges(): Promise<any>;
        readonly status: number;
        readonly onLevel: number;
        readonly rampRate: import("../../Definitions/Insteon/index.js").RampRate;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.DimmerLampSwitchLed.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.DimmerLampSwitchLed.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.DimmerLampSwitchLed.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: number, oldValue: number, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "beepTriggered", listener: (command: "BEEP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "brightenTriggered", listener: (command: "BRT") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "dimTriggered", listener: (command: "DIM") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fadeDownTriggered", listener: (command: "FDDOWN") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fadeStopTriggered", listener: (command: "FDSTOP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fadeUpTriggered", listener: (command: "FDUP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fastOffTriggered", listener: (command: "DFOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fastOnTriggered", listener: (command: "DFON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "offTriggered", listener: (command: "DOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "onTriggered", listener: (command: "DON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "backlightTriggered", listener: (command: "BL") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "ledTriggered", listener: (command: "LED") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "BEEP" | "BRT" | "DIM" | "FDDOWN" | "FDSTOP" | "FDUP" | "DFOF" | "DFON" | "DOF" | "DON" | "OL" | "QUERY" | "RR" | "WDU" | "BL" | "LED"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.DimmerLampSwitchLed.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "ERR" | "OL" | "RR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.DimmerLampSwitchLed.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.DimmerLampSwitchLed.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.DimmerLampSwitchLed.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.DimmerLampSwitchLed.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    DimmerMotorSwitch?: DeviceToClusterMap<{
        readonly commands: {
            DON: (value?: number) => Promise<any>;
            DOF: () => Promise<any>;
            DFOF: () => Promise<any>;
            DFON: () => Promise<any>;
            FDUP: () => Promise<any>;
            FDDOWN: () => Promise<any>;
            FDSTOP: () => Promise<any>;
            QUERY: () => Promise<any>;
            BEEP: (value?: number) => Promise<any>;
            OL: (value: number) => Promise<any>;
            DUR: (value: number) => Promise<any>;
            BL: (value: number) => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "DimmerMotorSwitch" | "DimmerMotorSwitch_ADV";
        on(value?: number): Promise<any>;
        off(): Promise<any>;
        fastOff(): Promise<any>;
        fastOn(): Promise<any>;
        fadeUp(): Promise<any>;
        fadeDown(): Promise<any>;
        fadeStop(): Promise<any>;
        query(): Promise<any>;
        beep(value?: number): Promise<any>;
        updateOnLevel(value: number): Promise<any>;
        updateMaxDuration(value: number): Promise<any>;
        backlight(value: number): Promise<any>;
        writeChanges(): Promise<any>;
        readonly status: number;
        readonly onLevel: number;
        readonly maxDuration: number;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.DimmerMotorSwitch.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.DimmerMotorSwitch.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.DimmerMotorSwitch.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: number, oldValue: number, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "beepTriggered", listener: (command: "BEEP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fadeDownTriggered", listener: (command: "FDDOWN") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fadeStopTriggered", listener: (command: "FDSTOP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fadeUpTriggered", listener: (command: "FDUP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fastOffTriggered", listener: (command: "DFOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fastOnTriggered", listener: (command: "DFON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "offTriggered", listener: (command: "DOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "onTriggered", listener: (command: "DON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "backlightTriggered", listener: (command: "BL") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "BEEP" | "DUR" | "FDDOWN" | "FDSTOP" | "FDUP" | "DFOF" | "DFON" | "DOF" | "DON" | "OL" | "QUERY" | "WDU" | "BL"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.DimmerMotorSwitch.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "DUR" | "ERR" | "OL"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.DimmerMotorSwitch.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.DimmerMotorSwitch.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.DimmerMotorSwitch.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.DimmerMotorSwitch.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    DimmerSwitch?: DeviceToClusterMap<{
        readonly commands: {
            BL: (value: number) => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "DimmerSwitchOnly" | "DimmerSwitchOnly_ADV";
        backlight(value: number): Promise<any>;
        writeChanges(): Promise<any>;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: "ERR"): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: "ERR"): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.DimmerSwitch.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "backlightTriggered", listener: (command: "BL") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "WDU" | "BL"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: "ERR", value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ERR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.DimmerSwitch.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.DimmerSwitch.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.DimmerSwitch.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.DimmerSwitch.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    DoorLock?: DeviceToClusterMap<{
        readonly commands: {
            DON: () => Promise<any>;
            DOF: () => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "DoorLock";
        lock(): Promise<any>;
        unlock(): Promise<any>;
        writeChanges(): Promise<any>;
        readonly status: import("../../Definitions/Insteon/index.js").Lock;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.DoorLock.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.DoorLock.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.DoorLock.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: import("../../Definitions/Insteon/index.js").Lock, oldValue: import("../../Definitions/Insteon/index.js").Lock, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "unlockTriggered", listener: (command: "DOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "lockTriggered", listener: (command: "DON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "DOF" | "DON" | "WDU"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.DoorLock.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "ERR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.DoorLock.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.DoorLock.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.DoorLock.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.DoorLock.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    Ezio2x4Input?: DeviceToClusterMap<{
        readonly commands: {
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "EZIO2x4_Input" | "EZIO2x4_Input_ADV";
        writeChanges(): Promise<any>;
        readonly status: import("../../Definitions/Insteon/index.js").OnLevelRelay;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.Ezio2x4Input.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.Ezio2x4Input.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.Ezio2x4Input.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, oldValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "WDU"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.Ezio2x4Input.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "ERR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: "WDU"): Promise<any>;
        sendCommand(command: "WDU", value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: "WDU", value: string | number): Promise<any>;
        sendCommand(command: "WDU", parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    Ezio2x4Output?: DeviceToClusterMap<{
        readonly commands: {
            DON: (value?: (0 | 100)) => Promise<any>;
            DOF: () => Promise<any>;
            QUERY: () => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "EZIO2x4_Output";
        on(value?: (0 | 100)): Promise<any>;
        off(): Promise<any>;
        query(): Promise<any>;
        writeChanges(): Promise<any>;
        readonly status: import("../../Definitions/Insteon/index.js").OnLevelRelay;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.Ezio2x4Output.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.Ezio2x4Output.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.Ezio2x4Output.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, oldValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "offTriggered", listener: (command: "DOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "onTriggered", listener: (command: "DON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "DOF" | "DON" | "QUERY" | "WDU"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.Ezio2x4Output.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "ERR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.Ezio2x4Output.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.Ezio2x4Output.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.Ezio2x4Output.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.Ezio2x4Output.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    EzrainInput?: DeviceToClusterMap<{
        readonly commands: {
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "EZRAIN_Input" | "EZRAIN_Input_ADV";
        writeChanges(): Promise<any>;
        readonly status: import("../../Definitions/Insteon/index.js").OnLevelRelay;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.EzrainInput.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.EzrainInput.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.EzrainInput.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, oldValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "WDU"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.EzrainInput.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "ERR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: "WDU"): Promise<any>;
        sendCommand(command: "WDU", value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: "WDU", value: string | number): Promise<any>;
        sendCommand(command: "WDU", parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    EzrainOutput?: DeviceToClusterMap<{
        readonly commands: {
            DON: (value?: (0 | 100)) => Promise<any>;
            DOF: () => Promise<any>;
            QUERY: () => Promise<any>;
            WDU: () => Promise<any>;
            BEEP: (value?: number) => Promise<any>;
        };
        readonly nodeDefId: "EZRAIN_Output";
        on(value?: (0 | 100)): Promise<any>;
        off(): Promise<any>;
        query(): Promise<any>;
        writeChanges(): Promise<any>;
        beep(value?: number): Promise<any>;
        readonly status: import("../../Definitions/Insteon/index.js").OnLevelRelay;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.EzrainOutput.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.EzrainOutput.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.EzrainOutput.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, oldValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "beepTriggered", listener: (command: "BEEP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "offTriggered", listener: (command: "DOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "onTriggered", listener: (command: "DON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "BEEP" | "DOF" | "DON" | "QUERY" | "WDU"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.EzrainOutput.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "ERR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.EzrainOutput.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.EzrainOutput.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.EzrainOutput.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.EzrainOutput.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    FanLincMotor?: DeviceToClusterMap<{
        readonly commands: {
            DON: (value: import("../../Definitions/Insteon/index.js").FanLevel) => Promise<any>;
            DOF: () => Promise<any>;
            DFOF: () => Promise<any>;
            DFON: () => Promise<any>;
            QUERY: () => Promise<any>;
            BEEP: (value?: number) => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "FanLincMotor";
        on(value: import("../../Definitions/Insteon/index.js").FanLevel): Promise<any>;
        off(): Promise<any>;
        fastOff(): Promise<any>;
        fastOn(): Promise<any>;
        query(): Promise<any>;
        beep(value?: number): Promise<any>;
        writeChanges(): Promise<any>;
        readonly status: import("../../Definitions/Insteon/index.js").FanLevel;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.FanLincMotor.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.FanLincMotor.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.FanLincMotor.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: import("../../Definitions/Insteon/index.js").FanLevel, oldValue: import("../../Definitions/Insteon/index.js").FanLevel, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "beepTriggered", listener: (command: "BEEP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fastOffTriggered", listener: (command: "DFOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fastOnTriggered", listener: (command: "DFON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "offTriggered", listener: (command: "DOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "onTriggered", listener: (command: "DON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "BEEP" | "DFOF" | "DFON" | "DOF" | "DON" | "QUERY" | "WDU"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.FanLincMotor.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "ERR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.FanLincMotor.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.FanLincMotor.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.FanLincMotor.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.FanLincMotor.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    I3KeypadFlags?: DeviceToClusterMap<{
        readonly commands: {
            GV0: (value: import("../../Definitions/Insteon/index.js").I3RelayDim) => Promise<any>;
            GV1: (value: import("../../Definitions/Insteon/index.js").I3OnOff) => Promise<any>;
            GV2: (value: import("../../Definitions/Insteon/index.js").I3OnOff) => Promise<any>;
            GV3: (value: import("../../Definitions/Insteon/index.js").I3OnOff) => Promise<any>;
            GV4: (value: import("../../Definitions/Insteon/index.js").I3OnOff) => Promise<any>;
            GV5: (value: import("../../Definitions/Insteon/index.js").I3OnOff) => Promise<any>;
            GV6: (value: import("../../Definitions/Insteon/index.js").I3OnOff) => Promise<any>;
            GV7: (value: import("../../Definitions/Insteon/index.js").I3OnOff) => Promise<any>;
            GV8: (value: import("../../Definitions/Insteon/index.js").I3OnOff) => Promise<any>;
            QUERY: () => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "I3KeypadFlags";
        updateMode(value: import("../../Definitions/Insteon/index.js").I3RelayDim): Promise<any>;
        updateProgramLock(value: import("../../Definitions/Insteon/index.js").I3OnOff): Promise<any>;
        updateResumeDim(value: import("../../Definitions/Insteon/index.js").I3OnOff): Promise<any>;
        updateRelayAtFullOn(value: import("../../Definitions/Insteon/index.js").I3OnOff): Promise<any>;
        updateKeyBeep(value: import("../../Definitions/Insteon/index.js").I3OnOff): Promise<any>;
        updateDisableRf(value: import("../../Definitions/Insteon/index.js").I3OnOff): Promise<any>;
        updateButtonLock(value: import("../../Definitions/Insteon/index.js").I3OnOff): Promise<any>;
        updateErrorBlink(value: import("../../Definitions/Insteon/index.js").I3OnOff): Promise<any>;
        updateCleanupReports(value: import("../../Definitions/Insteon/index.js").I3OnOff): Promise<any>;
        query(): Promise<any>;
        writeChanges(): Promise<any>;
        readonly mode: import("../../Definitions/Insteon/index.js").I3RelayDim;
        readonly programLock: import("../../Definitions/Insteon/index.js").I3OnOff;
        readonly resumeDim: import("../../Definitions/Insteon/index.js").I3OnOff;
        readonly relayAtFullOn: import("../../Definitions/Insteon/index.js").I3OnOff;
        readonly keyBeep: import("../../Definitions/Insteon/index.js").I3OnOff;
        readonly disableRf: import("../../Definitions/Insteon/index.js").I3OnOff;
        readonly buttonLock: import("../../Definitions/Insteon/index.js").I3OnOff;
        readonly errorBlink: import("../../Definitions/Insteon/index.js").I3OnOff;
        readonly cleanupReports: import("../../Definitions/Insteon/index.js").I3OnOff;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.I3KeypadFlags.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.I3KeypadFlags.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.I3KeypadFlags.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "modeChanged" | "modeInitialized", listener: (driver: "ST", newValue: import("../../Definitions/Insteon/index.js").I3RelayDim, oldValue: import("../../Definitions/Insteon/index.js").I3RelayDim, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Boolean) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "updateModeTriggered", listener: (command: "GV0") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "GV0" | "GV1" | "GV2" | "GV3" | "GV4" | "GV5" | "GV6" | "GV7" | "GV8" | "QUERY" | "WDU"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.I3KeypadFlags.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "GV1" | "GV2" | "GV3" | "GV4" | "GV5" | "GV6" | "GV7" | "GV8" | "ERR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.I3KeypadFlags.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.I3KeypadFlags.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.I3KeypadFlags.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.I3KeypadFlags.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    I3PaddleFlags?: DeviceToClusterMap<{
        readonly commands: {
            GV0: (value: import("../../Definitions/Insteon/index.js").I3RelayDim) => Promise<any>;
            GV1: (value: import("../../Definitions/Insteon/index.js").I3OnOff) => Promise<any>;
            GV2: (value: import("../../Definitions/Insteon/index.js").I3OnOff) => Promise<any>;
            GV4: (value: import("../../Definitions/Insteon/index.js").I3OnOff) => Promise<any>;
            GV5: (value: import("../../Definitions/Insteon/index.js").I3OnOff) => Promise<any>;
            GV6: (value: import("../../Definitions/Insteon/index.js").I3OnOff) => Promise<any>;
            GV7: (value: import("../../Definitions/Insteon/index.js").I3OnOff) => Promise<any>;
            QUERY: () => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "I3PaddleFlags";
        updateMode(value: import("../../Definitions/Insteon/index.js").I3RelayDim): Promise<any>;
        updateProgramLock(value: import("../../Definitions/Insteon/index.js").I3OnOff): Promise<any>;
        updateResumeDim(value: import("../../Definitions/Insteon/index.js").I3OnOff): Promise<any>;
        updateKeyBeep(value: import("../../Definitions/Insteon/index.js").I3OnOff): Promise<any>;
        updateDisableRf(value: import("../../Definitions/Insteon/index.js").I3OnOff): Promise<any>;
        updateButtonLock(value: import("../../Definitions/Insteon/index.js").I3OnOff): Promise<any>;
        updateErrorBlink(value: import("../../Definitions/Insteon/index.js").I3OnOff): Promise<any>;
        query(): Promise<any>;
        writeChanges(): Promise<any>;
        readonly mode: import("../../Definitions/Insteon/index.js").I3RelayDim;
        readonly programLock: import("../../Definitions/Insteon/index.js").I3OnOff;
        readonly resumeDim: import("../../Definitions/Insteon/index.js").I3OnOff;
        readonly keyBeep: import("../../Definitions/Insteon/index.js").I3OnOff;
        readonly disableRf: import("../../Definitions/Insteon/index.js").I3OnOff;
        readonly buttonLock: import("../../Definitions/Insteon/index.js").I3OnOff;
        readonly errorBlink: import("../../Definitions/Insteon/index.js").I3OnOff;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.I3PaddleFlags.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.I3PaddleFlags.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.I3PaddleFlags.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "modeChanged" | "modeInitialized", listener: (driver: "ST", newValue: import("../../Definitions/Insteon/index.js").I3RelayDim, oldValue: import("../../Definitions/Insteon/index.js").I3RelayDim, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Boolean) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "updateModeTriggered", listener: (command: "GV0") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "GV0" | "GV1" | "GV2" | "GV4" | "GV5" | "GV6" | "GV7" | "QUERY" | "WDU"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.I3PaddleFlags.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "GV1" | "GV2" | "GV4" | "GV5" | "GV6" | "GV7" | "ERR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.I3PaddleFlags.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.I3PaddleFlags.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.I3PaddleFlags.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.I3PaddleFlags.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    ImeterSolo?: DeviceToClusterMap<{
        readonly commands: {
            RESET: () => Promise<any>;
            QUERY: () => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "IMETER_SOLO";
        resetTotalEnergy(): Promise<any>;
        query(): Promise<any>;
        writeChanges(): Promise<any>;
        readonly currentPower: number;
        readonly totalEnergy: number;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.ImeterSolo.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.ImeterSolo.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.ImeterSolo.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "currentPowerChanged" | "currentPowerInitialized", listener: (driver: "ST", newValue: number, oldValue: number, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Watt) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "resetTotalEnergyTriggered", listener: (command: "RESET") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "totalEnergyChanged" | "totalEnergyInitialized", listener: (driver: "TPW", newValue: number, oldValue: number, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.KilowattsPerHour) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "QUERY" | "RESET" | "WDU"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.ImeterSolo.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "ERR" | "TPW"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.ImeterSolo.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.ImeterSolo.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.ImeterSolo.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.ImeterSolo.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    IrLincTx?: DeviceToClusterMap<{
        readonly commands: {
            BEEP: (value?: number) => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "IRLincTx";
        beep(value?: number): Promise<any>;
        writeChanges(): Promise<any>;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: "ERR"): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: "ERR"): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.IrLincTx.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "beepTriggered", listener: (command: "BEEP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "BEEP" | "WDU"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: "ERR", value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ERR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.IrLincTx.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.IrLincTx.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.IrLincTx.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.IrLincTx.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    KeypadButton?: DeviceToClusterMap<{
        readonly commands: {
            QUERY: () => Promise<any>;
            BL: (value: import("../../Definitions/Insteon/index.js").Backlight) => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "KeypadButton" | "KeypadButton_ADV";
        query(): Promise<any>;
        backlight(value: import("../../Definitions/Insteon/index.js").Backlight): Promise<any>;
        writeChanges(): Promise<any>;
        readonly status: import("../../Definitions/Insteon/index.js").OnLevelRelay;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.KeypadButton.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.KeypadButton.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.KeypadButton.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, oldValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "backlightTriggered", listener: (command: "BL") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "QUERY" | "WDU" | "BL"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.KeypadButton.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "ERR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.KeypadButton.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.KeypadButton.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.KeypadButton.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.KeypadButton.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    KeypadDimmer?: DeviceToClusterMap<{
        readonly commands: {
            DON: (value?: number) => Promise<any>;
            DOF: () => Promise<any>;
            DFOF: () => Promise<any>;
            DFON: () => Promise<any>;
            BRT: () => Promise<any>;
            DIM: () => Promise<any>;
            FDUP: () => Promise<any>;
            FDDOWN: () => Promise<any>;
            FDSTOP: () => Promise<any>;
            QUERY: () => Promise<any>;
            BEEP: (value?: number) => Promise<any>;
            OL: (value: number) => Promise<any>;
            RR: (value: import("../../Definitions/Insteon/index.js").RampRate) => Promise<any>;
            BL: (value: import("../../Definitions/Insteon/index.js").Backlight) => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "KeypadDimmer" | "KeypadDimmer_ADV";
        on(value?: number): Promise<any>;
        off(): Promise<any>;
        fastOff(): Promise<any>;
        fastOn(): Promise<any>;
        brighten(): Promise<any>;
        dim(): Promise<any>;
        fadeUp(): Promise<any>;
        fadeDown(): Promise<any>;
        fadeStop(): Promise<any>;
        query(): Promise<any>;
        beep(value?: number): Promise<any>;
        updateOnLevel(value: number): Promise<any>;
        updateRampRate(value: import("../../Definitions/Insteon/index.js").RampRate): Promise<any>;
        backlight(value: import("../../Definitions/Insteon/index.js").Backlight): Promise<any>;
        writeChanges(): Promise<any>;
        readonly status: number;
        readonly onLevel: number;
        readonly rampRate: import("../../Definitions/Insteon/index.js").RampRate;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.KeypadDimmer.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.KeypadDimmer.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.KeypadDimmer.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: number, oldValue: number, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "beepTriggered", listener: (command: "BEEP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "brightenTriggered", listener: (command: "BRT") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "dimTriggered", listener: (command: "DIM") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fadeDownTriggered", listener: (command: "FDDOWN") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fadeStopTriggered", listener: (command: "FDSTOP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fadeUpTriggered", listener: (command: "FDUP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fastOffTriggered", listener: (command: "DFOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fastOnTriggered", listener: (command: "DFON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "offTriggered", listener: (command: "DOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "onTriggered", listener: (command: "DON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "backlightTriggered", listener: (command: "BL") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "BEEP" | "BRT" | "DIM" | "FDDOWN" | "FDSTOP" | "FDUP" | "DFOF" | "DFON" | "DOF" | "DON" | "OL" | "QUERY" | "RR" | "WDU" | "BL"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.KeypadDimmer.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "ERR" | "OL" | "RR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.KeypadDimmer.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.KeypadDimmer.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.KeypadDimmer.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.KeypadDimmer.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    KeypadRelay?: DeviceToClusterMap<{
        readonly commands: {
            DON: (value?: (0 | 100)) => Promise<any>;
            DOF: () => Promise<any>;
            DFOF: () => Promise<any>;
            DFON: () => Promise<any>;
            QUERY: () => Promise<any>;
            BEEP: (value?: number) => Promise<any>;
            BL: (value: import("../../Definitions/Insteon/index.js").Backlight) => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "KeypadRelay" | "KeypadRelay_ADV";
        on(value?: (0 | 100)): Promise<any>;
        off(): Promise<any>;
        fastOff(): Promise<any>;
        fastOn(): Promise<any>;
        query(): Promise<any>;
        beep(value?: number): Promise<any>;
        backlight(value: import("../../Definitions/Insteon/index.js").Backlight): Promise<any>;
        writeChanges(): Promise<any>;
        readonly status: import("../../Definitions/Insteon/index.js").OnLevelRelay;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.KeypadRelay.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.KeypadRelay.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.KeypadRelay.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, oldValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "beepTriggered", listener: (command: "BEEP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fastOffTriggered", listener: (command: "DFOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fastOnTriggered", listener: (command: "DFON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "offTriggered", listener: (command: "DOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "onTriggered", listener: (command: "DON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "backlightTriggered", listener: (command: "BL") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "BEEP" | "DFOF" | "DFON" | "DOF" | "DON" | "QUERY" | "WDU" | "BL"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.KeypadRelay.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "ERR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.KeypadRelay.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.KeypadRelay.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.KeypadRelay.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.KeypadRelay.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    OnOffControl?: DeviceToClusterMap<{
        readonly commands: {};
        readonly nodeDefId: "OnOffControl" | "OnOffControl_ADV";
        readonly status: import("../../Definitions/Insteon/index.js").OnLevelRelay;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.OnOffControl.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.OnOffControl.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.OnOffControl.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, oldValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
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
        handlePropertyChange(propertyName: keyof Insteon.OnOffControl.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "ERR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: never): Promise<any>;
        sendCommand(command: never, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: never, value: string | number): Promise<any>;
        sendCommand(command: never, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    Pir2844?: DeviceToClusterMap<{
        readonly commands: {
            CLITEMP: (value: number) => Promise<any>;
            QUERY: () => Promise<any>;
            BEEP: (value?: number) => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "PIR2844" | "PIR2844_ADV";
        calibrateTemperature(value: number): Promise<any>;
        query(): Promise<any>;
        beep(value?: number): Promise<any>;
        writeChanges(): Promise<any>;
        readonly status: import("../../Definitions/Insteon/index.js").OnLevelRelay;
        readonly temperature: number;
        readonly luminance: number;
        readonly batteryLevel: number;
        readonly batteryPowered: import("../../Definitions/Insteon/index.js").Boolean;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.Pir2844.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.Pir2844.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.Pir2844.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, oldValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "batteryLevelChanged" | "batteryLevelInitialized", listener: (driver: "BATLVL", newValue: number, oldValue: number, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "beepTriggered", listener: (command: "BEEP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "batteryPoweredChanged" | "batteryPoweredInitialized", listener: (driver: "GV1", newValue: import("../../Definitions/Insteon/index.js").Boolean, oldValue: import("../../Definitions/Insteon/index.js").Boolean, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Boolean) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "luminanceChanged" | "luminanceInitialized", listener: (driver: "LUMIN", newValue: number, oldValue: number, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "BEEP" | "CLITEMP" | "QUERY" | "WDU"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.Pir2844.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "BATLVL" | "CLITEMP" | "GV1" | "ERR" | "LUMIN"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.Pir2844.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.Pir2844.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.Pir2844.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.Pir2844.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    Pir2844c?: DeviceToClusterMap<{
        readonly commands: {
            CLITEMP: (value: number) => Promise<any>;
            QUERY: () => Promise<any>;
            BEEP: (value?: number) => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "PIR2844C" | "PIR2844C_ADV";
        calibrateTemperature(value: number): Promise<any>;
        query(): Promise<any>;
        beep(value?: number): Promise<any>;
        writeChanges(): Promise<any>;
        readonly status: import("../../Definitions/Insteon/index.js").OnLevelRelay;
        readonly temperature: number;
        readonly luminance: number;
        readonly batteryLevel: number;
        readonly batteryPowered: import("../../Definitions/Insteon/index.js").Boolean;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.Pir2844c.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.Pir2844c.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.Pir2844c.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, oldValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "batteryLevelChanged" | "batteryLevelInitialized", listener: (driver: "BATLVL", newValue: number, oldValue: number, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "beepTriggered", listener: (command: "BEEP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "batteryPoweredChanged" | "batteryPoweredInitialized", listener: (driver: "GV1", newValue: import("../../Definitions/Insteon/index.js").Boolean, oldValue: import("../../Definitions/Insteon/index.js").Boolean, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Boolean) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "luminanceChanged" | "luminanceInitialized", listener: (driver: "LUMIN", newValue: number, oldValue: number, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "BEEP" | "CLITEMP" | "QUERY" | "WDU"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.Pir2844c.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "BATLVL" | "CLITEMP" | "GV1" | "ERR" | "LUMIN"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.Pir2844c.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.Pir2844c.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.Pir2844c.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.Pir2844c.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    Pir2844OnOff?: DeviceToClusterMap<{
        readonly commands: {
            DON: (value?: (0 | 100)) => Promise<any>;
            DOF: () => Promise<any>;
            QUERY: () => Promise<any>;
            BEEP: (value?: number) => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "PIR2844OnOff" | "PIR2844OnOff_ADV";
        on(value?: (0 | 100)): Promise<any>;
        off(): Promise<any>;
        query(): Promise<any>;
        beep(value?: number): Promise<any>;
        writeChanges(): Promise<any>;
        readonly status: import("../../Definitions/Insteon/index.js").OnLevelRelay;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.Pir2844OnOff.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.Pir2844OnOff.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.Pir2844OnOff.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, oldValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "beepTriggered", listener: (command: "BEEP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "offTriggered", listener: (command: "DOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "onTriggered", listener: (command: "DON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "BEEP" | "DOF" | "DON" | "QUERY" | "WDU"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.Pir2844OnOff.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "ERR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.Pir2844OnOff.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.Pir2844OnOff.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.Pir2844OnOff.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.Pir2844OnOff.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    RelayLamp?: DeviceToClusterMap<{
        readonly commands: {
            DON: (value?: (0 | 100)) => Promise<any>;
            DOF: () => Promise<any>;
            DFOF: () => Promise<any>;
            DFON: () => Promise<any>;
            QUERY: () => Promise<any>;
            BEEP: (value?: number) => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "RelayLampOnly" | "RelayLampOnly_ADV";
        on(value?: (0 | 100)): Promise<any>;
        off(): Promise<any>;
        fastOff(): Promise<any>;
        fastOn(): Promise<any>;
        query(): Promise<any>;
        beep(value?: number): Promise<any>;
        writeChanges(): Promise<any>;
        readonly status: import("../../Definitions/Insteon/index.js").OnLevelRelay;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.RelayLamp.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.RelayLamp.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.RelayLamp.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, oldValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "beepTriggered", listener: (command: "BEEP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fastOffTriggered", listener: (command: "DFOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fastOnTriggered", listener: (command: "DFON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "offTriggered", listener: (command: "DOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "onTriggered", listener: (command: "DON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "BEEP" | "DFOF" | "DFON" | "DOF" | "DON" | "QUERY" | "WDU"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.RelayLamp.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "ERR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.RelayLamp.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.RelayLamp.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.RelayLamp.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.RelayLamp.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    RelayLampSwitch?: DeviceToClusterMap<{
        readonly commands: {
            DON: (value?: (0 | 100)) => Promise<any>;
            DOF: () => Promise<any>;
            DFOF: () => Promise<any>;
            DFON: () => Promise<any>;
            QUERY: () => Promise<any>;
            BEEP: (value?: number) => Promise<any>;
            BL: (value: number) => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "RelayLampSwitch" | "RelayLampSwitch_ADV";
        on(value?: (0 | 100)): Promise<any>;
        off(): Promise<any>;
        fastOff(): Promise<any>;
        fastOn(): Promise<any>;
        query(): Promise<any>;
        beep(value?: number): Promise<any>;
        backlight(value: number): Promise<any>;
        writeChanges(): Promise<any>;
        readonly status: import("../../Definitions/Insteon/index.js").OnLevelRelay;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.RelayLampSwitch.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.RelayLampSwitch.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.RelayLampSwitch.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, oldValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "beepTriggered", listener: (command: "BEEP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fastOffTriggered", listener: (command: "DFOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fastOnTriggered", listener: (command: "DFON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "offTriggered", listener: (command: "DOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "onTriggered", listener: (command: "DON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "backlightTriggered", listener: (command: "BL") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "BEEP" | "DFOF" | "DFON" | "DOF" | "DON" | "QUERY" | "WDU" | "BL"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.RelayLampSwitch.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "ERR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.RelayLampSwitch.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.RelayLampSwitch.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.RelayLampSwitch.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.RelayLampSwitch.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    RelayLampSwitchLed?: DeviceToClusterMap<{
        readonly commands: {
            DON: (value?: (0 | 100)) => Promise<any>;
            DOF: () => Promise<any>;
            DFOF: () => Promise<any>;
            DFON: () => Promise<any>;
            QUERY: () => Promise<any>;
            BEEP: (value?: number) => Promise<any>;
            LED: (value: import("../../Definitions/Insteon/index.js").I3RgbLed) => Promise<any>;
            BL: (value: number) => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "RelayLampSwitchLED" | "RelayLampSwitchLED_ADV";
        on(value?: (0 | 100)): Promise<any>;
        off(): Promise<any>;
        fastOff(): Promise<any>;
        fastOn(): Promise<any>;
        query(): Promise<any>;
        beep(value?: number): Promise<any>;
        led(value: import("../../Definitions/Insteon/index.js").I3RgbLed): Promise<any>;
        backlight(value: number): Promise<any>;
        writeChanges(): Promise<any>;
        readonly status: import("../../Definitions/Insteon/index.js").OnLevelRelay;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.RelayLampSwitchLed.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.RelayLampSwitchLed.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.RelayLampSwitchLed.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, oldValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "beepTriggered", listener: (command: "BEEP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fastOffTriggered", listener: (command: "DFOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fastOnTriggered", listener: (command: "DFON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "offTriggered", listener: (command: "DOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "onTriggered", listener: (command: "DON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "backlightTriggered", listener: (command: "BL") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "ledTriggered", listener: (command: "LED") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "BEEP" | "DFOF" | "DFON" | "DOF" | "DON" | "QUERY" | "WDU" | "BL" | "LED"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.RelayLampSwitchLed.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "ERR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.RelayLampSwitchLed.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.RelayLampSwitchLed.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.RelayLampSwitchLed.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.RelayLampSwitchLed.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    RelaySwitch?: DeviceToClusterMap<{
        readonly commands: {
            BEEP: (value?: number) => Promise<any>;
            BL: (value: number) => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "RelaySwitchOnly" | "RelaySwitchOnly_ADV";
        beep(value?: number): Promise<any>;
        backlight(value: number): Promise<any>;
        writeChanges(): Promise<any>;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: "ERR"): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: "ERR"): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.RelaySwitch.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "beepTriggered", listener: (command: "BEEP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "backlightTriggered", listener: (command: "BL") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "BEEP" | "WDU" | "BL"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: "ERR", value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ERR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.RelaySwitch.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.RelaySwitch.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.RelaySwitch.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.RelaySwitch.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    RelaySwitchOnlyPlusQuery?: DeviceToClusterMap<{
        readonly commands: {
            QUERY: () => Promise<any>;
            BEEP: (value?: number) => Promise<any>;
            BL: (value: number) => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "RelaySwitchOnlyPlusQuery" | "RelaySwitchOnlyPlusQuery_ADV";
        query(): Promise<any>;
        beep(value?: number): Promise<any>;
        backlight(value: number): Promise<any>;
        writeChanges(): Promise<any>;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: "ERR"): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: "ERR"): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.RelaySwitchOnlyPlusQuery.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "beepTriggered", listener: (command: "BEEP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "backlightTriggered", listener: (command: "BL") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "BEEP" | "QUERY" | "WDU" | "BL"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: "ERR", value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ERR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.RelaySwitchOnlyPlusQuery.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.RelaySwitchOnlyPlusQuery.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.RelaySwitchOnlyPlusQuery.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.RelaySwitchOnlyPlusQuery.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    RemoteLinc2?: DeviceToClusterMap<{
        readonly commands: {
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "RemoteLinc2" | "RemoteLinc2_ADV";
        writeChanges(): Promise<any>;
        readonly status: number;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.RemoteLinc2.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.RemoteLinc2.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.RemoteLinc2.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: number, oldValue: number, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "WDU"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.RemoteLinc2.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "ERR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: "WDU"): Promise<any>;
        sendCommand(command: "WDU", value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: "WDU", value: string | number): Promise<any>;
        sendCommand(command: "WDU", parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    Siren?: DeviceToClusterMap<{
        readonly commands: {
            DON: (duration?: number) => Promise<any>;
            DOF: () => Promise<any>;
            ARM: (value: import("../../Definitions/Insteon/index.js").SirenMode) => Promise<any>;
            DISARM: () => Promise<any>;
            QUERY: () => Promise<any>;
            BEEP: (value?: number) => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "Siren" | "Siren_ADV";
        on(duration?: number): Promise<any>;
        off(): Promise<any>;
        arm(value: import("../../Definitions/Insteon/index.js").SirenMode): Promise<any>;
        disarm(): Promise<any>;
        query(): Promise<any>;
        beep(value?: number): Promise<any>;
        writeChanges(): Promise<any>;
        readonly siren: import("../../Definitions/Insteon/index.js").OnLevelRelay;
        readonly mode: import("../../Definitions/Insteon/index.js").SirenModeQuery;
        readonly armCountdown: number;
        readonly sirenDuration: number;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.Siren.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.Siren.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.Siren.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "sirenChanged" | "sirenInitialized", listener: (driver: "ST", newValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, oldValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "beepTriggered", listener: (command: "BEEP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "armCountdownChanged" | "armCountdownInitialized", listener: (driver: "DELAY", newValue: number, oldValue: number, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.DurationInSeconds) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "sirenDurationChanged" | "sirenDurationInitialized", listener: (driver: "DUR", newValue: number, oldValue: number, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.DurationInSeconds) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "modeChanged" | "modeInitialized", listener: (driver: "MODE", newValue: import("../../Definitions/Insteon/index.js").SirenModeQuery, oldValue: import("../../Definitions/Insteon/index.js").SirenModeQuery, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "offTriggered", listener: (command: "DOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "onTriggered", listener: (command: "DON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "armTriggered", listener: (command: "ARM") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "disarmTriggered", listener: (command: "DISARM") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "BEEP" | "DOF" | "DON" | "QUERY" | "WDU" | "ARM" | "DISARM"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.Siren.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "DELAY" | "DUR" | "ERR" | "MODE"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.Siren.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.Siren.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.Siren.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.Siren.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    SirenAlert?: DeviceToClusterMap<{
        readonly commands: {};
        readonly nodeDefId: "SirenAlert" | "SirenArm";
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: "ERR"): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: "ERR"): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.SirenAlert.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
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
        handlePropertyChange(propertyName: "ERR", value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ERR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: never): Promise<any>;
        sendCommand(command: never, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: never, value: string | number): Promise<any>;
        sendCommand(command: never, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    TempLinc?: DeviceToClusterMap<{
        readonly commands: {
            CLISPH: (value: number) => Promise<any>;
            CLISPC: (value: number) => Promise<any>;
            CLIMD: (value: (0 | 1 | 2 | 3 | 5)) => Promise<any>;
            CLIFS: (value: (7 | 8)) => Promise<any>;
            BRT: () => Promise<any>;
            DIM: () => Promise<any>;
            BEEP: (value?: number) => Promise<any>;
            QUERY: () => Promise<any>;
            SETTIME: () => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "TempLinc";
        updateHeatSetpoint(value: number): Promise<any>;
        updateCoolSetpoint(value: number): Promise<any>;
        updateMode(value: (0 | 1 | 2 | 3 | 5)): Promise<any>;
        updateFanMode(value: (7 | 8)): Promise<any>;
        setpointUp(): Promise<any>;
        setpointDown(): Promise<any>;
        beep(value?: number): Promise<any>;
        query(): Promise<any>;
        setTime(): Promise<any>;
        writeChanges(): Promise<any>;
        readonly temperature: number;
        readonly heatSetpoint: number;
        readonly coolSetpoint: number;
        readonly mode: (0 | 1 | 2 | 3 | 5);
        readonly fanMode: (7 | 8);
        readonly humidity: number;
        readonly heatCoolState: number;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.TempLinc.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.TempLinc.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.TempLinc.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "temperatureChanged" | "temperatureInitialized", listener: (driver: "ST", newValue: number, oldValue: number, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Degree) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "beepTriggered", listener: (command: "BEEP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "setpointUpTriggered", listener: (command: "BRT") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "setpointDownTriggered", listener: (command: "DIM") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "heatCoolStateChanged" | "heatCoolStateInitialized", listener: (driver: "CLIHCS", newValue: number, oldValue: number, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.ThermostatHeatCoolState) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "humidityChanged" | "humidityInitialized", listener: (driver: "CLIHUM", newValue: number, oldValue: number, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "setTimeTriggered", listener: (command: "SETTIME") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "BEEP" | "BRT" | "CLISPC" | "DIM" | "CLIFS" | "CLISPH" | "QUERY" | "CLIMD" | "WDU" | "SETTIME"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.TempLinc.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "CLISPC" | "ERR" | "CLIFS" | "CLIHCS" | "CLISPH" | "CLIHUM" | "CLIMD"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.TempLinc.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.TempLinc.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.TempLinc.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.TempLinc.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    Thermostat?: DeviceToClusterMap<{
        readonly commands: {
            CLISPH: (value: number) => Promise<any>;
            CLISPC: (value: number) => Promise<any>;
            CLIMD: (value: (0 | 1 | 2 | 3 | 5 | 6 | 7)) => Promise<any>;
            CLIFS: (value: (7 | 8)) => Promise<any>;
            BRT: () => Promise<any>;
            DIM: () => Promise<any>;
            BEEP: (value?: number) => Promise<any>;
            QUERY: () => Promise<any>;
            SETTIME: () => Promise<any>;
            WDU: () => Promise<any>;
        };
        readonly nodeDefId: "Thermostat";
        updateHeatSetpoint(value: number): Promise<any>;
        updateCoolSetpoint(value: number): Promise<any>;
        updateMode(value: (0 | 1 | 2 | 3 | 5 | 6 | 7)): Promise<any>;
        updateFanMode(value: (7 | 8)): Promise<any>;
        setpointUp(): Promise<any>;
        setpointDown(): Promise<any>;
        beep(value?: number): Promise<any>;
        query(): Promise<any>;
        setTime(): Promise<any>;
        writeChanges(): Promise<any>;
        readonly temperature: number;
        readonly heatSetpoint: number;
        readonly coolSetpoint: number;
        readonly mode: (0 | 1 | 2 | 3 | 5 | 6 | 7);
        readonly fanMode: (7 | 8);
        readonly humidity: number;
        readonly heatCoolState: number;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.Thermostat.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.Thermostat.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.Thermostat.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "temperatureChanged" | "temperatureInitialized", listener: (driver: "ST", newValue: number, oldValue: number, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Degree) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "beepTriggered", listener: (command: "BEEP") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "setpointUpTriggered", listener: (command: "BRT") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "setpointDownTriggered", listener: (command: "DIM") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "heatCoolStateChanged" | "heatCoolStateInitialized", listener: (driver: "CLIHCS", newValue: number, oldValue: number, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.ThermostatHeatCoolState) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "humidityChanged" | "humidityInitialized", listener: (driver: "CLIHUM", newValue: number, oldValue: number, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "setTimeTriggered", listener: (command: "SETTIME") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "BEEP" | "BRT" | "CLISPC" | "DIM" | "CLIFS" | "CLISPH" | "QUERY" | "CLIMD" | "WDU" | "SETTIME"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.Thermostat.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "CLISPC" | "ERR" | "CLIFS" | "CLIHCS" | "CLISPH" | "CLIHUM" | "CLIMD"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.Thermostat.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.Thermostat.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.Thermostat.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.Thermostat.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
    X10?: DeviceToClusterMap<{
        readonly commands: {
            DON: () => Promise<any>;
            DOF: () => Promise<any>;
            BRT: () => Promise<any>;
            DIM: () => Promise<any>;
            QUERY: () => Promise<any>;
        };
        readonly nodeDefId: "X10";
        on(): Promise<any>;
        off(): Promise<any>;
        brighten(): Promise<any>;
        dim(): Promise<any>;
        query(): Promise<any>;
        readonly status: import("../../Definitions/Insteon/index.js").OnLevelRelay;
        readonly responding: import("../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.X10.Drivers): any;
        convertTo(value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.X10.Drivers): any;
        sendBeep(level?: number): Promise<any>;
        family: Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        vendorName: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../ISYDevice.js").ISYDevice<Family.Insteon, any, any, any>;
        children: ISYNode<any, any, any, any>[];
        addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#4676205@#parentNode": ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../Definitions/index.js").Driver.ForAll<Insteon.X10.Drivers, false>;
        enabled: boolean;
        events: import("@matter/main").Merge<import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, oldValue: import("../../Definitions/Insteon/index.js").OnLevelRelay, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "brightenTriggered", listener: (command: "BRT") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "dimTriggered", listener: (command: "DIM") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../Definitions/Insteon/index.js").Error, oldValue: import("../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "offTriggered", listener: (command: "DOF") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "onTriggered", listener: (command: "DON") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../Definitions/index.js").UnitOfMeasure, to: import("../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "BRT" | "DIM" | "DOF" | "DON" | "QUERY"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.X10.Drivers, value: any, uom: import("../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "ERR"): Promise<import("../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.X10.Commands): Promise<any>;
        sendCommand(command: keyof Insteon.X10.Commands, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.X10.Commands, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.X10.Commands, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }, MutableEndpoint>;
};
export type SBAttributeMapping<SB extends SupportedBehaviors, D> = {
    [K in keyof SB]: Partial<Record<any, DriversOf<D> | {
        driver: DriversOf<D>;
        converter?: string;
    }>>;
};
export type SBCommandMapping<SB extends SupportedBehaviors, D> = {
    [K in Capitalize<keyof SB>]?: SB[Uncapitalize<K>] extends {
        cluster: {
            commands: any;
        };
    } ? Partial<Record<string, CommandsOf<D> | {
        driver: DriversOf<D>;
        converter?: string;
    }>> : never;
};
type StringKeys<T> = Extract<keyof T, string>;
export type parameterMapping = {
    [key: string]: {
        parameter: string;
        converter?: string;
    };
};
export declare class MappingRegistry {
    static map: Map<Family, Map<string, DeviceToClusterMap<ISYNode, MutableEndpoint>>>;
    static cache: {
        [x: string]: DeviceToClusterMap<ISYNode, MutableEndpoint>;
    };
    static getMapping<const T extends ISYNode>(device: T): DeviceToClusterMap<T, MutableEndpoint>;
    static getMappingForBehavior<T extends ISYNode<any, any, any, any>, const B extends ClusterBehavior>(device: T, behavior: B): ClusterMapping<B, T>;
    static register<const T extends Family.Insteon | Family.ZWave | Family.ZigBee>(map: Partial<FamilyToClusterMap<T>> | {
        [x in PathsWithLimit<typeof Devices, 1>]: DeviceToClusterMap<any, any>;
    }): void;
}
export {};
//# sourceMappingURL=MappingRegistry.d.ts.map