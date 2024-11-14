import type { Command } from './Definitions/Global/Commands.js';
import type { Driver } from './Definitions/Global/Drivers.js';
import type { UnitOfMeasure } from './Definitions/Global/UOM.js';
import type { Family } from './Definitions/index.js';
import type { ISY } from './ISY.js';
import type { ISYNode } from './ISYNode.js';
import type { ISYScene } from './ISYScene.js';
import type { DriverState } from './Model/DriverState.js';
import type { StringKeys } from './Utils.js';

export interface ISYDevice<T extends Family, D extends ISYNode.DriverSignatures, C extends ISYNode.CommandSignatures, E extends string = string> {
  // #region Properties (22)

  _parentDevice: ISYDevice<T, any, any, any>;
  address: string;
  category: number;
  children: Array<ISYNode<any, any, any, any>>;
  commands: Command.ForAll<C>;
  deviceClass: any;
  drivers: Driver.ForAll<D>;
  enabled: boolean;
  family: T;
  hidden: boolean;
  isDimmable: boolean;
  label: string;
  model: string;
  modelNumber: string;
  name: any;
  parentAddress: any;
  productName: string;
  scenes: ISYScene[];
  subCategory: number;
  type: any;
  typeCode: string;
  version: string;

  // #endregion Properties (22)

  // #region Public Methods (18)

  addChild(childDevice: ISYNode<any, any, any, any>): void;
  addLink(isyScene: ISYScene): void;
  convertFrom(value: any, uom: number): any;
  convertFrom(value: any, uom: number, propertyName: keyof D): any;
  convertTo(value: any, uom: number): any;
  convertTo(value: any, uom: number, propertyName: keyof D): any;
  handleControlTrigger(controlName: E): boolean;
  handleEvent(evt: any): unknown;
  handlePropertyChange(
    propertyName: keyof D & string,
    value: any,
    uom: UnitOfMeasure,
    prec: number,
    formattedValue: string
  ) : boolean;
  logger(arg0: string): unknown;
  on(arg0: string, arg1: any): unknown;
  parseResult(node: { property: DriverState | DriverState[]; }): void;
  readProperties(): Promise<DriverState[]>;
  readProperty(propertyName: keyof D): Promise<DriverState>;
  refresh(): Promise<any>;
  refreshNotes(): Promise<void>;
  sendCommand(command: StringKeys<C>, parameters?: Record<string | symbol, string | number> | string | number): Promise<any>;
  updateProperty(propertyName: StringKeys<D>, value: string): Promise<any>;

  // #endregion Public Methods (18)
}
