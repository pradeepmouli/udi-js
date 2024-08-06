import { ZWaveBaseDevice } from './ZWaveBaseDevice.js';
import 'winston';
declare const ZWaveDimmerSwitchDevice_base: {
    new (...args: any[]): {
        readonly level: number;
        updateLevel(level: number): Promise<any>;
        family: any;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly parentAddress: any;
        readonly category: number;
        readonly subCategory: number;
        readonly type: any;
        _parentDevice: import("../../ISYNode.js").ISYDeviceNode<any, import("../../Definitions/Global/Drivers.js").Driver.Literal, string>;
        readonly children: import("../../ISYNode.js").ISYDeviceNode<any, import("../../Definitions/Global/Drivers.js").Driver.Literal, string>[];
        readonly scenes: import("../../ISYScene.js").ISYScene[];
        hidden: boolean;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        isDimmable: boolean;
        convertTo(value: any, UnitOfMeasure: number, propertyName?: import("../../Definitions/Global/Drivers.js").Driver.Literal): any;
        convertFrom(value: any, UnitOfMeasure: number, propertyName?: import("../../Definitions/Global/Drivers.js").Driver.Literal): any;
        addLink(isyScene: import("../../ISYScene.js").ISYScene): void;
        addChild<K extends import("../../ISYNode.js").ISYDeviceNode<any, any, any>>(childDevice: K): void;
        readonly parentDevice: import("../../ISYNode.js").ISYDeviceNode<any, import("../../Definitions/Global/Drivers.js").Driver.Literal, string>;
        readProperty(propertyName: import("../../Definitions/Global/Drivers.js").Driver.Literal): Promise<import("../../Model/DriverState.js").DriverState>;
        readProperties(): Promise<import("../../Model/DriverState.js").DriverState[]>;
        updateProperty(propertyName: import("../../Definitions/Global/Drivers.js").Driver.Literal, value: string): Promise<any>;
        sendCommand(command: string, parameters?: Record<string | symbol, string | number> | string | number): Promise<any>;
        refresh(): Promise<any>;
        parseResult(node: {
            property: import("../../Model/DriverState.js").DriverState | import("../../Model/DriverState.js").DriverState[];
        }): void;
        applyStatus(prop: import("../../Model/DriverState.js").DriverState): void;
        handleControlTrigger(controlName: string): boolean;
        handlePropertyChange(driver: any, value: any, formattedValue: string): boolean;
        readonly isy: import("../../ISY.js").ISY;
        readonly formatted: import("../../ISYNode.js").DriverValues<any, string>;
        readonly uom: { [x in import("../../Definitions/Global/Drivers.js").Driver.Literal]?: import("../../Definitions/Global/UOM.js").UnitOfMeasure; };
        readonly pending: import("../../ISYNode.js").DriverValues<any, any>;
        readonly local: import("../../ISYNode.js").DriverValues<any, any>;
        readonly drivers: {} | ({
            [x: string]: import("../../Definitions/Global/Drivers.js").Driver<any>;
        } & {
            add(driver: import("../../Definitions/Global/Drivers.js").Driver<any>): void;
        }) | ({} & {
            add(driver: import("../../Definitions/Global/Drivers.js").Driver<never>): void;
        });
        readonly flag: any;
        readonly nodeDefId: string;
        readonly address: string;
        name: string;
        label: string;
        spokenName: string;
        location: string;
        isLoad: boolean;
        folder: string;
        parent: any;
        parentType: import("../../ISYConstants.js").NodeType;
        readonly elkId: string;
        nodeType: number;
        readonly baseLabel: string;
        propsInitialized: boolean;
        logger: (msg: any, level?: "error" | "warn" | "debug" | "info", ...meta: any[]) => import("winston").Logger;
        lastChanged: Date;
        enabled: boolean;
        baseName: any;
        on(event: "PropertyChanged" | "ControlTriggered", listener: ((propertyName: string, newValue: any, oldValue: any, formattedValue: string) => any) | ((controlName: string) => any)): any;
        emit(event: "PropertyChanged" | "ControlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        generateLabel(template: string): string;
        refreshNotes(): Promise<void>;
        getNotes(): Promise<import("../../ISYNode.js").NodeNotes>;
        [EventEmitter.captureRejectionSymbol]?(error: Error, event: string, ...args: any[]): void;
        addListener(eventName: string | symbol, listener: (...args: any[]) => void): any;
        once(eventName: string | symbol, listener: (...args: any[]) => void): any;
        removeListener(eventName: string | symbol, listener: (...args: any[]) => void): any;
        off(eventName: string | symbol, listener: (...args: any[]) => void): any;
        removeAllListeners(event?: string | symbol): any;
        setMaxListeners(n: number): any;
        getMaxListeners(): number;
        listeners(eventName: string | symbol): Function[];
        rawListeners(eventName: string | symbol): Function[];
        listenerCount(eventName: string | symbol, listener?: Function): number;
        prependListener(eventName: string | symbol, listener: (...args: any[]) => void): any;
        prependOnceListener(eventName: string | symbol, listener: (...args: any[]) => void): any;
        eventNames(): Array<string | symbol>;
    };
} & typeof ZWaveBaseDevice;
export declare class ZWaveDimmerSwitchDevice extends ZWaveDimmerSwitchDevice_base {
    constructor(isy: any, deviceNode: any);
}
export {};
//# sourceMappingURL=ZWaveDimmerSwitchDevice.d.ts.map