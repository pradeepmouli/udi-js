import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Definitions/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
export declare const nodeDefId = "EM3MainChannel";
type Commands = {};
type Drivers = {
    ST?: {
        uom: UnitOfMeasure.Watt;
        value: number;
    };
    TPW?: {
        uom: UnitOfMeasure.KilowattsPerHour;
        value: number;
    };
    CV?: {
        uom: UnitOfMeasure.Volt;
        value: number;
    };
    CC?: {
        uom: UnitOfMeasure.Ampere;
        value: number;
    };
    PF?: {
        uom: UnitOfMeasure.PowerFactor;
        value: number;
    };
    ERR?: {
        uom: UnitOfMeasure.Index;
        value: (0 | 1);
    };
};
export declare class Em3MainChannelNode extends ISYNode<Family.UDI, keyof Drivers, keyof Commands> {
    readonly commands: Commands;
    drivers: Drivers;
    static nodeDefId: string;
    constructor(isy: ISY, nodeInfo: NodeInfo);
    get status(): number;
    get totalEnergy(): number;
    get currentVoltage(): number;
    get currentCurrent(): number;
    get powerFactor(): number;
    get responding(): boolean;
}
export {};
//# sourceMappingURL=Em3MainChannelNode.d.ts.map