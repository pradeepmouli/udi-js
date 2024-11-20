/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { Base } from "../index.js";
import { NodeFactory } from "../../NodeFactory.js";
export const nodeDefId = "InsteonDimmer";
export class SceneNode extends Base {
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
    static nodeDefId = "InsteonDimmer";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
    }
    async on(value) {
        return this.sendCommand("DON", { value: value });
    }
    async off() {
        return this.sendCommand("DOF");
    }
    async fastOff() {
        return this.sendCommand("DFOF");
    }
    async fastOn() {
        return this.sendCommand("DFON");
    }
    async brighten() {
        return this.sendCommand("BRT");
    }
    async dim() {
        return this.sendCommand("DIM");
    }
    async fadeUp() {
        return this.sendCommand("FDUP");
    }
    async fadeDown() {
        return this.sendCommand("FDDOWN");
    }
    async fadeStop() {
        return this.sendCommand("FDSTOP");
    }
    async beep() {
        return this.sendCommand("BEEP");
    }
    async query() {
        return this.sendCommand("QUERY");
    }
    async mode(value) {
        return this.sendCommand("CLIMD", { value: value });
    }
    async fanMode(value) {
        return this.sendCommand("CLIFS", { value: value });
    }
    async heatSetpoint(value) {
        return this.sendCommand("CLISPH", { value: value });
    }
    async coolSetpoint(value) {
        return this.sendCommand("CLISPC", { value: value });
    }
    async heatSetpointShift(value) {
        return this.sendCommand("CLISPHD", { value: value });
    }
    async coolSetpointShift(value) {
        return this.sendCommand("CLISPCD", { value: value });
    }
}
NodeFactory.register(SceneNode);
export var Scene;
(function (Scene) {
    function is(node) {
        return node.nodeDefId in ["InsteonDimmer"];
    }
    Scene.is = is;
    function is(node) {
        return node.nodeDefId in ["InsteonDimmer"];
    }
    Scene.is = is;
    function isImplementedBy(node) {
        return node.nodeDefId in ["InsteonDimmer"];
    }
    Scene.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new SceneNode(isy, nodeInfo);
    }
    Scene.create = create;
    Scene.Node = SceneNode;
})(Scene || (Scene = {}));
