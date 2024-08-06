import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Definitions/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
export declare const nodeDefId = "RelaySwitchOnlyPlusQuery";
type Commands = {
    QUERY: () => Promise<boolean>;
    BEEP: (value: number) => Promise<boolean>;
    BL: (value: number) => Promise<boolean>;
    WDU: () => Promise<boolean>;
};
type Drivers = {
    ERR?: {
        uom: UnitOfMeasure.Index;
        value: Error;
    };
};
export declare class RelaySwitchOnlyPlusQueryNode extends ISYDeviceNode<Family.Insteon, keyof Drivers, keyof Commands> {
    readonly commands: Commands;
    drivers: Drivers;
    static nodeDefId: string;
    constructor(isy: ISY, nodeInfo: NodeInfo);
    query(): Promise<any>;
    beep(value: number): Promise<any>;
    backlight(value: number): Promise<any>;
    writeChanges(): Promise<any>;
    get responding(): Error;
}
export {};
//# sourceMappingURL=RelaySwitchOnlyPlusQueryNode.d.ts.map