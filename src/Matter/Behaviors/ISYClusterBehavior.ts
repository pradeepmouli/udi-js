import type { ClusterBehavior } from "@project-chip/matter.js/behavior/cluster";

import type { ISYDeviceNode } from "../../ISYNode.js";

import { BridgedDeviceBasicInformationServer } from "@project-chip/matter.js/behaviors/bridged-device-basic-information";

import type { Constructor } from '../../Devices/Constructor.js';
import { ISY } from '../../ISY.js';


export function ISYClusterBehavior<T extends Constructor<ClusterBehavior>, P extends ISYDeviceNode<any, string, string>>(base: T, p: Constructor<P>) {


  return class extends base implements DeviceBehavior<P>, AsyncDisposable {

    _device: P;

    override async initialize(_options?: {}) {
      await super.initialize(_options);
      var address = this.agent.get(BridgedDeviceBasicInformationServer).state.uniqueId;
      this.
        _device = ISY.instance.getDevice(address);
      ISY.instance.logger.debug(`Initializing ${this.constructor.name} for ${this._device.constructor.name} ${this._device} with address ${address}`);
      if (this._device) {
        this._device.on("PropertyChanged", this.handlePropertyChange.bind(this));
        
      }

    }

    override async [Symbol.asyncDispose]() {
      this._device.removeListener('PropertyChanged', this.handlePropertyChange.bind(this));
    }


    get device(): P {
      return this._device = this._device ?? ISY.instance.getDevice(this.agent.get(BridgedDeviceBasicInformationServer).state.uniqueId);
    }

    handlePropertyChange(propertyName: string, value: any, newValue: any, formattedValue: string) {
    }
  } as T & Constructor<DeviceBehavior<P>>;
}//@ts-ignore
// <reference path="MatterDevice.js" />
// @ts-ignore

export interface DeviceBehavior<P> {
  device: P;
  handlePropertyChange(propertyName: string, value: any, newValue: any, formattedValue: string): void;
}
