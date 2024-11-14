/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { Driver } from '../../Definitions/Global/Drivers.js';
import { UnitOfMeasure } from '../../Definitions/Global/UOM.js';
import { NodeFactory } from '../NodeFactory.js';
import { InsteonBaseDevice as Base } from './InsteonBaseDevice.js';
export const nodeDefId = 'DimmerLampSwitch';
export class DimmerLampSwitchNode extends Base {
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
        QUERY: this.query,
        BEEP: this.beep,
        OL: this.updateOnLevel,
        RR: this.updateRampRate,
        BL: this.backlight,
        WDU: this.writeChanges
    };
    static nodeDefId = 'DimmerLampSwitch';
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create('ST', this, nodeInfo.state['ST'], { uom: UnitOfMeasure.LevelFrom0To255, label: 'Status', name: 'status' });
        this.drivers.OL = Driver.create('OL', this, nodeInfo.state['OL'], { uom: UnitOfMeasure.Percent, label: 'On Level', name: 'onLevel' });
        this.drivers.RR = Driver.create('RR', this, nodeInfo.state['RR'], { uom: UnitOfMeasure.Index, label: 'Ramp Rate', name: 'rampRate' });
        this.drivers.ERR = Driver.create('ERR', this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: 'Responding', name: 'responding' });
    }
    async on(value) {
        return this.sendCommand('DON', value);
    }
    async off() {
        return this.sendCommand('DOF');
    }
    async fastOff() {
        return this.sendCommand('DFOF');
    }
    async fastOn() {
        return this.sendCommand('DFON');
    }
    async brighten() {
        return this.sendCommand('BRT');
    }
    async dim() {
        return this.sendCommand('DIM');
    }
    async fadeUp() {
        return this.sendCommand('FDUP');
    }
    async fadeDown() {
        return this.sendCommand('FDDOWN');
    }
    async fadeStop() {
        return this.sendCommand('FDSTOP');
    }
    async query() {
        return this.sendCommand('QUERY');
    }
    async beep(value) {
        return this.sendCommand('BEEP', { value: value });
    }
    async updateOnLevel(value) {
        return this.sendCommand('OL', { value: value });
    }
    async updateRampRate(value) {
        return this.sendCommand('RR', { value: value });
    }
    async backlight(value) {
        return this.sendCommand('BL', { value: value });
    }
    async writeChanges() {
        return this.sendCommand('WDU');
    }
    get status() {
        return this.drivers.ST?.value;
    }
    get onLevel() {
        return this.drivers.OL?.value;
    }
    get rampRate() {
        return this.drivers.RR?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(DimmerLampSwitchNode);
export var DimmerLampSwitch;
(function (DimmerLampSwitch) {
    function is(node) {
        return node.nodeDefId === nodeDefId;
    }
    DimmerLampSwitch.is = is;
    function create(isy, nodeInfo) {
        return new DimmerLampSwitchNode(isy, nodeInfo);
    }
    DimmerLampSwitch.create = create;
    DimmerLampSwitch.Node = DimmerLampSwitchNode;
})(DimmerLampSwitch || (DimmerLampSwitch = {}));
//# sourceMappingURL=DimmerLampSwitch.js.map