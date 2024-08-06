import { UnitOfMeasure } from '../../../Definitions/Global/UOM.js';
import { Family } from '../../../Definitions/Global/Families.js';
import type { NodeInfo } from '../../../Definitions/NodeInfo.js';
import type { ISY } from '../../../ISY.js';
import { ISYDeviceNode } from '../../../ISYNode.js';
import { Driver } from '../../../Definitions/Global/Drivers.js';
import type { DriverState } from '../../../Definitions/PropertyStatus.js';


export const nodeDefId = "I3KeypadFlags";

type Commands = {
    GV0: (value) => Promise<boolean>;
    GV1: (value) => Promise<boolean>;
    GV2: (value) => Promise<boolean>;
    GV3: (value) => Promise<boolean>;
    GV4: (value) => Promise<boolean>;
    GV5: (value) => Promise<boolean>;
    GV6: (value) => Promise<boolean>;
    GV7: (value) => Promise<boolean>;
    GV8: (value) => Promise<boolean>;
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
export class I3KeypadFlags extends ISYDeviceNode<Family.Insteon, keyof Drivers, keyof Commands> {
    public readonly commands: Commands = {
        GV0: this.updateMode,
        GV1: this.updateProgramLock,
        GV2: this.updateResumeDim,
        GV3: this.updateRelayAtFullOn,
        GV4: this.updateKeyBeep,
        GV5: this.updateDisableRf,
        GV6: this.updateButtonLock,
        GV7: this.updateErrorBlink,
        GV8: this.updateCleanupReports,
        QUERY: this.query,
        WDU: this.writeChanges
    };

    static nodeDefId = "I3KeypadFlags";
    constructor(isy: ISY, nodeInfo: NodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Boolean, label: "Mode", name: "0/1" });

    }
    async updateMode(value) {
        return this.sendCommand("GV0", { value: value });
    }
    async updateProgramLock(value) {
        return this.sendCommand("GV1", { value: value });
    }
    async updateResumeDim(value) {
        return this.sendCommand("GV2", { value: value });
    }
    async updateRelayAtFullOn(value) {
        return this.sendCommand("GV3", { value: value });
    }
    async updateKeyBeep(value) {
        return this.sendCommand("GV4", { value: value });
    }
    async updateDisableRf(value) {
        return this.sendCommand("GV5", { value: value });
    }
    async updateButtonLock(value) {
        return this.sendCommand("GV6", { value: value });
    }
    async updateErrorBlink(value) {
        return this.sendCommand("GV7", { value: value });
    }
    async updateCleanupReports(value) {
        return this.sendCommand("GV8", { value: value });
    }
    async query() {
        return this.sendCommand("QUERY");
    }
    async writeChanges() {
        return this.sendCommand("WDU");
    }
    public get mode(): boolean {
        return this.drivers.ST?.value;
    }
    public get programLock(): boolean {
        return this.drivers.GV1?.value;
    }
    public get resumeDim(): boolean {
        return this.drivers.GV2?.value;
    }
    public get relayAtFullOn(): boolean {
        return this.drivers.GV3?.value;
    }
    public get keyBeep(): boolean {
        return this.drivers.GV4?.value;
    }
    public get disableRf(): boolean {
        return this.drivers.GV5?.value;
    }
    public get buttonLock(): boolean {
        return this.drivers.GV6?.value;
    }
    public get errorBlink(): boolean {
        return this.drivers.GV7?.value;
    }
    public get cleanupReports(): boolean {
        return this.drivers.GV8?.value;
    }
    public get responding(): boolean {
        return this.drivers.ERR?.value;
    }
}
