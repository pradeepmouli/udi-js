import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = DoorLock.Commands;
type Drivers = DoorLock.Drivers;
export declare class DoorLockNode extends Base<Drivers, Commands> implements DoorLock.Interface {
    readonly commands: {
        DON: () => Promise<any>;
        DOF: () => Promise<any>;
        WDU: () => Promise<any>;
    };
    static nodeDefId: string;
    readonly nodeDefId: "DoorLock";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    lock(): Promise<any>;
    unlock(): Promise<any>;
    writeChanges(): Promise<any>;
    get status(): Insteon.Lock;
    get responding(): Insteon.Error;
}
export declare namespace DoorLock {
    interface Interface extends Omit<InstanceType<typeof DoorLockNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "DoorLock";
    }
    function is(node: ISYNode<any, any, any, any>): node is DoorLockNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is DoorLockNode;
    function create(isy: ISY, nodeInfo: NodeInfo): DoorLockNode;
    const Node: typeof DoorLockNode;
    type Commands = {
        DON: (() => Promise<boolean>) & {
            label: "Lock";
            name: "lock";
        };
        DOF: (() => Promise<boolean>) & {
            label: "Unlock";
            name: "unlock";
        };
        WDU: (() => Promise<boolean>) & {
            label: "Write Changes";
            name: "writeChanges";
        };
    };
    type Drivers = {
        ST: {
            uom: UnitOfMeasure.Percent;
            value: Insteon.Lock;
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
//# sourceMappingURL=DoorLock.d.ts.map