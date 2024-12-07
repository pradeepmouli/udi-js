import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = SirenAlert.Commands.Type;
type Drivers = SirenAlert.Drivers.Type;
declare class SirenAlertNode extends Base<Drivers, Commands> implements SirenAlert.Interface {
    readonly commands: {};
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: 'SirenAlert' | "SirenArm";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    get responding(): Insteon.Error;
}
export declare namespace SirenAlert {
    interface Interface extends Omit<InstanceType<typeof SirenAlertNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is SirenAlertNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is SirenAlertNode;
    function create(isy: ISY, nodeInfo: NodeInfo): SirenAlertNode;
    const Node: typeof SirenAlertNode;
    const Class: typeof SirenAlertNode;
    namespace Commands {
        type Type = {};
    }
    enum Commands {
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
//# sourceMappingURL=SirenAlert.d.ts.map