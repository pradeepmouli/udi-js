import type { ClusterBehavior } from '@project-chip/matter.js/behavior/cluster';
import type { LevelControlBehavior } from '@project-chip/matter.js/behaviors/level-control';
import '@project-chip/matter.js/device';


import { hasConverter, type ClusterMapping } from '../Mappings/MappingRegistry.js';
import { ISYBridgedDeviceBehavior } from './ISYBridgedDeviceBehavior.js';
import { isYieldExpression } from 'typescript';
import type { DriversOf, ISYNode } from 'isy-nodejs/ISYNode';
import type { Constructor } from 'type-fest';
import type { ISYDeviceNode } from 'isy-nodejs/Devices/ISYDeviceNode';
import { Converter, getConstructor, type Driver, type Factory } from 'isy-nodejs/ISY';



// #region Type aliases (6)

export type ClusterForBehavior<B> = B extends ClusterBehavior.Type<infer C, infer D, infer E> ? C : never;
export type ConstructedType<B extends Constructor<any>> = B extends Constructor<infer C> ? C : never;
// <reference path="MatterDevice.js" />
// @ts-ignore
export interface DeviceBehavior<P extends ISYDeviceNode.Any, T extends { cluster? }> {
	device: P;


	bridgedDeviceBehavior: ISYBridgedDeviceBehavior<P>;

	//ts-ignore
	map: ClusterMapping<T["cluster"], P>;

	handlePropertyChange(chg: PropertyChange<P>): void;
};
type NotUnknown<T extends ClusterBehavior> = T extends { cluster: { name: 'Unknown' } } ? never : T;
export type PropertyChange<P extends ISYNode> = {
	driver: keyof DriversOf<P>;
	newValue: any;
	oldValue: any;
	formattedValue: string;
};
type t = ClusterForBehavior<LevelControlBehavior>;

// #endregion Type aliases (6)

// #region Functions (1)

export function ISYClusterBehavior<T extends Constructor<ClusterBehavior> & { cluster }, P extends ISYDeviceNode<any, any, any, any>> (
	base: T,
	p: Constructor<P> | Factory<P>
): typeof base & { new (...args: any[]): DeviceBehavior<P, T> } & {nodeClass: Constructor<P>} {
	let s = class ISYClusterBehavior extends base implements DeviceBehavior<P, T> {
		_device: P;

		static nodeClass = getConstructor(p);

		handlers: { [x in keyof ISYNode.DriversOf<P>]: (newValue, oldValue, formattedValue) => void } = {} as any;

		bridgedDeviceBehavior: ISYBridgedDeviceBehavior<P>;
		///public map: ClusterMapping<ToClusterTypeByName<ClusterForBehavior<ConstructedType<typeof base>>["name"]>,ISYDeviceNode<any, any, any>>;

		map: ClusterMapping<T["cluster"], P>;

		override async initialize(_options?: {}) {
			await super.initialize(_options);

			var behavior = (await this.agent.load(ISYBridgedDeviceBehavior)) as ISYBridgedDeviceBehavior<P>;
			this.bridgedDeviceBehavior = behavior;
			//var behavior = this.agent.get(ISYBridgedDeviceBehavior);
			this._device = behavior.device as P;
			this._device.logger(`Initializing cluster behavior: ${this.constructor.name}`);
			//@ts-ignore

			this.map = behavior.mapForBehavior<T>(this);
			for (const key2 in this.map?.attributes) {
				let val = this.map.attributes[key2];

				let driverObj = null;
				if (typeof val === 'string' || typeof val === 'symbol' || typeof val === 'number') {
					driverObj = this._device.drivers[val] as Driver<any,any>;
					this.state[key2 as string] = this._device.drivers[val].value;
					this.handlers[val] = (newValue, oldValue, formattedValue) => {
						this.state[key2 as string] = newValue;
					};
				} else if (hasConverter(val)) {
					driverObj = this._device.drivers[val.driver as string] as Driver<any,any>;

					let { driver, converter } = val;
					const convFunc = Converter.get(converter as any)?.to;
					if (!convFunc) throw new Error(`Converter ${converter} not found`);
					this.state[key2 as string] = convFunc(this._device.drivers[driver as string].value);
					this.handlers[val.driver as ISYNode.DriverKeysOf<P>] = (newValue, oldValue, formattedValue) => {
						//this.device.logger(`Handling property change for ${driver} (${key2}) with value ${newValue}`);
												//if (convFunc) this.state[key2 as string] = convFunc(newValue);
						this.state[key2 as string] = convFunc(newValue);
					};
				}
				if (driverObj) {
					let evt = `${driverObj.name}Changed`;
					(this as any).evt = this.handlers[driverObj.name];
					this.reactTo(behavior.events[evt], this.handlePropertyChange, { lock: false });
				}
			}

			//this.reactTo(behavior.events.propertyChanged, this.handlePropertyChange, { lock: false });

			//this._device.on("PropertyChanged", this.handlePropertyChange.bind(this));
		}

		get device(): P {
			return (this._device = this._device ?? (this.agent.get(ISYBridgedDeviceBehavior).device as P));
		}



		async handlePropertyChange({ driver, newValue, oldValue, formattedValue }: PropertyChange<P>) {
			// for (const key2 in this.map.attributes) {
			//await this.initialize();
			this.device.logger(`${this.constructor.name}: handling property change for ${String(driver)} with value ${newValue}`);
			if (this.handlers[driver]) {
				this.handlers[driver](newValue, oldValue, formattedValue);
			}
			//   if (typeof this.map.attributes[key2] === "string") {
			//     if(this.map.attributes[key2] == driver)
			//     {
			//         this.state[key2 as string] = newValue;
			//         return;

			//   } }else if (this.map.attributes[key2].driver == driver) {
			//     if (this.map.attributes[key2]?.driver == driver) {
			//       this.state[key2 as string] = this.map.attributes[key2].converter(newValue);

			//     }
			//   }
			// }
		}
	};
	s.nodeClass = getConstructor(p);
	return s;
}

// #endregion Functions (1)
