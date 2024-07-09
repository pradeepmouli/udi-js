import { Endpoint } from '@project-chip/matter.js/endpoint';
import { SupportedBehaviors } from '@project-chip/matter.js/endpoint/properties';
import { Behavior } from '@project-chip/matter.js/behavior';
import { MutableEndpoint, EndpointType } from '@project-chip/matter.js/endpoint/type';
import type { ClusterBehavior, ClusterInterface } from '@project-chip/matter.js/behavior/cluster';
import { type ClusterType } from '@project-chip/matter.js/cluster';
import type { Constructor } from './Constructor.js';
import type { ISYDeviceNode } from '../ISYNode.js';
import { type Identity, type MaybePromise } from '@project-chip/matter.js/util';
import { ISY, InsteonRelayDevice } from '../ISY.js';
import { OnOffServer } from '@project-chip/matter.js/behaviors/on-off';
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
export declare const MatterEndpoint: <P extends EndpointType & MutableEndpoint, T extends Constructor<ISYDeviceNode<any>>>(base: T, endpointType: P) => {
    new (...args: any[]): {
        endpointType: P;
        createEndpoint<K extends SupportedBehaviors>(): Endpoint;
        family: any;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly parentAddress: any;
        readonly category: number;
        readonly subCategory: number;
        readonly type: any;
        _parentDevice: ISYDeviceNode<any, string, string>;
        readonly children: ISYDeviceNode<any, string, string>[];
        readonly scenes: import("../ISYScene.js").ISYScene[];
        readonly formatted: any[Drivers];
        readonly uom: any[Drivers];
        readonly pending: any[Drivers];
        readonly local: any[Drivers];
        hidden: boolean;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        isDimmable: boolean;
        convertTo(value: any, UnitOfMeasure: number, propertyName?: string): any;
        convertFrom(value: any, UnitOfMeasure: number, propertyName?: string): any;
        addLink(isyScene: import("../ISYScene.js").ISYScene): void;
        addChild(childDevice: ISYDeviceNode<any, string, string>): void;
        readonly parentDevice: ISYDeviceNode<any, string, string>;
        readProperty(propertyName: string): Promise<import("../Definitions/PropertyStatus.js").PropertyStatus>;
        readProperties(): Promise<import("../Definitions/PropertyStatus.js").PropertyStatus[]>;
        updateProperty(propertyName: string, value: string): Promise<any>;
        sendCommand(command: string, parameters?: (Record<string | symbol, string | number> | string | number)): Promise<any>;
        refresh(): Promise<any>;
        parseResult(node: {
            property: import("../Definitions/PropertyStatus.js").PropertyStatus | import("../Definitions/PropertyStatus.js").PropertyStatus[];
        }, device: any): void;
        applyStatus(device: any, prop: import("../Definitions/PropertyStatus.js").PropertyStatus): void;
        handleControlTrigger(controlName: string): boolean;
        handlePropertyChange(propertyName: any, value: any, formattedValue: string): boolean;
        readonly isy: ISY;
        readonly flag: any;
        readonly nodeDefId: string;
        readonly address: string;
        name: string;
        displayName: string;
        spokenName: string;
        location: string;
        isLoad: boolean;
        folder: string;
        parent: any;
        parentType: import("../ISYConstants.js").NodeType;
        readonly elkId: string;
        nodeType: number;
        readonly baseDisplayName: string;
        propsInitialized: boolean;
        logger: ((msg: any, level?: "error" | "warn" | "debug" | "info", ...meta: any[]) => import("winston").Logger);
        lastChanged: Date;
        enabled: boolean;
        baseName: any;
        on(event: "PropertyChanged" | "ControlTriggered", listener: ((propertyName: string, newValue: any, oldValue: any, formattedValue: string) => any) | ((controlName: string) => any)): any;
        emit(event: "PropertyChanged" | "ControlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): boolean;
        handleEvent(event: any): boolean;
        setDisplayName(template: string): string;
        refreshNotes(): Promise<void>;
        getNotes(): Promise<import("../ISYNode.js").NodeNotes>;
        [EventEmitter.captureRejectionSymbol]?(error: Error, event: string, ...args: any[]): void;
        addListener(eventName: string | symbol, listener: (...args: any[]) => void): any;
        once(eventName: string | symbol, listener: (...args: any[]) => void): any;
        removeListener(eventName: string | symbol, listener: (...args: any[]) => void): any;
        off(eventName: string | symbol, listener: (...args: any[]) => void): any;
        removeAllListeners(event?: string | symbol): any;
        setMaxListeners(n: number): any;
        getMaxListeners(): number;
        listeners(eventName: string | symbol): Function[];
        rawListeners(eventName: string | symbol): Function[];
        listenerCount(eventName: string | symbol, listener?: Function): number;
        prependListener(eventName: string | symbol, listener: (...args: any[]) => void): any;
        prependOnceListener(eventName: string | symbol, listener: (...args: any[]) => void): any;
        eventNames(): Array<string | symbol>;
    };
} & T;
export declare const ISYClusterBehavior: <T extends Constructor<ClusterBehavior>, P extends ISYDeviceNode<any, string, string>>(base: T, p: Identity<P>) => T & Constructor<DeviceBehavior<P>>;
interface DeviceBehavior<P> {
    device: P;
    handlePropertyChange(propertyName: string, value: any, newValue: any, formattedValue: string): void;
}
declare const ISYOnOffBehavior_base: ClusterBehavior.Type<import("@project-chip/matter.js/cluster").ClusterComposer.WithFeatures<import("@project-chip/matter.js/cluster").ClusterComposer.WithFeatures<import("@project-chip/matter.js/cluster").OnOff.Cluster, readonly [import("@project-chip/matter.js/cluster").OnOff.Feature]>, readonly ["LevelControlForLighting"]>, typeof OnOffServer, import("@project-chip/matter.js/behaviors/on-off").OnOffInterface> & Constructor<DeviceBehavior<InsteonRelayDevice>>;
export declare class ISYOnOffBehavior extends ISYOnOffBehavior_base {
    on(): Promise<any>;
    off(): Promise<any>;
    toggle(): Promise<any>;
    handlePropertyChange(propertyName: string, value: any, newValue: any, formattedValue: string): void;
}
declare const BISY: ClusterBehavior.Type<import("@project-chip/matter.js/cluster").ElementModifier.WithAlterations<ClusterType, {
    readonly attributes: {
        readonly address: {
            readonly optional: false;
        };
    };
}>, ClusterBehavior.Type<ClusterType, Behavior.Type, ClusterInterface<{}>>, ClusterInterface<{}>>;
export declare class BridgedISYNodeInformationServer extends BISY {
    initialize(): MaybePromise<void>;
}
export {};
