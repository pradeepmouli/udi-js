import { OnOffLightRequirements } from '@project-chip/matter.js/devices/OnOffLightDevice';
import { ISYClusterBehavior } from '../ISYClusterBehavior.js';
import { BehaviorRegistry } from '../BehaviorRegistry.js';
import { Insteon } from '../../../Devices/index.js';
export class RelayOnOffBehavior extends ISYClusterBehavior(OnOffLightRequirements.OnOffServer, Insteon.RelayLamp) {
    async initialize(_options) {
        await super.initialize(_options);
        //this.state.onOff = this.device.status;
        //this.state.onOff = await this.device.state;
    }
    on = async () => {
        await this.device.on();
        //this.device.commands.DON = true;
    };
    async off() {
        await this.device.off();
        // this.device.drivers = false;
    }
    async handlePropertyChange({ driver, newValue, oldValue, formattedValue }) {
        return super.handlePropertyChange({ driver, newValue, oldValue, formattedValue });
    }
}
BehaviorRegistry.register(RelayOnOffBehavior);
//# sourceMappingURL=RelayOnOffBehavior.js.map