import { UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import type { IntRange } from "type-fest";
import { Insteon } from "../../../Definitions/index.js";
type Commands = Siren.Commands.Type;
type Drivers = Siren.Drivers.Type;
declare class SirenNode extends Base<Drivers, Commands> implements Siren.Interface {
    readonly commands: {
        DON: (duration?: number) => Promise<any>;
        DOF: () => Promise<any>;
        ARM: (value: Insteon.SirenMode) => Promise<any>;
        DISARM: () => Promise<any>;
        QUERY: () => Promise<any>;
        BEEP: (value?: number) => Promise<any>;
        WDU: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: 'Siren' | "Siren_ADV";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    on(duration?: number): Promise<any>;
    off(): Promise<any>;
    arm(value: Insteon.SirenMode): Promise<any>;
    disarm(): Promise<any>;
    query(): Promise<any>;
    beep(value?: number): Promise<any>;
    writeChanges(): Promise<any>;
    get siren(): Insteon.OnLevelRelay;
    get mode(): Insteon.SirenModeQuery;
    get armCountdown(): IntRange<0, 127>;
    get sirenDuration(): IntRange<0, 255>;
    get responding(): Insteon.Error;
}
export declare namespace Siren {
    interface Interface extends Omit<InstanceType<typeof SirenNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is SirenNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is SirenNode;
    function create(isy: ISY, nodeInfo: NodeInfo): SirenNode;
    const Node: typeof SirenNode;
    const Class: typeof SirenNode;
    namespace Commands {
        type Type = {
            DON: ((DUR?: number) => Promise<boolean>) & {
                label: "On";
                name: "on";
            };
            DOF: (() => Promise<boolean>) & {
                label: "Off";
                name: "off";
            };
            ARM: ((value: Insteon.SirenMode) => Promise<boolean>) & {
                label: "Arm";
                name: "arm";
            };
            DISARM: (() => Promise<boolean>) & {
                label: "Disarm";
                name: "disarm";
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
        arm = "ARM",
        disarm = "DISARM",
        query = "QUERY",
        beep = "BEEP",
        writeChanges = "WDU"
    }
    namespace Drivers {
        type Type = {
            ST: {
                uom: UnitOfMeasure.Percent;
                value: Insteon.OnLevelRelay;
                label: "Siren";
                name: "siren";
            };
            MODE: {
                uom: UnitOfMeasure.Index;
                value: Insteon.SirenModeQuery;
                label: "Mode";
                name: "mode";
            };
            DELAY: {
                uom: UnitOfMeasure.DurationInSeconds;
                value: IntRange<0, 127>;
                label: "Arm Countdown";
                name: "armCountdown";
            };
            DUR: {
                uom: UnitOfMeasure.DurationInSeconds;
                value: IntRange<0, 255>;
                label: "Siren Duration";
                name: "sirenDuration";
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
        siren = "ST",
        mode = "MODE",
        armCountdown = "DELAY",
        sirenDuration = "DUR",
        responding = "ERR"
    }
}
export {};
//# sourceMappingURL=Siren.d.ts.map