import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
export declare const nodeDefId = "NODIM_LIGHT";
type Commands = {
    DON: () => Promise<boolean>;
    DOF: () => Promise<boolean>;
    DFON: () => Promise<boolean>;
    DFOF: () => Promise<boolean>;
};
type Drivers = {
    ST?: {
        uom: UnitOfMeasure.OffOn;
        value: (0 | 100 | 101);
    };
};
export declare class LampNode extends ISYDeviceNode<Family.Poly, keyof Drivers, keyof Commands> {
    readonly commands: Commands;
    drivers: Drivers;
    static nodeDefId: string;
    constructor(isy: ISY, nodeInfo: NodeInfo);
    on(): Promise<any>;
    off(): Promise<any>;
    fastOn(): Promise<any>;
    fastOff(): Promise<any>;
    get light(): (0 | 100 | 101);
}
export {};
//# sourceMappingURL=LampNode.d.ts.map