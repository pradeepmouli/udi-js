import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = RelaySwitch.Commands.Type;
type Drivers = RelaySwitch.Drivers.Type;
declare class RelaySwitchNode extends Base<Drivers, Commands> implements RelaySwitch.Interface {
    readonly commands: {
        BEEP: (value?: number) => Promise<any>;
        BL: (value: number) => Promise<any>;
        WDU: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: 'RelaySwitchOnly' | "RelaySwitchOnly_ADV";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    beep(value?: number): Promise<any>;
    backlight(value: number): Promise<any>;
    writeChanges(): Promise<any>;
    get responding(): Insteon.Error;
}
export declare namespace RelaySwitch {
    interface Interface extends Omit<InstanceType<typeof RelaySwitchNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is RelaySwitchNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is RelaySwitchNode;
    function create(isy: ISY, nodeInfo: NodeInfo): RelaySwitchNode;
    const Node: typeof RelaySwitchNode;
    const Class: typeof RelaySwitchNode;
    namespace Commands {
        type Type = {
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
//# sourceMappingURL=RelaySwitch.d.ts.map