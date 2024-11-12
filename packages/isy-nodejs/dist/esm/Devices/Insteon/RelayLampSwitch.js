/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../Definitions/Global/UOM.js";
import { InsteonBaseDevice } from "./InsteonBaseDevice.js";
import { Driver } from "../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../NodeFactory.js";
export const nodeDefId = "RelayLampSwitch";
export class RelayLampSwitchNode extends InsteonBaseDevice {
    commands = {
        DON: this.on,
        DOF: this.off,
        DFOF: this.fastOff,
        DFON: this.fastOn,
        QUERY: this.query,
        BEEP: this.beep,
        BL: this.backlight,
        WDU: this.writeChanges
    };
    static nodeDefId = 'RelayLampSwitch';
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create('ST', this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Percent, label: 'Status', name: 'status' });
        this.drivers.ERR = Driver.create('ERR', this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: 'Responding', name: 'responding' });
    }
    async on(value) {
        return this.sendCommand('DON', { value: value });
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
    async query() {
        return this.sendCommand('QUERY');
    }
    async beep(value) {
        return this.sendCommand('BEEP', { value: value });
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
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(RelayLampSwitchNode);
export var RelayLampSwitch;
(function (RelayLampSwitch) {
    function is(node) {
        return node.nodeDefId === nodeDefId;
    }
    RelayLampSwitch.is = is;
    function create(isy, nodeInfo) {
        return new RelayLampSwitchNode(isy, nodeInfo);
    }
    RelayLampSwitch.create = create;
    RelayLampSwitch.Node = RelayLampSwitchNode;
})(RelayLampSwitch || (RelayLampSwitch = {}));
//# sourceMappingURL=RelayLampSwitch.js.map