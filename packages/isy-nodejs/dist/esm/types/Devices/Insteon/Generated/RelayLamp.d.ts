import { Family, UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from "../index.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = RelayLamp.Commands.Type;
type Drivers = RelayLamp.Drivers.Type;
declare class RelayLampNode extends Base<Drivers, Commands> implements RelayLamp.Interface {
    readonly commands: {
        DON: (value?: (0 | 100)) => Promise<any>;
        DOF: () => Promise<any>;
        DFOF: () => Promise<any>;
        DFON: () => Promise<any>;
        QUERY: () => Promise<any>;
        BEEP: (value?: number) => Promise<any>;
        WDU: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: 'RelayLampOnly' | "RelayLampOnly_ADV";
    constructor(isy: ISY, nodeInfo: NodeInfo<Family.Insteon>);
    on(value?: (0 | 100)): Promise<any>;
    off(): Promise<any>;
    fastOff(): Promise<any>;
    fastOn(): Promise<any>;
    query(): Promise<any>;
    beep(value?: number): Promise<any>;
    writeChanges(): Promise<any>;
    get status(): Insteon.OnLevelRelay;
    get responding(): Insteon.Error;
}
export declare namespace RelayLamp {
    interface Interface extends Omit<InstanceType<typeof RelayLampNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is RelayLampNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is RelayLampNode;
    function create(isy: ISY, nodeInfo: NodeInfo<Family.Insteon>): RelayLampNode;
    const Node: typeof RelayLampNode;
    const Class: typeof RelayLampNode;
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
            DFOF: (() => Promise<boolean>) & {
                label: "Fast Off";
                name: "fastOff";
            };
            DFON: (() => Promise<boolean>) & {
                label: "Fast On";
                name: "fastOn";
            };
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
        on = "DON",
        off = "DOF",
        fastOff = "DFOF",
        fastOn = "DFON",
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
//# sourceMappingURL=RelayLamp.d.ts.map