import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Definitions/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
export declare const nodeDefId = "LUTLoadShed";
type Commands = {
    DON: (value: (0 | 100)) => Promise<boolean>;
    DOF: () => Promise<boolean>;
    QUERY: () => Promise<boolean>;
};
type Drivers = {
    ST?: {
        uom: UnitOfMeasure.Percent;
        value: (0 | 100);
    };
    ERR?: {
        uom: UnitOfMeasure.Index;
        value: Error;
    };
};
export declare class LoadShedNode extends ISYDeviceNode<Family.Lutron, keyof Drivers, keyof Commands> {
    readonly commands: Commands;
    drivers: Drivers;
    static nodeDefId: string;
    constructor(isy: ISY, nodeInfo: NodeInfo);
    on(value: (0 | 100)): Promise<any>;
    off(): Promise<any>;
    query(): Promise<any>;
    get status(): (0 | 100);
    get responding(): Error;
}
export {};
//# sourceMappingURL=LoadShedNode.d.ts.map