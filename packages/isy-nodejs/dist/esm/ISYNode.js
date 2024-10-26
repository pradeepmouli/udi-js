import { UnitOfMeasure } from './Definitions/Global/UOM.js';
import { NodeType } from './ISY.js';
import { Event } from './Definitions/Global/Events.js';
//type DriverValues<DK extends string | number | symbol,V = any> = {[x in DK]?:V};
export class ISYNode {
    // #region Properties (32)
    static #displayNameFunction;
    #parentNode;
    address;
    baseLabel;
    flag;
    isy;
    nodeDefId;
    static family;
    static nodeDefId = 'Unknown';
    baseName;
    commands;
    //public readonly formatted: DriverValues<keyof D,string> = {};
    //public readonly uom: { [x in Driver.Literal]?: UnitOfMeasure } = { ST: UnitOfMeasure.Boolean };
    //public readonly pending: DriverValues<keyof D> = {};
    //public readonly local: DriverValues<keyof D> = {};
    drivers = {};
    enabled;
    //TODO: add signature for non-command/non-driver events
    events;
    //Event.FunctionSigFor<Event.ForAll<E,typeof this>> & Omit<EventEmitter,'on'>
    /*{
        [x in E]: x extends keyof D ? {name:`${D[x]["name"]}Changed`, driver: x, value: D[x]["value"], formatted: string, uom: UnitOfMeasure}
        : x extends keyof C ? {name: `${C[x]['name']}Triggered`, command: x}
        : {name: E};
    };*/
    family;
    folder = '';
    hidden;
    isDimmable;
    isLoad;
    label;
    lastChanged;
    location;
    logger;
    // [x: string]: any;
    name;
    nodeType;
    parent;
    parentAddress;
    parentType;
    propsInitialized;
    scenes;
    spokenName;
    type;
    // #endregion Properties (32)
    // #region Constructors (1)
    constructor(isy, node) {
        this.isy = isy;
        this.nodeType = 0;
        this.flag = node.flag;
        this.nodeDefId = node.nodeDefId;
        this.address = String(node.address);
        this.name = node.name;
        this.family = node.family;
        this.parent = node.parent;
        this.parentType = Number(this.parent?.type);
        this.enabled = node.enabled ?? true;
        this.propsInitialized = false;
        const s = this.name.split('.');
        //if (s.length > 1)
        //s.shift();
        this.baseLabel = s
            .join(' ')
            .replace(/([A-Z])/g, ' $1')
            .replace('  ', ' ')
            .replace('  ', ' ')
            .trim();
        if (this.parentType === NodeType.Folder) {
            this.folder = isy.folderMap.get(this.parent._);
            isy.logger.info(`${this.name} this node is in folder ${this.folder}`);
            this.logger = (msg, level = 'debug', ...meta) => {
                isy.logger[level](`${this.folder} ${this.name} (${this.address}): ${msg}`, meta);
                return isy.logger;
            };
            this.label = `${this.folder} ${this.baseName}`;
        }
        else {
            this.label = this.baseLabel;
            this.logger = (msg, level = 'debug', ...meta) => {
                isy.logger[level](`${this.name} (${this.address}): ${msg}`, meta);
                return isy.logger;
            };
        }
        this.events = Event.createEmitter(this);
        //this.logger(this.nodeDefId);
        this.lastChanged = new Date();
    }
    // #endregion Constructors (1)
    // #region Public Getters And Setters (1)
    get parentNode() {
        if (this.#parentNode === undefined) {
            if (this.parentAddress !== this.address && this.parentAddress !== null && this.parentAddress !== undefined) {
                this.#parentNode = this.isy.getDevice(this.parentAddress);
                if (this.#parentNode !== null) {
                    //this.#parentNode.addChild(this);
                }
            }
            this.#parentNode = null;
        }
        return this.#parentNode;
    }
    // #endregion Public Getters And Setters (1)
    // #region Public Methods (18)
    addLink(isyScene) {
        this.scenes.push(isyScene);
    }
    applyStatus(prop) {
        var d = this.drivers[prop.id];
        if (d) {
            d.apply(prop);
            this.logger(`Property ${d.label} (${prop.id}) refreshed to: ${d.value} (${d.state.formattedValue}})`);
            //d.state.value = this.convertFrom(prop.value, prop.uom, prop.id);
            //d.state.formatted = prop.formatted;
            //d.state.uom = prop.uom;
        }
    }
    convert(value, from, to) {
        return value;
    }
    convertFrom(value, uom, propertyName) {
        throw new Error('Method not implemented.');
    }
    convertTo(value, uom, propertyName) {
        if (this.drivers[propertyName].uom != uom) {
            this.isy.logger.debug(`Converting ${this.drivers[propertyName].label} from ${this.drivers[propertyName].uom} to ${UnitOfMeasure}`);
            return this.convertTo(value, uom);
        }
    }
    emit(event, propertyName, newValue, oldValue, formattedValue, controlName) {
        //if ('PropertyChanged') return super.emit(event, propertyName, newValue, oldValue, formattedValue);
        //else if ('ControlTriggered') return super.emit(event, controlName);
    }
    generateLabel(template) {
        // tslint:disable-next-line: only-arrow-functions
        if (!ISYNode.#displayNameFunction) {
            // template = template.replace("{", "{this."};
            const regex = /(?<op1>\w+) \?\? (?<op2>\w+)/g;
            this.logger(`Display name format: ${template}`);
            let newttemp = template.replace(regex, "this.$<op1> === null || this.$<op1> === undefined || this.$<op1> === '' ? this.$<op2> : this.$<op1>");
            this.logger(`Template format updated to: ${newttemp}`);
            const s = {
                location: this.location ?? '',
                folder: this.folder ?? '',
                spokenName: this.spokenName ?? this.name,
                name: this.name ?? ''
            };
            newttemp = newttemp.replace('this.name', 'this.baseLabel');
            ISYNode.#displayNameFunction = new Function(`return \`${newttemp}\`.trim();`);
        }
        return ISYNode.#displayNameFunction.call(this);
    }
    async getNotes() {
        try {
            const result = await this.isy.sendRequest(`nodes/${this.address}/notes`);
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
    handleControlTrigger(controlName) {
        //this.lastChanged = new Date();
        this.events.emit('ControlTriggered', controlName);
        return true;
    }
    handleEvent(event) {
        let actionValue = null;
        if (event.action instanceof Object) {
            actionValue = event.action._;
        }
        else if (event.action instanceof Number || event.action instanceof String) {
            actionValue = Number(event.action);
        }
        if (event.control in this.drivers) {
            // property not command
            const formatted = 'fmtAct' in event ? event.fmtAct : actionValue;
            return this.handlePropertyChange(event.control, actionValue, event.action.uom, event.action.prec, formatted);
        }
        else if (event.control === '_3') {
            this.logger(`Received Node Change Event: ${JSON.stringify(event)}. These are currently unsupported.`, 'debug');
        }
        else {
            // this.logger(event.control);
            const e = event.control;
            const dispName = this.commands[e].name;
            if (dispName !== undefined && dispName !== null) {
                this.logger(`Command ${dispName} (${e}) triggered.`);
            }
            else {
                this.logger(`Command ${e} triggered.`);
            }
            this.handleControlTrigger(e);
            return true;
        }
    }
    handlePropertyChange(propertyName, value, uom, formattedValue, prec) {
        this.lastChanged = new Date();
        const oldValue = this.drivers[propertyName].value;
        if (this.drivers[propertyName].patch(value, formattedValue, uom, prec)) {
            this.emit('PropertyChanged', propertyName, value, oldValue, formattedValue);
            this.scenes.forEach((element) => {
                this.logger(`Recalulating ${element.deviceFriendlyName}`);
                element.recalculateState();
            });
        }
        return true;
    }
    /*public override on(event: 'PropertyChanged', listener: (propertyName: keyof D, newValue: any, oldValue: any, formattedValue: string) => any): this;
    public override on(event: 'ControlTriggered', listener: (controlName: keyof C) => any): this;
    public override on(event: string | symbol, listener: (...args: any[]) => void): this {
        super.on(event, listener);
        return this;
    }*/
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
        }
    }
    async readProperties() {
        var result = await this.isy.sendRequest(`nodes/${this.address}/status`);
        this.logger(JSON.stringify(result), 'debug');
        return result.property;
    }
    /*public addChild<K extends ISYDeviceNode<T, any, any, any>>(childDevice: K) {
    this.children.push(childDevice);
  }*/
    async readProperty(propertyName) {
        var result = await this.isy.sendRequest(`nodes/${this.address}/${propertyName}`);
        return result.property;
    }
    async refresh() {
        const device = this;
        const node = (await this.isy.sendRequest(`nodes/${this.address}/status`)).node;
        // this.logger(node);
        this.parseResult(node);
        return await this.isy.sendRequest(`nodes/${this.address}/status`);
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
            that.label = that.generateLabel.bind(that)(that.isy.displayNameFormat);
            that.label = that.label ?? this.baseLabel;
            that.logger(`The friendly name updated to: ${that.label}`);
        }
        catch (e) {
            that.logger(e);
        }
    }
    async sendCommand(command, parameters) {
        //@
        return this.isy.sendNodeCommand(this, command, parameters);
    }
    async updateProperty(propertyName, value) {
        var l = this.drivers[propertyName];
        if (l) {
            if (l.serverUom)
                l.state.pendingValue = this.convert(value, l.uom, l.serverUom);
            else
                l.state.pendingValue = value;
        }
        this.logger(`Updating property ${l.label}. incoming value: ${value} outgoing value: ${l.state.pendingValue}`);
        return this.isy.sendRequest(`nodes/${this.address}/set/${propertyName}/${l.state.pendingValue}`).then((p) => {
            l.state.pendingValue = null;
        });
    }
}
(function (ISYNode) {
    //TODO: fix return types
    /*export type WithCommands<C extends Command.Signatures<any>> = C extends Command.Signatures<infer U> ? {
      [K in C[U]["name"]]: C[K];
    } : never;*/
    ISYNode.With = (Base) => {
        return class extends Base {
        };
    };
})(ISYNode || (ISYNode = {}));
//# sourceMappingURL=ISYNode.js.map