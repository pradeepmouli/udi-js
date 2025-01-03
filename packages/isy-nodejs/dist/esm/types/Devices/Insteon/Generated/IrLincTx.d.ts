import { Family, UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from "../index.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = IrLincTx.Commands.Type;
type Drivers = IrLincTx.Drivers.Type;
declare class IrLincTxNode extends Base<Drivers, Commands> implements IrLincTx.Interface {
    readonly commands: {
        BEEP: (value?: number) => Promise<any>;
        WDU: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: 'IRLincTx';
    constructor(isy: ISY, nodeInfo: NodeInfo<Family.Insteon>);
    beep(value?: number): Promise<any>;
    writeChanges(): Promise<any>;
    get responding(): Insteon.Error;
}
export declare namespace IrLincTx {
    interface Interface extends Omit<InstanceType<typeof IrLincTxNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is IrLincTxNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is IrLincTxNode;
    function create(isy: ISY, nodeInfo: NodeInfo<Family.Insteon>): IrLincTxNode;
    const Node: typeof IrLincTxNode;
    const Class: typeof IrLincTxNode;
    namespace Commands {
        type Type = {
            BEEP: ((value?: number) => Promise<boolean>) & {
                label: "Beep";
                name: "beep";
            };
            WDU: (() => Promise<boolean>) & {
                label: "Write Changes";
                name: "writeChanges";
            };
        };
    }
    enum Commands {
        beep = "BEEP",
        writeChanges = "WDU"
    }
    namespace Drivers {
        type Type = {
            ERR: {
                uom: UnitOfMeasure.Index;
                value: Insteon.Error;
                label: "Responding";
                name: "responding";
            };
        };
    }
    enum Drivers {
        responding = "ERR"
    }
}
export {};
//# sourceMappingURL=IrLincTx.d.ts.map