import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Definitions/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
export declare const nodeDefId = "KeypadRelay_ADV";
type Commands = {
    DON: (value: (0 | 100)) => Promise<boolean>;
    DOF: () => Promise<boolean>;
    DFOF: () => Promise<boolean>;
    DFON: () => Promise<boolean>;
    QUERY: () => Promise<boolean>;
    BEEP: (value: number) => Promise<boolean>;
    BL: (value: Backlight) => Promise<boolean>;
    WDU: () => Promise<boolean>;
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
export declare class KeypadRelayAdvNode extends ISYDeviceNode<Family.Insteon, keyof Drivers, keyof Commands> {
    readonly commands: Commands;
    drivers: Drivers;
    static nodeDefId: string;
    constructor(isy: ISY, nodeInfo: NodeInfo);
    on(value: (0 | 100)): Promise<any>;
    off(): Promise<any>;
    fastOff(): Promise<any>;
    fastOn(): Promise<any>;
    query(): Promise<any>;
    beep(value: number): Promise<any>;
    backlight(value: Backlight): Promise<any>;
    writeChanges(): Promise<any>;
    get status(): OnLevelRelay;
    get responding(): Error;
}
export {};
//# sourceMappingURL=KeypadRelayAdvNode.d.ts.map