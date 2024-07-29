import { ISYUpdateableLevelDevice } from '../ISYDevice.js';
import { InsteonRelayDevice } from './InsteonRelayDevice.js';
import 'winston';
import { UnitOfMeasure } from '../../Definitions/Global/UOM.js';
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
    async initialize(endpoint) {
        try {
            await super.initialize(endpoint);
            const that = this;
            endpoint.events.levelControl.onLevel$Changed.on((value) => that.updateLevel(that.convertFrom(value, UnitOfMeasure.LevelFrom0To255)));
            endpoint.set({ levelControl: { onLevel: this.convertTo(this.level, UnitOfMeasure.LevelFrom0To255) } });
            this.on("PropertyChanged", (p, n, o, f) => endpoint.set({ levelControl: { onLevel: that.convertTo(Number(n), UnitOfMeasure.LevelFrom0To255) } }));
            //endpoint.events.levelCont
            endpoint.events.levelControl.maxLevel$Changed.on((value) => that.sendCommand("OL", value));
        }
        catch (error) {
        }
    }
}
