import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
export declare const nodeDefId = "KEYPAD_BTN";
type Commands = {};
type Drivers = {};
export declare class SwitchNode extends ISYDeviceNode<Family.Poly, keyof Drivers, keyof Commands> {
    readonly commands: Commands;
    drivers: Drivers;
    static nodeDefId: string;
    constructor(isy: ISY, nodeInfo: NodeInfo);
}
export {};
//# sourceMappingURL=SwitchNode.d.ts.map