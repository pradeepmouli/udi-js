import type { Driver } from '../Definitions/Global/Drivers.js';
import type { UnitOfMeasure } from '../Definitions/Global/UOM.js';

import type { Constructor, SimplifyDeep } from 'type-fest';
import type { Category, Family, Insteon } from '../Definitions/index.js';
import { ISY } from '../ISY.js';
import type { ISYDevice } from '../ISYDevice.js';
import { DriverMap, ISYNode, NodeList } from '../ISYNode.js';
import type { ISYScene } from '../ISYScene.js';
import type { DriverState } from '../Model/DriverState.js';
import type { NodeInfo } from '../Model/NodeInfo.js';
import type { Factory, InstanceOf, ObjectToUnion, StringKeys } from '../Utils.js';
import type { ISYDeviceNode } from './ISYDeviceNode.js';
import type { NodeFactory } from './NodeFactory.js';
import type { DoorWindowSensor, DoorWindowSensorDevice } from './Insteon/InsteonDoorWindowSensorDevice.js';
import { ts } from 'ts-morph';
import type { BinaryAlarm } from './Insteon/index.js';
import type { FanDevice, Fan } from './Insteon/InsteonFanDevice.js';


export type CompositeDevice<F extends Family, N extends { [x: string]: ISYNode.Factory<F,any>}, R = N[keyof N]> = SimplifyDeep<{ [x in keyof N]: InstanceOf<N[x]> }> & {
	root: R;

	events: { [x in keyof N]: InstanceType<N[x]['Class']>['events'] };

	drivers: { [x in keyof N]: InstanceType<N[x]['Class']>['drivers'] };

	commands: { [x in keyof N]: InstanceType<N[x]['Class']>['commands'] };

	addNode: (node: NodeInfo | ISYNode, isy?: ISY) => void;
} & Omit<ISYDevice<Family, unknown, unknown, unknown>, 'drivers' | 'commands' | 'events'>;

export namespace CompositeDevice {
	export type DriversOf<N extends CompositeDevice<any, any>> = N['drivers'];

	export type CommandsOf<N extends CompositeDevice<any, any>> = N['commands'];

	export type EventsOf<N extends CompositeDevice<any, any>> = N['events'];

	export type DriverNamesOf<N extends CompositeDevice<any, any>> = ObjectToUnion<{ [x in StringKeys<DriversOf<N>>]: `${x}.${ISYNode.DriverNamesOf<N[x]> & string}` }>;

	export type CommandNamesOf<N> = N extends Factory<CompositeDevice<any,infer X>> ? CommandNamesOf<X[keyof X]> : never;

	export type EventNamesOf<N extends CompositeDevice<any, any>> = ObjectToUnion<{ [x in StringKeys<DriversOf<N>>]: `${x}.${ISYNode.EventNamesOf<N[x]> & string}` }>;

	export type DriverKeysOf<N extends CompositeDevice<any, any>> = ObjectToUnion<{ [x in StringKeys<DriversOf<N>>]: `${x}.${ISYNode.DriverKeysOf<N[x]> & string}` }>;

	export type CommandKeysOf<N extends CompositeDevice<any, any>> = ObjectToUnion<{ [x in StringKeys<CommandsOf<N>>]: `${x}.${ISYNode.CommandKeysOf<N[x]> & string}` }>;

	//@ts-ignore
	type test = CommandNamesOf<typeof DoorWindowSensor>

	export function of<F extends Family, N extends { [x: string]: ISYNode.Factory<F,any> }>(
		nodes: { [x in keyof N]: InstanceType<N[x]['Class']> },
		keyFunction: (node: NodeInfo) => [keyof N, boolean]
	): Constructor<CompositeDevice<F, N>>;
	export function of<F extends Family, N extends { [x: string]: ISYNode.Factory<F,any> }>(
		nodes: { [x in keyof N]: InstanceType<N[x]['Class']> },
		keyMap: { [x in keyof N]: number | string }
	): Constructor<CompositeDevice<F, N, N[0]>>;
	 export function of<F extends Family, N extends { [x: string]: ISYNode.Factory<F,any> }>(
			nodes: { [x in keyof N]: InstanceType<N[x]['Class']> },
			keyFunction: { [x in keyof N]: number | string } | ((node: NodeInfo) => [keyof N, boolean])
		): Constructor<CompositeDevice<F, N>> {
			if (keyFunction === undefined) {
				keyFunction = (node: NodeInfo) => [node.name, true];
			}
			if (typeof keyFunction === 'function') {
				return CompositeOf(nodes, keyFunction as any);
			} else if (typeof keyFunction === 'object') {
				return CompositeOf(nodes, (node: NodeInfo | ISYNode) => {
					for (const key in keyFunction) {
						if (node.address.endsWith(keyFunction[key].toString())) {
							return [key, keyFunction[key] == 1 || keyFunction[key] == '1'];
						}
					}
				});
			}
		}

	export function isComposite(device: ISYDevice<any, any, any, any>): device is CompositeDevice<any, any> {
		return 'addNode' in device;
	}
	//@ts-ignore
	type test = CommandNamesOf<typeof DoorWindowSensor>;
}

export function CompositeOf<F extends Family, N extends { [x: string]: ISYNode.Factory<F,any> }>(
	nodes: { [x in keyof N]: N[x] },
	keyFunction: (node: NodeInfo | ISYNode) => [keyof N, boolean]
): Constructor<CompositeDevice<F, N>> {
	return class implements ISYDevice<F, any, unknown, any> {
		readonly isy: ISY;

		constructor(...args: any[]) {
			if (args[0] instanceof ISY) {
				this.isy = args.shift();
				for (const nodeInfo of args as NodeInfo[]) {
					this.addNode(nodeInfo, this.isy);
				}
			}
		}
		category: F extends Family.Insteon ? Category.Insteon : Category.Home.Category;
		deviceClass: any;
		enabled: boolean;
		family: F;
		hidden: boolean;
		isDimmable: boolean;
		label: string;
		model: string;
		modelNumber: string;
		name: any;
		parentAddress: any;
		productName: string;
		scenes: ISYScene[];
		subCategory: number;
		type: any;
		typeCode: string;
		version: string;
		manufacturer: string;
		productId: string | number;
		modelName: string;

		public address: string;

		public events: { [x in keyof N]: InstanceType<N[x]['Class']>['events'] } = {} as any;

		public drivers: { [x in keyof N]: InstanceType<N[x]['Class']>['drivers'] } = {} as any;

		public commands: { [x in keyof N]: InstanceType<N[x]['Class']>['commands'] } = {} as any;

		public root = null;

		public addNode(node: ISYNode): void;
		public addNode(node: NodeInfo, isy: ISY): void;
		public addNode(node: NodeInfo | ISYNode, isy = this.isy) {
			let n: ISYDeviceNode<F, any, any, any> = null;
			if (node instanceof ISYNode) {
				n = node as ISYDeviceNode<any, any, any, any>;
			} else {
				n = new nodes[keyFunction(node)[0]].Class(isy, node);
			}
			const keyL = keyFunction(node);
			const key = keyL[0];
			const isRoot = keyL[1];

			Object.defineProperty(this, key, n);

			Object.defineProperty(this.events, key, {
				get(): () => any {
					return this[key].events;
				}
			});
			Object.defineProperty(this.drivers, key, {
				get(): () => any {
					return this[key].drivers;
				}
			});
			Object.defineProperty(this.commands, key, {
				get(): () => any {
					return this[key].commands;
				}
			});
			if (isRoot) {
				this.address = node.address;
				this.family = n.family;
				this.category = n.category;
				this.deviceClass = n.deviceClass;
				this.enabled = n.enabled;
				this.hidden = n.hidden;
				this.isDimmable = n.isDimmable;
				this.label = n.label;
				this.model = n.model;
				this.modelNumber = n.modelNumber;
				this.name = n.name;
				this.parentAddress = n.parentAddress;
				this.productName = n.productName;
				this.scenes = n.scenes;
				this.subCategory = n.subCategory;
				this.type = n.type;
				this.typeCode = n.typeCode;
				this.version = n.version;
				this.manufacturer = n.manufacturer;
				this.productId = n.productId;
				this.modelName = n.modelName;
				this.manufacturer = n.manufacturer;
				this.root = n;
			}
		}
	} as unknown as Constructor<CompositeDevice<F, N>>;
}

/*

export class ISYMultiNodeDevice<T extends Family, N extends NodeList>
  implements ISYDevice<T, ISYNode.DriverMap<N>, ISYNode.CommandMap<N>, string> {
  commands: UnionToIntersection<{ [x in keyof N]: ISYNode.CommandsOf<N[x]>; } extends Record<string, unknown> ? keyof N extends string ? { [x in keyof N]: ISYNode.CommandsOf<N[x]>; }[string & keyof N] extends Record<string, unknown> ? keyof { [x in keyof N]: ISYNode.CommandsOf<N[x]>; }[string & keyof N] extends string ? { [x in `${string & keyof N}.${string & keyof { [x in keyof N]: ISYNode.CommandsOf<N[x]>; }[string & keyof N]}`]: { [x in keyof N]: ISYNode.CommandsOf<N[x]>; }[string & keyof N][x extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? any : B : B : B : B : B : B : B : B : B : B : x]; } : never : never : never : never>;
  readProperty(propertyName: keyof UnionToIntersection<{ [x in keyof N]: ISYNode.DriversOf<N[x]>; } extends Record<string, unknown> ? keyof N extends string ? { [x in keyof N]: ISYNode.DriversOf<N[x]>; }[string & keyof N] extends Record<string, unknown> ? keyof { [x in keyof N]: ISYNode.DriversOf<N[x]>; }[string & keyof N] extends string ? { [x in `${string & keyof N}.${string & keyof { [x in keyof N]: ISYNode.DriversOf<N[x]>; }[string & keyof N]}`]: { [x in keyof N]: ISYNode.DriversOf<N[x]>; }[string & keyof N][x extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? any : B : B : B : B : B : B : B : B : B : B : x]; } : never : never : never : never>): Promise<DriverState> {
    throw new Error('Method not implemented.');
  }
  sendCommand(command: Extract<keyof UnionToIntersection<{ [x in keyof N]: ISYNode.CommandsOf<N[x]>; } extends Record<string, unknown> ? keyof N extends string ? { [x in keyof N]: ISYNode.CommandsOf<N[x]>; }[string & keyof N] extends Record<string, unknown> ? keyof { [x in keyof N]: ISYNode.CommandsOf<N[x]>; }[string & keyof N] extends string ? { [x in `${string & keyof N}.${string & keyof { [x in keyof N]: ISYNode.CommandsOf<N[x]>; }[string & keyof N]}`]: { [x in keyof N]: ISYNode.CommandsOf<N[x]>; }[string & keyof N][x extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? any : B : B : B : B : B : B : B : B : B : B : x]; } : never : never : never : never>, string>, parameters?: Record<string | symbol, string | number> | string | number): Promise<any> {
    throw new Error('Method not implemented.');
  }

  updateProperty(propertyName: keyof ISYNode.DriverMap<N>, value: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  handleControlTrigger(controlName: string): boolean {
    throw new Error('Method not implemented.');
  }

  _parentDevice: ISYDevice<T, any, any, any>;
  children: ISYNode<any, any, any, any>[];
  convertTo(value: any, uom: number);
  convertTo(value: any, uom: number, propertyName: keyof DriverMap<N>);
  convertTo(value: unknown, uom: unknown, propertyName?: unknown): any {
    throw new Error('Method not implemented.');
  }
  convertFrom(value: any, uom: number);
  convertFrom(value: any, uom: number, propertyName: keyof DriverMap<N>);
  convertFrom(value: unknown, uom: unknown, propertyName?: unknown): any {
    throw new Error('Method not implemented.');
  }
  addLink(isyScene: ISYScene): void {
    throw new Error('Method not implemented.');
  }
  addChild(childDevice: ISYNode<any, any, any, any>): void {
    throw new Error('Method not implemented.');
  }

  readProperties(): Promise<DriverState[]> {
    throw new Error('Method not implemented.');
  }

  refresh(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  refreshNotes(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  parseResult(node: { property: DriverState | DriverState[]; }): void {
    throw new Error('Method not implemented.');
  }

  handlePropertyChange(propertyName: keyof ISYNode.DriverMap<N> & string, value: any, uom: UnitOfMeasure, prec: number, formattedValue: string): boolean {
    throw new Error('Method not implemented.');
  }

  logger(arg0: string): unknown {
    throw new Error('Method not implemented.');
  }
  handleEvent(evt: any): unknown {
    throw new Error('Method not implemented.');
  }
  on(arg0: string, arg1: any): unknown {
    throw new Error('Method not implemented.');
  }
  name: any;
  drivers: Driver.ForAll<ISYNode.DriverMap<N>>;
  address: string;
  family: T;
  typeCode: string;
  deviceClass: any;
  parentAddress: any;
  category: number;
  subCategory: number;
  type: any;
  scenes: ISYScene[];
  hidden: boolean;
  enabled: boolean;
  productName: string;
  model: string;
  modelNumber: string;
  version: string;
  isDimmable: boolean;
  label: string;

} */
