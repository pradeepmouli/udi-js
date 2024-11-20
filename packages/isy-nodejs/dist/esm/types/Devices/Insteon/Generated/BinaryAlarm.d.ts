import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = BinaryAlarm.Commands;
type Drivers = BinaryAlarm.Drivers;
export declare class BinaryAlarmNode extends Base<Drivers, Commands> implements BinaryAlarm.Interface {
    readonly commands: {
        QUERY: () => Promise<any>;
        BEEP: (value?: number) => Promise<any>;
        WDU: () => Promise<any>;
    };
    static nodeDefId: string;
    readonly nodeDefId: "BinaryAlarm" | "BinaryAlarm_ADV";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    query(): Promise<any>;
    beep(value?: number): Promise<any>;
    writeChanges(): Promise<any>;
    get status(): Insteon.OnLevelRelay;
    get responding(): Insteon.Error;
}
export declare namespace BinaryAlarm {
    interface Interface extends Omit<InstanceType<typeof BinaryAlarmNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "BinaryAlarm" | "BinaryAlarm_ADV";
    }
    function is(node: ISYNode<any, any, any, any>): node is BinaryAlarmNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is BinaryAlarmNode;
    function create(isy: ISY, nodeInfo: NodeInfo): BinaryAlarmNode;
    const Node: typeof BinaryAlarmNode;
    type Commands = {
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
//# sourceMappingURL=BinaryAlarm.d.ts.map