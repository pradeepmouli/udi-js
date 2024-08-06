import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Definitions/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
export declare const nodeDefId = "I3PaddleFlags";
type Commands = {
    GV0: (value: I3RelayDim) => Promise<boolean>;
    GV1: (value: I3OnOff) => Promise<boolean>;
    GV2: (value: I3OnOff) => Promise<boolean>;
    GV4: (value: I3OnOff) => Promise<boolean>;
    GV5: (value: I3OnOff) => Promise<boolean>;
    GV6: (value: I3OnOff) => Promise<boolean>;
    GV7: (value: I3OnOff) => Promise<boolean>;
    QUERY: () => Promise<boolean>;
    WDU: () => Promise<boolean>;
};
type Drivers = {
    ST?: {
        uom: UnitOfMeasure.Boolean;
        value: I3RelayDim;
    };
    GV1?: {
        uom: UnitOfMeasure.Boolean;
        value: I3OnOff;
    };
    GV2?: {
        uom: UnitOfMeasure.Boolean;
        value: I3OnOff;
    };
    GV4?: {
        uom: UnitOfMeasure.Boolean;
        value: I3OnOff;
    };
    GV5?: {
        uom: UnitOfMeasure.Boolean;
        value: I3OnOff;
    };
    GV6?: {
        uom: UnitOfMeasure.Boolean;
        value: I3OnOff;
    };
    GV7?: {
        uom: UnitOfMeasure.Boolean;
        value: I3OnOff;
    };
    ERR?: {
        uom: UnitOfMeasure.Index;
        value: Error;
    };
};
export declare class I3PaddleFlagsNode extends ISYDeviceNode<Family.Insteon, keyof Drivers, keyof Commands> {
    readonly commands: Commands;
    drivers: Drivers;
    static nodeDefId: string;
    constructor(isy: ISY, nodeInfo: NodeInfo);
    updateMode(value: I3RelayDim): Promise<any>;
    updateProgramLock(value: I3OnOff): Promise<any>;
    updateResumeDim(value: I3OnOff): Promise<any>;
    updateKeyBeep(value: I3OnOff): Promise<any>;
    updateDisableRf(value: I3OnOff): Promise<any>;
    updateButtonLock(value: I3OnOff): Promise<any>;
    updateErrorBlink(value: I3OnOff): Promise<any>;
    query(): Promise<any>;
    writeChanges(): Promise<any>;
    get mode(): I3RelayDim;
    get programLock(): I3OnOff;
    get resumeDim(): I3OnOff;
    get keyBeep(): I3OnOff;
    get disableRf(): I3OnOff;
    get buttonLock(): I3OnOff;
    get errorBlink(): I3OnOff;
    get responding(): Error;
}
export {};
//# sourceMappingURL=I3PaddleFlagsNode.d.ts.map