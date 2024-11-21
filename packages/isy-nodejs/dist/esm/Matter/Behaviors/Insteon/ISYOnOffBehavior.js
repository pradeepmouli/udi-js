import { DimmableLightRequirements } from '@project-chip/matter.js/devices/DimmableLightDevice';
import { OnOffLightRequirements } from '@project-chip/matter.js/devices/OnOffLightDevice';
import { InsteonDimmableDevice } from '../../../Devices/Insteon/InsteonDimmableDevice.js';
import { InsteonRelayDevice } from '../../../Devices/Insteon/InsteonRelayDevice.js';
import { ISYClusterBehavior } from '../ISYClusterBehavior.js';
import { Converter } from '../../../Converters.js';
import { BehaviorRegistry } from '../BehaviorRegistry.js';
export class ISYOnOffBehavior extends ISYClusterBehavior(OnOffLightRequirements.OnOffServer, InsteonRelayDevice) {
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
BehaviorRegistry.register(ISYOnOffBehavior);
export class ISYDimmableBehavior extends ISYClusterBehavior(DimmableLightRequirements.LevelControlServer, InsteonDimmableDevice) {
    async initialize(_options) {
        await super.initialize(_options);
        /*this.state.onLevel = Converter.get('Level255toZero.LightingLevel').to(this.device.drivers.OL)*/
        //this.state.currentLevel = this.device.drivers.ST.value;
        //this.state.onLevel = this.device.drivers.OL;
    }
    setLevel(level) {
        level = Converter.Matter.LevelFrom0To255.LightingLevel.from(level);
        if (level > 0) {
            return this.device.on(level);
        }
        else {
            return this.device.off();
        }
    }
}
BehaviorRegistry.register(ISYDimmableBehavior);
//# sourceMappingURL=ISYOnOffBehavior.js.map