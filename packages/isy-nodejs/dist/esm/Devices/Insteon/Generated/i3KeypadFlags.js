import { UnitOfMeasure } from '../../../Definitions/Global/UOM.js';
import { ISYDeviceNode } from '../../../ISYNode.js';
import { Driver } from '../../../Definitions/Global/Drivers.js';
export const nodeDefId = "I3KeypadFlags";
export class I3KeypadFlags extends ISYDeviceNode {
    commands = {
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
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Boolean, label: "Mode", name: "0/1" });
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
    get mode() {
        return this.drivers.ST?.value;
    }
    get programLock() {
        return this.drivers.GV1?.value;
    }
    get resumeDim() {
        return this.drivers.GV2?.value;
    }
    get relayAtFullOn() {
        return this.drivers.GV3?.value;
    }
    get keyBeep() {
        return this.drivers.GV4?.value;
    }
    get disableRf() {
        return this.drivers.GV5?.value;
    }
    get buttonLock() {
        return this.drivers.GV6?.value;
    }
    get errorBlink() {
        return this.drivers.GV7?.value;
    }
    get cleanupReports() {
        return this.drivers.GV8?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
