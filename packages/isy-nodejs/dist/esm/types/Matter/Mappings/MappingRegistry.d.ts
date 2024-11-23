import * as Clusters from '@project-chip/matter.js/cluster';
import type { Converter } from '../../Converters.js';
import { Devices, Insteon } from '../../Devices/index.js';
import { ClusterBehavior, MutableEndpoint, SupportedBehaviors } from '@matter/main';
import { Family } from '../../Definitions/index.js';
import { CommandsOf, DriversOf, ISYNode } from '../../ISYNode.js';
import type { PathsWithLimit, PickOfType, Remove } from '../../Utils.js';
import type { Constructor } from '../../Devices/Constructor.js';
export type AttributeMapping<B, D> = B extends {
    cluster: {
        attributes: infer E extends {
            [K in string]: Clusters.ClusterType.Attribute;
        };
    };
} ? Partial<Record<keyof E, keyof DriversOf<D> | {
    driver: keyof DriversOf<D>;
    converter?: Converter.KnownConverters;
}>> : never;
export type BehaviorMapping<B extends {
    cluster?: any;
}, T extends ISYNode<any, any, any, any>> = {
    attributes?: AttributeMapping<B, T>;
    commands?: CommandMapping<B, T>;
};
export type ClusterAttributeMapping<A, K> = {
    [key in keyof Clusters.ClusterType.AttributesOf<A>]?: {
        driver: Extract<keyof DriversOf<K>, string>;
        converter?: (value: any) => any;
    } | Extract<keyof DriversOf<K>, string>;
};
export type ClusterCommandMapping<A, K> = {
    [key in keyof Clusters.ClusterType.CommandsOf<A>]?: {
        command: keyof CommandsOf<K>;
        parameters?: parameterMapping;
    } | keyof CommandsOf<K>;
};
export type ClusterMapping<A, K> = {
    attributes: ClusterAttributeMapping<A, K>;
    commands: ClusterCommandMapping<A, K>;
};
export type CommandMapping<B, D> = B extends ({
    cluster: {
        commands: infer E extends {
            [K in string]: Clusters.ClusterType.Command;
        };
    };
}) ? Partial<Record<keyof E, keyof CommandsOf<D> | {
    command: keyof CommandsOf<D>;
    parameters?: parameterMapping;
}>> : never;
export type DeviceToClusterMap<T extends ISYNode<Family, any, any, any>, D extends MutableEndpoint> = {
    deviceType: D;
    mapping: EndpointMapping<D, T>;
};
export type EndpointMapping<A extends MutableEndpoint, D extends ISYNode<Family, any, any, any>> = {
    [K in StringKeys<PickOfType<A['behaviors'], ClusterBehavior>> as Capitalize<K>]?: A['behaviors'][K] extends ClusterBehavior ? BehaviorMapping<A['behaviors'][K], D> : undefined;
};
export type EndpointMapping1<A extends MutableEndpoint, K> = {
    attributes?: SBAttributeMapping<A['behaviors'], K>;
    commands?: SBCommandMapping<A['behaviors'], K>;
};
type SupportedFamily = Family.Insteon | Family.ZWave | Family.ZigBee;
export type FamilyToClusterMap<T extends SupportedFamily> = {
    Family: T;
} & {
    [Type in Extract<keyof Devices.Insteon, `${string}Node`> as Remove<Type, 'Node'>]?: DeviceToClusterMap<InstanceType<Devices.Insteon[Type]>, MutableEndpoint>;
};
export declare function add<const F extends SupportedFamily, const T extends ISYNode<F>, const D extends MutableEndpoint>(familyToClusterMap: FamilyToClusterMap<F>, deviceClass: Constructor<T>, mapping: DeviceToClusterMap<T, D>): {
    Family: F;
    AlertModuleArmed?: DeviceToClusterMap<Insteon.AlertModuleArmedNode, MutableEndpoint>;
    AlertModuleSiren?: DeviceToClusterMap<Insteon.AlertModuleSirenNode, MutableEndpoint>;
    BallastRelayLampSwitch?: DeviceToClusterMap<Insteon.BallastRelayLampSwitchNode, MutableEndpoint>;
    BinaryAlarm?: DeviceToClusterMap<Insteon.BinaryAlarmNode, MutableEndpoint>;
    BinaryControl?: DeviceToClusterMap<Insteon.BinaryControlNode, MutableEndpoint>;
    DimmerLamp?: DeviceToClusterMap<Insteon.DimmerLampNode, MutableEndpoint>;
    DimmerLampSwitch?: DeviceToClusterMap<Insteon.DimmerLampSwitchNode, MutableEndpoint>;
    DimmerLampSwitchLed?: DeviceToClusterMap<Insteon.DimmerLampSwitchLedNode, MutableEndpoint>;
    DimmerMotorSwitch?: DeviceToClusterMap<Insteon.DimmerMotorSwitchNode, MutableEndpoint>;
    DimmerSwitch?: DeviceToClusterMap<Insteon.DimmerSwitchNode, MutableEndpoint>;
    DoorLock?: DeviceToClusterMap<Insteon.DoorLockNode, MutableEndpoint>;
    Ezio2x4Input?: DeviceToClusterMap<Insteon.Ezio2x4InputNode, MutableEndpoint>;
    Ezio2x4Output?: DeviceToClusterMap<Insteon.Ezio2x4OutputNode, MutableEndpoint>;
    EzrainInput?: DeviceToClusterMap<Insteon.EzrainInputNode, MutableEndpoint>;
    EzrainOutput?: DeviceToClusterMap<Insteon.EzrainOutputNode, MutableEndpoint>;
    FanLincMotor?: DeviceToClusterMap<Insteon.FanLincMotorNode, MutableEndpoint>;
    I3KeypadFlags?: DeviceToClusterMap<Insteon.I3KeypadFlagsNode, MutableEndpoint>;
    I3PaddleFlags?: DeviceToClusterMap<Insteon.I3PaddleFlagsNode, MutableEndpoint>;
    ImeterSolo?: DeviceToClusterMap<Insteon.ImeterSoloNode, MutableEndpoint>;
    IrLincTx?: DeviceToClusterMap<Insteon.IrLincTxNode, MutableEndpoint>;
    KeypadButton?: DeviceToClusterMap<Insteon.KeypadButtonNode, MutableEndpoint>;
    KeypadDimmer?: DeviceToClusterMap<Insteon.KeypadDimmerNode, MutableEndpoint>;
    KeypadRelay?: DeviceToClusterMap<Insteon.KeypadRelayNode, MutableEndpoint>;
    OnOffControl?: DeviceToClusterMap<Insteon.OnOffControlNode, MutableEndpoint>;
    Pir2844?: DeviceToClusterMap<Insteon.Pir2844Node, MutableEndpoint>;
    Pir2844c?: DeviceToClusterMap<Insteon.Pir2844cNode, MutableEndpoint>;
    Pir2844OnOff?: DeviceToClusterMap<Insteon.Pir2844OnOffNode, MutableEndpoint>;
    RelayLamp?: DeviceToClusterMap<Insteon.RelayLampNode, MutableEndpoint>;
    RelayLampSwitch?: DeviceToClusterMap<Insteon.RelayLampSwitchNode, MutableEndpoint>;
    RelayLampSwitchLed?: DeviceToClusterMap<Insteon.RelayLampSwitchLedNode, MutableEndpoint>;
    RelaySwitch?: DeviceToClusterMap<Insteon.RelaySwitchNode, MutableEndpoint>;
    RelaySwitchOnlyPlusQuery?: DeviceToClusterMap<Insteon.RelaySwitchOnlyPlusQueryNode, MutableEndpoint>;
    RemoteLinc2?: DeviceToClusterMap<Insteon.RemoteLinc2Node, MutableEndpoint>;
    Siren?: DeviceToClusterMap<Insteon.SirenNode, MutableEndpoint>;
    SirenAlert?: DeviceToClusterMap<Insteon.SirenAlertNode, MutableEndpoint>;
    TempLinc?: DeviceToClusterMap<Insteon.TempLincNode, MutableEndpoint>;
    Thermostat?: DeviceToClusterMap<Insteon.ThermostatNode, MutableEndpoint>;
    X10?: DeviceToClusterMap<Insteon.X10Node, MutableEndpoint>;
};
export type SBAttributeMapping<SB extends SupportedBehaviors, D> = {
    [K in keyof SB]: Partial<Record<any, DriversOf<D> | {
        driver: DriversOf<D>;
        converter?: string;
    }>>;
};
export type SBCommandMapping<SB extends SupportedBehaviors, D> = {
    [K in Capitalize<keyof SB>]?: SB[Uncapitalize<K>] extends {
        cluster: {
            commands: any;
        };
    } ? Partial<Record<string, CommandsOf<D> | {
        driver: DriversOf<D>;
        converter?: string;
    }>> : never;
};
type StringKeys<T> = Extract<keyof T, string>;
export type parameterMapping = {
    [key: string]: {
        parameter: string;
        converter?: string;
    };
};
export declare class MappingRegistry {
    static map: Map<Family, Map<string, DeviceToClusterMap<ISYNode, MutableEndpoint>>>;
    static cache: {
        [x: string]: DeviceToClusterMap<ISYNode, MutableEndpoint>;
    };
    static getMapping<const T extends ISYNode>(device: T): DeviceToClusterMap<T, MutableEndpoint>;
    static getMappingForBehavior<T extends ISYNode<any, any, any, any>, const B extends ClusterBehavior>(device: T, behavior: B): BehaviorMapping<B, T>;
    static register<const T extends Family.Insteon | Family.ZWave | Family.ZigBee>(map: Partial<FamilyToClusterMap<T>> | {
        [x in PathsWithLimit<typeof Devices, 1>]: DeviceToClusterMap<any, any>;
    }): void;
}
export {};
//# sourceMappingURL=MappingRegistry.d.ts.map