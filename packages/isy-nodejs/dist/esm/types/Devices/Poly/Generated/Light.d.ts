import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from '../index.js';
export declare const nodeDefId = "NODIM_LIGHT";
type Commands = Light.Commands;
type Drivers = Light.Drivers;
export declare class LightNode extends Base<Drivers, Commands> implements Light.Interface {
    readonly commands: {
        DON: () => Promise<any>;
        DOF: () => Promise<any>;
        DFON: () => Promise<any>;
        DFOF: () => Promise<any>;
    };
    static nodeDefId: string;
    readonly nodeDefId: "NODIM_LIGHT";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    on(): Promise<any>;
    off(): Promise<any>;
    fastOn(): Promise<any>;
    fastOff(): Promise<any>;
    get light(): (0 | 100 | 101);
}
export declare namespace Light {
    interface Interface extends Omit<InstanceType<typeof LightNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "NODIM_LIGHT";
    }
    function is(node: ISYNode<any, any, any, any>): node is LightNode;
    function create(isy: ISY, nodeInfo: NodeInfo): LightNode;
    const Node: typeof LightNode;
    type Commands = {
        DON: (() => Promise<boolean>) & {
            label: "On";
            name: "on";
        };
        DOF: (() => Promise<boolean>) & {
            label: "Off";
            name: "off";
        };
        DFON: (() => Promise<boolean>) & {
            label: "Fast On";
            name: "fastOn";
        };
        DFOF: (() => Promise<boolean>) & {
            label: "Fast Off";
            name: "fastOff";
        };
    };
    type Drivers = {
        ST: {
            uom: UnitOfMeasure.OffOn;
            value: (0 | 100 | 101);
            label: "Light";
            name: "light";
        };
    };
}
export {};
//# sourceMappingURL=Light.d.ts.map