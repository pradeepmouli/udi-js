import { UnitOfMeasure } from '../../Definitions/Global/UOM.js';
import type { NodeInfo } from '../../Model/NodeInfo.js';
import type { ISY } from '../../ISY.js';
import type { ISYNode } from '../../ISYNode.js';
import { InsteonBaseDevice as Base } from './InsteonBaseDevice.js';
import { ISYDeviceNode } from '../ISYDeviceNode.js';
import { Insteon } from '../../Definitions/index.js';
export declare const nodeDefId = "DimmerLampSwitch";
type Commands = DimmerLampSwitch.Commands;
type Drivers = DimmerLampSwitch.Drivers;
export declare class DimmerLampSwitchNode extends Base<Drivers, Commands> implements DimmerLampSwitch.Interface {
    readonly commands: {
        DON: (value?: number) => Promise<any>;
        DOF: () => Promise<any>;
        DFOF: () => Promise<any>;
        DFON: () => Promise<any>;
        BRT: () => Promise<any>;
        DIM: () => Promise<any>;
        FDUP: () => Promise<any>;
        FDDOWN: () => Promise<any>;
        FDSTOP: () => Promise<any>;
        QUERY: () => Promise<any>;
        BEEP: (value?: number) => Promise<any>;
        OL: (value: number) => Promise<any>;
        RR: (value: number) => Promise<any>;
        BL: (value: number) => Promise<any>;
        WDU: () => Promise<any>;
    };
    static nodeDefId: string;
    readonly nodeDefId: "DimmerLampSwitch";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    on(value?: number): Promise<any>;
    off(): Promise<any>;
    fastOff(): Promise<any>;
    fastOn(): Promise<any>;
    brighten(): Promise<any>;
    dim(): Promise<any>;
    fadeUp(): Promise<any>;
    fadeDown(): Promise<any>;
    fadeStop(): Promise<any>;
    query(): Promise<any>;
    beep(value?: number): Promise<any>;
    updateOnLevel(value: number): Promise<any>;
    updateRampRate(value: number): Promise<any>;
    backlight(value: number): Promise<any>;
    writeChanges(): Promise<any>;
    get status(): number;
    get onLevel(): number;
    get rampRate(): number;
    get responding(): Insteon.Error;
}
export declare namespace DimmerLampSwitch {
    interface Interface extends Omit<InstanceType<typeof DimmerLampSwitchNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "DimmerLampSwitch";
    }
    function is(node: ISYNode<any, any, any, any>): node is DimmerLampSwitchNode;
    function create(isy: ISY, nodeInfo: NodeInfo): DimmerLampSwitchNode;
    const Node: typeof DimmerLampSwitchNode;
    type Commands = {
        DON: ((value?: number) => Promise<boolean>) & {
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
        BRT: (() => Promise<boolean>) & {
            label: "Brighten";
            name: "brighten";
        };
        DIM: (() => Promise<boolean>) & {
            label: "Dim";
            name: "dim";
        };
        FDUP: (() => Promise<boolean>) & {
            label: "Fade Up";
            name: "fadeUp";
        };
        FDDOWN: (() => Promise<boolean>) & {
            label: "Fade Down";
            name: "fadeDown";
        };
        FDSTOP: (() => Promise<boolean>) & {
            label: "Fade Stop";
            name: "fadeStop";
        };
        QUERY: (() => Promise<boolean>) & {
            label: "Query";
            name: "query";
        };
        BEEP: ((value?: number) => Promise<boolean>) & {
            label: "Beep";
            name: "beep";
        };
        OL: ((value: number) => Promise<boolean>) & {
            label: "On Level";
            name: "updateOnLevel";
        };
        RR: ((value: number) => Promise<boolean>) & {
            label: "Ramp Rate";
            name: "updateRampRate";
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
            value: number;
            label: "Status";
            name: "status";
        };
        OL: {
            uom: UnitOfMeasure.Percent;
            value: number;
            label: "On Level";
            name: "onLevel";
        };
        RR: {
            uom: UnitOfMeasure.Index;
            value: number;
            label: "Ramp Rate";
            name: "rampRate";
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
//# sourceMappingURL=DimmerLampSwitch.d.ts.map