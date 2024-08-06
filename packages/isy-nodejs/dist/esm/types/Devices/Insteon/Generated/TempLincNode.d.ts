import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Definitions/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
export declare const nodeDefId = "TempLinc";
type Commands = {
    CLISPH: (value: number) => Promise<boolean>;
    CLISPC: (value: number) => Promise<boolean>;
    CLIMD: (value: (0 | 1 | 2 | 3 | 5)) => Promise<boolean>;
    CLIFS: (value: (7 | 8)) => Promise<boolean>;
    BRT: () => Promise<boolean>;
    DIM: () => Promise<boolean>;
    BEEP: (value: number) => Promise<boolean>;
    QUERY: () => Promise<boolean>;
    SETTIME: () => Promise<boolean>;
    WDU: () => Promise<boolean>;
};
type Drivers = {
    ST?: {
        uom: UnitOfMeasure.Degree;
        value: number;
    };
    CLISPH?: {
        uom: UnitOfMeasure.Degree;
        value: number;
    };
    CLISPC?: {
        uom: UnitOfMeasure.Degree;
        value: number;
    };
    CLIMD?: {
        uom: UnitOfMeasure.InsteonThermostatMode;
        value: (0 | 1 | 2 | 3 | 5);
    };
    CLIFS?: {
        uom: UnitOfMeasure.InsteonThermostatFanMode;
        value: (7 | 8);
    };
    CLIHUM?: {
        uom: UnitOfMeasure.Percent;
        value: number;
    };
    CLIHCS?: {
        uom: UnitOfMeasure.ThermostatHeatCoolState;
        value: number;
    };
    ERR?: {
        uom: UnitOfMeasure.Index;
        value: Error;
    };
};
export declare class TempLincNode extends ISYDeviceNode<Family.Insteon, keyof Drivers, keyof Commands> {
    readonly commands: Commands;
    drivers: Drivers;
    static nodeDefId: string;
    constructor(isy: ISY, nodeInfo: NodeInfo);
    updateHeatSetpoint(value: number): Promise<any>;
    updateCoolSetpoint(value: number): Promise<any>;
    updateMode(value: (0 | 1 | 2 | 3 | 5)): Promise<any>;
    updateFanMode(value: (7 | 8)): Promise<any>;
    setpointUp(): Promise<any>;
    setpointDown(): Promise<any>;
    beep(value: number): Promise<any>;
    query(): Promise<any>;
    setTime(): Promise<any>;
    writeChanges(): Promise<any>;
    get temperature(): number;
    get heatSetpoint(): number;
    get coolSetpoint(): number;
    get mode(): (0 | 1 | 2 | 3 | 5);
    get fanMode(): (7 | 8);
    get humidity(): number;
    get heatCoolState(): number;
    get responding(): Error;
}
export {};
//# sourceMappingURL=TempLincNode.d.ts.map