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
import { ISY, type Family, type ISYNode } from '../../ISY.js';
import type { ISYDevice } from '../../ISYDevice.js';
import { DeviceToClusterMap, MappingRegistry, type ClusterMapping } from '../../Model/ClusterMap.js';


type ClusterForBehavior<B extends ClusterBehavior> = B extends ClusterBehavior.Type<infer C> ? C : never;
export class ISYBridgedDeviceBehavior extends Behavior {
	static override readonly id = 'isyNode';

	static override readonly early = true;

	declare internal: ISYBridgedDeviceBehavior.Internal;
	declare state: ISYBridgedDeviceBehavior.State;

	declare events: ISYBridgedDeviceBehavior.Events;

	override async initialize(_options?: {}) {
		await super.initialize(_options);
		var address = this.state.address;
		this.internal.device = ISY.instance.nodeMap.get(this.state.address);
		this.internal.map = MappingRegistry.getMapping(this.internal.device as unknown as ISYDevice<Family, any, any, any>);
		ISY.instance.logger.debug(`Initializing ${this.constructor.name} for ${this.internal.device.constructor.name} ${this.internal.device.name} with address ${address}`);
		if (this.internal.device) {
			this.internal.device.events.on('PropertyChanged', this.handlePropertyChange.bind(this));
		}
	}

	get device(): ISYNode<any, any, any, any> {
		return (this.internal.device = this.internal.device ?? ISY.instance.getNode(this.state.address));
	}

	get map() {
		return this.internal.map;
	}

	mapForBehavior<B extends { cluster: unknown }>(behavior: B): ClusterMapping<B['cluster'], typeof this.internal.device> {
		return this.map[behavior.cluster['name']];
	}

	handlePropertyChange(driver: string, newValue: any, oldValue: any, formattedValue: string) {
		this.events.propertyChanged.emit({ driver, newValue, oldValue, formattedValue });
	}

	[Symbol.asyncDispose]() {
		this.internal.device = null;
		return super[Symbol.asyncDispose]();
	}
}

export namespace ISYBridgedDeviceBehavior {
	export class Internal {
		device?: ISYNode<any, any, any, any>;
		map?: DeviceToClusterMap<typeof this.device, any>;
	}

	export class Events extends EventEmitter {
		propertyChanged = Observable<[{ driver: string; newValue: any; oldValue: any; formattedValue: string }]>();
	}

	export class State {
		address = '';
	}
}
