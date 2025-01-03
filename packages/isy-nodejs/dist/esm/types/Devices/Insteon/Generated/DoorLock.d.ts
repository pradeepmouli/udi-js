import { Family, UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from "../index.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = DoorLock.Commands.Type;
type Drivers = DoorLock.Drivers.Type;
declare class DoorLockNode extends Base<Drivers, Commands> implements DoorLock.Interface {
    readonly commands: {
        DON: () => Promise<any>;
        DOF: () => Promise<any>;
        WDU: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: 'DoorLock';
    constructor(isy: ISY, nodeInfo: NodeInfo<Family.Insteon>);
    lock(): Promise<any>;
    unlock(): Promise<any>;
    writeChanges(): Promise<any>;
    get status(): Insteon.Lock;
    get responding(): Insteon.Error;
}
export declare namespace DoorLock {
    interface Interface extends Omit<InstanceType<typeof DoorLockNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is DoorLockNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is DoorLockNode;
    function create(isy: ISY, nodeInfo: NodeInfo<Family.Insteon>): DoorLockNode;
    const Node: typeof DoorLockNode;
    const Class: typeof DoorLockNode;
    namespace Commands {
        type Type = {
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
    }
    enum Commands {
        lock = "DON",
        unlock = "DOF",
        writeChanges = "WDU"
    }
    namespace Drivers {
        type Type = {
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
    enum Drivers {
        status = "ST",
        responding = "ERR"
    }
}
export {};
//# sourceMappingURL=DoorLock.d.ts.map