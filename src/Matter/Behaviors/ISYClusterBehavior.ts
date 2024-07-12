import type { ClusterBehavior } from "@project-chip/matter.js/behavior/cluster";

import type { ISYDeviceNode } from "../../ISYNode.js";

import { BridgedDeviceBasicInformationServer } from "@project-chip/matter.js/behaviors/bridged-device-basic-information";

import type { Constructor } from '../../Devices/Constructor.js';
import { ISY } from '../../ISY.js';
import { ISYBridgedDeviceBehavior } from './ISYBridgedDeviceBehavior.js';


export function ISYClusterBehavior<T extends Constructor<ClusterBehavior>, P extends ISYDeviceNode<any, string, string>>(base: T, p: Constructor<P>) {


  return class extends base implements DeviceBehavior<P>, AsyncDisposable {

    _device: P;

    override async initialize(_options?: {}) {
      await super.initialize(_options);
      if(this.agent.load(ISYBridgedDeviceBehavior)) {
        var behavior = this.agent.get(ISYBridgedDeviceBehavior);
        this._device = behavior.device as P;
        this.reactTo(behavior.events.propertyChanged, this.handlePropertyChange)
        //this._device.on("PropertyChanged", this.handlePropertyChange.bind(this));
      }
    }

    override async [Symbol.asyncDispose]() {
      //this._device.removeListener('PropertyChanged', this.handlePropertyChange.bind(this));
    }


    get device(): P {
      return this._device = this._device ?? this.agent.get(ISYBridgedDeviceBehavior).device as P;
    }

    handlePropertyChange({driver,newValue,oldValue,formattedValue}) {
    }
  } as T & Constructor<DeviceBehavior<P>>;
}//@ts-ignore
// <reference path="MatterDevice.js" />
// @ts-ignore

export interface DeviceBehavior<P> {
  device: P;
  handlePropertyChange({driver, newValue, oldValue, formattedValue}): void;
}
