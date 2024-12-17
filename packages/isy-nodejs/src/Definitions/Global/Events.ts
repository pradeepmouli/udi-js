import type { Merge, UnionToIntersection } from '@matter/general';
import type { AnyMxRecord } from 'dns';
import EventEmitter, { on } from 'events';
import type { EventType } from '../../Events/EventType.js';
import { ISYEvent } from '../../Events/ISYEvent.js';
import type { ISY } from '../../ISY.js';
import type { ISYNode } from '../../ISYNode.js';
import type { UnitOfMeasure } from './UOM.js';

import type { ObjectToUnion, StringKeys } from '../../Utils.js';
import type { Command } from './Commands.js';
import { Driver } from './Drivers.js';

//import { ISYNoCommandSignatures, DriverSignatures } from '../../ISYNode.js';

export namespace Event {
	create: (isy: ISY, eventData: any) => ISYEvent<any, any>;

	export type Signature = { name: string; driver: string; value: any; uom: UnitOfMeasure } | { name: string; command: string } | { name: any };

	export type Signatures = { [x: string]: Signature };

	export type DriverToEvent<D extends Driver.Signature> = { name: `${D['name']}Changed` | `${D['name']}Initialized`, value: D['value']; uom: D['uom'] };

	export type CommandToEvent<C extends Command.Signature> = { name: `${C['name']}Triggered` };

	export type HandlerSignature<S extends Signature, N> =
		S extends { name: string; driver: string; value: any; uom: UnitOfMeasure } ?
			{ on(eventName: S['name'], listener: (driver: S['driver'], newValue: S['value'], oldValue: S['value'], formatted: string, uom: S['uom']) => void): N }
		: S extends { name: string; command: string } ? { on(eventName: S['name'], listener: (command: S['command']) => void): N }
		: { on(eventName: S['name'], listener: (...args: any[]) => void): N };

	export type ForAll<E extends ISYNode.EventSignatures, D extends ISYNode.DriverSignatures, C extends ISYNode.CommandSignatures> = {
		[x in keyof E | keyof D]: x extends keyof D ? { name: `${D[x]['name']}Changed`; driver: x; value: D[x]['value']; uom: UnitOfMeasure }
		: x extends keyof C ? { name: `${C[x]['name']}Triggered`; command: x }
		: { name: x };
	};

	/*type ChangeEvents<N extends ISYNode<any, any, any, any>> = N extends ISYNode<any, infer D, infer C, infer E> ? { [x in E]: N['events'][x] extends { driver } ? N['events'][x] : never } : never;*/

	type TriggerEvents<N extends ISYNode<any, any, any, any>> = { [x in keyof N['events']]: x extends { command } ? N['events'][x] : never };

	type FunctionSignatureFor<N, R> = UnionToIntersection<N extends ISYNode<any, infer D, infer C, infer E> ? HandlerSignature<ObjectToUnion<E>, R> : never> & R; //& {on(eventName: keyof TriggerEvents<N>, command: TriggerEvents<N>[keyof TriggerEvents<N>]): unksown} : never;

	export type FunctionSigFor<E extends Signatures, N> = UnionToIntersection<HandlerSignature<ObjectToUnion<E>, N>>;

	type test1 = ForAll<{'ST'}, Driver.Signatures<{ ST: { name: 'Status'; label: 'Status'; uom: UnitOfMeasure; value: boolean; formatted: string } } | 'RR'>, any>;
	type test = FunctionSigFor<test1, test1> & Omit<EventEmitter, 'on'>;

	export class NodeEventEmitter<N extends ISYNode<any, any, any, any>> extends EventEmitter {
	// #region Constructors (1)

	constructor(node: N) {
			super({ captureRejections: true });

	}

	// #endregion Constructors (1)
}

	export function createEmitter<N extends ISYNode<any, D, C, E>, E extends ISYNode.EventSignatures, D extends ISYNode.DriverSignatures, C extends ISYNode.CommandSignatures>(
		node: N
	): Merge<NodeEventEmitter<N>,FunctionSigFor<E, NodeEventEmitter<N>>> {
		var f = new NodeEventEmitter(node);
		for (let evt in node.drivers) {

			//f[`on${ev.name}`] = f.on.bind(f, ev.name);
		}

		return f as any;
	}

	export class ISYEvent<TAction, TEventType extends EventType> {
	// #region Properties (2)

	public action: TAction;
	public eventInfo: any;

	// #endregion Properties (2)

	// #region Constructors (1)

	constructor(eventData: any) {
			this.action = eventData.action;
			this.eventInfo = eventData.eventInfo;
		}

	// #endregion Constructors (1)
}

	export class NodeEvent<TActionType, TEventType extends EventType> extends ISYEvent<TActionType, TEventType> {
	// #region Properties (1)

	public nodeAddress: string;

	// #endregion Properties (1)

	// #region Constructors (1)

	constructor(eventData: any) {
			super(eventData);
			this.nodeAddress = eventData.node;
		}

	// #endregion Constructors (1)
}

	export class VariableEvent<TActionType, TEventType extends EventType> extends ISYEvent<TActionType, TEventType> {
	// #region Properties (1)

	public variableName: string;

	// #endregion Properties (1)

	// #region Constructors (1)

	constructor(eventData: any) {
			super(eventData);
			this.variableName = eventData.variable;
		}

	// #endregion Constructors (1)
}

	export class SystemEvent<TActionType, TEventType extends EventType> extends ISYEvent<TActionType, TEventType> {
	// #region Constructors (1)

	constructor(eventData: any) {
			super(eventData);
		}

	// #endregion Constructors (1)
}

	export class DeviceEvent<TActionType, TEventType extends EventType> extends ISYEvent<TActionType, TEventType> {
	// #region Properties (1)

	public deviceAddress: string;

	// #endregion Properties (1)

	// #region Constructors (1)

	constructor(eventData: any) {
			super(eventData);
			this.deviceAddress = eventData.device;
		}

	// #endregion Constructors (1)
}
}
