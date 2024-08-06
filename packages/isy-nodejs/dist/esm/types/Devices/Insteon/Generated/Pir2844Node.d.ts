import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Definitions/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
export declare const nodeDefId = "PIR2844";
type Commands = {
    CLITEMP: (value: number) => Promise<boolean>;
    QUERY: () => Promise<boolean>;
    BEEP: (value: number) => Promise<boolean>;
    WDU: () => Promise<boolean>;
};
type Drivers = {
    ST?: {
        uom: UnitOfMeasure.Percent;
        value: OnLevelRelay;
    };
    CLITEMP?: {
        uom: UnitOfMeasure.Fahrenheit;
        value: number;
    };
    LUMIN?: {
        uom: UnitOfMeasure.Percent;
        value: number;
    };
    BATLVL?: {
        uom: UnitOfMeasure.Percent;
        value: number;
    };
    GV1?: {
        uom: UnitOfMeasure.Boolean;
        value: Boolean;
    };
    ERR?: {
        uom: UnitOfMeasure.Index;
        value: Error;
    };
};
export declare class Pir2844Node extends ISYDeviceNode<Family.Insteon, keyof Drivers, keyof Commands> {
    readonly commands: Commands;
    drivers: Drivers;
    static nodeDefId: string;
    constructor(isy: ISY, nodeInfo: NodeInfo);
    calibrateTemperature(value: number): Promise<any>;
    query(): Promise<any>;
    beep(value: number): Promise<any>;
    writeChanges(): Promise<any>;
    get status(): OnLevelRelay;
    get temperature(): number;
    get luminance(): number;
    get batteryLevel(): number;
    get batteryPowered(): Boolean;
    get responding(): Error;
}
export {};
//# sourceMappingURL=Pir2844Node.d.ts.map