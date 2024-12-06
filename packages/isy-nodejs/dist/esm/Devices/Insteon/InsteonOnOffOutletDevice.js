import 'winston';
import { RelayLamp } from './Generated/RelayLamp.js';
import { CompositeDevice } from '../CompositeDevice.js';
export class OnOffOutlet extends CompositeDevice.of({ top: RelayLamp.Node, bottom: RelayLamp.Node }, { top: 1, bottom: 2 }) {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
}
(function (OnOffOutlet) {
    function is(node) {
        return node instanceof OnOffOutlet;
    }
    OnOffOutlet.is = is;
    function create(isy, node) {
        return new OnOffOutlet(isy, node);
    }
    OnOffOutlet.create = create;
    OnOffOutlet.Device = OnOffOutlet;
})(OnOffOutlet || (OnOffOutlet = {}));
//# sourceMappingURL=InsteonOnOffOutletDevice.js.map