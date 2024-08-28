import { EventEmitter } from 'events';
import { Family } from './Definitions/Global/Families.js';
import { NodeInfo } from './Model/NodeInfo.js';
import { Driver } from './Definitions/Global/Drivers.js';
import { ISY, NodeType, type ISYScene } from './ISY.js';
import { type StringKeys } from './Utils.js';
import { Logger } from 'winston';
import { UnitOfMeasure } from './Definitions/Global/UOM.js';
import type { UnionToIntersection } from '@project-chip/matter.js/util';
import type { DriverState } from './Model/DriverState.js';
import type { Command } from './Definitions/Global/Commands.js';
import { CliConfigSetLevels } from 'winston/lib/winston/config/index.js';
export interface NodeNotes {
    location: string;
    spoken: string;
}
export declare class ISYNode<T extends Family, D extends ISYNode.DriverSignatures | {}, C extends ISYNode.CommandSignatures | {}, E extends string = Extract<keyof C, string>> extends EventEmitter {
    #private;
    readonly address: string;
    readonly baseLabel: string;
    readonly flag: any;
    readonly isy: ISY;
    readonly nodeDefId: string;
    static family: Family;
    static nodeDefId: string;
    baseName: any;
    commands: Command.ForAll<C>;
    drivers: Driver.ForAll<D>;
    enabled: boolean;
    events: E;
    family: T;
    folder: string;
    hidden: boolean;
    isDimmable: boolean;
    isLoad: boolean;
    label: string;
    lastChanged: Date;
    location: string;
    logger: (msg: any, level?: keyof CliConfigSetLevels, ...meta: any[]) => Logger;
    name: string;
    nodeType: number;
    parent: any;
    parentAddress: any;
    parentType: NodeType;
    propsInitialized: boolean;
    scenes: ISYScene[];
    spokenName: string;
    type: any;
    constructor(isy: ISY, node: NodeInfo);
    get parentNode(): ISYNode<any, any, any, any>;
    addLink(isyScene: ISYScene): void;
    applyStatus(prop: DriverState): void;
    convert(value: any, from: UnitOfMeasure, to: UnitOfMeasure): any;
    convertFrom(value: any, uom: UnitOfMeasure, propertyName?: keyof D): any;
    convertTo(value: any, uom: UnitOfMeasure, propertyName?: keyof D): any;
    emit(event: "PropertyChanged" | "ControlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): boolean;
    generateLabel(template: string): string;
    getNotes(): Promise<NodeNotes>;
    handleControlTrigger(controlName: E): boolean;
    handleEvent(event: {
        control?: any;
        data?: any;
        node?: any;
        action?: any;
        fmtAct?: any;
    }): boolean;
    handlePropertyChange(propertyName: keyof D & string, value: any, uom: UnitOfMeasure, formattedValue: string, prec?: number): boolean;
    on(event: "PropertyChanged", listener: (propertyName: keyof D, newValue: any, oldValue: any, formattedValue: string) => any): this;
    on(event: "ControlTriggered", listener: (controlName: keyof C) => any): this;
    parseResult(node: {
        property: DriverState | DriverState[];
    }): void;
    readProperties(): Promise<DriverState[]>;
    readProperty(propertyName: keyof D & string): Promise<DriverState>;
    refresh(): Promise<any>;
    refreshNotes(): Promise<void>;
    sendCommand(command: StringKeys<C>, parameters?: Record<string | symbol, string | number | undefined> | string | number): Promise<any>;
    updateProperty(propertyName: StringKeys<D>, value: any): Promise<any>;
}
export type Flatten<T, Level extends Number = 2, K = keyof T> = UnionToIntersection<T extends Record<string, unknown> ? K extends string ? T[K] extends Record<string, unknown> ? keyof T[K] extends string ? {
    [x in `${K}.${keyof T[K]}`]: T[K][TakeLast<x>];
} : never : never : never : never>;
type TakeLast<X> = X extends `${infer A}.${infer B}` ? TakeLast<B> : X;
export type DriverMap<T extends NodeList> = Flatten<{
    [x in keyof T]: DriversOf<T[x]>;
}>;
export type NodeList = {
    [x: string]: ISYNode<any, any, any, any>;
};
export type DriversOf<T> = T extends ISYNode<any, infer D, infer C, infer E> ? D : never;
export type CommandsOf<T> = T extends ISYNode<any, any, infer C, any> ? C : never;
export type EventsOf<T> = T extends ISYNode<any, any, any, infer E> ? E : never;
export declare namespace ISYNode {
    type FromSignatures<T> = T extends DriverSignatures ? Driver.ForAll<T> : never;
    type DriversOf<T> = T extends ISYNode<any, infer D, any, any> ? D : never;
    type CommandsOf<T> = T extends ISYNode<any, any, infer C, any> ? C : never;
    type EventsOf<T> = T extends ISYNode<any, any, any, infer E> ? E : never;
    type FamilyOf<T> = T extends ISYNode<infer F, any, any, any> ? F : never;
    type List = NodeList;
    type DriverMap<T extends NodeList> = Flatten<{
        [x in keyof T]: DriversOf<T[x]>;
    }>;
    type CommandMap<T extends NodeList> = Flatten<{
        [x in keyof T]: CommandsOf<T[x]>;
    }>;
    type EventMap<T extends NodeList> = Flatten<{
        [x in keyof T]: EventsOf<T[x]>;
    }>;
    type DriverSignatures = {
        [x: string]: Driver.Signature;
    };
    type CommandSignatures = {
        [x: string]: Command.Signature<any, any, any>;
    };
    type WithDrivers<D extends DriverSignatures> = D extends Driver.Signatures<infer U extends keyof D> ? {
        [K in D[U]["name"]]: D[U] extends {
            name: K;
        } ? D[U]["value"] : unknown;
    } : never;
}
export {};
//# sourceMappingURL=ISYNode.d.ts.map