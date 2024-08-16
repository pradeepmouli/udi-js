import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { NCD } from "../../../Definitions/index.js";
export declare const nodeDefId = "NCDRelay";
type Commands = {
    DON: () => Promise<boolean>;
    DOF: () => Promise<boolean>;
    QUERY: () => Promise<boolean>;
    ADRPST: (value: (0 | 1)) => Promise<boolean>;
};
type Drivers = {
    ST?: {
        uom: UnitOfMeasure.Percent;
        value: (0 | 100);
    };
    ERR?: {
        uom: UnitOfMeasure.Index;
        value: NCD.Error;
    };
};
export declare class LampAndSwitchNode extends ISYDeviceNode<Family.NCD, keyof Drivers, keyof Commands> {
    readonly commands: Commands;
    drivers: Drivers;
    static nodeDefId: string;
    constructor(isy: ISY, nodeInfo: NodeInfo);
    on(): Promise<any>;
    off(): Promise<any>;
    query(): Promise<any>;
    adr(value: (0 | 1)): Promise<any>;
    get status(): (0 | 100);
    get responding(): NCD.Error;
}
export {};
//# sourceMappingURL=LampAndSwitchNode.d.ts.map