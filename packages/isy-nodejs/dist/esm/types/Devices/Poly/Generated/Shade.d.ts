import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
export declare const nodeDefId = "SHADE";
type Commands = Shade.Commands;
type Drivers = Shade.Drivers;
export declare class ShadeNode extends Base<Drivers, Commands> implements Shade.Interface {
    readonly commands: {
        DON: () => Promise<any>;
        DOF: () => Promise<any>;
    };
    static nodeDefId: string;
    readonly nodeDefId: "SHADE";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    open(): Promise<any>;
    close(): Promise<any>;
    get status(): (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100 | 101);
}
export declare namespace Shade {
    interface Interface extends Omit<InstanceType<typeof ShadeNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "SHADE";
    }
    function is(node: ISYNode<any, any, any, any>): node is ShadeNode;
    function create(isy: ISY, nodeInfo: NodeInfo): ShadeNode;
    const Node: typeof ShadeNode;
    type Commands = {
        DON: (() => Promise<boolean>) & {
            label: "Open";
            name: "open";
        };
        DOF: (() => Promise<boolean>) & {
            label: "Close";
            name: "close";
        };
    };
    type Drivers = {
        ST: {
            uom: UnitOfMeasure.BarrierStatus;
            value: (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100 | 101);
            label: "Status";
            name: "status";
        };
    };
}
export {};
//# sourceMappingURL=Shade.d.ts.map