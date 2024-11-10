import type { LevelControlInterface, LevelControlServer } from '@project-chip/matter.js/behaviors/level-control';
import type { OnOffServer } from '@project-chip/matter.js/behaviors/on-off';
import type { MaybePromise } from '@project-chip/matter.js/util';
import { InsteonDimmableDevice } from '../../Devices/Insteon/InsteonDimmableDevice.js';
import { InsteonRelayDevice } from '../../Devices/Insteon/InsteonRelayDevice.js';
import { type PropertyChange } from './ISYClusterBehavior.js';
declare const ISYOnOffBehavior_base: import("@project-chip/matter.js/dist/cjs/behavior/cluster/ClusterBehavior.js").ClusterBehavior.Type<import("@project-chip/matter.js/cluster").ClusterComposer.WithFeatures<import("@project-chip/matter.js/cluster").ClusterComposer.WithFeatures<import("@project-chip/matter.js/cluster").OnOff.Cluster, readonly [import("@project-chip/matter.js/cluster").OnOff.Feature.Lighting]>, readonly ["Lighting"]>, typeof OnOffServer, import("@project-chip/matter.js/behaviors/on-off").OnOffInterface> & (new (...args: any[]) => import("./ISYClusterBehavior.js").DeviceBehavior<InsteonRelayDevice, import("@project-chip/matter.js/dist/cjs/behavior/cluster/ClusterBehavior.js").ClusterBehavior.Type<import("@project-chip/matter.js/cluster").ClusterComposer.WithFeatures<import("@project-chip/matter.js/cluster").ClusterComposer.WithFeatures<import("@project-chip/matter.js/cluster").OnOff.Cluster, readonly [import("@project-chip/matter.js/cluster").OnOff.Feature.Lighting]>, readonly ["Lighting"]>, typeof OnOffServer, import("@project-chip/matter.js/behaviors/on-off").OnOffInterface>>);
export declare class ISYOnOffBehavior extends ISYOnOffBehavior_base {
    initialize(_options?: {}): Promise<void>;
    on: () => Promise<void>;
    off(): Promise<void>;
    toggle: () => Promise<void>;
    handlePropertyChange({ driver, newValue, oldValue, formattedValue }: PropertyChange<InsteonRelayDevice>): Promise<void>;
}
declare const ISYDimmableBehavior_base: import("@project-chip/matter.js/dist/cjs/behavior/cluster/ClusterBehavior.js").ClusterBehavior.Type<import("@project-chip/matter.js/cluster").ElementModifier.WithAlterations<import("@project-chip/matter.js/cluster").ClusterComposer.WithFeatures<import("@project-chip/matter.js/cluster").ClusterComposer.WithFeatures<import("@project-chip/matter.js/cluster").ClusterComposer.WithFeatures<import("@project-chip/matter.js/cluster").LevelControl.Cluster, readonly [import("@project-chip/matter.js/cluster").LevelControl.Feature.OnOff, import("@project-chip/matter.js/cluster").LevelControl.Feature.Lighting]>, readonly [import("@project-chip/matter.js/cluster").LevelControl.Feature.OnOff]>, readonly ["Lighting", "OnOff"]>, {
    readonly attributes: {
        readonly currentLevel: {
            readonly min: 1;
            readonly max: 254;
        };
        readonly minLevel: {
            readonly default: 1;
            readonly min: 1;
            readonly max: 2;
        };
        readonly maxLevel: {
            readonly default: 254;
            readonly min: 254;
            readonly max: 255;
        };
    };
}>, import("@project-chip/matter.js/dist/cjs/behavior/cluster/ClusterBehavior.js").ClusterBehavior.Type<import("@project-chip/matter.js/cluster").ClusterComposer.WithFeatures<import("@project-chip/matter.js/cluster").ClusterComposer.WithFeatures<import("@project-chip/matter.js/cluster").ClusterComposer.WithFeatures<import("@project-chip/matter.js/cluster").LevelControl.Cluster, readonly [import("@project-chip/matter.js/cluster").LevelControl.Feature.OnOff, import("@project-chip/matter.js/cluster").LevelControl.Feature.Lighting]>, readonly [import("@project-chip/matter.js/cluster").LevelControl.Feature.OnOff]>, readonly ["Lighting", "OnOff"]>, typeof LevelControlServer, LevelControlInterface>, LevelControlInterface> & (new (...args: any[]) => import("./ISYClusterBehavior.js").DeviceBehavior<InsteonDimmableDevice, import("@project-chip/matter.js/dist/cjs/behavior/cluster/ClusterBehavior.js").ClusterBehavior.Type<import("@project-chip/matter.js/cluster").ElementModifier.WithAlterations<import("@project-chip/matter.js/cluster").ClusterComposer.WithFeatures<import("@project-chip/matter.js/cluster").ClusterComposer.WithFeatures<import("@project-chip/matter.js/cluster").ClusterComposer.WithFeatures<import("@project-chip/matter.js/cluster").LevelControl.Cluster, readonly [import("@project-chip/matter.js/cluster").LevelControl.Feature.OnOff, import("@project-chip/matter.js/cluster").LevelControl.Feature.Lighting]>, readonly [import("@project-chip/matter.js/cluster").LevelControl.Feature.OnOff]>, readonly ["Lighting", "OnOff"]>, {
    readonly attributes: {
        readonly currentLevel: {
            readonly min: 1;
            readonly max: 254;
        };
        readonly minLevel: {
            readonly default: 1;
            readonly min: 1;
            readonly max: 2;
        };
        readonly maxLevel: {
            readonly default: 254;
            readonly min: 254;
            readonly max: 255;
        };
    };
}>, import("@project-chip/matter.js/dist/cjs/behavior/cluster/ClusterBehavior.js").ClusterBehavior.Type<import("@project-chip/matter.js/cluster").ClusterComposer.WithFeatures<import("@project-chip/matter.js/cluster").ClusterComposer.WithFeatures<import("@project-chip/matter.js/cluster").ClusterComposer.WithFeatures<import("@project-chip/matter.js/cluster").LevelControl.Cluster, readonly [import("@project-chip/matter.js/cluster").LevelControl.Feature.OnOff, import("@project-chip/matter.js/cluster").LevelControl.Feature.Lighting]>, readonly [import("@project-chip/matter.js/cluster").LevelControl.Feature.OnOff]>, readonly ["Lighting", "OnOff"]>, typeof LevelControlServer, LevelControlInterface>, LevelControlInterface>>);
export declare class ISYDimmableBehavior extends ISYDimmableBehavior_base {
    initialize(_options?: {}): Promise<void>;
    setLevel(level: number): MaybePromise<void>;
}
export {};
//# sourceMappingURL=ISYOnOffBehavior.d.ts.map