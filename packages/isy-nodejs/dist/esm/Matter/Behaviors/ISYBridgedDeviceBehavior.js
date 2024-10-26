/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */ import { Behavior } from '@project-chip/matter.js/behavior';
import { EventEmitter, Observable } from '@project-chip/matter.js/util';
import { ISY } from '../../ISY.js';
import { MappingRegistry } from '../../Model/ClusterMap.js';
export class ISYBridgedDeviceBehavior extends Behavior {
    static id = 'isyNode';
    static early = true;
    async initialize(_options) {
        await super.initialize(_options);
        var address = this.state.address;
        this.internal.device = ISY.instance.nodeMap.get(this.state.address);
        this.internal.map = MappingRegistry.getMapping(this.internal.device);
        ISY.instance.logger.debug(`Initializing ${this.constructor.name} for ${this.internal.device.constructor.name} ${this.internal.device.name} with address ${address}`);
        if (this.internal.device) {
            this.internal.device.events.on('PropertyChanged', this.handlePropertyChange.bind(this));
        }
    }
    get device() {
        return (this.internal.device = this.internal.device ?? ISY.instance.getNode(this.state.address));
    }
    get map() {
        return this.internal.map;
    }
    mapForBehavior(behavior) {
        return this.map[behavior.cluster['name']];
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
        map;
    }
    ISYBridgedDeviceBehavior.Internal = Internal;
    class Events extends EventEmitter {
        propertyChanged = Observable();
    }
    ISYBridgedDeviceBehavior.Events = Events;
    class State {
        address = '';
    }
    ISYBridgedDeviceBehavior.State = State;
})(ISYBridgedDeviceBehavior || (ISYBridgedDeviceBehavior = {}));
//# sourceMappingURL=ISYBridgedDeviceBehavior.js.map