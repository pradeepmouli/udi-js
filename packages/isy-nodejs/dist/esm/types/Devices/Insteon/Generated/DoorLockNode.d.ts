import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Definitions/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
export declare const nodeDefId = "DoorLock";
type Commands = {
    DON: () => Promise<boolean>;
    DOF: () => Promise<boolean>;
    WDU: () => Promise<boolean>;
};
type Drivers = {
    ST?: {
        uom: UnitOfMeasure.Percent;
        value: Lock;
    };
    ERR?: {
        uom: UnitOfMeasure.Index;
        value: Error;
    };
};
export declare class DoorLockNode extends ISYDeviceNode<Family.Insteon, keyof Drivers, keyof Commands> {
    readonly commands: Commands;
    drivers: Drivers;
    static nodeDefId: string;
    constructor(isy: ISY, nodeInfo: NodeInfo);
    lock(): Promise<any>;
    unlock(): Promise<any>;
    writeChanges(): Promise<any>;
    get status(): Lock;
    get responding(): Error;
}
export {};
//# sourceMappingURL=DoorLockNode.d.ts.map