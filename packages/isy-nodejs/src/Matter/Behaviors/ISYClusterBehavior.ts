import type { Behavior } from '@project-chip/matter.js/behavior';
import type { ClusterBehavior, ClusterInterface } from '@project-chip/matter.js/behavior/cluster';
import { BridgedDeviceBasicInformationServer } from '@project-chip/matter.js/behaviors/bridged-device-basic-information';
import type { LevelControlBehavior } from '@project-chip/matter.js/behaviors/level-control';
import type { OnOffBehavior, OnOffServer } from '@project-chip/matter.js/behaviors/on-off';
import type { Cluster, ClusterServerHandlers, ClusterType as CT } from '@project-chip/matter.js/cluster';
import '@project-chip/matter.js/device';
import { OnOffLightRequirements } from '@project-chip/matter.js/devices/OnOffLightDevice';
import { Converter } from '../../Converters.js';
import { Driver, DriverType } from '../../Definitions/Global/Drivers.js';
import type { Constructor } from '../../Devices/Constructor.js';
import type { RelaxTypes } from '../../Devices/MapsTo.js';
import { ISY, type ISYDevice } from '../../ISY.js';
import type { DriversOf, ISYNode } from '../../ISYNode.js';
import { BehaviorMapping, MappingRegistry, type ClusterMapping, type DeviceToClusterMap } from '../../Model/ClusterMap.js';
import { ISYBridgedDeviceBehavior } from './ISYBridgedDeviceBehavior.js';

// #region Type aliases (6)

export type ClusterForBehavior<B> = B extends ClusterBehavior.Type<infer C, infer D, infer E> ? C : never;
export type ConstructedType<B extends Constructor<any>> = B extends Constructor<infer C> ? C : never;
// <reference path="MatterDevice.js" />
// @ts-ignore
export type DeviceBehavior<P extends ISYNode, T extends { cluster? }> = {
	device: P;

	bridgedDeviceBehavior: ISYBridgedDeviceBehavior<P>;

	//ts-ignore
	map: BehaviorMapping<T, P>;

	handlePropertyChange(chg: PropertyChange<P>): void;
};
type NotUnknown<T extends ClusterBehavior> = T extends { cluster: { name: 'Unknown' } } ? never : T;
export type PropertyChange<P extends ISYNode<any, any, any, any>> = {
	driver: keyof DriversOf<P>;
	newValue: any;
	oldValue: any;
	formattedValue: string;
};
type t = ClusterForBehavior<LevelControlBehavior>;

// #endregion Type aliases (6)

// #region Functions (1)

export function ISYClusterBehavior<T extends Constructor<ClusterBehavior> & { cluster }, P extends ISYNode<any, any, any, any>>(
	base: T,
	p: Constructor<P>
): typeof base & { new (...args: any[]): DeviceBehavior<P, T> } {
	return class ISYClusterBehavior extends base implements DeviceBehavior<P, T> {
		_device: P;

		handlers: { [x in keyof DriversOf<P>]: (newValue, oldValue, formattedValue) => void } = {} as any;

		bridgedDeviceBehavior: ISYBridgedDeviceBehavior<P>;
		///public map: ClusterMapping<ToClusterTypeByName<ClusterForBehavior<ConstructedType<typeof base>>["name"]>,ISYDeviceNode<any, any, any>>;

		map: BehaviorMapping<T, P>;

		override async initialize(_options?: {}) {
			await super.initialize(_options);
			var behavior = (await this.agent.load(ISYBridgedDeviceBehavior)) as ISYBridgedDeviceBehavior<P>;
			this.bridgedDeviceBehavior = behavior;
			//var behavior = this.agent.get(ISYBridgedDeviceBehavior);
			this._device = behavior.device as P;
			//@ts-ignore
			this.map = behavior.mapForBehavior<T>(this as unknown as T);
			for (const key2 in this.map.attributes) {
				let val = this.map.attributes[key2];
				let driverObj = null;
				if (typeof val === 'string' || typeof val === 'symbol' || typeof val === 'number') {
					driverObj = this._device.drivers[val];
					this.handlers[val] = (newValue, oldValue, formattedValue) => {
						this.state[key2 as string] = newValue;
					};
				} else if (val.driver as DriversOf<P>) {
					driverObj = this._device.drivers[val.driver as string];

					let { driver, converter } = val;
					const convFunc = Converter.get(converter)?.from;
					this.handlers[driver] = (newValue, oldValue, formattedValue) => {
						if (convFunc) this.state[key2 as string] = convFunc(newValue);
						else this.state[key2 as string] = newValue;
					};
				}
				if (driverObj) {
					let evt = `${driverObj.name}Changed`;
					this.reactTo(behavior.events[evt], this.handlePropertyChange.bind(this), { lock: false });
				}
			}

			//this.reactTo(behavior.events.propertyChanged, this.handlePropertyChange, { lock: false });

			//this._device.on("PropertyChanged", this.handlePropertyChange.bind(this));
		}

		get device(): P {
			return (this._device = this._device ?? (this.agent.get(ISYBridgedDeviceBehavior).device as P));
		}

		handlePropertyChange({ driver, newValue, oldValue, formattedValue }: PropertyChange<P>) {
			// for (const key2 in this.map.attributes) {

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
}

// #endregion Functions (1)
