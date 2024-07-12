/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */ import { Behavior } from "@project-chip/matter.js/behavior";
import type { ISYDeviceNode } from "../../ISYNode.js";
import { Observable, EventEmitter } from "@project-chip/matter.js/util";
export declare class ISYBridgedDeviceBehavior extends Behavior {
    static readonly id = "isyDevice";
    static readonly early = true;
    internal: ISYBridgedDeviceBehavior.Internal;
    state: ISYBridgedDeviceBehavior.State;
    events: ISYBridgedDeviceBehavior.Events;
    initialize(_options?: {}): Promise<void>;
    get device(): ISYDeviceNode<any, any, any>;
    handlePropertyChange(driver: string, newValue: any, oldValue: any, formattedValue: string): void;
    [Symbol.asyncDispose](): import("@project-chip/matter.js/util").MaybePromise;
}
export declare namespace ISYBridgedDeviceBehavior {
    class Internal {
        device?: ISYDeviceNode<any, any, any>;
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
