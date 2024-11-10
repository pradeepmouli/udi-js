/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */ import { Behavior } from '@project-chip/matter.js/behavior';
import { ClusterBehavior } from '@project-chip/matter.js/behavior/cluster';
import { EventEmitter, Observable } from '@project-chip/matter.js/util';
import type { Driver } from '../../Definitions/Global/Drivers.js';
import { type ISYNode } from '../../ISY.js';
import { DeviceToClusterMap, type BehaviorMapping } from '../../Model/ClusterMap.js';
export declare class ISYBridgedDeviceBehavior<N extends ISYNode<any, D, any, any>, D extends ISYNode.DriverSignatures = ISYNode.DriverSignatures> extends Behavior {
    static readonly id = "isyNode";
    static readonly early = true;
    internal: ISYBridgedDeviceBehavior.Internal;
    state: ISYBridgedDeviceBehavior.State;
    events: ISYBridgedDeviceBehavior.Events & ISYBridgedDeviceBehavior.EventsFor<N["drivers"]>;
    initialize(_options?: {}): Promise<void>;
    get device(): ISYNode<any, any, any, any>;
    get map(): {
        deviceType: any;
        mapping: import("../../Model/ClusterMap.js").EndpointMapping<any, ISYNode<any, any, any, any>>;
    };
    mapForBehavior<B extends ClusterBehavior>(behavior: B): BehaviorMapping<B, typeof this.internal.device>;
    handlePropertyChange(driver: string, newValue: any, oldValue: any, formattedValue: string): void;
    [Symbol.asyncDispose](): import("@project-chip/matter.js/util").MaybePromise;
}
export declare namespace ISYBridgedDeviceBehavior {
    class Internal {
        device?: ISYNode<any, any, any, any>;
        map?: DeviceToClusterMap<typeof this.device, any>;
    }
    type EventsFor<D extends {
        [x: string]: Driver<any, any, any>;
    }> = {
        [s in keyof D as `${D[s]["name"]}Changed`]: Observable<[{
            driver: s;
            newValue: any;
            oldValue: any;
            formattedValue: string;
        }]>;
    };
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