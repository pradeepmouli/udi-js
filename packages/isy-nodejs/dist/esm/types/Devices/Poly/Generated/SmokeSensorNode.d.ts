import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
export declare const nodeDefId = "FIREPLACE";
type Commands = {
    DON: () => Promise<boolean>;
    DOF: () => Promise<boolean>;
};
type Drivers = {
    ST?: {
        uom: UnitOfMeasure.OffOn;
        value: (0 | 100 | 101);
    };
};
export declare class SmokeSensorNode extends ISYDeviceNode<Family.Poly, keyof Drivers, keyof Commands> {
    readonly commands: Commands;
    drivers: Drivers;
    static nodeDefId: string;
    constructor(isy: ISY, nodeInfo: NodeInfo);
    on(): Promise<any>;
    off(): Promise<any>;
    get status(): (0 | 100 | 101);
}
export {};
//# sourceMappingURL=SmokeSensorNode.d.ts.map