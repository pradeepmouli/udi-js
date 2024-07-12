"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ISYBridgedDeviceBehavior = void 0;
/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */ const behavior_1 = require("@project-chip/matter.js/behavior");
const util_1 = require("@project-chip/matter.js/util");
const ISY_js_1 = require("../../ISY.js");
class ISYBridgedDeviceBehavior extends behavior_1.Behavior {
    static id = "isydevice";
    static early = true;
    async initialize(_options) {
        await super.initialize(_options);
        var address = this.state.address;
        this.internal.device = ISY_js_1.ISY.instance.getDevice(this.state.address);
        ISY_js_1.ISY.instance.logger.debug(`Initializing ${this.constructor.name} for ${this.internal.device.constructor.name} ${this.internal.device.name} with address ${address}`);
        if (this.internal.device) {
            this.internal.device.on("PropertyChanged", this.handlePropertyChange.bind(this));
        }
    }
    get device() {
        return (this.internal.device = this.internal.device ?? ISY_js_1.ISY.instance.getDevice(this.state.address));
    }
    handlePropertyChange(driver, newValue, oldValue, formattedValue) {
        this.events.propertyChanged.emit({ driver, newValue, oldValue, formattedValue });
    }
    [Symbol.asyncDispose]() {
        this.internal.device = null;
        return super[Symbol.asyncDispose]();
    }
}
exports.ISYBridgedDeviceBehavior = ISYBridgedDeviceBehavior;
(function (ISYBridgedDeviceBehavior) {
    class Internal {
        device;
    }
    ISYBridgedDeviceBehavior.Internal = Internal;
    class Events extends util_1.EventEmitter {
        propertyChanged = (0, util_1.Observable)();
    }
    ISYBridgedDeviceBehavior.Events = Events;
    class State {
        address = "";
    }
    ISYBridgedDeviceBehavior.State = State;
})(ISYBridgedDeviceBehavior || (exports.ISYBridgedDeviceBehavior = ISYBridgedDeviceBehavior = {}));
