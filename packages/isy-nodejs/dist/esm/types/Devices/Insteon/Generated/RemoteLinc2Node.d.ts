import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Definitions/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
export declare const nodeDefId = "RemoteLinc2";
type Commands = {
    WDU: () => Promise<boolean>;
};
type Drivers = {
    ST?: {
        uom: UnitOfMeasure.Percent;
        value: OnLevelPercentOn;
    };
    ERR?: {
        uom: UnitOfMeasure.Index;
        value: Error;
    };
};
export declare class RemoteLinc2Node extends ISYDeviceNode<Family.Insteon, keyof Drivers, keyof Commands> {
    readonly commands: Commands;
    drivers: Drivers;
    static nodeDefId: string;
    constructor(isy: ISY, nodeInfo: NodeInfo);
    writeChanges(): Promise<any>;
    get status(): OnLevelPercentOn;
    get responding(): Error;
}
export {};
//# sourceMappingURL=RemoteLinc2Node.d.ts.map