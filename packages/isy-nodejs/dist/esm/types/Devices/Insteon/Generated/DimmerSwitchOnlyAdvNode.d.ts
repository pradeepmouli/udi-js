import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Definitions/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
export declare const nodeDefId = "DimmerSwitchOnly_ADV";
type Commands = {
    BL: (value: number) => Promise<boolean>;
    WDU: () => Promise<boolean>;
};
type Drivers = {
    ERR?: {
        uom: UnitOfMeasure.Index;
        value: Error;
    };
};
export declare class DimmerSwitchOnlyAdvNode extends ISYDeviceNode<Family.Insteon, keyof Drivers, keyof Commands> {
    readonly commands: Commands;
    drivers: Drivers;
    static nodeDefId: string;
    constructor(isy: ISY, nodeInfo: NodeInfo);
    backlight(value: number): Promise<any>;
    writeChanges(): Promise<any>;
    get responding(): Error;
}
export {};
//# sourceMappingURL=DimmerSwitchOnlyAdvNode.d.ts.map