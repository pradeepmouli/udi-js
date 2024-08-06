import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Definitions/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
export declare const nodeDefId = "EZRAIN_Output";
type Commands = {
    DON: (value: (0 | 100)) => Promise<boolean>;
    DOF: () => Promise<boolean>;
    QUERY: () => Promise<boolean>;
    WDU: () => Promise<boolean>;
    BEEP: (value: number) => Promise<boolean>;
};
type Drivers = {
    ST?: {
        uom: UnitOfMeasure.Percent;
        value: OnLevelRelay;
    };
    ERR?: {
        uom: UnitOfMeasure.Index;
        value: Error;
    };
};
export declare class EzrainOutputNode extends ISYDeviceNode<Family.Insteon, keyof Drivers, keyof Commands> {
    readonly commands: Commands;
    drivers: Drivers;
    static nodeDefId: string;
    constructor(isy: ISY, nodeInfo: NodeInfo);
    on(value: (0 | 100)): Promise<any>;
    off(): Promise<any>;
    query(): Promise<any>;
    writeChanges(): Promise<any>;
    beep(value: number): Promise<any>;
    get status(): OnLevelRelay;
    get responding(): Error;
}
export {};
//# sourceMappingURL=EzrainOutputNode.d.ts.map