import { Family, UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from "../index.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = BinaryAlarm.Commands.Type;
type Drivers = BinaryAlarm.Drivers.Type;
declare class BinaryAlarmNode extends Base<Drivers, Commands> implements BinaryAlarm.Interface {
    readonly commands: {
        QUERY: () => Promise<any>;
        BEEP: (value?: number) => Promise<any>;
        WDU: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: 'BinaryAlarm' | "BinaryAlarm_ADV";
    constructor(isy: ISY, nodeInfo: NodeInfo<Family.Insteon>);
    query(): Promise<any>;
    beep(value?: number): Promise<any>;
    writeChanges(): Promise<any>;
    get status(): Insteon.OnLevelRelay;
    get responding(): Insteon.Error;
}
export declare namespace BinaryAlarm {
    interface Interface extends Omit<InstanceType<typeof BinaryAlarmNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is BinaryAlarmNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is BinaryAlarmNode;
    function create(isy: ISY, nodeInfo: NodeInfo<Family.Insteon>): BinaryAlarmNode;
    const Node: typeof BinaryAlarmNode;
    const Class: typeof BinaryAlarmNode;
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
            WDU: (() => Promise<boolean>) & {
                label: "Write Changes";
                name: "writeChanges";
            };
        };
    }
    enum Commands {
        query = "QUERY",
        beep = "BEEP",
        writeChanges = "WDU"
    }
    namespace Drivers {
        type Type = {
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
    enum Drivers {
        status = "ST",
        responding = "ERR"
    }
}
export {};
//# sourceMappingURL=BinaryAlarm.d.ts.map