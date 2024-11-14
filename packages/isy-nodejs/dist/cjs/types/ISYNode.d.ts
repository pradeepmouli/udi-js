import type { UnionToIntersection } from '@project-chip/matter.js/util';
import { Logger } from 'winston';
import { Driver } from './Definitions/Global/Drivers.js';
import { Family } from './Definitions/Global/Families.js';
import { UnitOfMeasure } from './Definitions/Global/UOM.js';
import { ISY } from './ISY.js';
import { CliConfigSetLevels } from 'winston/lib/winston/config/index.js';
import type { Command } from './Definitions/Global/Commands.js';
import { Event } from './Definitions/Global/Events.js';
import type { Constructor } from './Devices/Constructor.js';
import type { DriverState } from './Model/DriverState.js';
import { NodeInfo } from './Model/NodeInfo.js';
import type { NodeNotes } from './Model/NodeNotes.js';
import { type StringKeys } from './Utils.js';
import { NodeType } from './ISYConstants.js';
import type { ISYScene } from './ISYScene.js';
export declare class ISYNode<T extends Family = Family, D extends ISYNode.DriverSignatures = {}, C extends ISYNode.CommandSignatures = {}, E extends ISYNode.EventSignatures = {
    [x in keyof D]: Event.DriverToEvent<D[x]> & {
        driver: x;
    };
} & {
    [x in keyof C]: Event.CommandToEvent<C[x]> & {
        command: x;
    };
}> {
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
    events: Event.FunctionSigFor<E, Event.NodeEventEmitter<this>> & Omit<Event.NodeEventEmitter<this>, 'on'>;
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
    convertFrom(value: any, uom: UnitOfMeasure, propertyName?: StringKeys<D>): any;
    convertTo(value: any, uom: UnitOfMeasure, propertyName?: StringKeys<D>): any;
    emit(event: 'propertyChanged' | 'controlTriggered', propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
    generateLabel(template: string): string;
    getNotes(): Promise<NodeNotes>;
    handleControlTrigger(controlName: keyof E & keyof C): boolean;
    handleEvent(event: {
        control?: any;
        data?: any;
        node?: any;
        action?: any;
        fmtAct?: any;
    }): boolean;
    handlePropertyChange(propertyName: StringKeys<D>, value: any, uom: UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
    parseResult(node: {
        property: DriverState | DriverState[];
    }): void;
    readProperties(): Promise<DriverState[]>;
    readProperty(propertyName: keyof D & string): Promise<DriverState>;
    refresh(): Promise<any>;
    refreshNotes(): Promise<void>;
    sendCommand(command: StringKeys<C>, parameters?: Record<string | symbol, string | number | undefined> | string | number): Promise<any>;
    updateProperty(propertyName: string, value: any): Promise<any>;
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
    type DriverSignatures = Record<string, Driver.Signature<UnitOfMeasure, any, UnitOfMeasure, string, string>>;
    type CommandSignatures = Partial<{
        [x: string]: Command.Signature<any, any, any>;
    }>;
    type EventSignatures = Record<string, Event.Signature>;
    const With: <K extends Family, D extends DriverSignatures, C extends CommandSignatures, T extends Constructor<ISYNode<K, any, any, any>>>(Base: T) => {
        new (...args: any[]): {
            drivers: Driver.ForAll<any, false>;
            commands: Command.ForAll<C>;
            "__#72@#parentNode": ISYNode<any, any, any, any>;
            readonly address: string;
            readonly baseLabel: string;
            readonly flag: any;
            readonly isy: ISY;
            readonly nodeDefId: string;
            baseName: any;
            enabled: boolean;
            events: {
                on(eventName: any, listener: (driver: any, newValue: any, oldValue: any, formatted: string, uom: any) => void): Event.NodeEventEmitter<any>;
            } & {
                on(eventName: any, listener: (command: any) => void): Event.NodeEventEmitter<any>;
            } & {
                on(eventName: any, listener: (...args: any[]) => void): Event.NodeEventEmitter<any>;
            } & Omit<Event.NodeEventEmitter<any>, "on">;
            family: K;
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
            readonly parentNode: ISYNode<any, any, any, any>;
            addLink(isyScene: ISYScene): void;
            applyStatus(prop: DriverState): void;
            convert(value: any, from: UnitOfMeasure, to: UnitOfMeasure): any;
            convertFrom(value: any, uom: UnitOfMeasure, propertyName?: string): any;
            convertTo(value: any, uom: UnitOfMeasure, propertyName?: string): any;
            emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
            generateLabel(template: string): string;
            getNotes(): Promise<NodeNotes>;
            handleControlTrigger(controlName: string | number | symbol): boolean;
            handleEvent(event: {
                control?: any;
                data?: any;
                node?: any;
                action?: any;
                fmtAct?: any;
            }): boolean;
            handlePropertyChange(propertyName: string, value: any, uom: UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
            parseResult(node: {
                property: DriverState | DriverState[];
            }): void;
            readProperties(): Promise<DriverState[]>;
            readProperty(propertyName: string): Promise<DriverState>;
            refresh(): Promise<any>;
            refreshNotes(): Promise<void>;
            sendCommand(command: string, parameters?: Record<string | symbol, string | number | undefined> | string | number): Promise<any>;
            updateProperty(propertyName: string, value: any): Promise<any>;
        };
    } & T;
    type WithDrivers<D extends DriverSignatures> = D extends Driver.Signatures<infer U extends keyof D> ? {
        [K in D[U]['name']]: D[U] extends {
            name: K;
        } ? D[U]['value'] : unknown;
    } : never;
}
export {};
//# sourceMappingURL=ISYNode.d.ts.map