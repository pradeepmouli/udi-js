/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */ import { Behavior } from '@project-chip/matter.js/behavior';
import { ClusterBehavior } from '@project-chip/matter.js/behavior/cluster';
import type { StateType } from '@project-chip/matter.js/behavior/state';
import { Internal } from '@project-chip/matter.js/behavior/state/managed';
import { EventEmitter, Observable } from '@project-chip/matter.js/util';
import internal from 'stream';
import type { Driver } from '../../Definitions/Global/Drivers.js';
import { ISY } from '../../ISY.js';
import type { ISYDevice } from '../../ISYDevice.js';
import { DeviceToClusterMap, MappingRegistry, type ClusterMapping, type BehaviorMapping } from '../../Model/ClusterMap.js';
import { server } from 'typescript';
import type { ISYNode } from '../../ISYNode.js';
import type { Family } from '../../Definitions/index.js';


type ClusterForBehavior<B extends ClusterBehavior> = B extends ClusterBehavior.Type<infer C> ? C : never;
export class ISYBridgedDeviceBehavior<N extends ISYNode<any, D, any, any>, D extends ISYNode.DriverSignatures = ISYNode.DriverSignatures> extends Behavior {
	static override readonly id = 'isyNode';

	static override readonly early = true;

	declare internal: ISYBridgedDeviceBehavior.Internal;
	declare state: ISYBridgedDeviceBehavior.State;

	declare events: ISYBridgedDeviceBehavior.Events & ISYBridgedDeviceBehavior.EventsFor<N["drivers"]>;

	override async initialize(_options?: {}) {
		await super.initialize(_options);
		var address = this.state.address;
		const d = ISY.instance.nodeMap.get(this.state.address);
		this.internal.device = d;
		this.internal.map = MappingRegistry.getMapping(this.internal.device as unknown as ISYNode<Family, any, any, any>);

		ISY.instance.logger.debug(`Initializing ${this.constructor.name} for ${this.internal.device.constructor.name} ${this.internal.device.name} with address ${address}`);
		if (d) {
			d.events.on('propertyChanged', this.handlePropertyChange.bind(this));

			for(const f in d.drivers)
			{
				let evt = `${d.drivers[f].name}Changed`;
				const obs = Observable<[{ driver: string; newValue: any; oldValue: any; formattedValue: string }]>();

				d.events.on(evt, (driver: string, newValue: any, oldValue: any, formattedValue: string) => obs.emit({ driver, newValue, oldValue, formattedValue }));
				this.events[evt] = obs;


				//@ts-ignore
				//d.events.on(evt, (driver: string, newValue: any, oldValue: any, formattedValue: string) => this.events.emit(evt, { driver, newValue, oldValue, formattedValue } as unknown as any));

			}
		}
	}

	get device(): ISYNode<any, any, any, any> {
		return (this.internal.device = this.internal.device ?? ISY.instance.getNode(this.state.address));
	}

	get map() {
		return this.internal.map;
	}

	mapForBehavior<B extends ClusterBehavior>(behavior: B): BehaviorMapping<B, typeof this.internal.device> {
		return this.map.mapping[behavior.cluster['name']];
	}

	handlePropertyChange(driver: string, newValue: any, oldValue: any, formattedValue: string) {

		this.events.propertyChanged.emit({ driver, newValue, oldValue, formattedValue });


	}

	override [Symbol.asyncDispose]() {

		this.internal.device = null;


		return super[Symbol.asyncDispose]();
	}
}

export namespace ISYBridgedDeviceBehavior {
	export class Internal {
		device?: ISYNode<any, any, any, any>;
		map?: DeviceToClusterMap<typeof this.device, any>;
	}

	export type EventsFor<D extends {[x: string]: Driver<any,any,any>}> = {
		[s in keyof D as `${D[s]["name"]}Changed`] : Observable<[{ driver: s; newValue: any; oldValue: any; formattedValue: string }]>;
	}




	export class Events extends EventEmitter{
		propertyChanged = Observable<[{ driver: string; newValue: any; oldValue: any; formattedValue: string }]>();



	}

	export class State {
		address = '';
	}
}
