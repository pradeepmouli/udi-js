import { DimmableLightRequirements } from '@matter/node/devices';
import { Converter } from '../../../Converters.js';
import { BehaviorRegistry } from '../BehaviorRegistry.js';
import { ISYClusterBehavior } from '../ISYClusterBehavior.js';
export class ISYDimmableBehavior extends ISYClusterBehavior(DimmableLightRequirements.LevelControlServer, Insteon.DimmerLampNode) {
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
//# sourceMappingURL=ISYDimmableBehavior.js.map