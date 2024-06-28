import { isNullOrUndefined } from 'util';
import { Controls } from '../ISY.js';
import { Commands, States } from '../ISYConstants.js';
import { ISYNode } from '../ISYNode.js';
import { Endpoint } from '@project-chip/matter.js/endpoint';
import { BridgedDeviceBasicInformationServer } from '@project-chip/matter.js/behaviors/bridged-device-basic-information';
import 'winston';
export class ISYDevice extends ISYNode {
    typeCode;
    deviceClass;
    parentAddress;
    category;
    subCategory;
    type;
    _parentDevice;
    children = [];
    scenes = [];
    formatted = {};
    uom = {};
    pending = {};
    local = {};
    hidden = false;
    _enabled;
    productName;
    model;
    modelNumber;
    version;
    isDimmable;
    constructor(isy, node) {
        super(isy, node);
        this.family = node.family;
        this.nodeType = 1;
        this.type = node.type;
        this._enabled = node.enabled;
        this.deviceClass = node.deviceClass;
        this.parentAddress = node.pnode;
        const s = this.type.split('.');
        this.category = Number(s[0]);
        this.subCategory = Number(s[1]);
        // console.log(nodeDetail);
        if (this.parentAddress !== this.address &&
            this.parentAddress !== undefined) {
            this._parentDevice = isy.getDevice(this.parentAddress);
            if (!isNullOrUndefined(this._parentDevice)) {
                this._parentDevice.addChild(this);
            }
        }
        if (Array.isArray(node.property)) {
            for (const prop of node.property) {
                this.local[prop.id] = this.convertFrom(prop.value, prop.uom);
                this.formatted[prop.id] = prop.formatted;
                this.uom[prop.id] = prop.uom;
                this.logger(`Property ${Controls[prop.id].label} (${prop.id}) initialized to: ${this.local[prop.id]} (${this.formatted[prop.id]})`);
            }
        }
        else if (node.property) {
            this.local[node.property.id] = this.convertFrom(node.property.value, node.property.uom);
            this.formatted[node.property.id] = node.property.formatted;
            this.uom[node.property.id] = node.property.uom;
            this.logger(`Property ${Controls[node.property.id].label} (${node.property.id}) initialized to: ${this.local[node.property.id]} (${this.formatted[node.property.id]})`);
        }
    }
    convertTo(value, UnitOfMeasure) {
        return value;
    }
    convertFrom(value, UnitOfMeasure) {
        return value;
    }
    addLink(isyScene) {
        this.scenes.push(isyScene);
    }
    addChild(childDevice) {
        this.children.push(childDevice);
    }
    get parentDevice() {
        if (this._parentDevice === undefined) {
            if (this.parentAddress !== this.address &&
                this.parentAddress !== null &&
                this.parentAddress !== undefined) {
                this._parentDevice = this.isy.getDevice(this.parentAddress);
                if (this._parentDevice !== null) {
                    this._parentDevice.addChild(this);
                }
            }
            this._parentDevice = null;
        }
        return this._parentDevice;
    }
    async readProperty(propertyName) {
        return (await this.isy.callISY(`nodes/${this.address}/${propertyName}`)).node.property;
    }
    async readProperties() {
        return (await this.isy.callISY(`nodes/${this.address}/status`)).node.property;
    }
    async updateProperty(propertyName, value) {
        const val = this.convertTo(Number(value), Number(this.uom[propertyName]));
        this.logger(`Updating property ${Controls[propertyName].label}. incoming value: ${value} outgoing value: ${val}`);
        this.pending[propertyName] = value;
        return this.isy
            .callISY(`nodes/${this.address}/set/${propertyName}/${val}`)
            .then((p) => {
            this.local[propertyName] = value;
            this.pending[propertyName] = null;
        });
    }
    async sendCommand(command, parameters) {
        return this.isy.sendNodeCommand(this, command, parameters);
    }
    async refresh() {
        const device = this;
        const node = (await this.isy.callISY(`nodes/${this.address}/status`)).node;
        // this.logger(node);
        this.parseResult(node, device);
        return await this.isy.callISY(`nodes/${this.address}/status`);
    }
    parseResult(node, device) {
        if (Array.isArray(node.property)) {
            for (const prop of node.property) {
                this.applyStatus(device, prop);
            }
        }
        else if (node.property) {
            this.applyStatus(device, node.property);
            //device.local[node.property.id] = node.property.value;
            //device.formatted[node.property.id] = node.property.formatted;
            //device.uom[node.property.id] = node.property.uom;
            device.logger(`Property ${Controls[node.property.id].label} (${node.property.id}) refreshed to: ${device[node.property.id]} (${device.formatted[node.property.id]})`);
        }
    }
    applyStatus(device, prop) {
        device.local[prop.id] = prop.value;
        device.formatted[prop.id] = prop.formatted;
        device.uom[prop.id] = prop.uom;
        device.logger(`Property ${Controls[prop.id].label} (${prop.id}) refreshed to: ${device[prop.id]} (${device.formatted[prop.id]})`);
    }
    handleControlTrigger(controlName) {
        return this.emit('ControlTriggered', controlName);
    }
    handlePropertyChange(propertyName, value, formattedValue) {
        let changed = false;
        const priorVal = this.local[propertyName];
        try {
            const val = this.convertFrom(value, this.uom[propertyName]);
            if (this.local[propertyName] !== val) {
                this.logger(`Property ${Controls[propertyName].label} (${propertyName}) updated to: ${val} (${formattedValue})`);
                this.local[propertyName] = val;
                this.formatted[propertyName] = formattedValue;
                this.lastChanged = new Date();
                changed = true;
            }
            else {
                this.logger(`Update event triggered, property ${Controls[propertyName].label} (${propertyName}) is unchanged.`);
            }
            if (changed) {
                this.emit('PropertyChanged', propertyName, val, priorVal, formattedValue);
                this.scenes.forEach((element) => {
                    this.logger(`Recalulating ${element.name}`);
                    element.recalculateState();
                });
            }
        }
        finally {
            return changed;
        }
    }
}
export const ISYBinaryStateDevice = (Base) => {
    return class extends Base {
        get state() {
            return this.readProperty('ST').then(p => p.value > 0);
        }
    };
};
export const ISYUpdateableBinaryStateDevice = (Base) => {
    return class extends Base {
        get state() {
            return this.readProperty('ST').then(p => p.value > 0);
        }
        async updateState(state) {
            if (state !== await this.state || this.pending.ST > 0 !== await this.state) {
                this.pending.ST = state ? States.On : States.Off;
                return this.sendCommand(state ? Commands.On : Commands.Off).then((p) => {
                    //this.local.ST = this.pending.ST;
                    this.pending.ST = null;
                });
            }
            return Promise.resolve();
        }
    };
};
export const MatterEndpoint = (base, endpointType) => {
    return class extends base {
        baseBehavior = endpointType;
        createEndpoint() {
            var p = this.baseBehavior.with(BridgedDeviceBasicInformationServer);
            return new Endpoint(this.baseBehavior.with(BridgedDeviceBasicInformationServer), { id: this.address, bridgedDeviceBasicInformation: {
                    nodeLabel: this.displayName,
                    productName: this.productName,
                    productLabel: this.productName,
                    serialNumber: `${this.address}`,
                    reachable: this.enabled,
                } });
        }
    };
};
export const ISYLevelDevice = (base) => class extends base {
    get level() {
        return this.local.ST;
    }
};
// tslint:disable-next-line: variable-name
export const ISYUpdateableLevelDevice = (base) => class extends base {
    get level() {
        return this.local.ST;
    }
    async updateLevel(level) {
        if (level != this.local.ST && level !== (this.pending.ST ?? this.local.ST)) {
            this.pending.ST = level;
            if (level > 0) {
                return this.sendCommand(Commands.On, this.convertTo(level, this.uom.ST)).then((p) => {
                    //this.local.ST = this.pending.ST; *Wait to receive propertu update from subscription
                    this.pending.ST = null;
                });
            }
            else {
                return this.sendCommand(Commands.Off).then((p) => {
                    //this.local.ST = this.pending.ST; *Wait to receive propertu update from subscription
                    this.pending.ST = null;
                });
            }
        }
        return Promise.resolve();
    }
};
