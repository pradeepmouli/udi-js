import type { ClusterBehavior, ClusterInterface } from '@project-chip/matter.js/behavior/cluster';

import type { DriversOf, ISYNode } from '../../ISYNode.js';

import type { Behavior } from '@project-chip/matter.js/behavior';
import { BridgedDeviceBasicInformationServer } from '@project-chip/matter.js/behaviors/bridged-device-basic-information';
import type { LevelControlBehavior } from '@project-chip/matter.js/behaviors/level-control';
import type { OnOffBehavior, OnOffServer } from '@project-chip/matter.js/behaviors/on-off';
import type { Cluster, ClusterServerHandlers, ClusterType as CT } from '@project-chip/matter.js/cluster';
import '@project-chip/matter.js/device';
import { OnOffLightRequirements } from '@project-chip/matter.js/devices/OnOffLightDevice';
import { DriverType } from '../../Definitions/Global/Drivers.js';
import type { Constructor } from '../../Devices/Constructor.js';
import type { RelaxTypes } from '../../Devices/MapsTo.js';
import { ISY, type ISYDevice } from '../../ISY.js';
import { MappingRegistry, type ClusterMapping, type DeviceToClusterMap } from '../../Model/ClusterMap.js';

import { ISYBridgedDeviceBehavior } from './ISYBridgedDeviceBehavior.js';

type NotUnknown<T extends ClusterBehavior> = T extends { cluster: { name: 'Unknown' } } ? never : T;

export type ConstructedType<B extends Constructor<any>> = B extends Constructor<infer C> ? C : never;

export type ClusterForBehavior<B> = B extends ClusterBehavior.Type<infer C, infer D, infer E> ? C : never;

type t = ClusterForBehavior<LevelControlBehavior>;

export type PropertyChange<P extends ISYNode<any, any, any, any>> = {
	driver: keyof DriversOf<P>;
	newValue: any;
	oldValue: any;
	formattedValue: string;
};

export function ISYClusterBehavior<T extends Constructor<ClusterBehavior> & { cluster: unknown }, P extends ISYNode<any, any, any, any>>(
	base: T,
	p: Constructor<P>
): typeof base & { new (...args: any[]): DeviceBehavior<P, T> } {
	return class ISYClusterBehavior extends base implements DeviceBehavior<P, T> {
		_device: P;

		handlers: { [x in keyof DriversOf<P>]: (newValue, oldValue, formattedValue) => void } = {} as any;

		///public map: ClusterMapping<ToClusterTypeByName<ClusterForBehavior<ConstructedType<typeof base>>["name"]>,ISYDeviceNode<any, any, any>>;

		map: ClusterMapping<T['cluster'], P>;

		override async initialize(_options?: {}) {
			await super.initialize(_options);
			var behavior = await this.agent.load(ISYBridgedDeviceBehavior);
			//var behavior = this.agent.get(ISYBridgedDeviceBehavior);
			this._device = behavior.device as P;
			this.map = behavior.mapForBehavior<T>(this as unknown as T);
			for (const key2 in this.map.attributes) {
				if (typeof this.map.attributes[key2] === 'string') {
					this.handlers[this.map.attributes[key2]] = (newValue, oldValue, formattedValue) => {
						this.state[key2 as string] = newValue;
					};
				} else if (this.map.attributes[key2].driver) {
					let { driver, converter } = this.map.attributes[key2];
					this.handlers[driver] = (newValue, oldValue, formattedValue) => {
						this.state[key2 as string] = converter(newValue);
					};
				}
			}

			this.reactTo(behavior.events.propertyChanged, this.handlePropertyChange, { lock: false });

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
// <reference path="MatterDevice.js" />
// @ts-ignore

export type DeviceBehavior<P extends ISYNode, T extends { cluster }> = {
	device: P;

	map: ClusterMapping<T['cluster'], P>;

	handlePropertyChange(chg: PropertyChange<P>): void;
};
