import { InsteonRelayDevice } from "../../Devices/Insteon/InsteonRelayDevice.js";
import { OnOffLightRequirements } from "@project-chip/matter.js/devices/OnOffLightDevice";
import { ISYClusterBehavior } from "./ISYClusterBehavior.js";
import { DriverType } from '../../Definitions/Global/Drivers.js';
import { DimmableLightRequirements } from '@project-chip/matter.js/devices/DimmableLightDevice';
import { InsteonDimmableDevice } from '../../Devices/Insteon/InsteonDimmableDevice.js';
import { Converters } from '../../Converters.js';
export class ISYOnOffBehavior extends ISYClusterBehavior(OnOffLightRequirements.OnOffServer, InsteonRelayDevice) {
    async initialize(_options) {
        await super.initialize(_options);
        this.state.onOff = await this.device.state;
    }
    on = async () => {
        await super.on();
        this.device.state = true;
    };
    async off() {
        //await super.off();
        this.device.state = false;
    }
    toggle = async () => {
        this.device.state = !(await this.device.state);
    };
    async handlePropertyChange({ driver, newValue, oldValue, formattedValue }) {
        if (driver === DriverType.Status) {
            this.state.onOff = newValue;
        }
        return super.handlePropertyChange({ driver, newValue, oldValue, formattedValue });
    }
}
export class ISYDimmableBehavior extends ISYClusterBehavior(DimmableLightRequirements.LevelControlServer, InsteonDimmableDevice) {
    async initialize(_options) {
        await super.initialize(_options);
        this.state.currentLevel = this.device.local.ST;
        this.state.onLevel = this.device.local.OL;
    }
    setLevel(level) {
        level = Converters.Matter.LevelFrom0To255.LightingLevel.to(level);
        if (level > 0) {
            return this.device.sendCommand('DON', level);
        }
        else {
            return this.device.sendCommand('DOF');
        }
    }
}
