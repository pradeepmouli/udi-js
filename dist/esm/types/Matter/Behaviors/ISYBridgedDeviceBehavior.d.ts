/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */ import { Behavior } from "@project-chip/matter.js/behavior";
import type { ISYDevice } from "../../ISYNode.js";
import { Observable, EventEmitter } from "@project-chip/matter.js/util";
import { type ClusterMapping, type DeviceToClusterMap } from '../../Model/ClusterMap.js';
export declare class ISYBridgedDeviceBehavior extends Behavior {
    static readonly id = "isyDevice";
    static readonly early = true;
    internal: ISYBridgedDeviceBehavior.Internal;
    state: ISYBridgedDeviceBehavior.State;
    events: ISYBridgedDeviceBehavior.Events;
    initialize(_options?: {}): Promise<void>;
    get device(): ISYDevice<any, any, any>;
    get map(): DeviceToClusterMap<typeof this.internal.device>;
    mapForBehavior<B extends {
        cluster: unknown;
    }>(behavior: B): ClusterMapping<B["cluster"], typeof this.internal.device>;
    handlePropertyChange(driver: string, newValue: any, oldValue: any, formattedValue: string): void;
    [Symbol.asyncDispose](): import("@project-chip/matter.js/util").MaybePromise;
}
export declare namespace ISYBridgedDeviceBehavior {
    class Internal {
        device?: ISYDevice<any, any, any>;
        map?: DeviceToClusterMap<typeof this.device>;
    }
    class Events extends EventEmitter {
        propertyChanged: Observable<[{
            driver: string;
            newValue: any;
            oldValue: any;
            formattedValue: string;
        }], void>;
    }
    class State {
        address: string;
    }
}
