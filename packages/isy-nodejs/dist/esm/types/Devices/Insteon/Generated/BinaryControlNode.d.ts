import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Definitions/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Insteon } from '../../../Definitions/index.js';
export declare const nodeDefId = "BinaryControl";
type Commands = {
    QUERY: () => Promise<boolean>;
    BEEP: (value: number) => Promise<boolean>;
    WDU: () => Promise<boolean>;
};
type Drivers = {
    ST?: {
        uom: UnitOfMeasure.Percent;
        value: Insteon.OnLevelRelay;
    };
    ERR?: {
        uom: UnitOfMeasure.Index;
        value: Error;
    };
};
export declare class BinaryControlNode extends ISYDeviceNode<Family.Insteon, keyof Drivers, keyof Commands> {
    readonly commands: Commands;
    drivers: Drivers;
    static nodeDefId: string;
    constructor(isy: ISY, nodeInfo: NodeInfo);
    query(): Promise<any>;
    beep(value: number): Promise<any>;
    writeChanges(): Promise<any>;
    get status(): OnLevelRelay;
    get responding(): Error;
}
export {};
//# sourceMappingURL=BinaryControlNode.d.ts.map