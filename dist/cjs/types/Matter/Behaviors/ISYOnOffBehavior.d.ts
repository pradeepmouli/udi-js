import { InsteonRelayDevice } from "../../Devices/Insteon/InsteonRelayDevice.js";
declare const ISYOnOffBehavior_base: import("@project-chip/matter.js/behavior/cluster").ClusterBehavior.Type<import("@project-chip/matter.js/cluster").ClusterComposer.WithFeatures<import("@project-chip/matter.js/cluster").ClusterComposer.WithFeatures<import("@project-chip/matter.js/cluster").OnOff.Cluster, readonly [import("@project-chip/matter.js/cluster").OnOff.Feature]>, readonly ["LevelControlForLighting"]>, typeof import("@project-chip/matter.js/behaviors/on-off").OnOffServer, import("@project-chip/matter.js/behaviors/on-off").OnOffInterface> & import("../../Devices/Constructor.js").Constructor<import("./ISYClusterBehavior.js").DeviceBehavior<InsteonRelayDevice>>;
export declare class ISYOnOffBehavior extends ISYOnOffBehavior_base {
    on(): Promise<any>;
    off(): Promise<any>;
    toggle(): Promise<any>;
    handlePropertyChange(propertyName: string, value: any, newValue: any, formattedValue: string): void;
}
export {};
