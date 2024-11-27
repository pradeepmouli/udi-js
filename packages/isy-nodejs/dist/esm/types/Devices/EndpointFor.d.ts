import { Endpoint, type EndpointType, type MutableEndpoint } from '@project-chip/matter.js/endpoint';
import { Behavior } from '@project-chip/matter.js/behavior';
import type { ClusterBehavior } from '@project-chip/matter.js/behavior/cluster';
import { type ClusterType } from '@project-chip/matter.js/cluster';
import type { Constructor } from './Constructor.js';
import type { ISYDeviceNode } from '../Devices/ISYDeviceNode.js';
import { BridgedDeviceBasicInformationServer } from '@project-chip/matter.js/behaviors/bridged-device-basic-information';
import type { SupportedBehaviors } from '@matter/node';
export type RelaxTypes<V> = V extends number ? number : V extends bigint ? bigint : V extends object ? V extends (...args: any[]) => any ? V : {
    [K in keyof V]: RelaxTypes<V[K]>;
} : V;
export type RelaxedClusterType = RelaxTypes<ClusterType>;
export type EndpointFor<K extends Behavior.Type, K1 extends Behavior.Type = K, K2 extends Behavior.Type = K, K3 extends Behavior.Type = K> = {
    events: SupportedBehaviors.EventsOf<SupportedBehaviors.MapOf<[K, K1, K2, K3]>>;
} & MutableEndpoint.With<EndpointType.Empty, SupportedBehaviors.MapOf<[K, K1, K2, K3]>>;
export type BehaviorsOf<K extends ClusterType.Of<ClusterType.Options<{}>>, K1 extends ClusterType = K, K2 extends ClusterType = K, K3 extends ClusterType = K> = [ClusterBehavior.Type<K>, ClusterBehavior.Type<K1>, ClusterBehavior.Type<K2>, ClusterBehavior.Type<K3>];
export type SupportedBehaviorsOf<K extends ClusterType.Of<ClusterType.Options<{}>>, K1 extends ClusterType = K, K2 extends ClusterType = K, K3 extends ClusterType = K> = SupportedBehaviors.MapOf<BehaviorsOf<K, K1, K2, K3>>;
export type EndpointForCluster<K extends ClusterType.Of<ClusterType.Options<{}>>, K1 extends ClusterType = K, K2 extends ClusterType = K, K3 extends ClusterType = K> = {
    events: SupportedBehaviors.EventsOf<SupportedBehaviorsOf<K, K1, K2, K3>>;
    set: (values: SupportedBehaviors.StatePatchOf<SupportedBehaviorsOf<K, K1, K2, K3>>) => void;
};
export declare const MatterEndpoint: <P extends EndpointType & MutableEndpoint, T extends Constructor<ISYDeviceNode<any, any, any>>>(base: T, endpointType: P) => {
    new (...args: any[]): {
        endpointType: P;
        createEndpoint<K extends SupportedBehaviors>(): Endpoint;
        family: any;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly category: import("../Definitions/index.js").Category;
        readonly subCategory: number;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        manufacturer: string;
        productId: string | number;
        modelName: string;
        _parentDevice: import("../ISYDevice.js").ISYDevice<any, any, any, any>;
        children: import("../ISYNode.js").ISYNode<any, any, any, any>[];
        addChild<K extends import("../ISYNode.js").ISYNode<any, any, any, any>>(childDevice: K): void;
        "__#129@#parentNode": import("../ISYNode.js").ISYNode<any, any, any, any>;
        readonly address: string;
        readonly baseLabel: string;
        readonly flag: any;
        readonly isy: import("../ISY.js").ISY;
        readonly nodeDefId: string;
        baseName: any;
        commands: import("../Definitions/index.js").Command.ForAll<any>;
        drivers: import("../Definitions/index.js").Driver.ForAll<any, false>;
        enabled: boolean;
        events: import("@matter/general").Merge<import("../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>, {
            on(eventName: `${any}Changed` & `${any}Triggered`, listener: (driver: string, newValue: any, oldValue: any, formatted: string, uom: any) => void): import("../Definitions/Global/Events.js").Event.NodeEventEmitter</*elided*/ any>;
        }>;
        folder: string;
        hidden: boolean;
        isDimmable: boolean;
        isLoad: boolean;
        label: string;
        lastChanged: Date;
        location: string;
        logger: (msg: any, level?: keyof import("winston/lib/winston/config/index.js").CliConfigSetLevels, ...meta: any[]) => import("winston").Logger;
        name: string;
        nodeType: number;
        parent: any;
        parentAddress: any;
        parentType: import("../ISYConstants.js").NodeType;
        propsInitialized: boolean;
        scenes: import("../ISYScene.js").ISYScene[];
        spokenName: string;
        type: any;
        readonly parentNode: import("../ISYNode.js").ISYNode<any, any, any, any>;
        addLink(isyScene: import("../ISYScene.js").ISYScene): void;
        applyStatus(prop: import("../Model/DriverState.js").DriverState): void;
        convert(value: any, from: import("../Definitions/index.js").UnitOfMeasure, to: import("../Definitions/index.js").UnitOfMeasure): any;
        convertFrom(value: any, uom: import("../Definitions/index.js").UnitOfMeasure, propertyName?: string): any;
        convertTo(value: any, uom: import("../Definitions/index.js").UnitOfMeasure, propertyName?: string): any;
        emit(event: "propertyChanged" | "controlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): void;
        generateLabel(template: string): string;
        getNotes(): Promise<import("../Model/NodeNotes.js").NodeNotes>;
        handleControlTrigger(controlName: string | number | symbol): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        handlePropertyChange(propertyName: string, value: any, uom: import("../Definitions/index.js").UnitOfMeasure, prec?: number, formattedValue?: string): boolean;
        parseResult(node: {
            property: import("../Model/DriverState.js").DriverState | import("../Model/DriverState.js").DriverState[];
        }): void;
        readProperties(): Promise<import("../Model/DriverState.js").DriverState[]>;
        readProperty(propertyName: string): Promise<import("../Model/DriverState.js").DriverState>;
        refresh(): Promise<any>;
        refreshNotes(): Promise<void>;
        sendCommand(command: string): Promise<any>;
        sendCommand(command: string, value: string | number, parameters: Record<string | symbol, string | number | undefined>): any;
        sendCommand(command: string, value: string | number): Promise<any>;
        sendCommand(command: string, parameters: Record<string | symbol, string | number | undefined>): Promise<any>;
        updateProperty(propertyName: string, value: any): Promise<any>;
    };
} & T;
export declare class BridgedISYNodeInformationServer extends BridgedDeviceBasicInformationServer {
    initialize(): Promise<void>;
}
export declare namespace BridgedISYNodeInformationServer {
    class State extends BridgedDeviceBasicInformationServer.State {
        address: string;
    }
}
//# sourceMappingURL=EndpointFor.d.ts.map