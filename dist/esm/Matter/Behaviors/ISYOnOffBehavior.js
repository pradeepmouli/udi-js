import { InsteonRelayDevice } from "../../Devices/Insteon/InsteonRelayDevice.js";
import { OnOffLightRequirements } from "@project-chip/matter.js/devices/OnOffLightDevice";
import { ISYClusterBehavior } from "./ISYClusterBehavior.js";
export class ISYOnOffBehavior extends ISYClusterBehavior(OnOffLightRequirements.OnOffServer, InsteonRelayDevice) {
    async on() {
        // await super.on();
        return this.device.updateIsOn(true);
    }
    async off() {
        //await super.off();
        return this.device.updateIsOn(false);
    }
    async toggle() {
        return await this.device.updateIsOn(!this.device.isOn);
    }
    handlePropertyChange(propertyName, value, newValue, formattedValue) {
        if (propertyName === 'ST') {
            this.state.onOff = newValue > 0;
            //this.events.onOff$Changed.emit(newValue, value, this.context);
        }
    }
}
