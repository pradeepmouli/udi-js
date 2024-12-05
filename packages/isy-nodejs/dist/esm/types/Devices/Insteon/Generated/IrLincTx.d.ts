import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = IrLincTx.Commands;
type Drivers = IrLincTx.Drivers;
declare class IrLincTxNode extends Base<Drivers, Commands> implements IrLincTx.Interface {
    readonly commands: {
        BEEP: (value?: number) => Promise<any>;
        WDU: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: 'IRLincTx';
    constructor(isy: ISY, nodeInfo: NodeInfo);
    beep(value?: number): Promise<any>;
    writeChanges(): Promise<any>;
    get responding(): Insteon.Error;
}
export declare namespace IrLincTx {
    interface Interface extends Omit<InstanceType<typeof IrLincTxNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is IrLincTxNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is IrLincTxNode;
    function create(isy: ISY, nodeInfo: NodeInfo): IrLincTxNode;
    const Node: typeof IrLincTxNode;
    type Commands = {
        BEEP: ((value?: number) => Promise<boolean>) & {
            label: "Beep";
            name: "beep";
        };
        WDU: (() => Promise<boolean>) & {
            label: "Write Changes";
            name: "writeChanges";
        };
    };
    type Drivers = {
        ERR: {
            uom: UnitOfMeasure.Index;
            value: Insteon.Error;
            label: "Responding";
            name: "responding";
        };
    };
}
export {};
//# sourceMappingURL=IrLincTx.d.ts.map