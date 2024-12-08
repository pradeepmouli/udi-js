import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = KeypadButton.Commands;
type Drivers = KeypadButton.Drivers;
export declare class KeypadButtonNode extends Base<Drivers, Commands> implements KeypadButton.Interface {
    readonly commands: {
        QUERY: () => Promise<any>;
        BL: (value: Insteon.Backlight) => Promise<any>;
        WDU: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: "KeypadButton" | "KeypadButton_ADV";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    query(): Promise<any>;
    backlight(value: Insteon.Backlight): Promise<any>;
    writeChanges(): Promise<any>;
    get status(): Insteon.OnLevelRelay;
    get responding(): Insteon.Error;
}
export declare namespace KeypadButton {
    interface Interface extends Omit<InstanceType<typeof KeypadButtonNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "KeypadButton" | "KeypadButton_ADV";
    }
    function is(node: ISYNode<any, any, any, any>): node is KeypadButtonNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is KeypadButtonNode;
    function create(isy: ISY, nodeInfo: NodeInfo): KeypadButtonNode;
    const Node: typeof KeypadButtonNode;
    type Commands = {
        QUERY: (() => Promise<boolean>) & {
            label: "Query";
            name: "query";
        };
        BL: ((value: Insteon.Backlight) => Promise<boolean>) & {
            label: "Backlight";
            name: "backlight";
        };
        WDU: (() => Promise<boolean>) & {
            label: "Write Changes";
            name: "writeChanges";
        };
    };
    type Drivers = {
        ST: {
            uom: UnitOfMeasure.Percent;
            value: Insteon.OnLevelRelay;
            label: "Status";
            name: "status";
        };
        ERR: {
            uom: UnitOfMeasure.Index;
            value: Insteon.Error;
            label: "Responding";
            name: "responding";
        };
    };
}
export {};
//# sourceMappingURL=KeypadButton.d.ts.map