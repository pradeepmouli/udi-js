import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = RelayLampSwitchLed.Commands;
type Drivers = RelayLampSwitchLed.Drivers;
export declare class RelayLampSwitchLedNode extends Base<Drivers, Commands> implements RelayLampSwitchLed.Interface {
    readonly commands: {
        DON: (value?: (0 | 100)) => Promise<any>;
        DOF: () => Promise<any>;
        DFOF: () => Promise<any>;
        DFON: () => Promise<any>;
        QUERY: () => Promise<any>;
        BEEP: (value?: number) => Promise<any>;
        LED: (value: Insteon.I3RgbLed) => Promise<any>;
        BL: (value: number) => Promise<any>;
        WDU: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: "RelayLampSwitchLED" | "RelayLampSwitchLED_ADV";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    on(value?: (0 | 100)): Promise<any>;
    off(): Promise<any>;
    fastOff(): Promise<any>;
    fastOn(): Promise<any>;
    query(): Promise<any>;
    beep(value?: number): Promise<any>;
    led(value: Insteon.I3RgbLed): Promise<any>;
    backlight(value: number): Promise<any>;
    writeChanges(): Promise<any>;
    get status(): Insteon.OnLevelRelay;
    get responding(): Insteon.Error;
}
export declare namespace RelayLampSwitchLed {
    interface Interface extends Omit<InstanceType<typeof RelayLampSwitchLedNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "RelayLampSwitchLED" | "RelayLampSwitchLED_ADV";
    }
    function is(node: ISYNode<any, any, any, any>): node is RelayLampSwitchLedNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is RelayLampSwitchLedNode;
    function create(isy: ISY, nodeInfo: NodeInfo): RelayLampSwitchLedNode;
    const Node: typeof RelayLampSwitchLedNode;
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
        LED: ((value: Insteon.I3RgbLed) => Promise<boolean>) & {
            label: "LED";
            name: "led";
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
//# sourceMappingURL=RelayLampSwitchLed.d.ts.map