/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */ import { Behavior } from "@project-chip/matter.js/behavior";
import type { StateType } from "@project-chip/matter.js/behavior/state";
import { Internal } from "@project-chip/matter.js/behavior/state/managed";
import internal from "stream";
import type { ISYDeviceNode } from "../../ISYNode.js";
import { Observable, EventEmitter } from "@project-chip/matter.js/util";
import { ISY } from "../../ISY.js";

export class ISYBridgedDeviceBehavior extends Behavior {
  static override readonly id = "isydevice";

  static override readonly early = true;

  declare internal: ISYBridgedDeviceBehavior.Internal;
  declare state: ISYBridgedDeviceBehavior.State;

  declare events: ISYBridgedDeviceBehavior.Events;

  override async initialize(_options?: {}) {
    await super.initialize(_options);
    var address = this.state.address;
    this.internal.device = ISY.instance.getDevice(this.state.address);
    ISY.instance.logger.debug(
      `Initializing ${this.constructor.name} for ${this.internal.device.constructor.name} ${this.internal.device.name} with address ${address}`
    );
    if (this.internal.device) {
      this.internal.device.on("PropertyChanged", this.handlePropertyChange.bind(this));
    }
  }

  get device(): ISYDeviceNode<any, any, any> {
    return (this.internal.device = this.internal.device ?? ISY.instance.getDevice(this.state.address));
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
    device?: ISYDeviceNode<any, any, any>;
  }

  export class Events extends EventEmitter {
    propertyChanged = Observable<[{ driver: string; newValue: any; oldValue: any; formattedValue: string }]>();
  }

  export class State {
    address = "";
  }
}
