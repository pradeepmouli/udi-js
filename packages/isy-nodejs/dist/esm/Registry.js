import { Family } from './Definitions/index.js';
import { NodeFactory } from './Devices/NodeFactory.js';
import { ISYNode } from './ISYNode.js';
export class Registry {
    Global = {};
    FamilyLevel = {};
    DeviceLevel = {};
    NodeLevel = {};
    registerGlobal(key, value) {
        this.Global[key] = value;
    }
    registerFamilyLevel(family, key, value) {
        this.FamilyLevel[Family[family]] = this.FamilyLevel[Family[family]] ?? {};
        this.FamilyLevel[Family[family]][key] = value;
    }
    registerDeviceLevel(device, key, value) {
        this.DeviceLevel[device] = this.DeviceLevel[device] ?? {};
        this.DeviceLevel[device][key] = value;
    }
    registerNodeLevel(nodeDefId, key, value) {
        this.NodeLevel[nodeDefId] = this.NodeLevel[nodeDefId] ?? {};
        this.NodeLevel[nodeDefId][key] = value;
    }
    register(key, value, discriminant) {
        if (discriminant === undefined) {
            this.registerGlobal(key, value);
            return;
        }
        if (typeof discriminant === 'string') {
            this.registerDeviceLevel(discriminant, key, value);
            return;
        }
        if (discriminant instanceof ISYNode.constructor) {
            this.registerNodeLevel(discriminant.nodeDefId, key, value);
            for (const nodeDefId in NodeFactory.getImplements(discriminant)) {
                this.registerNodeLevel(nodeDefId, key, value);
            }
            this.registerFamilyLevel(discriminant.family, key, value);
            return;
        }
    }
    getGlobal(key) {
        return this.Global[key];
    }
    getFamilyLevel(family, key) {
        return this.FamilyLevel[Family[family]]?.[key];
    }
    getDeviceLevel(device, key) {
        return this.DeviceLevel[device]?.[key];
    }
    getNodeLevel(nodeDefId, key) {
        return this.NodeLevel[nodeDefId]?.[key];
    }
    get(device, key) {
        if (device.type) {
            let d = this.getDeviceLevel(device.type, key);
            if (d)
                return d;
        }
        let d = this.getNodeLevel(device.nodeDefId, key);
        if (d) {
            return d;
        }
        else {
            for (const nodeDefId in NodeFactory.getImplements(device)) {
                let d = this.getNodeLevel(nodeDefId, key);
                if (d)
                    return d;
            }
        }
        let f = this.getFamilyLevel(device.family, key);
        if (f)
            return f;
        return this.getGlobal(key);
    }
}
//# sourceMappingURL=Registry.js.map