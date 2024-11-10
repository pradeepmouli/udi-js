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
const ClusterMap_js_1 = require("../../Model/ClusterMap.js");
class ISYBridgedDeviceBehavior extends behavior_1.Behavior {
    static id = 'isyNode';
    static early = true;
    async initialize(_options) {
        await super.initialize(_options);
        var address = this.state.address;
        const d = ISY_js_1.ISY.instance.nodeMap.get(this.state.address);
        this.internal.device = d;
        this.internal.map = ClusterMap_js_1.MappingRegistry.getMapping(this.internal.device);
        ISY_js_1.ISY.instance.logger.debug(`Initializing ${this.constructor.name} for ${this.internal.device.constructor.name} ${this.internal.device.name} with address ${address}`);
        if (d) {
            d.events.on('PropertyChanged', this.handlePropertyChange.bind(this));
            for (const f in d.drivers) {
                let evt = `${d.drivers[f].name}Changed`;
                this.events[evt] = (0, util_1.Observable)();
                //@ts-ignore
                d.events.on(evt, (driver, newValue, oldValue, formattedValue) => this.events.emit(evt, { driver, newValue, oldValue, formattedValue }));
            }
        }
    }
    get device() {
        return (this.internal.device = this.internal.device ?? ISY_js_1.ISY.instance.getNode(this.state.address));
    }
    get map() {
        return this.internal.map;
    }
    mapForBehavior(behavior) {
        return this.map.mapping[behavior.cluster['name']];
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
        map;
    }
    ISYBridgedDeviceBehavior.Internal = Internal;
    class Events extends util_1.EventEmitter {
        propertyChanged = (0, util_1.Observable)();
    }
    ISYBridgedDeviceBehavior.Events = Events;
    class State {
        address = '';
    }
    ISYBridgedDeviceBehavior.State = State;
})(ISYBridgedDeviceBehavior || (exports.ISYBridgedDeviceBehavior = ISYBridgedDeviceBehavior = {}));
//# sourceMappingURL=ISYBridgedDeviceBehavior.js.map