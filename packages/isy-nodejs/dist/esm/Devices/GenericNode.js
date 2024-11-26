import { Driver } from '../Definitions/index.js';
import { ISYDeviceNode } from './ISYDeviceNode.js';
export class GenericNode extends ISYDeviceNode {
    constructor(isy, node) {
        super(isy, node);
        for (const prop in node.state) {
            this.drivers[prop] = Driver.create(prop, this, node.state[prop]);
        }
    }
    applyStatus(prop) {
        if (!this.drivers[prop.id]) {
            this.drivers[prop.id] = Driver.create(prop.id, this, prop, { uom: prop.uom, label: prop.name ?? prop.id, name: prop.name ?? prop.id });
        }
        super.applyStatus(prop);
    }
}
//# sourceMappingURL=GenericNode.js.map