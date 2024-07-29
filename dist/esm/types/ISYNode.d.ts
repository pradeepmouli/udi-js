import { EventEmitter } from 'events';
import { Family } from './Definitions/Global/Families.js';
import { Drivers } from './Definitions/Global/Drivers.js';
import { ISY, ISYScene, NodeType } from './ISY.js';
import { PropertyChangedEventEmitter } from './Utils.js';
import { Logger } from 'winston';
import { NodeInfo } from './Definitions/NodeInfo.js';
import { PropertyStatus } from './Definitions/PropertyStatus.js';
import { UnitOfMeasure } from './Definitions/Global/UOM.js';
interface Node {
    flag?: any;
    nodeDefId?: string;
    address?: string;
    name?: string;
    family?: Family;
    parent?: any;
    enabled?: boolean;
    ELK_ID?: string;
}
export interface NodeNotes {
    location: string;
    spoken: string;
}
export type DriverValues<DK extends Drivers = Drivers.Status> = {
    [x in DK | keyof Drivers]?: any;
};
export declare class ISYNode<D extends Drivers = Drivers> extends EventEmitter implements PropertyChangedEventEmitter {
    readonly isy: ISY;
    readonly formatted: {
        [x in D]?: ;
    };
    readonly uom: {
        [x in Drivers]?: UnitOfMeasure;
    };
    readonly pending: DriverValues<D>;
    readonly local: DriverValues<D>;
    readonly flag: any;
    readonly nodeDefId: string;
    readonly address: string;
    name: string;
    displayName: string;
    spokenName: string;
    location: string;
    isLoad: boolean;
    folder: string;
    parent: any;
    parentType: NodeType;
    readonly elkId: string;
    nodeType: number;
    readonly baseDisplayName: string;
    propsInitialized: boolean;
    logger: (msg: any, level?: "error" | "warn" | "debug" | "info", ...meta: any[]) => Logger;
    lastChanged: Date;
    enabled: boolean;
    baseName: any;
    family: Family;
    constructor(isy: ISY, node: Node);
    handlePropertyChange(propertyName: string, value: any, formattedValue: string): boolean;
    handleControlTrigger(controlName: string): boolean;
    on(event: "PropertyChanged" | "ControlTriggered", listener: ((propertyName: string, newValue: any, oldValue: any, formattedValue: string) => any) | ((controlName: string) => any)): this;
    emit(event: "PropertyChanged" | "ControlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): boolean;
    handleEvent(event: any): boolean;
    static _displayNameFunction: Function;
    setDisplayName(template: string): string;
    refreshNotes(): Promise<void>;
    getNotes(): Promise<NodeNotes>;
}
export declare class ISYDeviceNode<T extends Family, D extends Drivers = Drivers, Commands extends string = string> extends ISYNode<D> {
    family: T;
    readonly typeCode: string;
    readonly deviceClass: any;
    readonly parentAddress: any;
    readonly category: number;
    readonly subCategory: number;
    readonly type: any;
    _parentDevice: ISYDeviceNode<T, Drivers, string>;
    readonly children: Array<ISYDeviceNode<T, Drivers, string>>;
    readonly scenes: ISYScene[];
    hidden: boolean;
    _enabled: any;
    productName: string;
    model: string;
    modelNumber: string;
    version: string;
    isDimmable: boolean;
    constructor(isy: ISY, node: NodeInfo);
    convertTo(value: any, UnitOfMeasure: number, propertyName?: Drivers): any;
    convertFrom(value: any, UnitOfMeasure: number, propertyName?: Drivers): any;
    addLink(isyScene: ISYScene): void;
    addChild(childDevice: ISYDeviceNode<T, Drivers, string>): void;
    get parentDevice(): ISYDeviceNode<T, Drivers, string>;
    readProperty(propertyName: Drivers): Promise<PropertyStatus>;
    readProperties(): Promise<PropertyStatus[]>;
    updateProperty(propertyName: string, value: string): Promise<any>;
    sendCommand(command: string, parameters?: Record<string | symbol, string | number> | string | number): Promise<any>;
    refresh(): Promise<any>;
    parseResult(node: {
        property: PropertyStatus | PropertyStatus[];
    }): void;
    applyStatus(prop: PropertyStatus): void;
    handleControlTrigger(controlName: string): boolean;
    handlePropertyChange(propertyName: any, value: any, formattedValue: string): boolean;
}
export {};
