import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = EzrainInput.Commands;
type Drivers = EzrainInput.Drivers;
export declare class EzrainInputNode extends Base<Drivers, Commands> implements EzrainInput.Interface {
    readonly commands: {
        WDU: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: "EZRAIN_Input" | "EZRAIN_Input_ADV";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    writeChanges(): Promise<any>;
    get status(): Insteon.OnLevelRelay;
    get responding(): Insteon.Error;
}
export declare namespace EzrainInput {
    interface Interface extends Omit<InstanceType<typeof EzrainInputNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "EZRAIN_Input" | "EZRAIN_Input_ADV";
    }
    function is(node: ISYNode<any, any, any, any>): node is EzrainInputNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is EzrainInputNode;
    function create(isy: ISY, nodeInfo: NodeInfo): EzrainInputNode;
    const Node: typeof EzrainInputNode;
    type Commands = {
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
//# sourceMappingURL=EzrainInput.d.ts.map