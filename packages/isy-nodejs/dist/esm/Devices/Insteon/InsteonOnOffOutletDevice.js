import 'winston';
import { RelayLamp } from './Generated/RelayLamp.js';
import { CompositeDevice } from '../CompositeDevice.js';
export class OnOffOutlet extends CompositeDevice.of({ top: RelayLamp.Node, bottom: RelayLamp.Node }, { top: 1, bottom: 2 }) {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
}
//# sourceMappingURL=InsteonOnOffOutletDevice.js.map