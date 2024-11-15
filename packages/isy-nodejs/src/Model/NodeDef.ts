import { isArray } from 'util';
import { Driver } from '../Definitions/Global/Drivers.js'
import type { MaybeArray } from '../Utils.js';


export interface DriverDef {
    id: Driver.Type;
    editor: string;
    hide?: string;
};

export interface SendCommandDef {
    id: string;
}

export interface ParamDef {
  id: string;
  editor: string;
  init: string;
  optional?: string;
}

export interface AcceptCommandDef {
    name?: string;
    id?: string;
    p?: MaybeArray<ParamDef>;
}

export interface NodeDef extends Nested<"st">{
  id: string;
  nls: string;
  nodeType: string;
  eventMap: string;
  links: Link;
  sts: {st: MaybeArray<DriverDef>}
  cmds: {
    sends:  {cmd: MaybeArray<SendCommandDef>};
    accepts: {cmd: MaybeArray<AcceptCommandDef>};
  };
}


export interface Accept {
	cmd: Cmd[];
}

export interface Cmd {
	accepts: Accept;
}

export interface Link {
	linkdef: string;
}

export interface Rsp {
	link: Link[];
}

export interface Link {
	ctl: string;
	rsp: Rsp;
}



export interface NodeDefs {
	nodeDef: MaybeArray<NodeDef>;
}

type n  = NestedObject<"nodeDef">;

type s = ReturnType<typeof flattenNestedObject<"nodeDef",NestedObject<"nodeDef">>>;

type NestedObject<Label extends string> = { [x in `${Label}s`]: {[y in `${Label}`]: any }};

type Singular<T> = T extends `${infer R}s` ? R : never;


type PickNestedProperties<T> = { [P in keyof T]: T[P] extends {[Y in Singular<P>]:any} ? T[P] : never};

type PickStrings<T> = {[P in keyof T]: T[P] & P extends string ? P : never}[keyof T];





type PickProperties<T> = {[P in keyof T]: T[P] & P extends {[y in keyof P]: P[y]} ? P : never}[keyof T];

type GetPropertyTypes<T,Y extends keyof T = keyof T> = T extends {[x in Y]: infer R} ? R : never;


type NodeDefProperties = PickNestedProperties<NodeDef>;

type FlattenedNestedObject<T> = T extends NestedObject<infer R> ? R : never;
  // ?
  //   Omit<T, `${R}s`> & { [x in `${R}s`]: GetPropertyTypes<T[`${R}s`]> }
  // : T;

type FlattenedNestedNodeDef = FlattenedNestedObject<NodeDef>;

function isNested<T extends string,objType extends object>(property: T, input: any): input is NestedObject<T> {

     let prop = `${property}s`;
     return input.hasOwnProperty(prop) ? input[prop].hasOwnProperty(property) : false;
}

let x = /sts/;

type Nested<T extends string> = { [x in T]: {[y in Singular<x>]: any }};

type isNested<T> = T extends Nested<infer R> ? true : false;

//type isNestedNodeDef = isNested<NodeDef>;




export function flattenNestedProperty<T extends string>(input: NestedObject<T>, property: T) {
  if(isNested(property, input)) {
    //@ts-expect-error
    return { ...input, [`${property}s`]: input[`${property}s`][property] };
  }
}
//   for (const key in Object.keys(input)) {
//     const subkey = key.left(key.length - 1);
//     if (isNested(subkey, input)) {
//       const newValue = input[key][subkey];
//       clone[key] = newValue; //isArray(newValue) ? newValue.map(flattenNestedObject) : flattenNestedObject(newValue);
//     } else {
//       clone[key] = input[key];
//     }
//   }
//   return clone;
// }

export function flattenNestedObject<Label extends string,T = unknown> (input: NestedObject<Label>) : Omit<typeof input,Label> & {[x in `${Label}s`]: MaybeArray<T> | T | T[]}{
 let clone = {} as Omit<typeof input,Label> & {[x in `${Label}s`]: MaybeArray<T> | T | T[]};
 for (const key in Object.keys(input)) {
   const subkey = key.left(key.length - 1);
   if (isNested(subkey, input)) {
     const newValue = input[key][subkey];
     clone[key] = newValue; //isArray(newValue) ? newValue.map(flattenNestedObject) : flattenNestedObject(newValue);
   } else {
     clone[key] = input[key];
   }
 }
  return clone;
}
