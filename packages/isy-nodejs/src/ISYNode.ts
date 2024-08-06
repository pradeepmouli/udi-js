import { EventEmitter } from 'events';
import { isNullOrUndefined } from 'util';

import { Family } from './Definitions/Global/Families.js';
import { DriverType,  Drivers, DriverList, Driver, type EnumLiteral } from './Definitions/Global/Drivers.js';
import { Categories, Controls, ISY, ISYScene, NodeType } from './ISY.js';
import { PropertyChangedEventEmitter } from './Utils.js';
import { LogMethod, Logform, Logger, debug } from 'winston';
import { NodeInfo } from './Model/NodeInfo.js';
import { DriverState } from './Model/DriverState.js';
import { UnitOfMeasure } from './Definitions/Global/UOM.js';
import type { DriversOf } from './Model/ClusterMap.js';


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

export type DriverValues<DK extends string = DriverType.Status,V = any> = {[x in DK]?:V};



export class ISYNode<D extends Driver.Literal = Driver.Literal>  extends EventEmitter implements PropertyChangedEventEmitter {
  public readonly isy: ISY;

  public readonly formatted: DriverValues<D,string> = {};
  public readonly uom: { [x in Driver.Literal]?: UnitOfMeasure } = { ST: UnitOfMeasure.Boolean };
  public readonly pending: DriverValues<D> = {};
  public readonly local: DriverValues<D> = {};
  public readonly drivers: DriverList<D> = new Drivers<DriverType>() as any;

  public readonly flag: any;
  public readonly nodeDefId: string;
  public readonly address: string;
  // [x: string]: any;
  public name: string;
  public label: string;
  public spokenName: string;
  public location: string;
  public isLoad: boolean;

  public folder: string = "";
  public parent: any;
  public parentType: NodeType;
  public readonly elkId: string;
  public nodeType: number;
  public readonly baseLabel: string;
  public propsInitialized: boolean;
  public logger: (msg: any, level?: "error" | "warn" | "debug" | "info", ...meta: any[]) => Logger;
  public lastChanged: Date;
  public enabled: boolean;
  baseName: any;
  family: Family;
  constructor(isy: ISY, node: Node) {
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
    const s = this.name.split(".");
    //if (s.length > 1)
    //s.shift();
    this.baseLabel = s
      .join(" ")
      .replace(/([A-Z])/g, " $1")
      .replace("  ", " ")
      .replace("  ", " ")
      .trim();
    if (this.parentType === NodeType.Folder) {
      this.folder = isy.folderMap.get(this.parent._);
      isy.logger.info(`${this.name} this node is in folder ${this.folder}`);
      this.logger = (msg: any, level: "error" | "warn" | "debug" | "info" = "debug", ...meta: any[]) => {
        isy.logger.log(level, `${this.folder} ${this.name} (${this.address}): ${msg}`, meta);
        return isy.logger;
      };

      this.label = `${this.folder} ${this.baseName}`;
    } else {
      this.label = this.baseLabel;
      this.logger = (msg: any, level: "error" | "warn" | "debug" | "info" = "debug", ...meta: any[]) => {
        isy.logger.log(level, `${this.name} (${this.address}): ${msg}`, meta);
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

  public override on(
    event: "PropertyChanged" | "ControlTriggered",
    listener:
      | ((propertyName: string, newValue: any, oldValue: any, formattedValue: string) => any)
      | ((controlName: string) => any)
  ): this {
    super.on(event, listener);
    return this;
  }

  public override emit(
    event: "PropertyChanged" | "ControlTriggered",
    propertyName?: string,
    newValue?: any,
    oldValue?: any,
    formattedValue?: string,
    controlName?: string
  ) {
    if ("PropertyChanged") return super.emit(event, propertyName, newValue, oldValue, formattedValue);
    else if ("ControlTriggered") return super.emit(event, controlName);
  }

  public handleEvent(event: { control?: any; data?: any; node?: any; action?: any; fmtAct?: any; }): boolean {
    let actionValue = null;
    if (event.action instanceof Object) {
      actionValue = event.action._;
    } else if (event.action instanceof Number || event.action instanceof String) {
      actionValue = Number(event.action);
    }

    if (event.control in this.local) {
      // property not command
      const formatted = "fmtAct" in event ? event.fmtAct : actionValue;
      return this.handlePropertyChange(event.control, actionValue, formatted);
    } else if (event.control === "_3") {
      this.logger(`Received Node Change Event: ${JSON.stringify(event)}. These are currently unsupported.`, "debug");
    } else {
      // this.logger(event.control);
      const e = event.control;
      const dispName = Controls[e];
      if (dispName !== undefined && dispName !== null) {
        this.logger(`Command ${dispName.label} (${e}) triggered.`);
      } else {
        this.logger(`Command ${e} triggered.`);
      }
      let controlName: string = e;
      this.handleControlTrigger(controlName);
      return true;
    }
  }

  static _displayNameFunction: Function;

  public generateLabel(template: string): string {
    // tslint:disable-next-line: only-arrow-functions
    if (!ISYNode._displayNameFunction) {
      // template = template.replace("{", "{this."};
      const regex = /(?<op1>\w+) \?\? (?<op2>\w+)/g;
      this.logger(`Display name format: ${template}`);
      let newttemp = template.replace(
        regex,
        "this.$<op1> === null || this.$<op1> === undefined || this.$<op1> === '' ? this.$<op2> : this.$<op1>"
      );
      this.logger(`Template format updated to: ${newttemp}`);
      const s = {
        location: this.location ?? "",
        folder: this.folder ?? "",
        spokenName: this.spokenName ?? this.name,
        name: this.name ?? "",
      };
      newttemp = newttemp.replace("this.name", "this.baseLabel");
      ISYNode._displayNameFunction = new Function(`return \`${newttemp}\`.trim();`);
    }

    return ISYNode._displayNameFunction.call(this);
  }

  public async refreshNotes() {
    const that = this;
    try {
      const result = await this.getNotes();
      if (result !== null && result !== undefined) {
        that.location = result.location ?? this.folder ?? "";
        that.spokenName = result.spoken ?? this.folder ?? "";
        // if(result.spoken)
      } else {
        that.logger("No notes found.");
      }
      that.label = that.generateLabel.bind(that)(that.isy.displayNameFormat);
      that.label = that.label ?? this.baseLabel;
      that.logger(`The friendly name updated to: ${that.label}`);
    } catch (e) {
      that.logger(e);
    }
  }

  public async getNotes(): Promise<NodeNotes> {
    try {
      const result = await this.isy.sendRequest(`nodes/${this.address}/notes`);
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

export interface ISYDevice<T extends Family, D extends Driver.Literal = Driver.Literal, C extends string = string> {
  logger(arg0: string): unknown;
  handleEvent(evt: any): unknown;
  on(arg0: string, arg1: any): unknown;
  name: any;
  formatted: DriverValues<D, string>;
  uom: { [x in Driver.Literal]?: UnitOfMeasure };
  pending: DriverValues<D>;
  local: DriverValues<D>;
  drivers: DriverList<D>;
  address: string;
  family: T;
  typeCode: string;
  deviceClass: any;
  parentAddress: any;
  category: number;
  subCategory: number;
  type: any;
  _parentDevice: ISYDeviceNode<T, Driver.Literal, string>;
  children: Array<ISYDeviceNode<T, Driver.Literal, string>>;
  scenes: ISYScene[];
  hidden: boolean;
  enabled: boolean;
  productName: string;
  model: string;
  modelNumber: string;
  version: string;
  isDimmable: boolean;
  label: string;

  convertTo(value: any, UnitOfMeasure: number): any;
  convertTo(value: any, UnitOfMeasure: number, propertyName: Driver.Literal): any;

  convertFrom(value: any, UnitOfMeasure: number): any;
  convertFrom(value: any, UnitOfMeasure: number, propertyName: Driver.Literal): any;
  addLink(isyScene: ISYScene): void;
  addChild(childDevice: ISYDeviceNode<T, Driver.Literal, string>): void;
  readProperty(propertyName: D): Promise<DriverState>;
  readProperties(): Promise<DriverState[]>;
  updateProperty(propertyName: D, value: string): Promise<any>;
  sendCommand(command: C, parameters?: Record<string | symbol, string | number> | string | number): Promise<any>;
  refresh(): Promise<any>;
  refreshNotes(): Promise<void>;
  parseResult(node: { property: DriverState | DriverState[] }): void;
  handleControlTrigger(controlName: C): boolean;
  handlePropertyChange(propertyName: D, value: any, formattedValue: string): boolean;
}


type NodeList = ISYNode<any>[]

export type MapOf<T extends NodeList> = T extends [infer F extends ISYNode<any>] ? DriversOf<F> : T extends [infer F extends ISYNode<any>, ...infer R extends NodeList] ? DriversOf<F> | MapOf<R> : [];

type D = DriversOf<ISYNode<"ST">>


export class ISYMultiNodeDevice<T extends Family, L extends [ISYNode<DriverType.Status>, ISYNode<"ST">, ISYNode<"SECMD">]>
  implements ISYDevice<T, Driver.Literal, string>
{
  logger(arg0: string): unknown {
    throw new Error('Method not implemented.');
  }
  handleEvent(evt: any): unknown {
    throw new Error('Method not implemented.');
  }
  enabled: boolean;
  refreshNotes(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  address: string;
  on(arg0: string, arg1: any): unknown {
    throw new Error("Method not implemented.");
  }
  name: any;

  label: string;
  formatted: {
    ACCX?: any;
    ACCY?: any;
    ACCZ?: any;
    AIRFLOW?: any;
    AQI?: any;
    ALARM?: any;
    ANGLPOS?: any;
    ATMPRES?: any;
    ADRPST?: any;
    AWAKE?: any;
    BARPRES?: any;
    BATLVL?: any;
    BEEP?: any;
    BPDIA?: any;
    BPSYS?: any;
    BMI?: any;
    BONEM?: any;
    BRT?: any;
    CO?: any;
    CO2LVL?: any;
    CTL?: any;
    CLISPC?: any;
    CC?: any;
    CPW?: any;
    CLITEMP?: any;
    CV?: any;
    GV0?: any;
    GV1?: any;
    GV2?: any;
    GV3?: any;
    GV30?: any;
    GV4?: any;
    GV5?: any;
    GV6?: any;
    GV7?: any;
    GV8?: any;
    GV9?: any;
    GV10?: any;
    GV11?: any;
    GV12?: any;
    GV13?: any;
    GV14?: any;
    GV15?: any;
    GV16?: any;
    GV17?: any;
    GV18?: any;
    GV19?: any;
    GV20?: any;
    GV21?: any;
    GV22?: any;
    GV23?: any;
    GV24?: any;
    GV25?: any;
    GV26?: any;
    GV27?: any;
    GV28?: any;
    GV29?: any;
    DELAY?: any;
    DEWPT?: any;
    BUSY?: any;
    SECMD?: any;
    DIM?: any;
    DISTANC?: any;
    WATERTD?: any;
    DUR?: any;
    ELECCON?: any;
    ELECRES?: any;
    CLIEMD?: any;
    ERR?: any;
    ETO?: any;
    TEMPEXH?: any;
    FDDOWN?: any;
    FDSTOP?: any;
    FDUP?: any;
    CLIFRS?: any;
    CLIFS?: any;
    CLIFSO?: any;
    DFOF?: any;
    DFON?: any;
    CH20?: any;
    FREQ?: any;
    GPV?: any;
    GVOL?: any;
    GUST?: any;
    CLIHCS?: any;
    HEATIX?: any;
    CLISPH?: any;
    HAIL?: any;
    HR?: any;
    CLIHUM?: any;
    LUMIN?: any;
    METHANE?: any;
    MODE?: any;
    MOIST?: any;
    MOON?: any;
    MUSCLEM?: any;
    DOF?: any;
    DOF3?: any;
    DOF4?: any;
    DOF5?: any;
    DON?: any;
    DON3?: any;
    DON4?: any;
    DON5?: any;
    OL?: any;
    OZONE?: any;
    PM10?: any;
    PM25?: any;
    POP?: any;
    PPW?: any;
    PF?: any;
    PRECIP?: any;
    PULSCNT?: any;
    QUERY?: any;
    RADON?: any;
    RAINRT?: any;
    RELMOD?: any;
    RESET?: any;
    RESPR?: any;
    RFSS?: any;
    ROTATE?: any;
    CLISMD?: any;
    SEISINT?: any;
    SEISMAG?: any;
    SMOKED?: any;
    SOILH?: any;
    SOILR?: any;
    SOILS?: any;
    SOILT?: any;
    SOLRAD?: any;
    SVOL?: any;
    SPEED?: any;
    ST?: any;
    TANKCAP?: any;
    USRNUM?: any;
    CLIMD?: any;
    TIDELVL?: any;
    TIME?: any;
    TIMEREM?: any;
    TBW?: any;
    TPW?: any;
    UV?: any;
    UAC?: any;
    VOCLVL?: any;
    WATERF?: any;
    WATERP?: any;
    WATERT?: any;
    WVOL?: any;
    WEIGHT?: any;
    WINDCH?: any;
    WINDDIR?: any;
    WATERTB?: any;
    TEMPOUT?: any;
  };
  uom: {
    ACCX?: UnitOfMeasure;
    ACCY?: UnitOfMeasure;
    ACCZ?: UnitOfMeasure;
    AIRFLOW?: UnitOfMeasure;
    AQI?: UnitOfMeasure;
    ALARM?: UnitOfMeasure;
    ANGLPOS?: UnitOfMeasure;
    ATMPRES?: UnitOfMeasure;
    ADRPST?: UnitOfMeasure;
    AWAKE?: UnitOfMeasure;
    BARPRES?: UnitOfMeasure;
    BATLVL?: UnitOfMeasure;
    BEEP?: UnitOfMeasure;
    BPDIA?: UnitOfMeasure;
    BPSYS?: UnitOfMeasure;
    BMI?: UnitOfMeasure;
    BONEM?: UnitOfMeasure;
    BRT?: UnitOfMeasure;
    CO?: UnitOfMeasure;
    CO2LVL?: UnitOfMeasure;
    CTL?: UnitOfMeasure;
    CLISPC?: UnitOfMeasure;
    CC?: UnitOfMeasure;
    CPW?: UnitOfMeasure;
    CLITEMP?: UnitOfMeasure;
    CV?: UnitOfMeasure;
    GV0?: UnitOfMeasure;
    GV1?: UnitOfMeasure;
    GV2?: UnitOfMeasure;
    GV3?: UnitOfMeasure;
    GV30?: UnitOfMeasure;
    GV4?: UnitOfMeasure;
    GV5?: UnitOfMeasure;
    GV6?: UnitOfMeasure;
    GV7?: UnitOfMeasure;
    GV8?: UnitOfMeasure;
    GV9?: UnitOfMeasure;
    GV10?: UnitOfMeasure;
    GV11?: UnitOfMeasure;
    GV12?: UnitOfMeasure;
    GV13?: UnitOfMeasure;
    GV14?: UnitOfMeasure;
    GV15?: UnitOfMeasure;
    GV16?: UnitOfMeasure;
    GV17?: UnitOfMeasure;
    GV18?: UnitOfMeasure;
    GV19?: UnitOfMeasure;
    GV20?: UnitOfMeasure;
    GV21?: UnitOfMeasure;
    GV22?: UnitOfMeasure;
    GV23?: UnitOfMeasure;
    GV24?: UnitOfMeasure;
    GV25?: UnitOfMeasure;
    GV26?: UnitOfMeasure;
    GV27?: UnitOfMeasure;
    GV28?: UnitOfMeasure;
    GV29?: UnitOfMeasure;
    DELAY?: UnitOfMeasure;
    DEWPT?: UnitOfMeasure;
    BUSY?: UnitOfMeasure;
    SECMD?: UnitOfMeasure;
    DIM?: UnitOfMeasure;
    DISTANC?: UnitOfMeasure;
    WATERTD?: UnitOfMeasure;
    DUR?: UnitOfMeasure;
    ELECCON?: UnitOfMeasure;
    ELECRES?: UnitOfMeasure;
    CLIEMD?: UnitOfMeasure;
    ERR?: UnitOfMeasure;
    ETO?: UnitOfMeasure;
    TEMPEXH?: UnitOfMeasure;
    FDDOWN?: UnitOfMeasure;
    FDSTOP?: UnitOfMeasure;
    FDUP?: UnitOfMeasure;
    CLIFRS?: UnitOfMeasure;
    CLIFS?: UnitOfMeasure;
    CLIFSO?: UnitOfMeasure;
    DFOF?: UnitOfMeasure;
    DFON?: UnitOfMeasure;
    CH20?: UnitOfMeasure;
    FREQ?: UnitOfMeasure;
    GPV?: UnitOfMeasure;
    GVOL?: UnitOfMeasure;
    GUST?: UnitOfMeasure;
    CLIHCS?: UnitOfMeasure;
    HEATIX?: UnitOfMeasure;
    CLISPH?: UnitOfMeasure;
    HAIL?: UnitOfMeasure;
    HR?: UnitOfMeasure;
    CLIHUM?: UnitOfMeasure;
    LUMIN?: UnitOfMeasure;
    METHANE?: UnitOfMeasure;
    MODE?: UnitOfMeasure;
    MOIST?: UnitOfMeasure;
    MOON?: UnitOfMeasure;
    MUSCLEM?: UnitOfMeasure;
    DOF?: UnitOfMeasure;
    DOF3?: UnitOfMeasure;
    DOF4?: UnitOfMeasure;
    DOF5?: UnitOfMeasure;
    DON?: UnitOfMeasure;
    DON3?: UnitOfMeasure;
    DON4?: UnitOfMeasure;
    DON5?: UnitOfMeasure;
    OL?: UnitOfMeasure;
    OZONE?: UnitOfMeasure;
    PM10?: UnitOfMeasure;
    PM25?: UnitOfMeasure;
    POP?: UnitOfMeasure;
    PPW?: UnitOfMeasure;
    PF?: UnitOfMeasure;
    PRECIP?: UnitOfMeasure;
    PULSCNT?: UnitOfMeasure;
    QUERY?: UnitOfMeasure;
    RADON?: UnitOfMeasure;
    RAINRT?: UnitOfMeasure;
    RELMOD?: UnitOfMeasure;
    RESET?: UnitOfMeasure;
    RESPR?: UnitOfMeasure;
    RFSS?: UnitOfMeasure;
    ROTATE?: UnitOfMeasure;
    CLISMD?: UnitOfMeasure;
    SEISINT?: UnitOfMeasure;
    SEISMAG?: UnitOfMeasure;
    SMOKED?: UnitOfMeasure;
    SOILH?: UnitOfMeasure;
    SOILR?: UnitOfMeasure;
    SOILS?: UnitOfMeasure;
    SOILT?: UnitOfMeasure;
    SOLRAD?: UnitOfMeasure;
    SVOL?: UnitOfMeasure;
    SPEED?: UnitOfMeasure;
    ST?: UnitOfMeasure;
    TANKCAP?: UnitOfMeasure;
    USRNUM?: UnitOfMeasure;
    CLIMD?: UnitOfMeasure;
    TIDELVL?: UnitOfMeasure;
    TIME?: UnitOfMeasure;
    TIMEREM?: UnitOfMeasure;
    TBW?: UnitOfMeasure;
    TPW?: UnitOfMeasure;
    UV?: UnitOfMeasure;
    UAC?: UnitOfMeasure;
    VOCLVL?: UnitOfMeasure;
    WATERF?: UnitOfMeasure;
    WATERP?: UnitOfMeasure;
    WATERT?: UnitOfMeasure;
    WVOL?: UnitOfMeasure;
    WEIGHT?: UnitOfMeasure;
    WINDCH?: UnitOfMeasure;
    WINDDIR?: UnitOfMeasure;
    WATERTB?: UnitOfMeasure;
    TEMPOUT?: UnitOfMeasure;
  };
  pending: DriverValues<Driver.Literal>;
  local: DriverValues<Driver.Literal>;
  drivers: DriverList<Driver.Literal>;
  family: T;
  typeCode: string;
  deviceClass: any;
  parentAddress: any;
  category: number;
  subCategory: number;
  type: any;
  _parentDevice: ISYDeviceNode<T, Driver.Literal, string>;
  children: ISYDeviceNode<T, Driver.Literal, string>[];
  scenes: ISYScene[];
  hidden: boolean;
  _enabled: any;
  productName: string;
  model: string;
  modelNumber: string;
  version: string;
  isDimmable: boolean;
  convertTo(value: any, UnitOfMeasure: number, propertyName: Driver.Literal = null) {
    throw new Error("Method not implemented.");
  }
  convertFrom(value: any, UnitOfMeasure: number, propertyName: Driver.Literal= null) {
    throw new Error("Method not implemented.");
  }
  addLink(isyScene: ISYScene): void {
    throw new Error("Method not implemented.");
  }
  addChild(childDevice: ISYDeviceNode<T, Driver.Literal, string>): void {
    throw new Error("Method not implemented.");
  }
  readProperty(propertyName: D): Promise<DriverState> {
    throw new Error("Method not implemented.");
  }
  readProperties(): Promise<DriverState[]> {
    throw new Error("Method not implemented.");
  }
  updateProperty(propertyName: Driver.Literal, value: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  sendCommand(command: string, parameters?: Record<string | symbol, string | number> | string | number): Promise<any> {
    throw new Error("Method not implemented.");
  }
  refresh(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  parseResult(node: { property: DriverState | DriverState[] }): void {
    throw new Error("Method not implemented.");
  }
  handleControlTrigger(controlName: string): boolean {
    throw new Error("Method not implemented.");
  }
  handlePropertyChange(propertyName: Driver.Literal, value: any, formattedValue: string): boolean {
    throw new Error("Method not implemented.");
  }
}

export class ISYDeviceNode<
    T extends Family,
    D extends Driver.Literal,
    C extends string
  >
  extends ISYNode<D>
  implements ISYDevice<T, D, C>
{
  public declare family: T;

  public readonly typeCode: string;
  public readonly deviceClass: any;
  public readonly parentAddress: any;
  public readonly category: number;
  public readonly subCategory: number;
  public readonly type: any;
  public _parentDevice: ISYDeviceNode<T, Driver.Literal, string>;
  public readonly children: Array<ISYDeviceNode<T, Driver.Literal, string>> = [];
  public readonly scenes: ISYScene[] = [];

  public hidden: boolean = false;

  public _enabled: any;
  productName: string;
  model: string;
  modelNumber: string;
  version: string;
  isDimmable: boolean;

  constructor(isy: ISY, node: NodeInfo) {
    super(isy, node);

    this.family = node.family as T;
    this.nodeType = 1;
    this.type = node.type;
    this._enabled = node.enabled;
    this.deviceClass = node.deviceClass;
    this.parentAddress = node.pnode;
    const s = this.type.split(".");
    this.category = Number(s[0]);
    this.subCategory = Number(s[1]);

    // console.log(nodeDetail);
    if (this.parentAddress !== this.address && this.parentAddress !== undefined) {
      this._parentDevice = isy.getDevice(this.parentAddress) as unknown as ISYDeviceNode<T, Driver.Literal, string>;
      if (!isNullOrUndefined(this._parentDevice)) {
        this._parentDevice.addChild(this);
      }
    }
    if (Array.isArray(node.property)) {
      for (const prop of node.property) {
        this.local[prop.id] = this.convertFrom(prop.value, prop.uom, prop.id as Driver.Literal);
        this.formatted[prop.id] = prop.formatted;
        this.uom[prop.id] = prop.uom;
        this.logger(
          `Property ${Controls[prop.id].label} (${prop.id}) initialized to: ${this.local[prop.id]} (${
            this.formatted[prop.id]
          })`
        );
      }
    } else if (node.property) {
      this.local[node.property.id] = this.convertFrom(
        node.property.value,
        node.property.uom,
        node.property.id as Driver.Literal
      );
      this.formatted[node.property.id] = node.property.formatted;
      this.uom[node.property.id] = node.property.uom;
      this.logger(
        `Property ${Controls[node.property.id].label} (${node.property.id}) initialized to: ${
          this.local[node.property.id]
        } (${this.formatted[node.property.id]})`
      );
    }
  }

  public convertTo(value: any, UnitOfMeasure: number, propertyName: Driver.Literal = null): any {
    return value;
  }

  public convertFrom(value: any, UnitOfMeasure: number, propertyName: Driver.Literal = null): any {
    return value;
  }

  public addLink(isyScene: ISYScene) {
    this.scenes.push(isyScene);
  }

  public addChild<K extends ISYDeviceNode<T, any, any>>(childDevice: K) {
    this.children.push(childDevice);
  }

  get parentDevice(): ISYDeviceNode<T, Driver.Literal, string> {
    if (this._parentDevice === undefined) {
      if (this.parentAddress !== this.address && this.parentAddress !== null && this.parentAddress !== undefined) {
        this._parentDevice = this.isy.getDevice(this.parentAddress) as unknown as ISYDeviceNode<T, Driver.Literal, string>;
        if (this._parentDevice !== null) {
          this._parentDevice.addChild(this);
        }
      }
      this._parentDevice = null;
    }
    return this._parentDevice;
  }

  public async readProperty(propertyName: Driver.Literal): Promise<DriverState> {
    var result = await this.isy.sendRequest(`nodes/${this.address}/${propertyName}`);
    this.logger(JSON.stringify(result), "debug");
    return result.property;
  }

  public async readProperties(): Promise<DriverState[]> {
    var result = await this.isy.sendRequest(`nodes/${this.address}/status`);
    this.logger(JSON.stringify(result), "debug");
    return result.property;
  }

  public async updateProperty(propertyName: Driver.Literal, value: string): Promise<any> {
    const val = this.convertTo(Number(value), Number(this.uom[propertyName]));
    this.logger(`Updating property ${Controls[propertyName].label}. incoming value: ${value} outgoing value: ${val}`);
    this.pending[propertyName] = value;
    return this.isy.sendRequest(`nodes/${this.address}/set/${propertyName}/${val}`).then((p) => {
      this.local[propertyName] = value;
      this.pending[propertyName] = null;
    });
  }

  public async sendCommand(
    command: string,
    parameters?: Record<string | symbol, string | number> | string | number
  ): Promise<any> {
    //@
    return this.isy.sendNodeCommand(this, command, parameters);
  }

  public async refresh(): Promise<any> {
    const device = this;
    const node = (await this.isy.sendRequest(`nodes/${this.address}/status`)).node;
    // this.logger(node);
    this.parseResult(node);
    return await this.isy.sendRequest(`nodes/${this.address}/status`);
  }

  public parseResult(node: { property: DriverState | DriverState[] }) {
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
        `Property ${Controls[node.property.id].label} (${node.property.id}) refreshed to: ${this[node.property.id]} (${
          this.formatted[node.property.id]
        })`
      );
    }
  }

  public applyStatus(prop: DriverState) {
    this.local[prop.id] = prop.value;
    this.formatted[prop.id] = prop.formatted;
    this.uom[prop.id] = prop.uom;
    this.logger(
      `Property ${Controls[prop.id].label} (${prop.id}) refreshed to: ${this[prop.id]} (${this.formatted[prop.id]})`
    );
  }

  public override handleControlTrigger(controlName: string) {
    return this.emit("ControlTriggered", controlName);
  }

  public override handlePropertyChange(driver: any, value: any, formattedValue: string) {
    let changed = false;
    const priorVal = this.local[driver];
    try {
      const val = this.convertFrom(value, this.uom[driver]);

      if (this.local[driver] !== val) {
        this.logger(`Property ${Controls[driver].label} (${driver}) updated to: ${val} (${formattedValue})`);
        this.local[driver] = val;
        this.formatted[driver] = formattedValue;
        this.lastChanged = new Date();
        changed = true;
      } else {
        this.logger(`Update event triggered, property ${Controls[driver].label} (${driver}) is unchanged.`);
      }
      if (changed) {
        this.emit("PropertyChanged", driver, val, priorVal, formattedValue);

        this.scenes.forEach((element) => {
          this.logger(`Recalulating ${element.deviceFriendlyName}`);
          element.recalculateState();
        });
      }
    } catch (error) {
      this.logger(error, "error");
    } finally {
      return changed;
    }
  }
}
