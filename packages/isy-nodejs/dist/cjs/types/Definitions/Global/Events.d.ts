import type { UnionToIntersection } from '@matter/general';
import EventEmitter from 'events';
import type { EventType } from '../../Events/EventType.js';
import type { ISYNode } from '../../ISYNode.js';
import type { UnitOfMeasure } from './UOM.js';
import type { ObjectToUnion } from '../../Utils.js';
import type { Command } from './Commands.js';
import { Driver } from './Drivers.js';
export declare namespace Event {
    type Signature = {
        name: string;
        driver: string;
        value: any;
        uom: UnitOfMeasure;
    } | {
        name: string;
        command: string;
    } | {
        name: any;
    };
    type Signatures = {
        [x: string]: Signature;
    };
    type DriverToEvent<D extends Driver.Signature> = {
        name: `${D['name']}Changed`;
        value: D['value'];
        uom: D['uom'];
    };
    type CommandToEvent<C extends Command.Signature> = {
        name: `${C['name']}Triggered`;
    };
    type HandlerSignature<S extends Signature, N> = S extends {
        name: string;
        driver: string;
        value: any;
        uom: UnitOfMeasure;
    } ? {
        on(eventName: S['name'], listener: (driver: S['driver'], newValue: S['value'], oldValue: S['value'], formatted: string, uom: S['uom']) => void): N;
    } : S extends {
        name: string;
        command: string;
    } ? {
        on(eventName: S['name'], listener: (command: S['command']) => void): N;
    } : {
        on(eventName: S['name'], listener: (...args: any[]) => void): N;
    };
    type ForAll<E extends string, D extends ISYNode.DriverSignatures, C extends ISYNode.CommandSignatures> = {
        [x in E]: x extends keyof D ? {
            name: `${D[x]['name']}Changed`;
            driver: x;
            value: D[x]['value'];
            uom: UnitOfMeasure;
        } : x extends keyof C ? {
            name: `${C[x]['name']}Triggered`;
            command: x;
        } : {
            name: x;
        };
    };
    type FunctionSigFor<E extends Signatures, N> = UnionToIntersection<HandlerSignature<ObjectToUnion<E>, N>>;
    class NodeEventEmitter<N extends ISYNode<any, any, any, any>> extends EventEmitter {
        constructor(node: N);
    }
    function createEmitter<N extends ISYNode<any, D, C, E>, E extends ISYNode.EventSignatures, D extends ISYNode.DriverSignatures, C extends ISYNode.CommandSignatures>(node: N): FunctionSigFor<E, NodeEventEmitter<N>> & Omit<NodeEventEmitter<N>, 'on'>;
    class ISYEvent<TAction, TEventType extends EventType> {
        action: TAction;
        eventInfo: any;
        constructor(eventData: any);
    }
    class NodeEvent<TActionType, TEventType extends EventType> extends ISYEvent<TActionType, TEventType> {
        nodeAddress: string;
        constructor(eventData: any);
    }
    class VariableEvent<TActionType, TEventType extends EventType> extends ISYEvent<TActionType, TEventType> {
        variableName: string;
        constructor(eventData: any);
    }
    class SystemEvent<TActionType, TEventType extends EventType> extends ISYEvent<TActionType, TEventType> {
        constructor(eventData: any);
    }
    class DeviceEvent<TActionType, TEventType extends EventType> extends ISYEvent<TActionType, TEventType> {
        deviceAddress: string;
        constructor(eventData: any);
    }
}
//# sourceMappingURL=Events.d.ts.map