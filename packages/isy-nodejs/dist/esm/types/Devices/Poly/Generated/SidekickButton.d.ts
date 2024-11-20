import type { NodeInfo } from "../../../Model/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
export declare const nodeDefId = "KEYPAD_BTN";
type Commands = SidekickButton.Commands;
type Drivers = SidekickButton.Drivers;
export declare class SidekickButtonNode extends Base<Drivers, Commands> implements SidekickButton.Interface {
    readonly commands: {};
    static nodeDefId: string;
    readonly nodeDefId: "KEYPAD_BTN";
    constructor(isy: ISY, nodeInfo: NodeInfo);
}
export declare namespace SidekickButton {
    interface Interface extends Omit<InstanceType<typeof SidekickButtonNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "KEYPAD_BTN";
    }
    function is(node: ISYNode<any, any, any, any>): node is SidekickButtonNode;
    function create(isy: ISY, nodeInfo: NodeInfo): SidekickButtonNode;
    const Node: typeof SidekickButtonNode;
    type Commands = {};
    type Drivers = {};
}
export {};
//# sourceMappingURL=SidekickButton.d.ts.map