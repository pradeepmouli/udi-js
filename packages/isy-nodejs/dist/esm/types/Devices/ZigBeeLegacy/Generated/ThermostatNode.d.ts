import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
export declare const nodeDefId = "Thermostat";
type Commands = {
    CLISPH: (value: ) => Promise<boolean>;
    CLISPC: (value: ) => Promise<boolean>;
    CLIMD: (value: ) => Promise<boolean>;
    CLIFS: (value: ) => Promise<boolean>;
    CLISMD: (value: ) => Promise<boolean>;
    CLISPHD: (value: ) => Promise<boolean>;
    CLISPCD: (value: ) => Promise<boolean>;
    QUERY: () => Promise<boolean>;
    ADRPST: (value: ) => Promise<boolean>;
};
type Drivers = {
    ST?: {
        uom: ;
        value: ;
    };
    CLISPH?: {
        uom: ;
        value: ;
    };
    CLISPC?: {
        uom: ;
        value: ;
    };
    CLIMD?: {
        uom: ;
        value: ;
    };
    CLIFS?: {
        uom: ;
        value: ;
    };
    CLIHCS?: {
        uom: ;
        value: ;
    };
    CLIFRS?: {
        uom: ;
        value: ;
    };
    CLISMD?: {
        uom: ;
        value: ;
    };
    ERR?: {
        uom: ;
        value: ;
    };
};
export declare class ThermostatNode extends ISYDeviceNode<Family.ZigBeeLegacy, keyof Drivers, keyof Commands> {
    readonly commands: Commands;
    drivers: Drivers;
    static nodeDefId: string;
    constructor(isy: ISY, nodeInfo: NodeInfo);
    updateHeatSetpoint(value: ): Promise<any>;
    updateCoolSetpoint(value: ): Promise<any>;
    updateMode(value: ): Promise<any>;
    updateFanMode(value: ): Promise<any>;
    updateScheduleMode(value: ): Promise<any>;
    heatSetpointShift(value: ): Promise<any>;
    coolSetpointShift(value: ): Promise<any>;
    query(): Promise<any>;
    adr(value: ): Promise<any>;
    get temperature(): {};
}
export {};
//# sourceMappingURL=ThermostatNode.d.ts.map