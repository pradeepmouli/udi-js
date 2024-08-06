import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Definitions/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
export declare const nodeDefId = "EM3Relay";
type Commands = {
    DON: () => Promise<boolean>;
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
        value: (0 | 1);
    };
};
export declare class LampNode extends ISYNode<Family.UDI, keyof Drivers, keyof Commands> {
    readonly commands: Commands;
    drivers: Drivers;
    static nodeDefId: string;
    constructor(isy: ISY, nodeInfo: NodeInfo);
    on(): Promise<void>;
    off(): Promise<void>;
    query(): Promise<void>;
    get status(): boolean;
    get responding(): boolean;
}
export {};
//# sourceMappingURL=LampNode.d.ts.map