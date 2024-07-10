import { ISYUpdateableBinaryStateDevice } from '../ISYDevice.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';
export class InsteonRelayDevice extends ISYUpdateableBinaryStateDevice(InsteonBaseDevice) {
    constructor(isy, node) {
        super(isy, node);
    }
    async initialize(endpoint) {
        endpoint.events.onOff.onOff$Changed.on((value) => {
            this.state = value;
        });
        //endpoint.defaults.onOff.onOff = await this.isOn;
        endpoint.set({ onOff: { onOff: await this.state } });
        const that = this;
        this.on("PropertyChanged", (propertyName, newValue, _oldValue, formattedValue) => {
            if (propertyName === "ST") {
                endpoint.set({ onOff: { onOff: newValue > 0 } });
                //endpoint.setSt onOff: newValue });
            }
        });
    }
    handlePropertyChange(propertyName, value, formattedValue) {
        return super.handlePropertyChange(propertyName, value, formattedValue);
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
