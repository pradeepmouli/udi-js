import { Family, UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from "../index.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = I3PaddleFlags.Commands.Type;
type Drivers = I3PaddleFlags.Drivers.Type;
declare class I3PaddleFlagsNode extends Base<Drivers, Commands> implements I3PaddleFlags.Interface {
    readonly commands: {
        GV0: (value: Insteon.I3RelayDim) => Promise<any>;
        GV1: (value: Insteon.I3OnOff) => Promise<any>;
        GV2: (value: Insteon.I3OnOff) => Promise<any>;
        GV4: (value: Insteon.I3OnOff) => Promise<any>;
        GV5: (value: Insteon.I3OnOff) => Promise<any>;
        GV6: (value: Insteon.I3OnOff) => Promise<any>;
        GV7: (value: Insteon.I3OnOff) => Promise<any>;
        QUERY: () => Promise<any>;
        WDU: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: 'I3PaddleFlags';
    constructor(isy: ISY, nodeInfo: NodeInfo<Family.Insteon>);
    updateMode(value: Insteon.I3RelayDim): Promise<any>;
    updateProgramLock(value: Insteon.I3OnOff): Promise<any>;
    updateResumeDim(value: Insteon.I3OnOff): Promise<any>;
    updateKeyBeep(value: Insteon.I3OnOff): Promise<any>;
    updateDisableRf(value: Insteon.I3OnOff): Promise<any>;
    updateButtonLock(value: Insteon.I3OnOff): Promise<any>;
    updateErrorBlink(value: Insteon.I3OnOff): Promise<any>;
    query(): Promise<any>;
    writeChanges(): Promise<any>;
    get mode(): Insteon.I3RelayDim;
    get programLock(): Insteon.I3OnOff;
    get resumeDim(): Insteon.I3OnOff;
    get keyBeep(): Insteon.I3OnOff;
    get disableRf(): Insteon.I3OnOff;
    get buttonLock(): Insteon.I3OnOff;
    get errorBlink(): Insteon.I3OnOff;
    get responding(): Insteon.Error;
}
export declare namespace I3PaddleFlags {
    interface Interface extends Omit<InstanceType<typeof I3PaddleFlagsNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is I3PaddleFlagsNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is I3PaddleFlagsNode;
    function create(isy: ISY, nodeInfo: NodeInfo<Family.Insteon>): I3PaddleFlagsNode;
    const Node: typeof I3PaddleFlagsNode;
    const Class: typeof I3PaddleFlagsNode;
    namespace Commands {
        type Type = {
            GV0: ((value: Insteon.I3RelayDim) => Promise<boolean>) & {
                label: "Mode";
                name: "updateMode";
            };
            GV1: ((value: Insteon.I3OnOff) => Promise<boolean>) & {
                label: "Program Lock";
                name: "updateProgramLock";
            };
            GV2: ((value: Insteon.I3OnOff) => Promise<boolean>) & {
                label: "Resume Dim";
                name: "updateResumeDim";
            };
            GV4: ((value: Insteon.I3OnOff) => Promise<boolean>) & {
                label: "Key Beep";
                name: "updateKeyBeep";
            };
            GV5: ((value: Insteon.I3OnOff) => Promise<boolean>) & {
                label: "Disable RF";
                name: "updateDisableRf";
            };
            GV6: ((value: Insteon.I3OnOff) => Promise<boolean>) & {
                label: "Button Lock";
                name: "updateButtonLock";
            };
            GV7: ((value: Insteon.I3OnOff) => Promise<boolean>) & {
                label: "Error Blink";
                name: "updateErrorBlink";
            };
            QUERY: (() => Promise<boolean>) & {
                label: "Query";
                name: "query";
            };
            WDU: (() => Promise<boolean>) & {
                label: "Write Changes";
                name: "writeChanges";
            };
        };
    }
    enum Commands {
        updateMode = "GV0",
        updateProgramLock = "GV1",
        updateResumeDim = "GV2",
        updateKeyBeep = "GV4",
        updateDisableRf = "GV5",
        updateButtonLock = "GV6",
        updateErrorBlink = "GV7",
        query = "QUERY",
        writeChanges = "WDU"
    }
    namespace Drivers {
        type Type = {
            ST: {
                uom: UnitOfMeasure.Boolean;
                value: Insteon.I3RelayDim;
                label: "Mode";
                name: "mode";
            };
            GV1: {
                uom: UnitOfMeasure.Boolean;
                value: Insteon.I3OnOff;
                label: "Program Lock";
                name: "programLock";
            };
            GV2: {
                uom: UnitOfMeasure.Boolean;
                value: Insteon.I3OnOff;
                label: "Resume Dim";
                name: "resumeDim";
            };
            GV4: {
                uom: UnitOfMeasure.Boolean;
                value: Insteon.I3OnOff;
                label: "Key Beep";
                name: "keyBeep";
            };
            GV5: {
                uom: UnitOfMeasure.Boolean;
                value: Insteon.I3OnOff;
                label: "Disable RF";
                name: "disableRf";
            };
            GV6: {
                uom: UnitOfMeasure.Boolean;
                value: Insteon.I3OnOff;
                label: "Button Lock";
                name: "buttonLock";
            };
            GV7: {
                uom: UnitOfMeasure.Boolean;
                value: Insteon.I3OnOff;
                label: "Error Blink";
                name: "errorBlink";
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
        mode = "ST",
        programLock = "GV1",
        resumeDim = "GV2",
        keyBeep = "GV4",
        disableRf = "GV5",
        buttonLock = "GV6",
        errorBlink = "GV7",
        responding = "ERR"
    }
}
export {};
//# sourceMappingURL=I3PaddleFlags.d.ts.map