import { EventEmitter } from 'events';
import { isNullOrUndefined } from 'util';

import { Family } from './Definitions/Families.js';
import { Categories, Controls, ISY, ISYScene, NodeType } from './ISY.js';
import { PropertyChangedEventEmitter } from './Utils.js';
import { LogMethod, Logform, Logger, debug } from 'winston';
import { NodeInfo } from './Definitions/NodeInfo.js';
import { PropertyStatus } from './Definitions/PropertyStatus.js';


interface Node {
	flag?: any;
	nodeDefId?: string;
	address?: string;
	name?: string;
	family?: Family;
	parent?: any;
	enabled?: boolean;
	ELK_ID?: string;
}

export interface NodeNotes {
	location: string;
	spoken: string;

}

export class ISYNode<Drivers extends string = string> extends EventEmitter implements PropertyChangedEventEmitter {

	public readonly isy: ISY;




	public readonly formatted: any[Drivers] = {};
    public readonly uom: any[Drivers] = {};
    public readonly pending: any[Drivers] = {};
    public readonly local: any[Drivers] = {};
	public readonly flag: any;
	public readonly nodeDefId: string;
	public readonly address: string;
	// [x: string]: any;
	public name: string;
	public displayName: string;
	public spokenName: string;
	public location: string;
	public isLoad: boolean;

	public folder: string = '';
	public parent: any;
	public parentType: NodeType;
	public readonly elkId: string;
	public nodeType: number;
	public readonly baseDisplayName: string;
	public propsInitialized: boolean;
	public logger: (( msg: any, level?: 'error'|'warn'|'debug'|'info', ...meta: any[]) => Logger);
	public lastChanged: Date;
	public enabled: boolean;
	baseName: any;
	family: Family;
	constructor (isy: ISY, node: Node) {
		super();
		this.isy = isy;
		this.nodeType = 0;
		this.flag = node.flag;
		this.nodeDefId = node.nodeDefId;
		this.address = String(node.address);
		this.name = node.name;
		this.family = node.family ?? Family.Insteon;


		this.parent = node.parent;

		this.parentType = Number(this.parent?.type);

		this.enabled = node.enabled ?? true;
		this.elkId = node.ELK_ID;

		this.propsInitialized = false;
		const s = this.name.split('.');
		//if (s.length > 1)
			//s.shift();
		this.baseDisplayName = s.join(' ').replace(/([A-Z])/g, ' $1').replace('  ', ' ').replace('  ',' ').trim();
		if (this.parentType === NodeType.Folder) {

			this.folder = isy.folderMap.get(this.parent._);
			isy.logger.info(`${this.name} this node is in folder ${this.folder}`);
			this.logger = (msg : any,level: 'error'|'warn'|'debug'|'info' = 'debug' , ...meta: any[]) => {
				 isy.logger.log(level,`${this.folder} ${this.name} (${this.address}): ${msg}`, meta);
				 return isy.logger;
			};

			this.displayName = `${this.folder} ${this.baseName}`;
		}
		else {
			this.displayName = this.baseDisplayName;
			this.logger = (msg : any, level: 'error'|'warn'|'debug'|'info' = 'debug',...meta: any[]) => {
				isy.logger.log(level,`${this.name} (${this.address}): ${msg}`,meta);
				return isy.logger;
		   };
		}

		this.logger(this.nodeDefId);
		this.lastChanged = new Date();
	}

	 handlePropertyChange(propertyName: string, value: any, formattedValue: string): boolean {
		this.lastChanged = new Date();

		return true;
	}

	public handleControlTrigger(controlName: string): boolean {
		//this.lastChanged = new Date();

		return true;
	}

	public override on(event: 'PropertyChanged'|'ControlTriggered', listener: ((propertyName: string, newValue: any, oldValue: any, formattedValue: string) => any)|((controlName: string) => any)): this {
		super.on(event, listener);
		return this;
	}

	public override emit(event: 'PropertyChanged'|'ControlTriggered', propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string) {
		if('PropertyChanged')
			return super.emit(event, propertyName, newValue, oldValue, formattedValue);
		else if('ControlTriggered')
			return super.emit(event,controlName);
	}


	public handleEvent(event: any): boolean {
		let actionValue = null;
		if (event.action instanceof Object) {
			actionValue = event.action._;
		} else if (event.action instanceof Number || event.action instanceof String) {
			actionValue = Number(event.action);
		}

		if (event.control in this.local) {
			// property not command
			const formatted = 'fmtAct' in event ? event.fmtAct : actionValue;
			return this.handlePropertyChange(event.control, actionValue, formatted);
		}
		else if(event.control === '_3')
		{
			this.logger(`Received Node Change Event: ${JSON.stringify(event)}. These are currently unsupported.`,'info');
		}
		else {
			// this.logger(event.control);
			const e = event.control;
			const dispName = Controls[e];
			if (dispName !== undefined && dispName !== null) {
				this.logger(`Command ${dispName.label} (${e}) triggered.`);
			} else {
				this.logger(`Command ${e} triggered.`);

			}
			let controlName : string = e;
			this.handleControlTrigger(controlName);
			return true;
		}
	}

	static _displayNameFunction: Function;

	public setDisplayName(template: string): string {
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


	public async refreshNotes() {
		const that = this;
		try {

			const result = await this.getNotes();
			if (result !== null && result !== undefined) {
				that.location = result.location ?? this.folder ?? '';
				that.spokenName = result.spoken ?? this.folder ?? '';
				// if(result.spoken)

			} else {
				that.logger('No notes found.');
			}
			that.displayName = that.setDisplayName.bind(that)(that.isy.displayNameFormat);
			that.displayName = that.displayName ?? this.baseDisplayName;
			that.logger(`The friendly name updated to: ${that.displayName}`);
		} catch (e) {

			that.logger(e);
		}

	}

	public async getNotes(): Promise<NodeNotes> {

		try {
			const result = await this.isy.callISY(`nodes/${this.address}/notes`);
			if (result !== null && result !== undefined) {
				return result.NodeProperties;
			} else {
				return null;
			}

		} catch (e) {
			return null;
		}
	}





}

export class ISYDeviceNode<T extends Family, Drivers extends string = string, Commands extends string = string> extends ISYNode<Drivers> {
    declare public family: T;

    public readonly typeCode: string;
    public readonly deviceClass: any;
    public readonly parentAddress: any;
    public readonly category: number;
    public readonly subCategory: number;
    public readonly type: any;
    public _parentDevice: ISYDeviceNode<T,string,string>;
    public readonly children: Array<ISYDeviceNode<T,string,string>> = [];
    public readonly scenes: ISYScene[] = [];

    public hidden: boolean = false;

    public _enabled: any;
    productName: string;
    model: string;
    modelNumber: string;
    version: string;
    isDimmable: boolean;

    constructor (isy: ISY, node: NodeInfo) {
        super(isy, node);

        this.family = node.family as T;
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
                this.local[prop.id] = this.convertFrom(prop.value, prop.uom,prop.id as Drivers);
                this.formatted[prop.id] = prop.formatted;
                this.uom[prop.id] = prop.uom;
                this.logger(
                    `Property ${Controls[prop.id].label} (${prop.id}) initialized to: ${this.local[prop.id]} (${this.formatted[prop.id]})`
                );
            }
        } else if (node.property) {
            this.local[node.property.id] = this.convertFrom(
                node.property.value,
                node.property.uom, node.property.id as Drivers
            );
            this.formatted[node.property.id] = node.property.formatted;
            this.uom[node.property.id] = node.property.uom;
            this.logger(
                `Property ${Controls[node.property.id].label} (${node.property.id}) initialized to: ${this.local[node.property.id]} (${this.formatted[node.property.id]})`
            );
        }

    }

    public convertTo(value: any, UnitOfMeasure: number, propertyName: Drivers = null): any {
        return value;
    }

    public convertFrom(value: any, UnitOfMeasure: number, propertyName: Drivers = null): any {
        return value;
    }

    public addLink(isyScene: ISYScene) {
        this.scenes.push(isyScene);
    }

    public addChild(childDevice: ISYDeviceNode<T,string,string>) {
        this.children.push(childDevice);
    }

    get parentDevice(): ISYDeviceNode<T,string,string> {
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



    public async readProperty(propertyName: Drivers): Promise<PropertyStatus> {

        var result = (await this.isy.callISY(`nodes/${this.address}/${propertyName}`));
        this.logger(JSON.stringify(result), "debug");
        return result.property;
    }

    public async readProperties(): Promise<PropertyStatus[]> {
        var result = (await this.isy.callISY(`nodes/${this.address}/status`));
        this.logger(JSON.stringify(result), "debug");
        return result.property;
    }

    public async updateProperty(propertyName: string, value: string): Promise<any> {
        const val = this.convertTo(Number(value), Number(this.uom[propertyName]));
        this.logger(
            `Updating property ${Controls[propertyName].label}. incoming value: ${value} outgoing value: ${val}`
        );
        this.pending[propertyName] = value;
        return this.isy
            .callISY(`nodes/${this.address}/set/${propertyName}/${val}`)
            .then((p) => {
                this.local[propertyName] = value;
                this.pending[propertyName] = null;
            });
    }



    public async sendCommand(command: string, parameters?: (Record<string | symbol, string | number> | string | number)): Promise<any> {
        return this.isy.sendNodeCommand(this, command, parameters);
    }

    public async refresh(): Promise<any> {
        const device = this;
        const node = (await this.isy.callISY(`nodes/${this.address}/status`)).node;
        // this.logger(node);
        this.parseResult(node);
        return await this.isy.callISY(`nodes/${this.address}/status`);
    }



    public parseResult(node: { property: PropertyStatus | PropertyStatus[]; }) {
        if (Array.isArray(node.property)) {
            for (const prop of node.property) {
                this.applyStatus(prop);
            }
        } else if (node.property) {
            this.applyStatus(node.property);
            //device.local[node.property.id] = node.property.value;
            //device.formatted[node.property.id] = node.property.formatted;
            //device.uom[node.property.id] = node.property.uom;
            this.logger(
                `Property ${Controls[node.property.id].label} (${node.property.id}) refreshed to: ${this[node.property.id]} (${this.formatted[node.property.id]})`
            );
        }
    }

    public applyStatus(prop: PropertyStatus) {
        this.local[prop.id] = prop.value;
        this.formatted[prop.id] = prop.formatted;
        this.uom[prop.id] = prop.uom;
        this.logger(
            `Property ${Controls[prop.id].label} (${prop.id}) refreshed to: ${this[prop.id]} (${this.formatted[prop.id]})`
        );
    }

    public override handleControlTrigger(controlName: string) {
        return this.emit('ControlTriggered', controlName);
    }

    public override handlePropertyChange(propertyName: any, value: any, formattedValue: string) {
        let changed = false;
        const priorVal = this.local[propertyName];
        try {
            const val = this.convertFrom(
                value,
                this.uom[propertyName]
            );

            if (this.local[propertyName] !== val) {

                this.logger(
                    `Property ${Controls[propertyName].label} (${propertyName}) updated to: ${val} (${formattedValue})`
                );
                this.local[propertyName] = val;
                this.formatted[propertyName] = formattedValue;
                this.lastChanged = new Date();
                changed = true;
            } else {
                this.logger(
                    `Update event triggered, property ${Controls[propertyName].label} (${propertyName}) is unchanged.`
                );
            }
            if (changed) {
                this.emit('PropertyChanged', propertyName, val, priorVal, formattedValue);

                this.scenes.forEach((element) => {
                    this.logger(`Recalulating ${element.name}`);
                    element.recalculateState();
                });
            }
        }
		catch (error)
		{
			this.logger(error, "error")
		}
		finally {
            return changed;
        }
    }
}
