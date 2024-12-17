import { Logger } from 'winston';
import { Driver } from './Definitions/Global/Drivers.js';
import { Family } from './Definitions/Global/Families.js';
import { UnitOfMeasure } from './Definitions/Global/UOM.js';
import { ISY } from './ISY.js';

import type { Merge, UnionToIntersection } from '@matter/general';
import { CliConfigSetLevels } from 'winston/lib/winston/config/index.js';
import { Converter } from './Converters.js';
import type { Command } from './Definitions/Global/Commands.js';
import { Event } from './Definitions/Global/Events.js';
import type { CompositeDevice } from './Devices/CompositeDevice.js';
import type { Constructor } from './Devices/Constructor.js';

import type { ISYDevice } from './ISYDevice.js';
import type { ISYScene } from './ISYScene.js';
import type { DriverState } from './Model/DriverState.js';
import { NodeInfo } from './Model/NodeInfo.js';
import type { NodeNotes } from './Model/NodeNotes.js';
import { NodeType } from './NodeType.js';
import { type ObjectToUnion, type StringKeys } from './Utils.js';

//type DriverValues<DK extends string | number | symbol,V = any> = {[x in DK]?:V};

export class ISYNode<
	T extends Family = Family,
	D extends ISYNode.DriverSignatures = {},
	C extends ISYNode.CommandSignatures = {},
	E extends ISYNode.EventSignatures = { [x in keyof D]: Event.DriverToEvent<D[x]> & { driver: x } } & { [x in keyof C]: Event.CommandToEvent<C[x]> & { command: x } }
> {
	// #region Properties (32)

	static #displayNameFunction: Function;

	#parentNode: ISYNode<any, any, any, any>;

	public readonly address: string;
	public readonly baseLabel: string;
	public readonly flag: any;
	public readonly isy: ISY;
	public readonly nodeDefId: string;

	public static family: Family;
	public static nodeDefId = 'Unknown';

	public static implements: string[] = [];

	public baseName: any;
	public commands: Command.ForAll<C>;
	//public readonly formatted: DriverValues<keyof D,string> = {};
	//public readonly uom: { [x in Driver.Literal]?: UnitOfMeasure } = { ST: UnitOfMeasure.Boolean };
	//public readonly pending: DriverValues<keyof D> = {};
	//public readonly local: DriverValues<keyof D> = {};
	public drivers: Driver.ForAll<D> = {} as Driver.ForAll<D>;
	public enabled: boolean;
	//TODO: add signature for non-command/non-driver events
	public events: Merge<Event.NodeEventEmitter<this>, Event.FunctionSigFor<E, Event.NodeEventEmitter<this>>>;
	//Event.FunctionSigFor<Event.ForAll<E,typeof this>> & Omit<EventEmitter,'on'>
	/*{
		[x in E]: x extends keyof D ? {name:`${D[x]["name"]}Changed`, driver: x, value: D[x]["value"], formatted: string, uom: UnitOfMeasure}
		: x extends keyof C ? {name: `${C[x]['name']}Triggered`, command: x}
		: {name: E};
	};*/
	public family: T;
	public folder: string = '';
	public hidden: boolean;
	public isDimmable: boolean;
	public isLoad: boolean;
	public label: string;
	public lastChanged: Date;
	public location: string;
	public logger: (msg: any, level?: keyof CliConfigSetLevels, ...meta: any[]) => Logger;
	// [x: string]: any;
	public name: string;
	public nodeType: number;
	public parent: any;
	public parentAddress: any;
	public parentType: NodeType;
	public propsInitialized: boolean;
	public scenes: ISYScene[];
	public spokenName: string;
	public type: any;

	// #endregion Properties (32)

	// #region Constructors (1)

	constructor(isy: ISY, node: NodeInfo) {
		this.isy = isy;
		this.nodeType = 0;
		this.flag = node.flag;
		this.nodeDefId = node.nodeDefId;
		this.address = String(node.address);

		this.name = node.name;
		this.family = node.family as T;

		this.parent = node.parent;

		this.parentType = Number(this.parent?.type);

		this.enabled = node.enabled ?? true;

		this.propsInitialized = false;
		const s = this.name.split('.');
		//if (s.length > 1)
		//s.shift();
		this.baseLabel = s
			.join(' ')
			.replace(/([A-Z])/g, ' $1')
			.replace('  ', ' ')
			.replace('  ', ' ')
			.trim();
		if (this.parentType === NodeType.Folder) {
			this.folder = isy.folderMap.get(this.parent._);
			isy.logger.debug(`${this.name} is in folder ${this.folder}`);
			this.logger = (msg: any, level: keyof CliConfigSetLevels = 'debug', ...meta: any[]) => {
				isy.logger[level](`${this.folder} ${this.name} (${this.address}): ${msg}`, meta);
				return isy.logger;
			};

			this.label = `${this.folder} ${this.baseName}`;
		} else {
			this.label = this.baseLabel;
			this.logger = (msg: any, level: keyof CliConfigSetLevels = 'debug', ...meta: any[]) => {
				isy.logger[level](`${this.name} (${this.address}): ${msg}`, meta);
				return isy.logger;
			};
		}
		this.events = Event.createEmitter(this);

		//this.logger(this.nodeDefId);
		this.lastChanged = new Date();
	}

	// #endregion Constructors (1)

	// #region Public Getters And Setters (1)

	public get parentNode(): ISYNode<any, any, any, any> {
		if (this.#parentNode === undefined) {
			if (this.parentAddress !== this.address && this.parentAddress !== null && this.parentAddress !== undefined) {
				this.#parentNode = this.isy.getDevice(this.parentAddress) as unknown as ISYNode<any, any, any, any>;
				if (this.#parentNode !== null) {
					//this.#parentNode.addChild(this);
				}
			}
			this.#parentNode = null;
		}
		return this.#parentNode;
	}

	// #endregion Public Getters And Setters (1)

	// #region Public Methods (18)

	public addLink(isyScene: ISYScene) {
		this.scenes.push(isyScene);
	}

	public applyStatus(prop: DriverState) {
		try {
			var d = this.drivers[prop.id];

			if (d) {
				d.apply(prop);

				this.logger(`Property ${d?.label ?? prop.id} (${prop.id}) refreshed to: ${d.value} (${prop.formatted}})`);
				//d.state.value = this.convertFrom(prop.value, prop.uom, prop.id);
				//d.state.formatted = prop.formatted;
				//d.state.uom = prop.uom;
			}
		} catch (e) {
			this.logger(e?.message ?? e, 'error');
		}
	}

	public convert(value: any, from: UnitOfMeasure, to: UnitOfMeasure): any {
		if (from === to) return value;
		else {
			try {
				return Converter.Standard[from][to].from(value);
			} catch {
				this.isy.logger.error(`Conversion from ${UnitOfMeasure[from]} to ${UnitOfMeasure[to]} not supported.`);
			} finally {
				return value;
			}
		}
	}

	public convertFrom(value: any, uom: UnitOfMeasure, propertyName?: StringKeys<D>): any {
		if (this.drivers[propertyName]?.uom != uom) {
			this.logger(`Converting ${this.drivers[propertyName].label} to ${UnitOfMeasure[this.drivers[propertyName]?.uom]} from ${UnitOfMeasure[uom]}`);
			return this.convert(value, uom, this.drivers[propertyName].uom);
		}
	}

	public convertTo(value: any, uom: UnitOfMeasure, propertyName?: StringKeys<D>) {
		if (this.drivers[propertyName]?.uom != uom) {
			this.isy.logger.debug(`Converting ${this.drivers[propertyName].label} from ${UnitOfMeasure[this.drivers[propertyName].uom]} to ${UnitOfMeasure[uom]}`);
			return this.convert(value, uom, this.drivers[propertyName].uom);
		}
	}

	public emit(event: 'propertyChanged' | 'controlTriggered', propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string) {
		//if ('PropertyChanged') return super.emit(event, propertyName, newValue, oldValue, formattedValue);
		//else if ('ControlTriggered') return super.emit(event, controlName);
	}

	public generateLabel(template: string): string {
		// tslint:disable-next-line: only-arrow-functions
		if (!ISYNode.#displayNameFunction) {
			// template = template.replace("{", "{this."};
			const regex = /(?<op1>\w+) \?\? (?<op2>\w+)/g;
			this.logger(`Display name format: ${template}`);
			let newttemp = template.replace(regex, "this.$<op1> === null || this.$<op1> === undefined || this.$<op1> === '' ? this.$<op2> : this.$<op1>");
			this.logger(`Template format updated to: ${newttemp}`);
			const s = {
				location: this.location ?? '',
				folder: this.folder ?? '',
				spokenName: this.spokenName ?? this.name,
				name: this.name ?? ''
			};
			newttemp = newttemp.replace('this.name', 'this.baseLabel');
			ISYNode.#displayNameFunction = new Function(`return \`${newttemp}\`.trim();`);
		}

		return ISYNode.#displayNameFunction.call(this);
	}

	public async getNotes(): Promise<NodeNotes> {
		try {
			const result = await this.isy.sendRequest(`nodes/${this.address}/notes`, {
				trailingSlash: false,
				errorLogLevel: 'debug',
				validateStatus(status) {
					return true;
				}
			});
			if (result !== null && result !== undefined) {
				return result.NodeProperties;
			} else {
				return null;
			}
		} catch (e) {
			return null;
		}
	}

	public handleControlTrigger(controlName: keyof E & keyof C): boolean {
		//this.lastChanged = new Date();
		//this.events.emit(`${this.commands[controlName].name}`, controlName);
		return true;
	}

	public handleEvent(event: { control?: any; data?: any; node?: any; action?: any; fmtAct?: any }): boolean {
		let actionValue = null;
		if (event.action instanceof Object) {
			actionValue = event.action._;
		} else if (event.action instanceof Number || event.action instanceof String) {
			actionValue = Number(event.action);
		}

		if (event.control in this.drivers) {
			// property not command
			const formatted = 'fmtAct' in event ? event.fmtAct : actionValue;
			return this.handlePropertyChange(event.control, actionValue, event.action.uom, event.action.prec, formatted);
		} else if (event.control === '_3') {
			this.logger(`Received Node Change Event: ${JSON.stringify(event)}. These are currently unsupported.`, 'debug');
		} else {
			// this.logger(event.control);
			const e = event.control;
			const dispName = this.commands[e]?.name;
			if (dispName !== undefined && dispName !== null) {
				this.logger(`Command ${dispName} (${e}) event received.`);
			} else {
				this.logger(`Command ${e} event received.`);
			}
			this.handleControlTrigger(e);
			return true;
		}
	}

	public handlePropertyChange(propertyName: StringKeys<D>, value: any, uom: UnitOfMeasure, prec?: number, formattedValue?: string): boolean {
		this.lastChanged = new Date();
		let driver = this.drivers[propertyName];
		/*this.logger(`Driver ${propertyName} (${driver?.label} value update ${value} (${formattedValue}) uom: ${UnitOfMeasure[uom]} event received.`);*/
		const oldValue = driver?.state.value;
		const oldValueRaw = driver?.state.rawValue;
		if (driver?.patch(value, formattedValue, uom, prec)) {
			this.logger(`Driver ${driver.label} updated from ${oldValue} (${oldValueRaw}) to ${driver.state.value} (${driver.state.rawValue})`);
			//this.emit('propertyChanged', propertyName, value, oldValue, formattedValue);
			this.scenes?.forEach((element) => {
				this.logger(`Recalulating ${element.deviceFriendlyName}`);
				element.recalculateState();
			});
		}

		return true;
	}

	/*public override on(event: 'PropertyChanged', listener: (propertyName: keyof D, newValue: any, oldValue: any, formattedValue: string) => any): this;
	public override on(event: 'ControlTriggered', listener: (controlName: keyof C) => any): this;
	public override on(event: string | symbol, listener: (...args: any[]) => void): this {
		super.on(event, listener);
		return this;
	}*/
	public parseResult(node: { property: DriverState | DriverState[] }) {
		if (Array.isArray(node.property)) {
			for (const prop of node.property) {
				this.applyStatus(prop);
			}
		} else if (node.property) {
			this.applyStatus(node.property);
			//device.local[node.property.id] = node.property.value;
			//device.formatted[node.property.id] = node.property.formatted;
			//device.uom[node.property.id] = node.property.uom;
		}
	}

	public async readProperties(): Promise<DriverState[]> {
		var result = await this.isy.sendRequest(`nodes/${this.address}/status`);
		this.logger(JSON.stringify(result), 'debug');
		return result.property;
	}

	/*public addChild<K extends ISYDeviceNode<T, any, any, any>>(childDevice: K) {
    this.children.push(childDevice);
  }*/
	public async readProperty(propertyName: keyof D & string): Promise<DriverState> {
		var result = await this.isy.sendRequest(`nodes/${this.address}/${propertyName}`);
		return result.property;
	}

	public async refresh(): Promise<any> {
		const device = this;
		const node = (await this.isy.sendRequest(`nodes/${this.address}/status`)).node;
		// this.logger(node);
		this.parseResult(node);
		return await this.isy.sendRequest(`nodes/${this.address}/status`);
	}

	public async refreshNotes() {
		const that = this;
		try {
			const result = await this.getNotes();
			if (result !== null && result !== undefined) {
				that.location = result.location ?? this.folder ?? '';
				that.spokenName = result.spoken ?? this.folder ?? '';
				// if(result.spoken)
			} else {
				that.logger('No notes found.');
			}
			that.label = that.generateLabel.bind(that)(that.isy.displayNameFormat);
			that.label = that.label ?? this.baseLabel;
			that.logger(`The friendly name updated to: ${that.label}`);
		} catch (e) {
			that.logger(e);
		}
	}
	public async sendCommand(command: StringKeys<C>): Promise<any>;
	public async sendCommand(command: StringKeys<C>, value: string | number, parameters: Record<string | symbol, string | number | undefined>);
	public async sendCommand(command: StringKeys<C>, value: string | number): Promise<any>;
	public async sendCommand(command: StringKeys<C>, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
	async sendCommand(
		command: StringKeys<C>,
		valueOrParameters?: string | number | Record<string | symbol, string | number | undefined>,
		parameters?: Record<string | symbol, string | number | undefined>
	): Promise<any> {
		if (valueOrParameters === null || valueOrParameters === undefined) {
			return this.isy.sendNodeCommand(this, command);
		}

		if (parameters === null || parameters === undefined) {
			return this.isy.sendNodeCommand(this, command, valueOrParameters);
		}
		if (typeof valueOrParameters === 'object') {
			return this.isy.sendNodeCommand(this, command, { ...valueOrParameters, ...parameters });
		}
		if (typeof valueOrParameters === 'string' || typeof valueOrParameters === 'number') {
			return this.isy.sendNodeCommand(this, command, { default: valueOrParameters, ...parameters });
		}
	}

	public async updateProperty(propertyName: string, value: any): Promise<any> {
		var l = this.drivers[propertyName];
		if (l) {
			if (l.serverUom) l.state.pendingValue = this.convert(value, l.uom, l.serverUom);
			else l.state.pendingValue = value;
		}
		this.logger(`Updating property ${l.label}. incoming value: ${value} outgoing value: ${l.state.pendingValue}`);

		return this.isy.sendRequest(`nodes/${this.address}/set/${propertyName}/${l.state.pendingValue}`).then((p) => {
			l.state.pendingValue = null;
		});
	}

	// #endregion Public Methods (18)
}

export type Flatten<T, Level extends Number = 2, K = keyof T> = UnionToIntersection<
	T extends Record<string, unknown> ?
		K extends string ?
			T[K] extends Record<string, unknown> ?
				keyof T[K] extends string ?
					{ [x in `${K}.${keyof T[K]}`]: T[K][TakeLast<x>] }
				:	never
			:	never
		:	never
	:	never
>;

type Split<X> = X extends `${infer A}.${infer B}` ? [A, ...Split<B>] : never;
type TakeLast<X> = X extends `${infer A}.${infer B}` ? TakeLast<B> : X;

type Test = Flatten<{ a: { b: { c: string } } }>;

export type DriverMap<T extends NodeList> = Flatten<{ [x in keyof T]: DriversOf<T[x]> }>;

// export class ISYDeviceNodeOld<
//   T extends Family,
//   D extends DriverSignatures | {},
//   C extends CommandSignatures | {},
//   E extends string = string
// >
//   extends ISYNode<D, C, E>
//   implements ISYDevice<T, D, C> {
//   public declare family: T;

//   public readonly typeCode: string;
//   public readonly deviceClass: any;
//   public readonly parentAddress: any;
//   public readonly category: number;
//   public readonly subCategory: number;
//   public readonly type: any;
//   public _parentDevice: ISYDeviceNode<T, any, any, any>;
//   public readonly children: Array<ISYDeviceNode<T, any, any, any>> = [];
//   public readonly scenes: ISYScene[] = [];

//   public hidden: boolean = false;

//   public _enabled: any;
//   productName: string;
//   model: string;
//   modelNumber: string;
//   version: string;
//   isDimmable: boolean;

//   constructor (isy: ISY, node: NodeInfo) {
//     super(isy, node);

//     this.family = node.family as T;
//     this.nodeType = 1;
//     this.type = node.type;
//     this._enabled = node.enabled;
//     this.deviceClass = node.deviceClass;
//     this.parentAddress = node.pnode;
//     const s = this.type.split(".");
//     this.category = Number(s[0]);
//     this.subCategory = Number(s[1]);

//     // console.log(nodeDetail);
//     if (this.parentAddress !== this.address && this.parentAddress !== undefined) {
//       this._parentDevice = isy.getDevice(this.parentAddress) as unknown as ISYDeviceNode<T, Driver.Literal, string>;
//       if (!isNullOrUndefined(this._parentDevice)) {
//         this._parentDevice.addChild(this);
//       }
//     }
//     if (Array.isArray(node.property)) {
//       for (const prop of node.property) {
//         this.local[prop.id] = this.convertFrom(prop.value, prop.uom, prop.id as Driver.Literal);
//         this.formatted[prop.id] = prop.formatted;
//         this.uom[prop.id] = prop.uom;
//         this.logger(
//           `Property ${Controls[prop.id].label} (${prop.id}) initialized to: ${this.local[prop.id]} (${this.formatted[prop.id]})`
//         );
//       }
//     } else if (node.property) {
//       this.local[node.property.id] = this.convertFrom(
//         node.property.value,
//         node.property.uom,
//         node.property.id as Driver.Literal
//       );
//       this.formatted[node.property.id] = node.property.formatted;
//       this.uom[node.property.id] = node.property.uom;
//       this.logger(
//         `Property ${Controls[node.property.id].label} (${node.property.id}) initialized to: ${this.local[node.property.id]} (${this.formatted[node.property.id]})`
//       );
//     }
//   }

//   public convertTo(value: any, UnitOfMeasure: number, propertyName: Driver.Literal = null): any {
//     return value;
//   }

//   public convertFrom(value: any, UnitOfMeasure: number, propertyName: Driver.Literal = null): any {
//     return value;
//   }

//   public override handleControlTrigger(controlName: string) {
//     return this.emit("ControlTriggered", controlName);
//   }

//   public override handlePropertyChange(driver: any, value: any, formattedValue: string) {
//     let changed = false;
//     const priorVal = this.local[driver];
//     try {
//       const val = this.convertFrom(value, this.uom[driver]);

//       if (this.local[driver] !== val) {
//         this.logger(`Property ${Controls[driver].label} (${driver}) updated to: ${val} (${formattedValue})`);
//         this.local[driver] = val;
//         this.formatted[driver] = formattedValue;
//         this.lastChanged = new Date();
//         changed = true;
//       } else {
//         this.logger(`Update event triggered, property ${Controls[driver].label} (${driver}) is unchanged.`);
//       }
//       if (changed) {
//         this.emit("PropertyChanged", driver, val, priorVal, formattedValue);

//         this.scenes.forEach((element) => {
//           this.logger(`Recalulating ${element.deviceFriendlyName}`);
//           element.recalculateState();
//         });
//       }
//     } catch (error) {
//       this.logger(error, "error");
//     } finally {
//       return changed;
//     }
//   }
//}

export type NodeList = { [x: string]: ISYNode<any, any, any, any> };

export type DriversOf<T> = T extends ISYNode<any, infer D, infer C, infer E> ? D : never;

export type CommandsOf<T> = T extends ISYNode<any, any, infer C, any> ? C : never;

export type EventsOf<T> = T extends ISYNode<any, any, any, infer E> ? E : never;

export namespace ISYNode {
	export type FromSignatures<T> = T extends DriverSignatures ? Driver.ForAll<T> : never;

	type InternalDriversOf<T> = T extends ISYNode<any, infer D, any, any> ? D : never;

	export type DriversOf<T> =
		T extends ISYNode<any, any, any, any> ? InternalDriversOf<T>
		: T extends CompositeDevice<any, any> ? T['drivers']
		: never;
	export type CommandsOf<T> = T extends ISYNode<any, any, infer C, any> ? C : never;
	export type EventsOf<T> = T extends ISYNode<any, any, any, infer E> ? E : never;
	export type FamilyOf<T> = T extends ISYNode<infer F, any, any, any> ? F : never;

	export type DriverTypesOf<T> = ObjectToUnion<DriversOf<T>>;

	export type CommandTypesOf<T extends ISYNode> = ObjectToUnion<CommandsOf<T>>;

	export type EventTypesOf<T extends ISYNode> = ObjectToUnion<EventsOf<T>>;

	export type EventNamesOf<T extends ISYNode> = EventTypesOf<T> extends { name: infer U } ? U : never;

	export type DriverNamesOf<T> =
		DriverTypesOf<T> extends { name: infer U } ? U
		: DriversOf<T> extends { name: infer U } ? U
		: never;

	export type DriverKeysOf<T> = keyof DriversOf<T>;

	export type CommandKeysOf<T> = keyof CommandsOf<T>;

	export type CommandNamesOf<T extends ISYNode> = CommandsOf<T> extends { name: infer U } ? U : never;
	export type List = NodeList;

	export type DriverMap<T extends NodeList> = Flatten<{
		[x in keyof T]: DriversOf<T[x]>;
	}>;

	export type CommandMap<T extends NodeList> = Flatten<{
		[x in keyof T]: CommandsOf<T[x]>;
	}>;

	export type EventMap<T extends NodeList> = Flatten<{
		[x in keyof T]: EventsOf<T[x]>;
	}>;

	export type DriverSignatures = Record<string, Driver.Signature<UnitOfMeasure, any, UnitOfMeasure, string, string>>;

	export type CommandSignatures = Partial<{
		[x: string]: Command.Signature<any, any, any>;
	}>;

	export type EventSignatures = Record<string, Event.Signature>;

	//TODO: fix return types
	/*export type WithCommands<C extends Command.Signatures<any>> = C extends Command.Signatures<infer U> ? {
      [K in C[U]["name"]]: C[K];
    } : never;*/

	export const With = <K extends Family, D extends DriverSignatures, C extends CommandSignatures, T extends Constructor<ISYNode<K, any, any, any>>>(Base: T) => {
		return class extends Base implements Omit<ISYNode<K, D, C>, 'events'> {
			declare drivers: Driver.ForAll<D, false>;
			declare commands: Command.ForAll<C>;
		};
	};

	export type WithDrivers<D extends DriverSignatures> =
		D extends Driver.Signatures<infer U extends keyof D> ?
			{
				[K in D[U] as K['name']]: K['value'];
			}
		:	never;

	type test = WithDrivers<{
		ST: { name: 'mode'; label: 'Mode'; uom: UnitOfMeasure.Boolean; value: boolean };
		ERR: { name: 'resp'; label: 'Resp'; uom: UnitOfMeasure.Boolean; value: Error };
	}>;
}
