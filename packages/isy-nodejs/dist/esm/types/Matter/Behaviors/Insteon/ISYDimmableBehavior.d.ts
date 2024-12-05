import type { MaybePromise } from '@matter/general';
declare const ISYDimmableBehavior_base: import("@matter/node").ClusterBehavior.Type<import("@matter/types").ElementModifier.WithAlterations<import("@matter/types").ClusterComposer.WithFeatures<import("@matter/types").ClusterComposer.WithFeatures<import("@matter/types").ClusterComposer.WithFeatures<import("@project-chip/matter.js/cluster").LevelControl.Cluster, readonly [import("@project-chip/matter.js/cluster").LevelControl.Feature.OnOff, import("@project-chip/matter.js/cluster").LevelControl.Feature.Lighting]>, readonly [import("@project-chip/matter.js/cluster").LevelControl.Feature.OnOff]>, readonly ["Lighting", "OnOff"]>, {
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
}>, import("@matter/node").ClusterBehavior.Type<import("@matter/types").ClusterComposer.WithFeatures<import("@matter/types").ClusterComposer.WithFeatures<import("@matter/types").ClusterComposer.WithFeatures<import("@project-chip/matter.js/cluster").LevelControl.Cluster, readonly [import("@project-chip/matter.js/cluster").LevelControl.Feature.OnOff, import("@project-chip/matter.js/cluster").LevelControl.Feature.Lighting]>, readonly [import("@project-chip/matter.js/cluster").LevelControl.Feature.OnOff]>, readonly ["Lighting", "OnOff"]>, typeof import("@matter/node/behaviors").LevelControlServer, import("@matter/node/behaviors").LevelControlInterface>, import("@matter/node/behaviors").LevelControlInterface> & (new (...args: any[]) => import("../ISYClusterBehavior.js").DeviceBehavior<import("../../../ISYNode.js").ISYNode<any, any, any, any>, import("@matter/node").ClusterBehavior.Type<import("@matter/types").ElementModifier.WithAlterations<import("@matter/types").ClusterComposer.WithFeatures<import("@matter/types").ClusterComposer.WithFeatures<import("@matter/types").ClusterComposer.WithFeatures<import("@project-chip/matter.js/cluster").LevelControl.Cluster, readonly [import("@project-chip/matter.js/cluster").LevelControl.Feature.OnOff, import("@project-chip/matter.js/cluster").LevelControl.Feature.Lighting]>, readonly [import("@project-chip/matter.js/cluster").LevelControl.Feature.OnOff]>, readonly ["Lighting", "OnOff"]>, {
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
}>, import("@matter/node").ClusterBehavior.Type<import("@matter/types").ClusterComposer.WithFeatures<import("@matter/types").ClusterComposer.WithFeatures<import("@matter/types").ClusterComposer.WithFeatures<import("@project-chip/matter.js/cluster").LevelControl.Cluster, readonly [import("@project-chip/matter.js/cluster").LevelControl.Feature.OnOff, import("@project-chip/matter.js/cluster").LevelControl.Feature.Lighting]>, readonly [import("@project-chip/matter.js/cluster").LevelControl.Feature.OnOff]>, readonly ["Lighting", "OnOff"]>, typeof import("@matter/node/behaviors").LevelControlServer, import("@matter/node/behaviors").LevelControlInterface>, import("@matter/node/behaviors").LevelControlInterface>>);
export declare class ISYDimmableBehavior extends ISYDimmableBehavior_base {
    initialize(_options?: {}): Promise<void>;
    setLevel(level: number): MaybePromise<void>;
}
export {};
//# sourceMappingURL=ISYDimmableBehavior.d.ts.map