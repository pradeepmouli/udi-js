/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */ import { Behavior } from "@project-chip/matter.js/behavior";
import { Observable, EventEmitter } from "@project-chip/matter.js/util";
import { ISY } from "../../ISY.js";
export class ISYBridgedDeviceBehavior extends Behavior {
    static id = "isyDevice";
    static early = true;
    async initialize(_options) {
        await super.initialize(_options);
        var address = this.state.address;
        this.internal.device = ISY.instance.getDevice(this.state.address);
        ISY.instance.logger.debug(`Initializing ${this.constructor.name} for ${this.internal.device.constructor.name} ${this.internal.device.name} with address ${address}`);
        if (this.internal.device) {
            this.internal.device.on("PropertyChanged", this.handlePropertyChange.bind(this));
        }
    }
    get device() {
        return (this.internal.device = this.internal.device ?? ISY.instance.getDevice(this.state.address));
    }
    handlePropertyChange(driver, newValue, oldValue, formattedValue) {
        this.events.propertyChanged.emit({ driver, newValue, oldValue, formattedValue });
    }
    [Symbol.asyncDispose]() {
        this.internal.device = null;
        return super[Symbol.asyncDispose]();
    }
}
(function (ISYBridgedDeviceBehavior) {
    class Internal {
        device;
    }
    ISYBridgedDeviceBehavior.Internal = Internal;
    class Events extends EventEmitter {
        propertyChanged = Observable();
    }
    ISYBridgedDeviceBehavior.Events = Events;
    class State {
        address = "";
    }
    ISYBridgedDeviceBehavior.State = State;
})(ISYBridgedDeviceBehavior || (ISYBridgedDeviceBehavior = {}));
