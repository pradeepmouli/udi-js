import { UnitOfMeasure } from '../../../Definitions/Global/UOM.js';
import { Family } from '../../../Definitions/Global/Families.js';
import type { NodeInfo } from '../../../Definitions/NodeInfo.js';
import type { ISY } from '../../../ISY.js';
import { ISYDeviceNode } from '../../../ISYNode.js';
import { Driver } from '../../../Definitions/Global/Drivers.js';
export declare const nodeDefId = "I3KeypadFlags";
type Commands = {
    GV0: (value: any) => Promise<boolean>;
    GV1: (value: any) => Promise<boolean>;
    GV2: (value: any) => Promise<boolean>;
    GV3: (value: any) => Promise<boolean>;
    GV4: (value: any) => Promise<boolean>;
    GV5: (value: any) => Promise<boolean>;
    GV6: (value: any) => Promise<boolean>;
    GV7: (value: any) => Promise<boolean>;
    GV8: (value: any) => Promise<boolean>;
    QUERY: () => Promise<boolean>;
    WDU: () => Promise<boolean>;
};
type Drivers = {
    ST?: Driver<"ST">;
    GV1?: {
        uom: UnitOfMeasure.Boolean;
        value: (0 | 1);
    };
    GV2?: {
        uom: UnitOfMeasure.Boolean;
        value: (0 | 1);
    };
    GV3?: {
        uom: UnitOfMeasure.Boolean;
        value: (0 | 1);
    };
    GV4?: {
        uom: UnitOfMeasure.Boolean;
        value: (0 | 1);
    };
    GV5?: {
        uom: UnitOfMeasure.Boolean;
        value: (0 | 1);
    };
    GV6?: {
        uom: UnitOfMeasure.Boolean;
        value: (0 | 1);
    };
    GV7?: {
        uom: UnitOfMeasure.Boolean;
        value: (0 | 1);
    };
    GV8?: {
        uom: UnitOfMeasure.Boolean;
        value: (0 | 1);
    };
    ERR?: {
        uom: UnitOfMeasure.Index;
        value: (0 | 1);
    };
};
export declare class I3KeypadFlags extends ISYDeviceNode<Family.Insteon, keyof Drivers, keyof Commands> {
    readonly commands: Commands;
    static nodeDefId: string;
    constructor(isy: ISY, nodeInfo: NodeInfo);
    updateMode(value: any): Promise<any>;
    updateProgramLock(value: any): Promise<any>;
    updateResumeDim(value: any): Promise<any>;
    updateRelayAtFullOn(value: any): Promise<any>;
    updateKeyBeep(value: any): Promise<any>;
    updateDisableRf(value: any): Promise<any>;
    updateButtonLock(value: any): Promise<any>;
    updateErrorBlink(value: any): Promise<any>;
    updateCleanupReports(value: any): Promise<any>;
    query(): Promise<any>;
    writeChanges(): Promise<any>;
    get mode(): boolean;
    get programLock(): boolean;
    get resumeDim(): boolean;
    get relayAtFullOn(): boolean;
    get keyBeep(): boolean;
    get disableRf(): boolean;
    get buttonLock(): boolean;
    get errorBlink(): boolean;
    get cleanupReports(): boolean;
    get responding(): boolean;
}
export {};
//# sourceMappingURL=i3KeypadFlags.d.ts.map