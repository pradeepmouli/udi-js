import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';
import { Driver } from '../../Definitions/Global/Drivers.js';
import { UnitOfMeasure } from '../../Definitions/index.js';
export class InsteonRelayDevice extends InsteonBaseDevice {
    // #region Constructors (1)
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create('ST', this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: 'Status', name: 'status' });
        this.drivers.OL = Driver.create('OL', this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: 'On Level', name: 'onLevel' });
        this.drivers.RR = Driver.create('RR', this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: 'Ramp Rate', name: 'rampRate' });
        this.drivers.ERR = Driver.create('ERR', this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: 'Error', name: 'error' });
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
//# sourceMappingURL=InsteonRelayDevice.js.map