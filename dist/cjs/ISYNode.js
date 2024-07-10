"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ISYDeviceNode = exports.ISYNode = void 0;
const events_1 = require("events");
const util_1 = require("util");
const Families_js_1 = require("./Definitions/Families.js");
const ISY_js_1 = require("./ISY.js");
class ISYNode extends events_1.EventEmitter {
    isy;
    formatted = {};
    uom = {};
    pending = {};
    local = {};
    flag;
    nodeDefId;
    address;
    // [x: string]: any;
    name;
    displayName;
    spokenName;
    location;
    isLoad;
    folder = '';
    parent;
    parentType;
    elkId;
    nodeType;
    baseDisplayName;
    propsInitialized;
    logger;
    lastChanged;
    enabled;
    baseName;
    family;
    constructor(isy, node) {
        super();
        this.isy = isy;
        this.nodeType = 0;
        this.flag = node.flag;
        this.nodeDefId = node.nodeDefId;
        this.address = String(node.address);
        this.name = node.name;
        this.family = node.family ?? Families_js_1.Family.Insteon;
        this.parent = node.parent;
        this.parentType = Number(this.parent?.type);
        this.enabled = node.enabled ?? true;
        this.elkId = node.ELK_ID;
        this.propsInitialized = false;
        const s = this.name.split('.');
        //if (s.length > 1)
        //s.shift();
        this.baseDisplayName = s.join(' ').replace(/([A-Z])/g, ' $1').replace('  ', ' ').replace('  ', ' ').trim();
        if (this.parentType === ISY_js_1.NodeType.Folder) {
            this.folder = isy.folderMap.get(this.parent._);
            isy.logger.info(`${this.name} this node is in folder ${this.folder}`);
            this.logger = (msg, level = 'debug', ...meta) => {
                isy.logger.log(level, `${this.folder} ${this.name} (${this.address}): ${msg}`, meta);
                return isy.logger;
            };
            this.displayName = `${this.folder} ${this.baseName}`;
        }
        else {
            this.displayName = this.baseDisplayName;
            this.logger = (msg, level = 'debug', ...meta) => {
                isy.logger.log(level, `${this.name} (${this.address}): ${msg}`, meta);
                return isy.logger;
            };
        }
        this.logger(this.nodeDefId);
        this.lastChanged = new Date();
    }
    handlePropertyChange(propertyName, value, formattedValue) {
        this.lastChanged = new Date();
        return true;
    }
    handleControlTrigger(controlName) {
        //this.lastChanged = new Date();
        return true;
    }
    on(event, listener) {
        super.on(event, listener);
        return this;
    }
    emit(event, propertyName, newValue, oldValue, formattedValue, controlName) {
        if ('PropertyChanged')
            return super.emit(event, propertyName, newValue, oldValue, formattedValue);
        else if ('ControlTriggered')
            return super.emit(event, controlName);
    }
    handleEvent(event) {
        let actionValue = null;
        if (event.action instanceof Object) {
            actionValue = event.action._;
        }
        else if (event.action instanceof Number || event.action instanceof String) {
            actionValue = Number(event.action);
        }
        if (event.control in this.local) {
            // property not command
            const formatted = 'fmtAct' in event ? event.fmtAct : actionValue;
            return this.handlePropertyChange(event.control, actionValue, formatted);
        }
        else if (event.control === '_3') {
            this.logger(`Received Node Change Event: ${JSON.stringify(event)}. These are currently unsupported.`, 'info');
        }
        else {
            // this.logger(event.control);
            const e = event.control;
            const dispName = ISY_js_1.Controls[e];
            if (dispName !== undefined && dispName !== null) {
                this.logger(`Command ${dispName.label} (${e}) triggered.`);
            }
            else {
                this.logger(`Command ${e} triggered.`);
            }
            let controlName = e;
            this.handleControlTrigger(controlName);
            return true;
        }
    }
    static _displayNameFunction;
    setDisplayName(template) {
        // tslint:disable-next-line: only-arrow-functions
        if (!ISYNode._displayNameFunction) {
            // template = template.replace("{", "{this."};
            const regex = /(?<op1>\w+) \?\? (?<op2>\w+)/g;
            this.logger(`Display name format: ${template}`);
            let newttemp = template.replace(regex, 'this.$<op1> === null || this.$<op1> === undefined || this.$<op1> === \'\' ? this.$<op2> : this.$<op1>');
            this.logger(`Template format updated to: ${newttemp}`);
            const s = { location: this.location ?? '', folder: this.folder ?? '', spokenName: this.spokenName ?? this.name, name: this.name ?? '' };
            newttemp = newttemp.replace('this.name', 'this.baseDisplayName');
            ISYNode._displayNameFunction = new Function(`return \`${newttemp}\`.trim();`);
        }
        return ISYNode._displayNameFunction.call(this);
    }
    async refreshNotes() {
        const that = this;
        try {
            const result = await this.getNotes();
            if (result !== null && result !== undefined) {
                that.location = result.location ?? this.folder ?? '';
                that.spokenName = result.spoken ?? this.folder ?? '';
                // if(result.spoken)
            }
            else {
                that.logger('No notes found.');
            }
            that.displayName = that.setDisplayName.bind(that)(that.isy.displayNameFormat);
            that.displayName = that.displayName ?? this.baseDisplayName;
            that.logger(`The friendly name updated to: ${that.displayName}`);
        }
        catch (e) {
            that.logger(e);
        }
    }
    async getNotes() {
        try {
            const result = await this.isy.callISY(`nodes/${this.address}/notes`);
            if (result !== null && result !== undefined) {
                return result.NodeProperties;
            }
            else {
                return null;
            }
        }
        catch (e) {
            return null;
        }
    }
}
exports.ISYNode = ISYNode;
class ISYDeviceNode extends ISYNode {
    typeCode;
    deviceClass;
    parentAddress;
    category;
    subCategory;
    type;
    _parentDevice;
    children = [];
    scenes = [];
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
            if (!(0, util_1.isNullOrUndefined)(this._parentDevice)) {
                this._parentDevice.addChild(this);
            }
        }
        if (Array.isArray(node.property)) {
            for (const prop of node.property) {
                this.local[prop.id] = this.convertFrom(prop.value, prop.uom, prop.id);
                this.formatted[prop.id] = prop.formatted;
                this.uom[prop.id] = prop.uom;
                this.logger(`Property ${ISY_js_1.Controls[prop.id].label} (${prop.id}) initialized to: ${this.local[prop.id]} (${this.formatted[prop.id]})`);
            }
        }
        else if (node.property) {
            this.local[node.property.id] = this.convertFrom(node.property.value, node.property.uom, node.property.id);
            this.formatted[node.property.id] = node.property.formatted;
            this.uom[node.property.id] = node.property.uom;
            this.logger(`Property ${ISY_js_1.Controls[node.property.id].label} (${node.property.id}) initialized to: ${this.local[node.property.id]} (${this.formatted[node.property.id]})`);
        }
    }
    convertTo(value, UnitOfMeasure, propertyName = null) {
        return value;
    }
    convertFrom(value, UnitOfMeasure, propertyName = null) {
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
        var result = (await this.isy.callISY(`nodes/${this.address}/${propertyName}`));
        this.logger(JSON.stringify(result), "debug");
        return result.property;
    }
    async readProperties() {
        var result = (await this.isy.callISY(`nodes/${this.address}/status`));
        this.logger(JSON.stringify(result), "debug");
        return result.property;
    }
    async updateProperty(propertyName, value) {
        const val = this.convertTo(Number(value), Number(this.uom[propertyName]));
        this.logger(`Updating property ${ISY_js_1.Controls[propertyName].label}. incoming value: ${value} outgoing value: ${val}`);
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
        this.parseResult(node);
        return await this.isy.callISY(`nodes/${this.address}/status`);
    }
    parseResult(node) {
        if (Array.isArray(node.property)) {
            for (const prop of node.property) {
                this.applyStatus(prop);
            }
        }
        else if (node.property) {
            this.applyStatus(node.property);
            //device.local[node.property.id] = node.property.value;
            //device.formatted[node.property.id] = node.property.formatted;
            //device.uom[node.property.id] = node.property.uom;
            this.logger(`Property ${ISY_js_1.Controls[node.property.id].label} (${node.property.id}) refreshed to: ${this[node.property.id]} (${this.formatted[node.property.id]})`);
        }
    }
    applyStatus(prop) {
        this.local[prop.id] = prop.value;
        this.formatted[prop.id] = prop.formatted;
        this.uom[prop.id] = prop.uom;
        this.logger(`Property ${ISY_js_1.Controls[prop.id].label} (${prop.id}) refreshed to: ${this[prop.id]} (${this.formatted[prop.id]})`);
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
                this.logger(`Property ${ISY_js_1.Controls[propertyName].label} (${propertyName}) updated to: ${val} (${formattedValue})`);
                this.local[propertyName] = val;
                this.formatted[propertyName] = formattedValue;
                this.lastChanged = new Date();
                changed = true;
            }
            else {
                this.logger(`Update event triggered, property ${ISY_js_1.Controls[propertyName].label} (${propertyName}) is unchanged.`);
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
exports.ISYDeviceNode = ISYDeviceNode;