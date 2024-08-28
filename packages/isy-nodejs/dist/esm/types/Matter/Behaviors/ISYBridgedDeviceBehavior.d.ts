/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */ import { Behavior } from "@project-chip/matter.js/behavior";
import { Observable, EventEmitter } from "@project-chip/matter.js/util";
import { type ISYNode } from "../../ISY.js";
import { DeviceToClusterMap, type ClusterMapping } from '../../Model/ClusterMap.js';
export declare class ISYBridgedDeviceBehavior extends Behavior {
    static readonly id = "isyNode";
    static readonly early = true;
    internal: ISYBridgedDeviceBehavior.Internal;
    state: ISYBridgedDeviceBehavior.State;
    events: ISYBridgedDeviceBehavior.Events;
    initialize(_options?: {}): Promise<void>;
    get device(): ISYNode<any, any, any, any>;
    get map(): {
        deviceType: any;
        mapping: import("../../Model/ClusterMap.js").EndpointMapping<any, ISYNode<any, any, any, any>>;
    };
    mapForBehavior<B extends {
        cluster: unknown;
    }>(behavior: B): ClusterMapping<B["cluster"], typeof this.internal.device>;
    handlePropertyChange(driver: string, newValue: any, oldValue: any, formattedValue: string): void;
    [Symbol.asyncDispose](): import("@project-chip/matter.js/util").MaybePromise;
}
export declare namespace ISYBridgedDeviceBehavior {
    class Internal {
        device?: ISYNode<any, any, any, any>;
        map?: DeviceToClusterMap<typeof this.device, any>;
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
//# sourceMappingURL=ISYBridgedDeviceBehavior.d.ts.map