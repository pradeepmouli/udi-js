import type { UnionToIntersection } from '@project-chip/matter-node.js/util';
import type { Driver } from '../Definitions/Global/Drivers.js';
import type { UnitOfMeasure } from '../Definitions/Global/UOM.js';
import type { Family } from '../ISY.js';
import type { ISYDevice } from '../ISYDevice.js';
import type { CommandSignatures, DriverMap, ISYNode, NodeList } from '../ISYNode.js';
import type { ISYScene } from '../ISYScene.js';
import type { DriverState } from '../Model/DriverState.js';





export class ISYMultiNodeDevice<T extends Family, N extends NodeList>
  implements ISYDevice<T, ISYNode.DriverMap<N>, ISYNode.CommandMap<N>, string> {
  commands: UnionToIntersection<{ [x in keyof N]: ISYNode.CommandsOf<N[x]>; } extends Record<string, unknown> ? keyof N extends string ? { [x in keyof N]: ISYNode.CommandsOf<N[x]>; }[string & keyof N] extends Record<string, unknown> ? keyof { [x in keyof N]: ISYNode.CommandsOf<N[x]>; }[string & keyof N] extends string ? { [x in `${string & keyof N}.${string & keyof { [x in keyof N]: ISYNode.CommandsOf<N[x]>; }[string & keyof N]}`]: { [x in keyof N]: ISYNode.CommandsOf<N[x]>; }[string & keyof N][x extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? any : B : B : B : B : B : B : B : B : B : B : x]; } : never : never : never : never>;
  readProperty(propertyName: keyof UnionToIntersection<{ [x in keyof N]: ISYNode.DriversOf<N[x]>; } extends Record<string, unknown> ? keyof N extends string ? { [x in keyof N]: ISYNode.DriversOf<N[x]>; }[string & keyof N] extends Record<string, unknown> ? keyof { [x in keyof N]: ISYNode.DriversOf<N[x]>; }[string & keyof N] extends string ? { [x in `${string & keyof N}.${string & keyof { [x in keyof N]: ISYNode.DriversOf<N[x]>; }[string & keyof N]}`]: { [x in keyof N]: ISYNode.DriversOf<N[x]>; }[string & keyof N][x extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? any : B : B : B : B : B : B : B : B : B : B : x]; } : never : never : never : never>): Promise<DriverState> {
    throw new Error('Method not implemented.');
  }
  sendCommand(command: Extract<keyof UnionToIntersection<{ [x in keyof N]: ISYNode.CommandsOf<N[x]>; } extends Record<string, unknown> ? keyof N extends string ? { [x in keyof N]: ISYNode.CommandsOf<N[x]>; }[string & keyof N] extends Record<string, unknown> ? keyof { [x in keyof N]: ISYNode.CommandsOf<N[x]>; }[string & keyof N] extends string ? { [x in `${string & keyof N}.${string & keyof { [x in keyof N]: ISYNode.CommandsOf<N[x]>; }[string & keyof N]}`]: { [x in keyof N]: ISYNode.CommandsOf<N[x]>; }[string & keyof N][x extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? B extends `${infer A}.${infer B}` ? any : B : B : B : B : B : B : B : B : B : B : x]; } : never : never : never : never>, string>, parameters?: Record<string | symbol, string | number> | string | number): Promise<any> {
    throw new Error('Method not implemented.');
  }

  updateProperty(propertyName: keyof ISYNode.DriverMap<N>, value: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  handleControlTrigger(controlName: string): boolean {
    throw new Error('Method not implemented.');
  }

  _parentDevice: ISYDevice<T, any, any, any>;
  children: ISYNode<any, any, any, any>[];
  convertTo(value: any, uom: number);
  convertTo(value: any, uom: number, propertyName: keyof DriverMap<N>);
  convertTo(value: unknown, uom: unknown, propertyName?: unknown): any {
    throw new Error('Method not implemented.');
  }
  convertFrom(value: any, uom: number);
  convertFrom(value: any, uom: number, propertyName: keyof DriverMap<N>);
  convertFrom(value: unknown, uom: unknown, propertyName?: unknown): any {
    throw new Error('Method not implemented.');
  }
  addLink(isyScene: ISYScene): void {
    throw new Error('Method not implemented.');
  }
  addChild(childDevice: ISYNode<any, any, any, any>): void {
    throw new Error('Method not implemented.');
  }

  readProperties(): Promise<DriverState[]> {
    throw new Error('Method not implemented.');
  }

  refresh(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  refreshNotes(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  parseResult(node: { property: DriverState | DriverState[]; }): void {
    throw new Error('Method not implemented.');
  }

  handlePropertyChange(propertyName: keyof ISYNode.DriverMap<N> & string, value: any, uom: UnitOfMeasure, prec: number, formattedValue: string): boolean {
    throw new Error('Method not implemented.');
  }


  logger(arg0: string): unknown {
    throw new Error('Method not implemented.');
  }
  handleEvent(evt: any): unknown {
    throw new Error('Method not implemented.');
  }
  on(arg0: string, arg1: any): unknown {
    throw new Error('Method not implemented.');
  }
  name: any;
  drivers: Driver.ForAll<ISYNode.DriverMap<N>>;
  address: string;
  family: T;
  typeCode: string;
  deviceClass: any;
  parentAddress: any;
  category: number;
  subCategory: number;
  type: any;
  scenes: ISYScene[];
  hidden: boolean;
  enabled: boolean;
  productName: string;
  model: string;
  modelNumber: string;
  version: string;
  isDimmable: boolean;
  label: string;


}
