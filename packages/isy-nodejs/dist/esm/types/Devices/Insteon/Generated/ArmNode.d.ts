import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Definitions/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
export declare const nodeDefId = "SirenArm";
type Commands = {};
type Drivers = {
    ERR?: {
        uom: UnitOfMeasure.Index;
        value: Error;
    };
};
export declare class ArmNode extends ISYDeviceNode<Family.Insteon, keyof Drivers, keyof Commands> {
    readonly commands: Commands;
    drivers: Drivers;
    static nodeDefId: string;
    constructor(isy: ISY, nodeInfo: NodeInfo);
    get responding(): Error;
}
export {};
//# sourceMappingURL=ArmNode.d.ts.map