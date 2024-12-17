import { DimmableLightRequirements } from '@matter/node/devices';
import { Identify } from '@project-chip/matter.js/cluster';
import * as Insteon from '../../../Devices/Insteon/index.js';
import { ISYClusterBehavior } from '../ISYClusterBehavior.js';
import { BehaviorRegistry } from '../BehaviorRegistry.js';
export class IdentifyBehavior extends ISYClusterBehavior(DimmableLightRequirements.IdentifyServer, Insteon.Relay) {
    async initialize(_options) {
        await super.initialize(_options);
    }
    async identify() {
        return this.device.beep(100);
    }
    async triggerEffect(request) {
        switch (request.effectIdentifier) {
            case Identify.EffectIdentifier.Blink:
                return this.device.on(100).then(() => this.device.off());
            default:
                return this.device.beep(100);
        }
    }
}
BehaviorRegistry.register(IdentifyBehavior);
//# sourceMappingURL=IdentifyBehavior.js.map