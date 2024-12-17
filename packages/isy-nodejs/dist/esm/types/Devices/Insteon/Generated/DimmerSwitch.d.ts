import { UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = DimmerSwitch.Commands.Type;
type Drivers = DimmerSwitch.Drivers.Type;
declare class DimmerSwitchNode extends Base<Drivers, Commands> implements DimmerSwitch.Interface {
    readonly commands: {
        BL: (value: number) => Promise<any>;
        WDU: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: 'DimmerSwitchOnly' | "DimmerSwitchOnly_ADV";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    backlight(value: number): Promise<any>;
    writeChanges(): Promise<any>;
    get responding(): Insteon.Error;
}
export declare namespace DimmerSwitch {
    interface Interface extends Omit<InstanceType<typeof DimmerSwitchNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is DimmerSwitchNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is DimmerSwitchNode;
    function create(isy: ISY, nodeInfo: NodeInfo): DimmerSwitchNode;
    const Node: typeof DimmerSwitchNode;
    const Class: typeof DimmerSwitchNode;
    namespace Commands {
        type Type = {
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
//# sourceMappingURL=DimmerSwitch.d.ts.map