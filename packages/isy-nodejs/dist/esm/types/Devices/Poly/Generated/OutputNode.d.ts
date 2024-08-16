import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Poly } from "../../../Definitions/index.js";
export declare const nodeDefId = "BRIDGE";
type Commands = {
    UPDATE: () => Promise<boolean>;
};
type Drivers = {
    ST?: {
        uom: UnitOfMeasure.Index;
        value: Poly.BridgeQuery;
    };
};
export declare class OutputNode extends ISYDeviceNode<Family.Poly, keyof Drivers, keyof Commands> {
    readonly commands: Commands;
    drivers: Drivers;
    static nodeDefId: string;
    constructor(isy: ISY, nodeInfo: NodeInfo);
    forceUpdate(): Promise<any>;
    get connected(): Poly.BridgeQuery;
}
export {};
//# sourceMappingURL=OutputNode.d.ts.map