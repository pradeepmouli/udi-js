import { Insteon } from '../../../Devices/index.js';
declare const RelayOnOffBehavior_base: import("@matter/node").ClusterBehavior.Type<import("@matter/types").ClusterComposer.WithFeatures<import("@matter/types").ClusterComposer.WithFeatures<import("@project-chip/matter.js/cluster").OnOff.Cluster, readonly [import("@project-chip/matter.js/cluster").OnOff.Feature.Lighting]>, readonly ["Lighting"]>, typeof import("@matter/node/behaviors").OnOffServer, import("@matter/node/behaviors").OnOffInterface> & (new (...args: any[]) => import("../ISYClusterBehavior.js").DeviceBehavior<{
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
    readonly status: import("../../../Definitions/Insteon/index.js").OnLevelRelay;
    readonly responding: import("../../../Definitions/Insteon/index.js").Error;
    readonly manufacturer: string;
    convertFrom(value: any, uom: import("../../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.RelayLamp.Drivers.Type): any;
    convertTo(value: any, uom: import("../../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.RelayLamp.Drivers.Type): any;
    sendBeep(level?: number): Promise<any>;
    family: import("../../../Definitions/index.js").Family.Insteon;
    readonly typeCode: string;
    readonly deviceClass: any;
    readonly category: import("../../../Definitions/index.js").Category;
    readonly subCategory: number;
    _enabled: any;
    productName: string;
    model: string;
    modelNumber: string;
    version: string;
    productId: string | number;
    modelName: string;
    _parentDevice: import("../../../ISYDevice.js").ISYDevice<import("../../../Definitions/index.js").Family.Insteon, any, any, any>;
    children: import("../../../ISYNode.js").ISYNode<any, any, any, any>[];
    addChild<K extends import("../../../ISYNode.js").ISYNode<any, any, any, any>>(childDevice: K): void;
    "__#173@#parentNode": import("../../../ISYNode.js").ISYNode<any, any, any, any>;
    readonly address: string;
    readonly baseLabel: string;
    readonly flag: any;
    readonly isy: import("../../../ISY.js").ISY;
    baseName: any;
    drivers: import("../../../Definitions/index.js").Driver.ForAll<Insteon.RelayLamp.Drivers.Type, false>;
    enabled: boolean;
    events: import("@matter/general").Merge<import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
        on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: import("../../../Definitions/Insteon/index.js").OnLevelRelay, oldValue: import("../../../Definitions/Insteon/index.js").OnLevelRelay, formatted: string, uom: import("../../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
    } & {
        on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../../Definitions/Insteon/index.js").Error, oldValue: import("../../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
    } & {
        on(eventName: "beepTriggered", listener: (command: "BEEP") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
    } & {
        on(eventName: "fastOffTriggered", listener: (command: "DFOF") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
    } & {
        on(eventName: "fastOnTriggered", listener: (command: "DFON") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
    } & {
        on(eventName: "offTriggered", listener: (command: "DOF") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
    } & {
        on(eventName: "onTriggered", listener: (command: "DON") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
    } & {
        on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
    } & {
        on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
    parentType: import("../../../NodeType.js").NodeType;
    propsInitialized: boolean;
    scenes: import("../../../ISYScene.js").ISYScene[];
    spokenName: string;
    type: any;
    readonly parentNode: import("../../../ISYNode.js").ISYNode<any, any, any, any>;
    addLink(isyScene: import("../../../ISYScene.js").ISYScene): void;
    applyStatus(prop: import("../../../Model/DriverState.js").DriverState): void;
    convert(value: any, from: import("../../../Definitions/index.js").UnitOfMeasure, to: import("../../../Definitions/index.js").UnitOfMeasure): any;
    emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
    generateLabel(template: string): string;
    getNotes(): Promise<import("../../../Model/NodeNotes.js").NodeNotes>;
    handleControlTrigger(controlName: "BEEP" | "DFOF" | "DFON" | "DOF" | "DON" | "QUERY" | "WDU"): boolean;
    handleEvent(event: {
        control?: any;
        data?: any;
        node?: any;
        action?: any;
        fmtAct?: any;
    }): boolean;
    handlePropertyChange(propertyName: keyof Insteon.RelayLamp.Drivers.Type, value: any, uom: import("../../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
    parseResult(node: {
        property: import("../../../Model/DriverState.js").DriverState | import("../../../Model/DriverState.js").DriverState[];
    }): void;
    readProperties(): Promise<import("../../../Model/DriverState.js").DriverState[]>;
    readProperty(propertyName: "ST" | "ERR"): Promise<import("../../../Model/DriverState.js").DriverState>;
    refresh(): Promise<any>;
    refreshNotes(): Promise<void>;
    sendCommand(command: keyof Insteon.RelayLamp.Commands.Type): Promise<any>;
    sendCommand(command: keyof Insteon.RelayLamp.Commands.Type, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
    sendCommand(command: keyof Insteon.RelayLamp.Commands.Type, value: string | number): Promise<any>;
    sendCommand(command: keyof Insteon.RelayLamp.Commands.Type, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
    updateProperty(propertyName: string, value: any): Promise<any>;
}, import("@matter/node").ClusterBehavior.Type<import("@matter/types").ClusterComposer.WithFeatures<import("@matter/types").ClusterComposer.WithFeatures<import("@project-chip/matter.js/cluster").OnOff.Cluster, readonly [import("@project-chip/matter.js/cluster").OnOff.Feature.Lighting]>, readonly ["Lighting"]>, typeof import("@matter/node/behaviors").OnOffServer, import("@matter/node/behaviors").OnOffInterface>>) & {
    nodeClass: import("../../../Devices/Constructor.js").Constructor<{
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
        readonly status: import("../../../Definitions/Insteon/index.js").OnLevelRelay;
        readonly responding: import("../../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.RelayLamp.Drivers.Type): any;
        convertTo(value: any, uom: import("../../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.RelayLamp.Drivers.Type): any;
        sendBeep(level?: number): Promise<any>;
        family: import("../../../Definitions/index.js").Family.Insteon;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../../../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../../../ISYDevice.js").ISYDevice<import("../../../Definitions/index.js").Family.Insteon, any, any, any>;
        children: import("../../../ISYNode.js").ISYNode<any, any, any, any>[];
        addChild<K extends import("../../../ISYNode.js").ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#173@#parentNode": import("../../../ISYNode.js").ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../../Definitions/index.js").Driver.ForAll<Insteon.RelayLamp.Drivers.Type, false>;
        enabled: boolean;
        events: import("@matter/general").Merge<import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: import("../../../Definitions/Insteon/index.js").OnLevelRelay, oldValue: import("../../../Definitions/Insteon/index.js").OnLevelRelay, formatted: string, uom: import("../../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../../Definitions/Insteon/index.js").Error, oldValue: import("../../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "beepTriggered", listener: (command: "BEEP") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fastOffTriggered", listener: (command: "DFOF") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fastOnTriggered", listener: (command: "DFON") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "offTriggered", listener: (command: "DOF") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "onTriggered", listener: (command: "DON") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        parentType: import("../../../NodeType.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../../../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: import("../../../ISYNode.js").ISYNode<any, any, any, any>;
        addLink(isyScene: import("../../../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../../../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../../../Definitions/index.js").UnitOfMeasure, to: import("../../../Definitions/index.js").UnitOfMeasure): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../../../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: "BEEP" | "DFOF" | "DFON" | "DOF" | "DON" | "QUERY" | "WDU"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.RelayLamp.Drivers.Type, value: any, uom: import("../../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../../Model/DriverState.js").DriverState | import("../../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "ST" | "ERR"): Promise<import("../../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.RelayLamp.Commands.Type): Promise<any>;
        sendCommand(command: keyof Insteon.RelayLamp.Commands.Type, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.RelayLamp.Commands.Type, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.RelayLamp.Commands.Type, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }>;
};
export declare class RelayOnOffBehavior extends RelayOnOffBehavior_base {
    initialize(_options?: {}): Promise<void>;
    on: () => Promise<void>;
    off(): Promise<void>;
    handlePropertyChange({ driver, newValue, oldValue, formattedValue }: {
        driver: any;
        newValue: any;
        oldValue: any;
        formattedValue: any;
    }): Promise<void>;
}
export {};
//# sourceMappingURL=RelayOnOffBehavior.d.ts.map