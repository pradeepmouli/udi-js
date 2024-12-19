import type { MaybePromise } from '@matter/general';
import * as Insteon from '../../../Devices/Insteon/index.js';
declare const DimmerLevelControlBehavior_base: import("@matter/node").ClusterBehavior.Type<import("@matter/types").ElementModifier.WithAlterations<import("@matter/types").ClusterComposer.WithFeatures<import("@matter/types").ClusterComposer.WithFeatures<import("@matter/types").ClusterComposer.WithFeatures<import("@project-chip/matter.js/cluster").LevelControl.Cluster, readonly [import("@project-chip/matter.js/cluster").LevelControl.Feature.OnOff, import("@project-chip/matter.js/cluster").LevelControl.Feature.Lighting]>, readonly [import("@project-chip/matter.js/cluster").LevelControl.Feature.OnOff]>, readonly ["Lighting", "OnOff"]>, {
    readonly attributes: {
        readonly currentLevel: {
            readonly min: 1;
            readonly max: 254;
        };
        readonly minLevel: {
            readonly default: 1;
            readonly min: 1;
            readonly max: 2;
        };
        readonly maxLevel: {
            readonly default: 254;
            readonly min: 254;
            readonly max: 255;
        };
    };
}>, import("@matter/node").ClusterBehavior.Type<import("@matter/types").ClusterComposer.WithFeatures<import("@matter/types").ClusterComposer.WithFeatures<import("@matter/types").ClusterComposer.WithFeatures<import("@project-chip/matter.js/cluster").LevelControl.Cluster, readonly [import("@project-chip/matter.js/cluster").LevelControl.Feature.OnOff, import("@project-chip/matter.js/cluster").LevelControl.Feature.Lighting]>, readonly [import("@project-chip/matter.js/cluster").LevelControl.Feature.OnOff]>, readonly ["Lighting", "OnOff"]>, typeof import("@matter/node/behaviors").LevelControlServer, import("@matter/node/behaviors").LevelControlInterface>, import("@matter/node/behaviors").LevelControlInterface> & (new (...args: any[]) => import("../ISYClusterBehavior.js").DeviceBehavior<{
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
        RR: (value: import("../../../Definitions/Insteon/index.js").RampRate) => Promise<any>;
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
    updateRampRate(value: import("../../../Definitions/Insteon/index.js").RampRate): Promise<any>;
    writeChanges(): Promise<any>;
    readonly status: import("type-fest").IntRange<0, 100>;
    readonly onLevel: import("type-fest").IntRange<0, 100>;
    readonly rampRate: import("../../../Definitions/Insteon/index.js").RampRate;
    readonly responding: import("../../../Definitions/Insteon/index.js").Error;
    readonly manufacturer: string;
    convertFrom(value: any, uom: import("../../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.DimmerLamp.Drivers.Type): any;
    convertTo(value: any, uom: import("../../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.DimmerLamp.Drivers.Type): any;
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
    "__#174@#parentNode": import("../../../ISYNode.js").ISYNode<any, any, any, any>;
    readonly address: string;
    readonly baseLabel: string;
    readonly flag: any;
    readonly isy: import("../../../ISY.js").ISY;
    baseName: any;
    drivers: import("../../../Definitions/index.js").Driver.ForAll<Insteon.DimmerLamp.Drivers.Type, false>;
    enabled: boolean;
    events: import("@matter/general").Merge<import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
        on(eventName: "onTriggered", listener: (command: "DON") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
    } & {
        on(eventName: "offTriggered", listener: (command: "DOF") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
    } & {
        on(eventName: "fastOnTriggered", listener: (command: "DFON") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
    } & {
        on(eventName: "fastOffTriggered", listener: (command: "DFOF") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
    } & {
        on(eventName: "brightenTriggered", listener: (command: "BRT") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
    } & {
        on(eventName: "dimTriggered", listener: (command: "DIM") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
    } & {
        on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
    } & {
        on(eventName: "fadeUpTriggered", listener: (command: "FDUP") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
    } & {
        on(eventName: "fadeDownTriggered", listener: (command: "FDDOWN") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
    } & {
        on(eventName: "fadeStopTriggered", listener: (command: "FDSTOP") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
    } & {
        on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
    } & {
        on(eventName: "beepTriggered", listener: (command: "BEEP") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
    } & {
        on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../../Definitions/Insteon/index.js").Error, oldValue: import("../../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
    } & {
        on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: 0 | 1 | 2 | 3 | 5 | 6 | 7 | 8 | 4 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99, oldValue: 0 | 1 | 2 | 3 | 5 | 6 | 7 | 8 | 4 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99, formatted: string, uom: import("../../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
    handleControlTrigger(controlName: "DON" | "DOF" | "DFON" | "DFOF" | "BRT" | "DIM" | "OL" | "RR" | "QUERY" | "FDUP" | "FDDOWN" | "FDSTOP" | "WDU" | "BEEP"): boolean;
    handleEvent(event: {
        control?: any;
        data?: any;
        node?: any;
        action?: any;
        fmtAct?: any;
    }): boolean;
    handlePropertyChange(propertyName: keyof Insteon.DimmerLamp.Drivers.Type, value: any, uom: import("../../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
    parseResult(node: {
        property: import("../../../Model/DriverState.js").DriverState | import("../../../Model/DriverState.js").DriverState[];
    }): void;
    readProperties(): Promise<import("../../../Model/DriverState.js").DriverState[]>;
    readProperty(propertyName: "OL" | "RR" | "ERR" | "ST"): Promise<import("../../../Model/DriverState.js").DriverState>;
    refresh(): Promise<any>;
    refreshNotes(): Promise<void>;
    sendCommand(command: keyof Insteon.DimmerLamp.Commands.Type): Promise<any>;
    sendCommand(command: keyof Insteon.DimmerLamp.Commands.Type, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
    sendCommand(command: keyof Insteon.DimmerLamp.Commands.Type, value: string | number): Promise<any>;
    sendCommand(command: keyof Insteon.DimmerLamp.Commands.Type, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
    updateProperty(propertyName: string, value: any): Promise<any>;
}, import("@matter/node").ClusterBehavior.Type<import("@matter/types").ElementModifier.WithAlterations<import("@matter/types").ClusterComposer.WithFeatures<import("@matter/types").ClusterComposer.WithFeatures<import("@matter/types").ClusterComposer.WithFeatures<import("@project-chip/matter.js/cluster").LevelControl.Cluster, readonly [import("@project-chip/matter.js/cluster").LevelControl.Feature.OnOff, import("@project-chip/matter.js/cluster").LevelControl.Feature.Lighting]>, readonly [import("@project-chip/matter.js/cluster").LevelControl.Feature.OnOff]>, readonly ["Lighting", "OnOff"]>, {
    readonly attributes: {
        readonly currentLevel: {
            readonly min: 1;
            readonly max: 254;
        };
        readonly minLevel: {
            readonly default: 1;
            readonly min: 1;
            readonly max: 2;
        };
        readonly maxLevel: {
            readonly default: 254;
            readonly min: 254;
            readonly max: 255;
        };
    };
}>, import("@matter/node").ClusterBehavior.Type<import("@matter/types").ClusterComposer.WithFeatures<import("@matter/types").ClusterComposer.WithFeatures<import("@matter/types").ClusterComposer.WithFeatures<import("@project-chip/matter.js/cluster").LevelControl.Cluster, readonly [import("@project-chip/matter.js/cluster").LevelControl.Feature.OnOff, import("@project-chip/matter.js/cluster").LevelControl.Feature.Lighting]>, readonly [import("@project-chip/matter.js/cluster").LevelControl.Feature.OnOff]>, readonly ["Lighting", "OnOff"]>, typeof import("@matter/node/behaviors").LevelControlServer, import("@matter/node/behaviors").LevelControlInterface>, import("@matter/node/behaviors").LevelControlInterface>>) & {
    nodeClass: import("../../../Devices/Constructor.js").Constructor<{
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
            RR: (value: import("../../../Definitions/Insteon/index.js").RampRate) => Promise<any>;
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
        updateRampRate(value: import("../../../Definitions/Insteon/index.js").RampRate): Promise<any>;
        writeChanges(): Promise<any>;
        readonly status: import("type-fest").IntRange<0, 100>;
        readonly onLevel: import("type-fest").IntRange<0, 100>;
        readonly rampRate: import("../../../Definitions/Insteon/index.js").RampRate;
        readonly responding: import("../../../Definitions/Insteon/index.js").Error;
        readonly manufacturer: string;
        convertFrom(value: any, uom: import("../../../Definitions/index.js").UnitOfMeasure, driver?: keyof Insteon.DimmerLamp.Drivers.Type): any;
        convertTo(value: any, uom: import("../../../Definitions/index.js").UnitOfMeasure, propertyName?: keyof Insteon.DimmerLamp.Drivers.Type): any;
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
        "__#174@#parentNode": import("../../../ISYNode.js").ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../../../ISY.js").ISY;
        baseName: any;
        drivers: import("../../../Definitions/index.js").Driver.ForAll<Insteon.DimmerLamp.Drivers.Type, false>;
        enabled: boolean;
        events: import("@matter/general").Merge<import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: "onTriggered", listener: (command: "DON") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "offTriggered", listener: (command: "DOF") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fastOnTriggered", listener: (command: "DFON") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fastOffTriggered", listener: (command: "DFOF") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "brightenTriggered", listener: (command: "BRT") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "dimTriggered", listener: (command: "DIM") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "queryTriggered", listener: (command: "QUERY") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fadeUpTriggered", listener: (command: "FDUP") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fadeDownTriggered", listener: (command: "FDDOWN") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "fadeStopTriggered", listener: (command: "FDSTOP") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "writeChangesTriggered", listener: (command: "WDU") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "beepTriggered", listener: (command: "BEEP") => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "respondingChanged" | "respondingInitialized", listener: (driver: "ERR", newValue: import("../../../Definitions/Insteon/index.js").Error, oldValue: import("../../../Definitions/Insteon/index.js").Error, formatted: string, uom: import("../../../Definitions/index.js").UnitOfMeasure.Index) => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        } & {
            on(eventName: "statusChanged" | "statusInitialized", listener: (driver: "ST", newValue: 0 | 1 | 2 | 3 | 5 | 6 | 7 | 8 | 4 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99, oldValue: 0 | 1 | 2 | 3 | 5 | 6 | 7 | 8 | 4 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99, formatted: string, uom: import("../../../Definitions/index.js").UnitOfMeasure.Percent) => void): import("../../../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
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
        handleControlTrigger(controlName: "DON" | "DOF" | "DFON" | "DFOF" | "BRT" | "DIM" | "OL" | "RR" | "QUERY" | "FDUP" | "FDDOWN" | "FDSTOP" | "WDU" | "BEEP"): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: keyof Insteon.DimmerLamp.Drivers.Type, value: any, uom: import("../../../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../../../Model/DriverState.js").DriverState | import("../../../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../../../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: "OL" | "RR" | "ERR" | "ST"): Promise<import("../../../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: keyof Insteon.DimmerLamp.Commands.Type): Promise<any>;
        sendCommand(command: keyof Insteon.DimmerLamp.Commands.Type, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: keyof Insteon.DimmerLamp.Commands.Type, value: string | number): Promise<any>;
        sendCommand(command: keyof Insteon.DimmerLamp.Commands.Type, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    }>;
};
export declare class DimmerLevelControlBehavior extends DimmerLevelControlBehavior_base {
    initialize(_options?: {}): Promise<void>;
    setLevel(level: number): MaybePromise<void>;
}
export {};
//# sourceMappingURL=DimmerLevelControlBehavior.d.ts.map