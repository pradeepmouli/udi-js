import { isNullOrUndefined } from 'util';
import { Family } from '../Families.js';
import { Controls, ISY } from '../ISY.js';
import { Commands, States } from '../ISYConstants.js';
import { ISYNode } from '../ISYNode.js';
import { ISYScene } from '../ISYScene.js';
import { UnitOfMeasure } from '../UOM.js';
import { EndpointType, MutableEndpoint } from '@project-chip/matter.js/endpoint/type';
import { Endpoint } from '@project-chip/matter.js/endpoint';
import { BridgedDeviceBasicInformationServer } from '@project-chip/matter.js/behaviors/bridged-device-basic-information';
import { SupportedBehaviors } from '@project-chip/matter.js/endpoint/properties';
import { ClusterBehavior } from '@project-chip/matter.js/behavior/cluster';
import 'winston'

export interface PropertyStatus {
	id: string | number;
	value: any;
	formatted: any;
	uom: UnitOfMeasure;

	prec: number;
	name: string;
}

export interface NodeInfo {
	family: Family;
	type?: string;
	enabled: any;
	deviceClass?: any;
	pnode: any;
	property?: PropertyStatus[] | PropertyStatus;
	flag?: any;
	nodeDefId?: string;
	address: any;
	name: string;
	parent?: any;
	startDelay: number;
	hint: string;

	endDelay: number;
	wattage: number;
	dcPeriod: number;
}



export class ISYDevice<T extends Family, Drivers extends string = string, Commands extends string = string> extends ISYNode {
	declare public family: T;

	public readonly typeCode: string;
	public readonly deviceClass: any;
	public readonly parentAddress: any;
	public readonly category: number;
	public readonly subCategory: number;
	public readonly type: any;
	public _parentDevice: ISYDevice<T>;
	public readonly children: Array<ISYDevice<T>> = [];
	public readonly scenes: ISYScene[] = [];
	public readonly formatted: any[Drivers] = {};
	public readonly uom: any[Drivers] = {};
	public readonly pending: any[Drivers] = {};
	public readonly local: any[Drivers] = {};
	public hidden: boolean = false;

	public _enabled: any;
	productName: string;
	model: string;
	modelNumber: string;
	version: string;
	isDimmable: boolean;

	constructor(isy: ISY, node: NodeInfo) {
		super(isy, node);

		this.family = node.family as T;
		this.nodeType = 1;
		this.type = node.type;
		this._enabled = node.enabled;
		this.deviceClass = node.deviceClass;
		this.parentAddress = node.pnode;
		const s = this.type.split('.');
		this.category = Number(s[0]);
		this.subCategory = Number(s[1]);

		// console.log(nodeDetail);
		if (
			this.parentAddress !== this.address &&
			this.parentAddress !== undefined
		) {
			this._parentDevice = isy.getDevice(this.parentAddress);
			if (!isNullOrUndefined(this._parentDevice)) {
				this._parentDevice.addChild(this);
			}

		}
		if (Array.isArray(node.property)) {
			for (const prop of node.property) {
				this.local[prop.id] = this.convertFrom(prop.value, prop.uom);
				this.formatted[prop.id] = prop.formatted;
				this.uom[prop.id] = prop.uom;
				this.logger(
					`Property ${Controls[prop.id].label} (${prop.id}) initialized to: ${
					this.local[prop.id]
					} (${this.formatted[prop.id]})`
				);
			}
		} else if (node.property) {
			this.local[node.property.id] = this.convertFrom(
				node.property.value,
				node.property.uom
			);
			this.formatted[node.property.id] = node.property.formatted;
			this.uom[node.property.id] = node.property.uom;
			this.logger(
				`Property ${Controls[node.property.id].label} (${
				node.property.id
				}) initialized to: ${this.local[node.property.id]} (${
				this.formatted[node.property.id]
				})`
			);
		}

	}

	public convertTo(value: any, UnitOfMeasure: number): any {
		return value;
	}

	public convertFrom(value: any, UnitOfMeasure: number): any {
		return value;
	}

	public addLink(isyScene: ISYScene) {
		this.scenes.push(isyScene);
	}

	public addChild(childDevice: ISYDevice<T>) {
		this.children.push(childDevice);
	}

	get parentDevice(): ISYDevice<T> {
		if (this._parentDevice === undefined) {
			if (
				this.parentAddress !== this.address &&
				this.parentAddress !== null &&
				this.parentAddress !== undefined
			) {
				this._parentDevice = this.isy.getDevice(this.parentAddress);
				if (this._parentDevice !== null) {
					this._parentDevice.addChild(this);
				}
			}
			this._parentDevice = null;
		}
		return this._parentDevice;
	}



	public async readProperty(propertyName: Drivers): Promise<PropertyStatus> {
		return (await this.isy.callISY(`nodes/${this.address}/${propertyName}`)).node.property;
	}

	public async readProperties(): Promise<PropertyStatus[]> {
		return (await this.isy.callISY(`nodes/${this.address}/status`)).node.property;
	}

	public async updateProperty(propertyName: string, value: string): Promise<any> {
		const val = this.convertTo(Number(value), Number(this.uom[propertyName]));
		this.logger(
			`Updating property ${Controls[propertyName].label}. incoming value: ${value} outgoing value: ${val}`
		);
		this.pending[propertyName] = value;
		return this.isy
			.callISY(`nodes/${this.address}/set/${propertyName}/${val}`)
			.then((p) => {
				this.local[propertyName] = value;
				this.pending[propertyName] = null;
			});
	}



	public async sendCommand(command: string, parameters?: (Record<string|symbol,string|number>|string|number)): Promise<any> {
		return this.isy.sendNodeCommand(this, command, parameters);
	}

	public async refresh(): Promise<any> {
		const device = this;
		const node = (await this.isy.callISY(`nodes/${this.address}/status`)).node;
		// this.logger(node);

		this.parseResult(node, device);
		return await this.isy.callISY(`nodes/${this.address}/status`);
	}



	public parseResult(node: { property: PropertyStatus|PropertyStatus[]} , device: this) {
		if (Array.isArray(node.property)) {
			for (const prop of node.property) {
				this.applyStatus(device, prop);
			}
		} else if (node.property) {
			this.applyStatus(device, node.property);
			//device.local[node.property.id] = node.property.value;
			//device.formatted[node.property.id] = node.property.formatted;
			//device.uom[node.property.id] = node.property.uom;
			device.logger(
				`Property ${Controls[node.property.id].label} (${node.property.id}) refreshed to: ${device[node.property.id]} (${device.formatted[node.property.id]})`
			);
		}
	}

	public applyStatus(device: this, prop: PropertyStatus) {
		device.local[prop.id] = prop.value;
		device.formatted[prop.id] = prop.formatted;
		device.uom[prop.id] = prop.uom;
		device.logger(
			`Property ${Controls[prop.id].label} (${prop.id}) refreshed to: ${device[prop.id]} (${device.formatted[prop.id]})`
		);
	}

	public override handleControlTrigger(controlName: string) {
		return this.emit('ControlTriggered', controlName);
	}

	public override handlePropertyChange(propertyName: string, value: any, formattedValue: string) {
		let changed = false;
		const priorVal = this.local[propertyName];
		try {
			const val = this.convertFrom(
				value,
				this.uom[propertyName]
			);

			if (this.local[propertyName] !== val) {

				this.logger(
					`Property ${
					Controls[propertyName].label
					} (${propertyName}) updated to: ${val} (${formattedValue})`
				);
				this.local[propertyName] = val;
				this.formatted[propertyName] = formattedValue;
				this.lastChanged = new Date();
				changed = true;
			} else {
				this.logger(
					`Update event triggered, property ${
					Controls[propertyName].label
					} (${propertyName}) is unchanged.`
				);
			}
			if (changed) {
				this.emit('PropertyChanged', propertyName, val, priorVal, formattedValue);

				this.scenes.forEach((element) => {
					this.logger(`Recalulating ${element.name}`);
					element.recalculateState();
				});
			}
		} finally {
			return changed;
		}
	}
}

export type Constructor<T> = new (...args: any[]) => T;

export const ISYBinaryStateDevice = <K extends Family, T extends Constructor<ISYDevice<K>>>(Base: T) => {
	return class extends Base {
		get state(): Promise<boolean> {
			return this.readProperty('ST').then(p => p.value  > 0);
		}
	};
};

export const ISYUpdateableBinaryStateDevice = <K extends Family,T extends Constructor<ISYDevice<K>>>(
	Base: T
) => {
	return class extends Base {
		get state(): Promise<boolean> {
			return this.readProperty('ST').then(p => p.value  > 0);
		}


		public async updateState(state: boolean): Promise<any> {
			if (state !== await this.state || this.pending.ST > 0 !== await this.state) {
				this.pending.ST = state ? States.On : States.Off;
				return this.sendCommand(state ? Commands.On : Commands.Off).then((p) => {
					//this.local.ST = this.pending.ST;
					this.pending.ST = null;
				});
			}
			return Promise.resolve();
		}
	};
};


export interface MapsToEndpointType<T extends EndpointType>  {
	initialize(endpoint: Endpoint<T>): void;

}

type BehaviorList<T extends ClusterBehavior> = SupportedBehaviors & T;

export interface MapsToEndpoint<T extends ClusterBehavior>
{
	initialize<K extends MutableEndpoint.With<EndpointType.Empty,BehaviorList<T>>>(endpoint: Endpoint<K>): void;

}
export const MatterEndpoint = <P extends MutableEndpoint, T extends Constructor<ISYDevice<any>>>(base: T, endpointType: P) =>
{


	return class extends base
	{

		baseBehavior: P = endpointType;



		createEndpoint() {

			var p = this.baseBehavior.with(BridgedDeviceBasicInformationServer);

			return new Endpoint(this.baseBehavior.with(BridgedDeviceBasicInformationServer),{id: this.address, bridgedDeviceBasicInformation: {
                nodeLabel: this.displayName,
                productName: this.productName,
                productLabel: this.productName,
                serialNumber: `${this.address}`,
                reachable: this.enabled,
            }});



		}


	};

}

export const ISYLevelDevice = <T extends Constructor<ISYDevice<any>>>(base: T) =>
	class extends base {
		get level(): number {
			return this.local.ST;
		}
	};

// tslint:disable-next-line: variable-name

export const ISYUpdateableLevelDevice = <T extends Constructor<ISYDevice<any>>>(base: T) =>
	class extends base {
		get level(): number {
			return this.local.ST;
		}

		public async updateLevel(level: number): Promise<any> {
			if (level != this.local.ST && level !== (this.pending.ST ?? this.local.ST)) {

				this.pending.ST = level;
				if (level > 0) {
					return this.sendCommand(
						Commands.On,
						this.convertTo(level, this.uom.ST)
					).then((p) => {
						//this.local.ST = this.pending.ST; *Wait to receive propertu update from subscription
						this.pending.ST = null;
					});
				} else {
					return this.sendCommand(Commands.Off).then((p) => {
						//this.local.ST = this.pending.ST; *Wait to receive propertu update from subscription
						this.pending.ST = null;
					});
				}
			}
			return Promise.resolve();
		}
	};
