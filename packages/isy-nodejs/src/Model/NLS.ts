import type { DriverType } from '../Definitions/Global/Drivers.js';
import { Family } from '../Definitions/Global/Families.js';
import  '../Utils.js';

export enum NLSRecordType {
    Generic = "GEN",
    Driver = "ST",
    Command = "CMD",
    NodeDef = "ND",
    DeviceInfo = "DEV",
    CommandParameter = "CMDP",
    LinkProtocol = "LNKP",
    LinkParameter = "LNKD",
    Index = "IX",
    Other = "OTHER",
    Program = "PGM"
}

export interface NLSRecord<T extends NLSRecordType> {
    type: NLSRecordType,
    value: string,
    nodeDefId?: string
}

export class NLSBaseRecord<T extends NLSRecordType> implements NLSRecord<T> {
    type: NLSRecordType;
    key: string;
    value: string;
}


interface NLSRecordMap {
    [key: string]: NLSRecord<NLSRecordType>
}

abstract class NLSNodeDefFilteredRecord<T extends NLSRecordType> implements NLSRecord<T> {
    type: T;
    nodeDefId?: string;
    value: string;
    meta: string;
    constructor(tokens: string[], value: string) {
        if(tokens.length > 2)
        {
            this.nodeDefId = tokens.shift();
        }
        else{
            this.nodeDefId = "Generic";
        }
        this.parseKey(tokens)
        this.value = value;
    }
    parseKey(tokens: string[]){
        this.meta = tokens.length > 0 ? tokens.join("-") : undefined;

    }
}

export class NLSCommandRecord extends NLSNodeDefFilteredRecord<NLSRecordType.Command> {
    command: string;
    property: string;
    constructor(tokens: string[], value: string)  {
        super(tokens, value);
        this.parseKey(tokens)
        this.type = NLSRecordType.Command;


    }
    override parseKey(tokens: string[]){
        this.command = tokens.shift();
        this.property = tokens.shift();
        super.parseKey(tokens);
    }
}

export class NLSGenericRecord extends NLSNodeDefFilteredRecord<NLSRecordType.Generic> {
    command: string;
    property: string;
    constructor(tokens: string[], value: string)  {
        super(tokens, value);
        this.parseKey(tokens)
        this.type = NLSRecordType.Generic;


    }
    override parseKey(tokens: string[]){
        this.property = tokens.shift();
        super.parseKey(tokens);
        //this.property = tokens[1];
    }
}

export class NLSCommandParameterRecord extends NLSNodeDefFilteredRecord<NLSRecordType.CommandParameter> {
  commandParameter: string;
  property: string;
  constructor(tokens: string[], value: string) {
    super(tokens, value);
    this.parseKey(tokens);

    this.type = NLSRecordType.CommandParameter;
  }
  override parseKey(tokens: string[]) {
    this.commandParameter = tokens.shift()
    this.property = tokens.shift()
    super.parseKey(tokens);
  }
}



export class NLSDriverRecord extends NLSNodeDefFilteredRecord<NLSRecordType.Driver> {
  driver: DriverType;
  property: string;
  constructor(tokens: string[], value: string) {
    super(tokens, value);
    this.parseKey(tokens);
    this.type = NLSRecordType.Driver;
  }
  override parseKey(tokens: string[]) {
    this.driver = tokens.shift() as DriverType;
    this.property = tokens.shift();
    super.parseKey(tokens);

  }
}


export function createMap<T extends Family>(content: string, family: T): Map<string,{[x in NLSRecordType]?:NLSRecord<x>[]}> {
  const map = new Map<string,{[x in NLSRecordType]?:NLSRecord<x>[]}>();
  NLSRecordMap.delete(family);
for(const record of parseNLSContent(content,family)){
    const key = record.nodeDefId ?? 'Generic';

    const existing = map.get(key) ?? {};

    if(map.has(key))
    {
        
    }

    if(record instanceof NLSNodeDefFilteredRecord || record.nodeDefId)
    {
        if(map.has(record.nodeDefId ?? 'Generic')){
        const existing = map.get(record.value);
        if(existing[record.type]){
            existing[record.type].push(record);
        }
        else{
            existing[record.type] = [record];
        }
        }
    }

    else{
        const newRecord = { [record.type]: [record] };
        map.set('Generic', newRecord as any);
    }
}
NLSRecordMap.set(family,map);

return map;

}

export const NLSRecordMap : Map<Family,Map<string,{[x in NLSRecordType]?:NLSRecord<x>[]}>> = new Map() ;


export function parseNLSContent<T extends Family>(content: string, family: T): NLSRecord<NLSRecordType>[] {

  const lines = content.split("\n");
  const result = [];
   const NLSRecords = new Array<NLSRecord<NLSRecordType>>();
  lines.forEach((line) => {
    line = line.trim();
    if (line.startsWith("#") || line === "") {
      return; // Skip comments and empty lines
    }

    let [key, value] = line.split("=");

    if (key && value) {
      key = key.trim();
      const tokens = key.split("-");
      value = value.trim();
      if(tokens.length > 0)
      {
            if(tokens[0].startsWith("IX")){
                const recordType = NLSRecordType.Index;
                const indexType = tokens.shift();
                const indexValue = tokens.shift();
                const indexNLS = {type: recordType, value: value, indexType: indexType, indexValue: indexValue};
                NLSRecords.push(indexNLS);

            }
            else
            {
                const recordType = tokens.shift() as NLSRecordType;
                switch (recordType) {
                    case NLSRecordType.Generic:
                        const genericRecord = new NLSGenericRecord(tokens,value);
                        NLSRecords.push(genericRecord);
                        break;
                    case NLSRecordType.Driver:
                        const driverRecord = new NLSDriverRecord(tokens, value);
                        NLSRecords.push(driverRecord);
                        break;
                    case NLSRecordType.Command:
                        const commandRecord = new NLSCommandRecord(tokens, value);
                        NLSRecords.push(commandRecord);
                        break;
                    case NLSRecordType.NodeDef:
                        const nodeDefRecord = {
                            type: recordType,
                            value: value,
                            nodeDefId: tokens.shift(),
                            property: tokens.shift(),
                            meta: tokens.length > 0  ? tokens.join('-') : undefined
                        }
                        NLSRecords.push(nodeDefRecord);
                        break;
                    case NLSRecordType.DeviceInfo:
                        const deviceInfoRecord = {
                          type: recordType,
                          deviceCode: tokens.shift(),
                          property: tokens.shift(),
                          meta: tokens.join("-"),
                          value,
                        };
                        NLSRecords.push(deviceInfoRecord);
                        break;
                    case NLSRecordType.CommandParameter:
                        const commandParameterRecord = new NLSCommandParameterRecord(tokens, value);
                        NLSRecords.push(commandParameterRecord);
                        break;
                    case NLSRecordType.LinkProtocol:
                        const linkProtocolRecord = {
                          type: recordType,
                          protocol: tokens.shift(),
                          property: tokens.shift(),
                          meta: tokens.length > 0  ? tokens.join('-') : undefined,
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

// Example usage
