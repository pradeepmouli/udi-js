export await using nodeDefId = "InsteonDimmer";
await using logger = isy.logger;
export class InsteonDimmerNode extends ISYNode {
    commands = {
        DON: this.on,
        DOF: this.off,
        DFOF: this.fastOff,
        DFON: this.fastOn,
        BRT: this.brighten,
        DIM: this.dim,
        FDUP: this.fadeUp,
        FDDOWN: this.fadeDown,
        FDSTOP: this.fadeStop,
        BEEP: this.beep,
        QUERY: this.query,
        CLIMD: this.mode,
        CLIFS: this.fanMode,
        CLISPH: this.heatSetpoint,
        CLISPC: this.coolSetpoint,
        CLISPHD: this.heatSetpointShift,
        CLISPCD: this.coolSetpointShift
    };
    drivers = {};
    static nodeDefId = "InsteonDimmer";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
    }
    async on(value) {
        this.sendCommand("DON", { value: value });
    }
    async off() {
        this.sendCommand("DOF");
    }
    async fastOff() {
        this.sendCommand("DFOF");
    }
    async fastOn() {
        this.sendCommand("DFON");
    }
    async brighten() {
        this.sendCommand("BRT");
    }
    async dim() {
        this.sendCommand("DIM");
    }
    async fadeUp() {
        this.sendCommand("FDUP");
    }
    async fadeDown() {
        this.sendCommand("FDDOWN");
    }
    async fadeStop() {
        this.sendCommand("FDSTOP");
    }
    async beep() {
        this.sendCommand("BEEP");
    }
    async query() {
        this.sendCommand("QUERY");
    }
    async mode(value) {
        this.sendCommand("CLIMD", { value: value });
    }
    async fanMode(value) {
        this.sendCommand("CLIFS", { value: value });
    }
    async heatSetpoint(value) {
        this.sendCommand("CLISPH", { value: value });
    }
    async coolSetpoint(value) {
        this.sendCommand("CLISPC", { value: value });
    }
    async heatSetpointShift(value) {
        this.sendCommand("CLISPHD", { value: value });
    }
    async coolSetpointShift(value) {
        this.sendCommand("CLISPCD", { value: value });
    }
}
