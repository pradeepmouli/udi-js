import { ISYUpdateableLevelDevice } from '../ISYDevice.js';
import { InsteonRelayDevice } from './InsteonRelayDevice.js';
import 'winston';
export class InsteonDimmableDevice extends ISYUpdateableLevelDevice(InsteonRelayDevice) {
    constructor(isy, node) {
        super(isy, node);
        this.isDimmable = true;
    }
    get brightnessLevel() {
        return this.level;
    }
    async updateBrightnessLevel(level) {
        return super.updateLevel(level);
    }
    initialize(endpoint) {
        try {
            super.initialize(endpoint);
            endpoint.events.levelControl.onLevel$Changed.on((value) => this.updateLevel(value));
            //endpoint.events.levelCont
            endpoint.events.levelControl.maxLevel$Changed.on((value) => this.sendCommand("OL", value));
        }
        catch (error) {
        }
    }
}
