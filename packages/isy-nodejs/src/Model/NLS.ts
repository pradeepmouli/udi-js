import { merge } from 'moderndash';
import type { DriverType } from "../Definitions/Global/Drivers.js";
import { Family } from "../Definitions/Global/Families.js";
import "../Utils.js";
import type { TransactionalInteractionServer } from '@project-chip/matter.js/node/server';

export enum NLSRecordType {
  Generic = "GEN",
  Driver = "ST",
  Command = "CMD",
  NodeDef = "ND",
  NodeDefNLS = "NDN",
  DeviceInfo = "DEV",
  CommandParameter = "CMDP",
  CommandParameterNLS = "CMDPN",
  LinkProtocol = "LNKP",
  LinkParameter = "LNKD",
  Index = "IX",
  Other = "OTHER",
  Program = "PGM",
}

export type NLSRecordTypeMap = {
    "GEN"?:  NLSGenericRecord[],
    "ST"?:  NLSDriverRecord[],
    "CMD"?:  NLSCommandRecord[],
    "ND"?:  {type: NLSRecordType.NodeDef, nodeDefId: string, property: string, meta: string, value: string}[],
    "NDN"?: {type: NLSRecordType.NodeDefNLS, nlsId: string, property: string, meta: string, value: string}[],
    "DEV"?: {type: NLSRecordType.DeviceInfo, deviceCode: string, property: string, meta: string, value: string}[],
    "CMDP"?:  NLSCommandParameterRecord[],
    "CMDPN"?: NLSCommandParameterRecord[],
    "LNKP"?: {type: NLSRecordType.LinkProtocol, protocol: string, property: string, meta: string, value: string}[],
    "LNKD"?: {type: NLSRecordType.LinkParameter, parameter: string, property: string, meta: string, value: string}[],
    "IX"?: {type: NLSRecordType.Index, indexType: string, indexValue: number, value: string}[],
    "OTHER"?: {type: NLSRecordType.Other, key: string, value: string}[],
    "PGM"?: {type: NLSRecordType.Program, key: string, value: string}[],
}

export interface NLSRecord<T extends NLSRecordType> {
  type: T;
  value: string;
  nlsId?: string;
}

export class NLSBaseRecord<T extends NLSRecordType> implements NLSRecord<T> {
  type: T;
  key: string;
  value: string;
}

interface NLSRecordMap {
  [key: string]: NLSRecord<NLSRecordType>;
}

export abstract class NLSNodeDefFilteredRecord<T extends NLSRecordType> implements NLSRecord<T> {
  readonly type: T;
  nlsId?: string;
  readonly value: string;
  meta: string;
  constructor(type: T, tokens: string[], value: string) {
    this.type = type;
    this.value = value;

  }
  parseKey(tokens: string[]) {
    this.nlsId = tokens.pop() ?? 'Generic';
    this.meta = tokens.length > 0 ? tokens.join("-") : undefined;
  }
}

export class NLSCommandRecord extends NLSNodeDefFilteredRecord<NLSRecordType.Command> {
  command: string;
  property: string;
  constructor(tokens: string[], value: string) {
    super(NLSRecordType.Command, tokens, value);
    this.parseKey(tokens);

  }
  override parseKey(tokens: string[]) {

    this.property = tokens.pop();
    this.command = tokens.pop();
    super.parseKey(tokens);
  }
}

export class NLSGenericRecord extends NLSNodeDefFilteredRecord<NLSRecordType.Generic> {
  key: string;
  property: string;
  constructor(tokens: string[], value: string) {
    super(NLSRecordType.Generic, tokens, value);
    this.parseKey(tokens);
  }
  override parseKey(tokens: string[]) {

    this.property = tokens.pop() ?? 'NAME';
    this.key = tokens.pop();

    super.parseKey(tokens);
    //this.property = tokens[1];
  }
}

export class NLSCommandParameterRecord extends NLSNodeDefFilteredRecord<NLSRecordType.CommandParameter | NLSRecordType.CommandParameterNLS> {
  commandParameter: string;
  property: string;
  editorId: string;
  constructor(type: NLSRecordType.CommandParameter | NLSRecordType.CommandParameterNLS, tokens: string[], value: string) {
    super(type, tokens, value);

    this.parseKey(tokens);
  }

  override parseKey(tokens: string[]) {

    this.property = tokens.pop();
    this.commandParameter = tokens.pop();
    if(this.type == NLSRecordType.CommandParameter)
    {
      this.editorId = tokens.pop() ?? undefined;
    }


    super.parseKey(tokens);
  }
}

export class NLSDriverRecord extends NLSNodeDefFilteredRecord<NLSRecordType.Driver> {
  driver: DriverType;
  property: string;
  constructor(tokens: string[], value: string) {
    super(NLSRecordType.Driver, tokens, value);
    this.parseKey(tokens);
  }
  override parseKey(tokens: string[]) {

    this.property = tokens.pop();
    this.driver = tokens.pop() as DriverType;
    super.parseKey(tokens);
  }
}

export const NLSIndexMap : Map<Family, {[x:string]: {[y: number]:string}}> = new Map();
export const NLSTranslations : Map<Family, {[y: string]:string}> = new Map();

const StdTranslations = {
  ONOFF: "OnOff",
  ZY: "ZWave",
  ZB: "ZigBee",
  BOOL: "Boolean",
  L255: "Level255",
  PCT: "Percent",
  DIR: "Direction",
  SIR: "Siren",
  MD: "Mode",
  LVL: "Level",
  IX: "Index",
  OPTS: "Options",
  LST: "List",
  TMR: "Timer",
  BRD: "Bridge",
  CFN: "Configuration",
  PWR: "Power",
  VOLT: "Voltage",
  CURR: "Current",
  BATLVL: "BatteryLevel",
  BAT: "Battery",
  TEMP: "Temperature",
  HUM: "Humidity",
  LUM: "Luminance",
  RR: "RampRate",
  FL: "FanLevel",
  BL: "Backlight",
  ST: "State",
  STS: "Status",
  ERR: "Error",
  PARAM: "Parameter",
  LEN: "Length",
  OL: "OnLevel",
  DLY: "Delay",
  "+": "With",
  "(": "",
  ")": "",
  TVOL: "ToneVolume",
  VIB: "Vibration",
  LGT: "Light",
};

NLSTranslations.set(Family.Generic, StdTranslations);

export function addToIndexMap<T extends Family>(
family: T, record: {type: NLSRecordType, indexType: string, indexValue: number, value: string, comment: string}){
    if(!NLSIndexMap.has(family))
    {
        NLSIndexMap.set(family, {});
    }
    const indexMap = NLSIndexMap.get(family);
    if(!indexMap[record.indexType])
    {
        indexMap[record.indexType] = {};
    }
    indexMap[record.indexType][record.indexValue] = record.value;
}



export function addToTranslationMap<T extends Family>(family: T, record: NLSGenericRecord | NLSCommandRecord | NLSDriverRecord){
    if(!NLSTranslations.has(family))
    {
        NLSTranslations.set(family, {});
    }
    const translationMap = NLSTranslations.get(family);

    if(record.property === 'NAME')
    {
        if(record.nlsId == 'Generic')
        {
            if(record instanceof NLSGenericRecord)
              translationMap[record.key] = record.value;
            else if(record instanceof NLSDriverRecord)
              translationMap[record.driver] = record.value;
            else if(record instanceof NLSCommandRecord)
              translationMap[record.command] = record.value;
        }
        //translationMap[record.key] = record.value;
    }
}



export function applyTranslations(family: Family, value: string) : string {
    if(value.includes('_'))
    {
        return value.split('_').map((v) => applyTranslations(family, v)).join('_');
    }
    value = value.trim();
    if(family !== Family.Generic)
    {
        value = applyTranslations(Family.Generic, value)
    }
    if(NLSRecordMap.has(family))
    {
        const map = NLSTranslations.get(family);
        for(const key in map)
        {
            if(value == key)
            {
              return map[key];
            }
        }
    }
    return value;
}


export function createMap<T extends Family>(
  content: string,
  family: T
): { [y: string]: NLSRecordTypeMap } {
  const map: { [y: string]: NLSRecordTypeMap} = {};
  NLSRecordMap.delete(family);
  for (const record of parseNLSContent(content, family)) {
    const key = record.nlsId ?? "Generic";

    if (!map[key]) {
      map[key] = {};
    }
    if (map[key][record.type]) {
      map[key][record.type].push(record as any);
    } else {
      map[key][record.type] = [record as any];
    }
  }
  NLSRecordMap.set(family, map);

  return map;
}

export const NLSRecordMap: Map<Family, {[y: string]: NLSRecordTypeMap}> = new Map();

export function parseNLSContent<T extends Family>(content: string, family: T): NLSRecord<NLSRecordType>[] {
  const lines = content.split("\n");
  const result = [];
  const NLSRecords = new Array<NLSRecord<NLSRecordType>>();
  let currentComment = "";
  lines.forEach((line) => {
    line = line.trim();
    if (line === "") {

      return; // Skip comments and empty lines
    }
    else if (line.startsWith("#"))
    {
        currentComment = line.trim()
    }

    let [key, value] = line.split("=");

    if (key && value) {
      key = key.trim();
      const tokens = key.split("-");
      value = value.trim();
      if (tokens.length > 0) {
        if (tokens[0].startsWith("IX")) {
          const recordType = NLSRecordType.Index;
          const indexType = tokens.shift();
          const indexValue = tokens.shift();
          const indexNLS = { comment: currentComment, type: recordType, value: value, indexType: indexType, indexValue: Number(indexValue)};
          NLSRecords.push(indexNLS);
          addToIndexMap(family, indexNLS)
        } else {
          const recordType = tokens.shift() as NLSRecordType;
          switch (recordType) {
            case NLSRecordType.Generic:
              const genericRecord = new NLSGenericRecord(tokens, value);
              NLSRecords.push(genericRecord);
              addToTranslationMap(family, genericRecord);
              break;
            case NLSRecordType.Driver:
              const driverRecord = new NLSDriverRecord(tokens, value);
              NLSRecords.push(driverRecord);
              addToTranslationMap(family, driverRecord)
              break;
            case NLSRecordType.Command:
              const commandRecord = new NLSCommandRecord(tokens, value);
              NLSRecords.push(commandRecord);
              addToTranslationMap(family, commandRecord)
              break;
            case NLSRecordType.NodeDef:
              const nodeDefRecord = {
                type: recordType,
                value: value,
                nodeDefId: tokens.shift(),
                property: tokens.shift(),
                meta: tokens.length > 0 ? tokens.join("-") : undefined,
              };
              NLSRecords.push(nodeDefRecord);
              break;
            case NLSRecordType.NodeDefNLS:
              const nodeDefNameRecord = {
                type: recordType,
                value: value,
                nlsId: tokens.shift(),
                property: tokens.shift(),
                meta: tokens.length > 0 ? tokens.join("-") : undefined,
              };
              NLSRecords.push(nodeDefNameRecord);
              break;
            case NLSRecordType.DeviceInfo:
              const deviceInfoRecord = {
                type: recordType,
                nlsId: tokens.shift(),
                property: tokens.shift(),
                meta: tokens.join("-"),
                value,
              };
              NLSRecords.push(deviceInfoRecord);
              break;
            case NLSRecordType.CommandParameter || NLSRecordType.CommandParameterNLS:
              const commandParameterRecord = new NLSCommandParameterRecord(recordType, tokens, value);
              NLSRecords.push(commandParameterRecord);
              break;
            case NLSRecordType.LinkProtocol:
              const linkProtocolRecord = {
                type: recordType,
                protocol: tokens.shift(),
                property: tokens.shift(),
                meta: tokens.length > 0 ? tokens.join("-") : undefined,
                value,
              };
              NLSRecords.push(linkProtocolRecord);
              break;
            case NLSRecordType.LinkParameter:
              const linkParameterRecord = {
                type: recordType,
                parameter: tokens.shift(),
                property: tokens.shift(),
                meta: tokens.join("-"),
                value,
              };
              NLSRecords.push(linkParameterRecord);
              break;
            case NLSRecordType.Program:
              const programRecord = { type: recordType, key: tokens.join("-"), value };
              NLSRecords.push(programRecord);
              break;
            default:
              const otherRecord = { type: recordType, key: tokens.join("-"), value };
              NLSRecords.push(otherRecord);
              break;
          }
        }
        const key = tokens;
      }
      result.push({ tokens, value: value.trim() });
    }
  });

  return NLSRecords;
}

export namespace NLS
{
    export function get<T extends Family>(family: T, nlsId: string) {
        if(NLSRecordMap.has(family)) {
            return merge(NLSRecordMap.get(Family.Generic)[nlsId], NLSRecordMap.get(family)[nlsId]);
        }
    }

    export const Map = NLSRecordMap;
}

export namespace Translation
{
    export const apply = applyTranslations;

    export const Map = NLSTranslations;
}

export namespace IndexDef
{
    export function get<T extends Family>(family: T, indexType: string) : {[y: number]: string}
    {

        if(NLSIndexMap.has(family))
        {
            const indexMap = NLSIndexMap.get(family);
            if(indexMap[indexType])
            {
                return indexMap[indexType];
            }
        }
        if(family != Family.Generic)
        {
           return get(Family.Generic, indexType);
        }
    }

    export const Map = NLSIndexMap;

}
