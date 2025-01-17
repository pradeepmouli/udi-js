import { Family, UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from "../index.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = I3KeypadFlags.Commands.Type;
type Drivers = I3KeypadFlags.Drivers.Type;
declare class I3KeypadFlagsNode extends Base<Drivers, Commands> implements I3KeypadFlags.Interface {
    readonly commands: {
        GV0: (value: Insteon.I3RelayDim) => Promise<any>;
        GV1: (value: Insteon.I3OnOff) => Promise<any>;
        GV2: (value: Insteon.I3OnOff) => Promise<any>;
        GV3: (value: Insteon.I3OnOff) => Promise<any>;
        GV4: (value: Insteon.I3OnOff) => Promise<any>;
        GV5: (value: Insteon.I3OnOff) => Promise<any>;
        GV6: (value: Insteon.I3OnOff) => Promise<any>;
        GV7: (value: Insteon.I3OnOff) => Promise<any>;
        GV8: (value: Insteon.I3OnOff) => Promise<any>;
        QUERY: () => Promise<any>;
        WDU: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: 'I3KeypadFlags';
    constructor(isy: ISY, nodeInfo: NodeInfo<Family.Insteon>);
    updateMode(value: Insteon.I3RelayDim): Promise<any>;
    updateProgramLock(value: Insteon.I3OnOff): Promise<any>;
    updateResumeDim(value: Insteon.I3OnOff): Promise<any>;
    updateRelayAtFullOn(value: Insteon.I3OnOff): Promise<any>;
    updateKeyBeep(value: Insteon.I3OnOff): Promise<any>;
    updateDisableRf(value: Insteon.I3OnOff): Promise<any>;
    updateButtonLock(value: Insteon.I3OnOff): Promise<any>;
    updateErrorBlink(value: Insteon.I3OnOff): Promise<any>;
    updateCleanupReports(value: Insteon.I3OnOff): Promise<any>;
    query(): Promise<any>;
    writeChanges(): Promise<any>;
    get mode(): Insteon.I3RelayDim;
    get programLock(): Insteon.I3OnOff;
    get resumeDim(): Insteon.I3OnOff;
    get relayAtFullOn(): Insteon.I3OnOff;
    get keyBeep(): Insteon.I3OnOff;
    get disableRf(): Insteon.I3OnOff;
    get buttonLock(): Insteon.I3OnOff;
    get errorBlink(): Insteon.I3OnOff;
    get cleanupReports(): Insteon.I3OnOff;
    get responding(): Insteon.Error;
}
export declare namespace I3KeypadFlags {
    interface Interface extends Omit<InstanceType<typeof I3KeypadFlagsNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is I3KeypadFlagsNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is I3KeypadFlagsNode;
    function create(isy: ISY, nodeInfo: NodeInfo<Family.Insteon>): I3KeypadFlagsNode;
    const Node: typeof I3KeypadFlagsNode;
    const Class: typeof I3KeypadFlagsNode;
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
            GV3: ((value: Insteon.I3OnOff) => Promise<boolean>) & {
                label: "Relay at Full On";
                name: "updateRelayAtFullOn";
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
            GV8: ((value: Insteon.I3OnOff) => Promise<boolean>) & {
                label: "Cleanup Reports";
                name: "updateCleanupReports";
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
        updateRelayAtFullOn = "GV3",
        updateKeyBeep = "GV4",
        updateDisableRf = "GV5",
        updateButtonLock = "GV6",
        updateErrorBlink = "GV7",
        updateCleanupReports = "GV8",
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
            GV3: {
                uom: UnitOfMeasure.Boolean;
                value: Insteon.I3OnOff;
                label: "Relay at Full On";
                name: "relayAtFullOn";
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
            GV8: {
                uom: UnitOfMeasure.Boolean;
                value: Insteon.I3OnOff;
                label: "Cleanup Reports";
                name: "cleanupReports";
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
        relayAtFullOn = "GV3",
        keyBeep = "GV4",
        disableRf = "GV5",
        buttonLock = "GV6",
        errorBlink = "GV7",
        cleanupReports = "GV8",
        responding = "ERR"
    }
}
export {};
//# sourceMappingURL=I3KeypadFlags.d.ts.map