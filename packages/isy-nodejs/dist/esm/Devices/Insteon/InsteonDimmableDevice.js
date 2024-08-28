import { InsteonRelayDevice } from './InsteonRelayDevice.js';
import 'winston';
//@ts-ignore
export class InsteonDimmableDevice extends InsteonRelayDevice {
    constructor(isy, node) {
        super(isy, node);
        this.isDimmable = true;
    }
    // public async updateBrightnessLevel(level: number): Promise<{}> {
    // 	return super.(level);
    // }
    async initialize(endpoint) {
        try {
            await super.initialize(endpoint);
            const that = this;
            // endpoint.events.levelControl.onLevel$Changed.on((value) => that.updateLevel(that.convertFrom(value, UnitOfMeasure.LevelFrom0To255)));
            // endpoint.set({levelControl: {onLevel: this.convertTo(this.level,UnitOfMeasure.LevelFrom0To255)}});
            // this.on("PropertyChanged", (p,n,o,f) => endpoint.set({levelControl: {onLevel: that.convertTo(Number(n),UnitOfMeasure.LevelFrom0To255)}})
            // );
            // //endpoint.events.levelCont
            // endpoint.events.levelControl.maxLevel$Changed.on((value) => that.sendCommand("OL",value));
        }
        catch (error) {
        }
    }
}
//# sourceMappingURL=InsteonDimmableDevice.js.map