import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = BallastRelayLampSwitch.Commands;
type Drivers = BallastRelayLampSwitch.Drivers;
export declare class BallastRelayLampSwitchNode extends Base<Drivers, Commands> implements BallastRelayLampSwitch.Interface {
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
    readonly nodeDefId: "BallastRelayLampSwitch" | "BallastRelayLampSwitch_ADV";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    on(value?: (0 | 100)): Promise<any>;
    off(): Promise<any>;
    fastOff(): Promise<any>;
    fastOn(): Promise<any>;
    query(): Promise<any>;
    beep(value?: number): Promise<any>;
    writeChanges(): Promise<any>;
    get status(): Insteon.Sml;
    get responding(): Insteon.Error;
}
export declare namespace BallastRelayLampSwitch {
    interface Interface extends Omit<InstanceType<typeof BallastRelayLampSwitchNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "BallastRelayLampSwitch" | "BallastRelayLampSwitch_ADV";
    }
    function is(node: ISYNode<any, any, any, any>): node is BallastRelayLampSwitchNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is BallastRelayLampSwitchNode;
    function create(isy: ISY, nodeInfo: NodeInfo): BallastRelayLampSwitchNode;
    const Node: typeof BallastRelayLampSwitchNode;
    type Commands = {
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
    type Drivers = {
        ST: {
            uom: UnitOfMeasure.Percent;
            value: Insteon.Sml;
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
//# sourceMappingURL=BallastRelayLampSwitch.d.ts.map