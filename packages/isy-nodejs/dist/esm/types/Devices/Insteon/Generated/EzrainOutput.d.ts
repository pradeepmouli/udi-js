import { Family, UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from "../index.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = EzrainOutput.Commands.Type;
type Drivers = EzrainOutput.Drivers.Type;
declare class EzrainOutputNode extends Base<Drivers, Commands> implements EzrainOutput.Interface {
    readonly commands: {
        DON: (value?: (0 | 100)) => Promise<any>;
        DOF: () => Promise<any>;
        QUERY: () => Promise<any>;
        WDU: () => Promise<any>;
        BEEP: (value?: number) => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: 'EZRAIN_Output';
    constructor(isy: ISY, nodeInfo: NodeInfo<Family.Insteon>);
    on(value?: (0 | 100)): Promise<any>;
    off(): Promise<any>;
    query(): Promise<any>;
    writeChanges(): Promise<any>;
    beep(value?: number): Promise<any>;
    get status(): Insteon.OnLevelRelay;
    get responding(): Insteon.Error;
}
export declare namespace EzrainOutput {
    interface Interface extends Omit<InstanceType<typeof EzrainOutputNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is EzrainOutputNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is EzrainOutputNode;
    function create(isy: ISY, nodeInfo: NodeInfo<Family.Insteon>): EzrainOutputNode;
    const Node: typeof EzrainOutputNode;
    const Class: typeof EzrainOutputNode;
    namespace Commands {
        type Type = {
            DON: ((value?: (0 | 100)) => Promise<boolean>) & {
                label: "On";
                name: "on";
            };
            DOF: (() => Promise<boolean>) & {
                label: "Off";
                name: "off";
            };
            QUERY: (() => Promise<boolean>) & {
                label: "Query";
                name: "query";
            };
            WDU: (() => Promise<boolean>) & {
                label: "Write Changes";
                name: "writeChanges";
            };
            BEEP: ((value?: number) => Promise<boolean>) & {
                label: "Beep";
                name: "beep";
            };
        };
    }
    enum Commands {
        on = "DON",
        off = "DOF",
        query = "QUERY",
        writeChanges = "WDU",
        beep = "BEEP"
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
//# sourceMappingURL=EzrainOutput.d.ts.map