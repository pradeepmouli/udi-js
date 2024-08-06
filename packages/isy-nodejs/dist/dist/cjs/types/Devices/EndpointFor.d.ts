import { Endpoint } from '@project-chip/matter.js/endpoint';
import { SupportedBehaviors } from '@project-chip/matter.js/endpoint/properties';
import { Behavior } from '@project-chip/matter.js/behavior';
import { MutableEndpoint, EndpointType } from '@project-chip/matter.js/endpoint/type';
import type { ClusterBehavior } from '@project-chip/matter.js/behavior/cluster';
import { type ClusterType } from '@project-chip/matter.js/cluster';
import type { Constructor } from './Constructor.js';
import type { ISYNodeDevice } from '../ISYNode.js';
import { BridgedDeviceBasicInformationServer } from '@project-chip/matter.js/behaviors/bridged-device-basic-information';
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
export declare const MatterEndpoint: <P extends EndpointType & MutableEndpoint, T extends Constructor<ISYNodeDevice<any, any, any>>>(base: T, endpointType: P) => {
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
        _parentDevice: ISYNodeDevice<any, import("../Definitions/Global/Drivers.js").Driver.Literal, string>;
        readonly children: ISYNodeDevice<any, import("../Definitions/Global/Drivers.js").Driver.Literal, string>[];
        readonly scenes: import("../ISYScene.js").ISYScene[];
        hidden: boolean;
        _enabled: any;
        productName: string;
        model: string;
        modelNumber: string;
        version: string;
        isDimmable: boolean;
        convertTo(value: any, UnitOfMeasure: number, propertyName?: import("../Definitions/Global/Drivers.js").Driver.Literal): any;
        convertFrom(value: any, UnitOfMeasure: number, propertyName?: import("../Definitions/Global/Drivers.js").Driver.Literal): any;
        addLink(isyScene: import("../ISYScene.js").ISYScene): void;
        addChild<K extends ISYNodeDevice<any, any, any>>(childDevice: K): void;
        readonly parentDevice: ISYNodeDevice<any, import("../Definitions/Global/Drivers.js").Driver.Literal, string>;
        readProperty(propertyName: import("../Definitions/Global/Drivers.js").Driver.Literal): Promise<import("../Definitions/PropertyStatus.js").DriverState>;
        readProperties(): Promise<import("../Definitions/PropertyStatus.js").DriverState[]>;
        updateProperty(propertyName: import("../Definitions/Global/Drivers.js").Driver.Literal, value: string): Promise<any>;
        sendCommand(command: string, parameters?: Record<string | symbol, string | number> | string | number): Promise<any>;
        refresh(): Promise<any>;
        parseResult(node: {
            property: import("../Definitions/PropertyStatus.js").DriverState | import("../Definitions/PropertyStatus.js").DriverState[];
        }): void;
        applyStatus(prop: import("../Definitions/PropertyStatus.js").DriverState): void;
        handleControlTrigger(controlName: string): boolean;
        handlePropertyChange(driver: any, value: any, formattedValue: string): boolean;
        readonly isy: import("../ISY.js").ISY;
        readonly formatted: import("../ISYNode.js").DriverValues<any, string>;
        readonly uom: { [x in import("../Definitions/Global/Drivers.js").Driver.Literal]?: import("../Definitions/Global/UOM.js").UnitOfMeasure; };
        readonly pending: import("../ISYNode.js").DriverValues<any, any>;
        readonly local: import("../ISYNode.js").DriverValues<any, any>;
        readonly drivers: import("../Definitions/Global/Drivers.js").DriverList<any>;
        readonly flag: any;
        readonly nodeDefId: string;
        readonly address: string;
        name: string;
        label: string;
        spokenName: string;
        location: string;
        isLoad: boolean;
        folder: string;
        parent: any;
        parentType: import("../ISYConstants.js").NodeType;
        readonly elkId: string;
        nodeType: number;
        readonly baseLabel: string;
        propsInitialized: boolean;
        logger: (msg: any, level?: "error" | "warn" | "debug" | "info", ...meta: any[]) => import("winston").Logger;
        lastChanged: Date;
        enabled: boolean;
        baseName: any;
        on(event: "PropertyChanged" | "ControlTriggered", listener: ((propertyName: string, newValue: any, oldValue: any, formattedValue: string) => any) | ((controlName: string) => any)): any;
        emit(event: "PropertyChanged" | "ControlTriggered", propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): boolean;
        handleEvent(event: {
            control?: any;
            data?: any;
            node?: any;
            action?: any;
            fmtAct?: any;
        }): boolean;
        generateLabel(template: string): string;
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
export declare class BridgedISYNodeInformationServer extends BridgedDeviceBasicInformationServer {
    initialize(): Promise<void>;
}
export declare namespace BridgedISYNodeInformationServer {
    class State extends BridgedDeviceBasicInformationServer.State {
        address: string;
    }
}
