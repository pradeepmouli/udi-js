import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = RelaySwitchOnlyPlusQuery.Commands.Type;
type Drivers = RelaySwitchOnlyPlusQuery.Drivers.Type;
declare class RelaySwitchOnlyPlusQueryNode extends Base<Drivers, Commands> implements RelaySwitchOnlyPlusQuery.Interface {
    readonly commands: {
        QUERY: () => Promise<any>;
        BEEP: (value?: number) => Promise<any>;
        BL: (value: number) => Promise<any>;
        WDU: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: 'RelaySwitchOnlyPlusQuery' | "RelaySwitchOnlyPlusQuery_ADV";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    query(): Promise<any>;
    beep(value?: number): Promise<any>;
    backlight(value: number): Promise<any>;
    writeChanges(): Promise<any>;
    get responding(): Insteon.Error;
}
export declare namespace RelaySwitchOnlyPlusQuery {
    interface Interface extends Omit<InstanceType<typeof RelaySwitchOnlyPlusQueryNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is RelaySwitchOnlyPlusQueryNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is RelaySwitchOnlyPlusQueryNode;
    function create(isy: ISY, nodeInfo: NodeInfo): RelaySwitchOnlyPlusQueryNode;
    const Node: typeof RelaySwitchOnlyPlusQueryNode;
    const Class: typeof RelaySwitchOnlyPlusQueryNode;
    namespace Commands {
        type Type = {
            QUERY: (() => Promise<boolean>) & {
                label: "Query";
                name: "query";
            };
            BEEP: ((value?: number) => Promise<boolean>) & {
                label: "Beep";
                name: "beep";
            };
            BL: ((value: number) => Promise<boolean>) & {
                label: "Backlight";
                name: "backlight";
            };
            WDU: (() => Promise<boolean>) & {
                label: "Write Changes";
                name: "writeChanges";
            };
        };
    }
    enum Commands {
        query = "QUERY",
        beep = "BEEP",
        backlight = "BL",
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
//# sourceMappingURL=RelaySwitchOnlyPlusQuery.d.ts.map