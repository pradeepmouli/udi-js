import { ISYUpdateableBinaryStateDevice } from '../ISYDevice.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';
export class InsteonRelayDevice extends ISYUpdateableBinaryStateDevice(InsteonBaseDevice) {
    constructor(isy, node) {
        super(isy, node);
    }
    initialize(endpoint) {
        endpoint.events.onOff.onOff$Changed.on((value) => {
            this.updateIsOn(value);
        });
        this.on("PropertyChanged", (propertyName, newValue, _oldValue, formattedValue) => {
            if (propertyName === "ST") {
                endpoint.set({ onOff: newValue });
                //endpoint.setSt onOff: newValue });
            }
        });
    }
    get isOn() {
        return super.state;
    }
    set isOn(value) {
        this.updateIsOn(value);
    }
    handlePropertyChange(propertyName, value, formattedValue) {
        return super.handlePropertyChange(propertyName, value, formattedValue);
    }
    async updateIsOn(isOn) {
        if (await this.isOn !== isOn) {
            this.isOn = true;
            return super.updateState(isOn);
        }
        else {
            return Promise.resolve();
        }
    }
    async sendBeep(level = 100) {
        return super.sendBeep(level);
    }
}
