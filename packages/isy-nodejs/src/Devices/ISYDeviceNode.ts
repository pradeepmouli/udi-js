import type EventEmitter from 'events';
import type { Category } from '../Definitions/Global/Categories.js';
import type { Command } from '../Definitions/Global/Commands.js';
import type { Driver } from '../Definitions/Global/Drivers.js';
import type { Event } from '../Definitions/Global/Events.js';
import type { Family } from '../Definitions/index.js';
import type { NodeEvent } from '../Events/NodeEvent.js';
import { type ISY } from '../ISY.js';
import type { ISYDevice, ISYDeviceInfo } from '../ISYDevice.js';
import { ISYNode } from '../ISYNode.js';
import type { ISYScene } from '../ISYScene.js';
import type { DriverState } from '../Model/DriverState.js';
import type { NodeInfo } from '../Model/NodeInfo.js';
import type { StringKeys } from '../Utils.js';

export class ISYDeviceNode<
		T extends Family,
		D extends ISYNode.DriverSignatures,
		C extends ISYNode.CommandSignatures,
		E extends ISYNode.EventSignatures = { [x in keyof D]: Event.DriverToEvent<D[x]> & { driver: x } } & { [x in keyof C]: Event.CommandToEvent<C[x]> & { command: x } }
	>
	extends ISYNode<T, D, C, E>
	implements ISYDeviceInfo, ISYDevice<T, Driver.ForAll<D>, Command.ForAll<C>, any>
{
	declare public family: T;

	public readonly typeCode: string;
	public readonly deviceClass: any;
	public readonly category: T extends Family.Insteon ? Category.Insteon : Category.Home.Category;
	public readonly subCategory: number;

	//public readonly isDimmable: boolean;

	//public _parentDevice: ISYDeviceNode<T, any, any, any>;
	//public readonly children: Array<ISYDeviceNode<T, any, any, any>> = [];

	public _enabled: any;
	productName: string;
	model: string;
	modelNumber: string;
	version: string;

	constructor(isy: ISY, node: NodeInfo) {
		super(isy, node);

		this.family = node.family as T;
		this.nodeType = 1;
		this.type = node.type;
		this._enabled = node.enabled;
		this.deviceClass = node.deviceClass;
		this.parentAddress = node.pnode;
		const s = this.type.split('.');
		this.category = Number(s[0]) as T extends Family.Insteon ? Category.Insteon : Category.Home.Category;
		this.subCategory = Number(s[1]);

		// console.log(nodeDetail);
		// if (this.parentAddress !== this.address && this.parentAddress !== undefined) {
		//   this._parentDevice = isy.getDevice(this.parentAddress) as unknown as ISYDeviceNode<T, any, any, any>;
		//   if (!isNullOrUndefined(this._parentDevice)) {
		//     this._parentDevice.addChild(this);
		//   }
		// }
		// if (Array.isArray(node.property)) {
		//   for (const prop of node.property) {
		//     this.local[prop.id] = this.convertFrom(prop.value, prop.uom, prop.id as Driver.Literal);
		//     this.formatted[prop.id] = prop.formatted;
		//     this.uom[prop.id] = prop.uom;
		//     this.logger(
		//       `Property ${Controls[prop.id].label} (${prop.id}) initialized to: ${this.local[prop.id]} (${this.formatted[prop.id]})`
		//     );
		//   }
		// } else if (node.property) {
		//   this.local[node.property.id] = this.convertFrom(
		//     node.property.value,
		//     node.property.uom,
		//     node.property.id as Driver.Literal
		//   );
		//   this.formatted[node.property.id] = node.property.formatted;
		//   this.uom[node.property.id] = node.property.uom;
		//   this.logger(
		//     `Property ${Controls[node.property.id].label} (${node.property.id}) initialized to: ${this.local[node.property.id]} (${this.formatted[node.property.id]})`
		//   );
		// }
	}
	manufacturer: string;
	productId: string | number;
	modelName: string;

	_parentDevice: ISYDevice<T, any, any, any>;
	children: ISYNode<any, any, any, any>[];

	public addChild<K extends ISYNode<any, any, any, any>>(childDevice: K) {
		this.children.push(childDevice);
	}

	// override get parentNode() : ISYDevice<T, any, any, any> {
	//   super.parentNode()
	//   if (this._parentDevice === undefined) {
	//     if (this.parentAddress !== this.address && this.parentAddress !== null && this.parentAddress !== undefined) {
	//       this._parentDevice = this.isy.getDevice(this.parentAddress) as unknown as ISYDeviceNode<T, Driver.Literal, string>;
	//       if (this._parentDevice !== null) {
	//         this._parentDevice.addChild(this);
	//       }
	//     }
	//     this._parentDevice = null;
	//   }
	//   return this._parentDevice;
	// }

	// public async readProperty(propertyName: Driver.Literal): Promise<DriverState> {
	//   var result = await this.isy.sendRequest(`nodes/${this.address}/${propertyName}`);
	//   this.logger(JSON.stringify(result), "debug");
	//   return result.property;
	// }

	// public async readProperties(): Promise<DriverState[]> {
	//   var result = await this.isy.sendRequest(`nodes/${this.address}/status`);
	//   this.logger(JSON.stringify(result), "debug");
	//   return result.property;
	// }

	// public async updateProperty(propertyName: Driver.Literal, value: string): Promise<any> {
	//   const val = this.convertTo(Number(value), Number(this.uom[propertyName]));
	//   this.logger(`Updating property ${Controls[propertyName].label}. incoming value: ${value} outgoing value: ${val}`);
	//   this.pending[propertyName] = value;
	//   return this.isy.sendRequest(`nodes/${this.address}/set/${propertyName}/${val}`).then((p) => {
	//     this.local[propertyName] = value;
	//     this.pending[propertyName] = null;
	//   });
	// }

	// public override handlePropertyChange(driver: any, value: any, formattedValue: string) {
	//   let changed = false;
	//   const priorVal = this.local[driver];
	//   try {
	//     const val = this.convertFrom(value, this.uom[driver]);

	//     if (this.local[driver] !== val) {
	//       this.logger(`Property ${Controls[driver].label} (${driver}) updated to: ${val} (${formattedValue})`);
	//       this.local[driver] = val;
	//       this.formatted[driver] = formattedValue;
	//       this.lastChanged = new Date();
	//       changed = true;
	//     } else {
	//       this.logger(`Update event triggered, property ${Controls[driver].label} (${driver}) is unchanged.`);
	//     }
	//     if (changed) {
	//       this.emit("PropertyChanged", driver, val, priorVal, formattedValue);

	//       this.scenes.forEach((element) => {
	//         this.logger(`Recalulating ${element.deviceFriendlyName}`);
	//         element.recalculateState();
	//       });
	//     }
	//   } catch (error) {
	//     this.logger(error, "error");
	//   } finally {
	//     return changed;
	//   }
	// }
}

export namespace ISYDeviceNode {
	export type Any = ISYDeviceNode<any, any, any, any>;
}
