import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Definitions/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import type { DriverState } from "../../../Model/DriverState.js";
export const nodeDefId = "I3PaddleFlags";
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
export class I3PaddleFlagsNode extends ISYDeviceNode<Family.Insteon, keyof Drivers, keyof Commands> {
    public readonly commands: Commands = {
        GV0: this.updateMode,
        GV1: this.updateProgramLock,
        GV2: this.updateResumeDim,
        GV4: this.updateKeyBeep,
        GV5: this.updateDisableRf,
        GV6: this.updateButtonLock,
        GV7: this.updateErrorBlink,
        QUERY: this.query,
        WDU: this.writeChanges
    };
    public drivers: Drivers = {};
    static nodeDefId = "I3PaddleFlags";
    constructor(isy: ISY, nodeInfo: NodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Boolean, label: "Mode", name: "mode" });
        this.drivers.GV1 = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Boolean, label: "Program Lock", name: "programLock" });
        this.drivers.GV2 = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Boolean, label: "Resume Dim", name: "resumeDim" });
        this.drivers.GV4 = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Boolean, label: "Key Beep", name: "keyBeep" });
        this.drivers.GV5 = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Boolean, label: "Disable RF", name: "disableRf" });
        this.drivers.GV6 = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Boolean, label: "Button Lock", name: "buttonLock" });
        this.drivers.GV7 = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Boolean, label: "Error Blink", name: "errorBlink" });
        this.drivers.ERR = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async updateMode(value: I3RelayDim) {
        return this.sendCommand("GV0", { value: value });
    }
    async updateProgramLock(value: I3OnOff) {
        return this.sendCommand("GV1", { value: value });
    }
    async updateResumeDim(value: I3OnOff) {
        return this.sendCommand("GV2", { value: value });
    }
    async updateKeyBeep(value: I3OnOff) {
        return this.sendCommand("GV4", { value: value });
    }
    async updateDisableRf(value: I3OnOff) {
        return this.sendCommand("GV5", { value: value });
    }
    async updateButtonLock(value: I3OnOff) {
        return this.sendCommand("GV6", { value: value });
    }
    async updateErrorBlink(value: I3OnOff) {
        return this.sendCommand("GV7", { value: value });
    }
    async query() {
        return this.sendCommand("QUERY");
    }
    async writeChanges() {
        return this.sendCommand("WDU");
    }
    public get mode(): I3RelayDim {
        return this.drivers.ST?.value;
    }
    public get programLock(): I3OnOff {
        return this.drivers.GV1?.value;
    }
    public get resumeDim(): I3OnOff {
        return this.drivers.GV2?.value;
    }
    public get keyBeep(): I3OnOff {
        return this.drivers.GV4?.value;
    }
    public get disableRf(): I3OnOff {
        return this.drivers.GV5?.value;
    }
    public get buttonLock(): I3OnOff {
        return this.drivers.GV6?.value;
    }
    public get errorBlink(): I3OnOff {
        return this.drivers.GV7?.value;
    }
    public get responding(): Error {
        return this.drivers.ERR?.value;
    }
}
