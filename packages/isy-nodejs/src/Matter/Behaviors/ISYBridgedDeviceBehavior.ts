/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */ import { Behavior } from "@project-chip/matter.js/behavior";
import type { StateType } from "@project-chip/matter.js/behavior/state";
import { Internal } from "@project-chip/matter.js/behavior/state/managed";
import internal from "stream";
import type { ISYDevice } from '../../ISYDevice.js';
import { Observable, EventEmitter } from "@project-chip/matter.js/util";
import { ISY, type Family } from "../../ISY.js";
import { ClusterBehavior } from '@project-chip/matter.js/behavior/cluster';
import { MappingRegistry, DeviceToClusterMap, type ClusterMapping } from '../../Model/ClusterMap.js';
import type { ClusterType,  ToClusterType, ToClusterTypeByName } from '../../Model/clusterEnum.js';
import type { Driver } from '../../Definitions/Global/Drivers.js';


type ClusterForBehavior<B extends ClusterBehavior> = B extends ClusterBehavior.Type<infer C> ? C : never;
export class ISYBridgedDeviceBehavior extends Behavior {
  static override readonly id = "isyDevice";

  static override readonly early = true;

  declare internal: ISYBridgedDeviceBehavior.Internal;
  declare state: ISYBridgedDeviceBehavior.State;

  declare events: ISYBridgedDeviceBehavior.Events;

  override async initialize(_options?: {}) {
    await super.initialize(_options);
    var address = this.state.address;
    this.internal.device = ISY.instance.getDevice(this.state.address);
    this.internal.map = MappingRegistry.getMapping(this.internal.device);
    ISY.instance.logger.debug(
      `Initializing ${this.constructor.name} for ${this.internal.device.constructor.name} ${this.internal.device.name} with address ${address}`
    );
    if (this.internal.device) {
      this.internal.device.on("PropertyChanged", this.handlePropertyChange.bind(this));
    }
  }

  get device(): ISYDevice<any,any,any> {
    return (this.internal.device = this.internal.device ?? ISY.instance.getDevice(this.state.address));
  }

  get map(){

    return this.internal.map;
  }

  mapForBehavior<B extends {cluster: unknown} >(behavior: B): ClusterMapping<B["cluster"],typeof this.internal.device>
  {

    return this.map[behavior.cluster["name"]];
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
    device?: ISYDevice<any,any,any>;
    map? : DeviceToClusterMap<typeof this.device,any>
  }

  export class Events extends EventEmitter {
    propertyChanged = Observable<[{ driver: string; newValue: any; oldValue: any; formattedValue: string }]>();
  }

  export class State {
    address = "";
  }
}
