import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Definitions/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
export declare const nodeDefId = "EM3TempSensor";
type Commands = {};
type Drivers = {
    ST?: {
        uom: UnitOfMeasure.Degree;
        value: number;
    };
    ERR?: {
        uom: UnitOfMeasure.Index;
        value: (0 | 1);
    };
};
export declare class TempSensorNode extends ISYNode<Family.UDI, keyof Drivers, keyof Commands> {
    readonly commands: Commands;
    drivers: Drivers;
    static nodeDefId: string;
    constructor(isy: ISY, nodeInfo: NodeInfo);
    get temperature(): number;
    get responding(): boolean;
}
export {};
//# sourceMappingURL=TempSensorNode.d.ts.map