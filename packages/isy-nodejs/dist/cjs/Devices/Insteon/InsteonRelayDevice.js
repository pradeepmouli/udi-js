"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonRelayDevice = void 0;
const InsteonBaseDevice_js_1 = require("./InsteonBaseDevice.js");
require("winston");
const Drivers_js_1 = require("../../Definitions/Global/Drivers.js");
const index_js_1 = require("../../Definitions/index.js");
class InsteonRelayDevice extends InsteonBaseDevice_js_1.InsteonBaseDevice {
    // #region Constructors (1)
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Drivers_js_1.Driver.create('ST', this, nodeInfo.property, { uom: index_js_1.UnitOfMeasure.Percent, label: 'Status', name: 'status' });
        this.drivers.OL = Drivers_js_1.Driver.create('OL', this, nodeInfo.property, { uom: index_js_1.UnitOfMeasure.Percent, label: 'On Level', name: 'onLevel' });
        this.drivers.RR = Drivers_js_1.Driver.create('RR', this, nodeInfo.property, { uom: index_js_1.UnitOfMeasure.Index, label: 'Ramp Rate', name: 'rampRate' });
    }
    // #endregion Constructors (1)
    // #region Public Methods (2)
    async initialize(endpoint) {
        /*endpoint.events.onOff.onOff$Changed.on((value) => {
            this.commands.DON(value);
            this.drivers.ST;
        });
        //endpoint.defaults.onOff.onOff = await this.isOn;
        endpoint.set({ onOff: { onOff: (await this.drivers.ST.value) > 0 } });
        const that = this;

        this.events.on('StatusChanged', (propertyName, newValue, _oldValue, formattedValue) => {
            if (propertyName === 'ST') {
                endpoint.set({ onOff: { onOff: newValue > 0 } });
                //endpoint.setSt onOff: newValue });
            }
        });*/
    }
    /*
    public async updateIsOn(isOn: boolean): Promise<any> {
        if (t !== isOn) {
            this.isOn = true;
            return super.updateState(isOn);
        }
        else {
            return Promise.resolve();
        }

    } */
    async sendBeep(level = 100) {
        return super.sendBeep(level);
    }
}
exports.InsteonRelayDevice = InsteonRelayDevice;
//# sourceMappingURL=InsteonRelayDevice.js.map