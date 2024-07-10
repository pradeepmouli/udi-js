import { InsteonRelayDevice } from "../../Devices/Insteon/InsteonRelayDevice.js";
import { OnOffLightRequirements } from "@project-chip/matter.js/devices/OnOffLightDevice";
import { ISYClusterBehavior } from "./ISYClusterBehavior.js";
export class ISYOnOffBehavior extends ISYClusterBehavior(OnOffLightRequirements.OnOffServer, InsteonRelayDevice) {
    async initialize(_options) {
        await super.initialize(_options);
        this.state.onOff = await this.device.state;
    }
    async on() {
        // await super.on();
        this.device.state = true;
    }
    async off() {
        //await super.off();
        this.device.state = false;
    }
    async toggle() {
        this.device.state = !(await this.device.state);
    }
    handlePropertyChange(propertyName, value, newValue, formattedValue) {
        if (propertyName === 'ST') {
            this.state.onOff = newValue > 0;
            //this.events.onOff$Changed.emit(newValue, value, this.context);
        }
    }
}
