import ts, { factory, SyntaxKind, ClassElement} from "typescript";
import { NodeDef, type AcceptCommandDef, DriverDef, SendCommandDef, type ParamDef } from "./NodeDef.js";
import { Family } from "../Definitions/Global/Families.js";
import type { Driver } from "../Definitions/Global/Drivers.js";
import { Command } from "@project-chip/matter.js/cluster";
import { toArray } from "../Utils.js";
import { camelize, capitalize } from "@project-chip/matter.js/util";
import { camelCase, merge, pascalCase } from 'moderndash'
import {
  NLSCommandParameterRecord,
  NLSCommandRecord,
  NLSDriverRecord,
  NLSGenericRecord,
  NLSRecord,
  NLSRecordType,
  type NLSRecordMap as NLSM,
  type NLSIndexMap as NLSI,
  type NLSRecordTypeMap,
  NLS,
  IndexDef,
} from "./NLS.js";
import { EditorDef, type EditorDefMap as EDM, type RangeDef } from "./EditorDef.js";
import { UnitOfMeasure } from "../Definitions/Global/UOM.js";
import {  } from "util";
import { getRandomValues } from 'crypto';
import { create } from 'domain';
import camelcase from 'camelcase';
import { EnumDefinition, EnumDefinitionMap } from './EnumDefinition.js';
import * as fs from 'fs';



const NodeClassMap = new Map<Family, { [x: string]: NodeClassDefinition<Family>; }>();

function buildNodeClassDefinitions<T extends Family>(
  nodeDefs: NodeDef[],
  family: T,
): { [x: string]: NodeClassDefinition<T>; } {
  const map: { [x: string]: NodeClassDefinition<T>; } = {};
  for (const nodeDef of nodeDefs) {
    var f = new NodeClassDefinition(nodeDef, family);
    f.applyNLS();
    f.applyEditorDefs();
    f.applyIndexDefs();
    map[f.id] = f;
  }
  return map;
}






export class NodeClassDefinition<T extends Family> {
  applyIndexDefs() {
    let NLSIndexMap = IndexDef.Map;
    if (NLSIndexMap.has(Family.Generic)) {
      this.applyIndexMap(NLSIndexMap.get(Family.Generic));
    }
    if (NLSIndexMap.has(this.family)) {
      this.applyIndexMap(NLSIndexMap.get(this.family));
    }
  }
  applyIndexMap(indexDef: { [x: string]: { [y: number]: string; }; }) {
    for (const driver in this.drivers) {
      this.drivers[driver as Driver.Type].applyIndexDef(indexDef);
    }
    for (const cmd in this.commands) {
      this.commands[cmd].applyIndexDef(indexDef);
    }
    for (const cmd in this.events) {
      this.events[cmd].applyIndexDef(indexDef);
    }
  }
  id: string;
  nlsId: string;
  drivers: { [x in Driver.Type]?: DriverDefinition } = {};
  commands: { [x: string]: CommandDefinition; } = {};
  events: { [x: string]: EventDefinition; } = {};
  family: T;
  label: string;

  public get name(): string {
    return `${pascalCase(this.label ?? this.id ?? "Unknown")}Node`;
  }

  toJSON() {
    return {
      className: this.name ?? this.label,
      id: this.id,
      nlsId: this.nlsId,
      drivers: this.drivers,
      commands: this.commands,
      events: this.events,
      family: this.family,
      label: this.label,
      name:  this.name
    };
  }



  constructor (nodeDef: NodeDef, family: T) {
    this.id = nodeDef.id;
    this.nlsId = nodeDef.nls;
    this.family = family;
    for (const st of toArray(nodeDef.sts?.st)) {
      this.drivers[st.id as Driver.Type] = new DriverDefinition(st,this);
      //   Object.defineProperty(this.drivers, st.id, {
      //                 value: new DriverDefinition(st),
      //                 enumerable: true,
      //                 writable: true,
      //                 configurable: true});
    }

    for (const cmd of toArray(nodeDef.cmds?.accepts?.cmd)) {
      this.commands[cmd.id] = new CommandDefinition(cmd,this);
      //   Object.defineProperty(this.drivers, st.id, {
      //                 value: new DriverDefinition(st),
      //                 enumerable: true,
      //                 writable: true,
      //                 configurable: true});
    }
    for (const cmd of toArray(nodeDef.cmds?.sends?.cmd)) {
      this.events[cmd.id] = new EventDefinition(cmd,this);
      //   Object.defineProperty(this.drivers, st.id, {
      //                 value: new DriverDefinition(st),
      //                 enumerable: true,
      //                 writable: true,
      //                 configurable: true});
    }
  }

  applyEditorDefs() {

      for (const driver of Object.values(this.drivers)) {

        if(driver.editorId)
        {
            let d = EditorDef.get(this.family, driver.editorId);
            if (d) driver.applyEditorDef(d);
        }
      }
      for (const cmd of Object.values(this.commands)) {
         if(cmd.editorId)
        {
            let d = EditorDef.get(this.family, cmd.editorId);
            if (d) cmd.applyEditorDef(d);
        }
      }

  }

  applyNLS() {
    let NLSRecordMap = NLS.Map;
    if (NLSRecordMap.has(Family.Generic)) {
      this.applyNLSMap(NLSRecordMap.get(Family.Generic));
    }
    if (NLSRecordMap.has(this.family)) {
      this.applyNLSMap(NLSRecordMap.get(this.family));
    }
  }

  applyNLSMap(nlsm: { [y: string]: NLSRecordTypeMap; }) {
    let nls = null;
    if (nlsm["Generic"]) {
      nls = nlsm["Generic"];
      this.applyNLSRecords(nls);
    }

    if (this.nlsId && nlsm[this.nlsId]) {
      nls = nlsm[this.nlsId];
      this.applyNLSRecords(nls);
    }
  }

  private applyNLSRecords(nls: NLSRecordTypeMap) {
    for (const entry of nls.GEN ?? []) {
      if (this.commands.hasOwnProperty(entry.type)) {
        this.commands[entry.type].applyNLSRecord(entry);
      }

      if (this.events.hasOwnProperty(entry.type)) {
        this.events[entry.type].applyNLSRecord(entry);
      }
      if (this.drivers.hasOwnProperty(entry.type)) {
        this.drivers[entry.type].applyNLSRecord(entry);
      }
    }
    for (const entry of nls.ST ?? []) {
      var e = entry as NLSDriverRecord;
      if (this.drivers.hasOwnProperty(e.driver)) {
        this.drivers[e.driver].applyNLSRecord(e);
      }
    }
    for (const entry of nls.CMD ?? []) {
      var c = entry as NLSCommandRecord;
      if (this.commands.hasOwnProperty(c.command)) {
        this.commands[c.command].applyNLSRecord(c);
      }
    }
    for (const entry of nls.CMDP ?? []) {
      var cp = entry as NLSCommandParameterRecord;
      for (const cmd in this.commands) {
        this.commands[cmd].applyNLSRecord(cp);
      }
    }
    for (const entry of nls.CMDPN ?? []) {
      var cp = entry as NLSCommandParameterRecord;
      for (const cmd in this.commands) {
        this.commands[cmd].applyNLSRecord(cp);
      }
    }
    if (Array.isArray(nls.ND)) {
      for (const entry of nls.ND) {
        if (entry.nodeDefId == this.id) {
          this.label = entry.value;
        }
      }
    } else if (nls.ND) {
      let ND = nls.ND as { nodeDefId: string; value: string; };
      if (ND.nodeDefId == this.id) {
        this.label = ND.value;
      }
    }
    if (Array.isArray(nls.NDN)) {
      for (const entry of nls.NDN) {
        if (entry.nlsId == this.nlsId) {
          this.label = entry.value;
        }
      }
    } else if (nls.NDN) {
      let ND = nls.NDN as { nlsId: string; value: string };
      if (ND.nlsId == this.nlsId) {
        this.label = ND.value;
      }
    }
  }



  // toTypeScript(): ClassDeclaration {
  //   ts.createClassDeclaration(
  //      undefined,
  //      [ts.createModifier(ts.SyntaxKind.PublicKeyword)],
  //      ts.createIdentifier(this.name),
  //      undefined
  //   }
}

export type DataTypeDefinition = {
  uom: number;
  serverUom?: number;
  enum: false;
  min: number;
  max: number;
  step?: number;
  precision?: number;
} | {
  uom: number;
  enum: true;
  indexId: string;
  values: {
    [x: number]: string;
  };
};

export abstract class NodeMemberDefinition<TId extends string> {
  label: string;
  hidden: boolean;
  id: TId;
  editorId: string;
  dataType: {
    [x in keyof typeof UnitOfMeasure]?:
    DataTypeDefinition;
  };
  classDef: NodeClassDefinition<any>;

  constructor( classDef: NodeClassDefinition<any>, def?: DriverDef | ParamDef)
  {
    this.classDef = classDef;
    if(def)
    {

      this.editorId = def.editor;
      this.dataType = {};
      var r = this.parseEditorId(def.editor);
      if(r)
        this.applyEditorDef({id: def.editor, range: r});
    }

  }

  parseEditorId(e: string)
  {



      if(e.startsWith("_"))
      {
        var rangeDef = {} as RangeDef;
        let field = "uom";
        const tokens = e.split("_").slice(1);
        for (let token of tokens) {
          const curField = field;
          if (token == "R") {
            field = "min";
            continue;
          } else if (token == "S") {
            field = "lowMask";
            continue;
          } else if (token == "N") {
            field = "nls";
            continue;
          }

          if (curField == "uom") {
            field = "prec";
          } else if (curField == "prec" || curField == "max" || curField == "highMask") {
            field = null;
          } else if (curField == "min") {
            field = "max";
          }
          else if (curField == "lowMask") {
            field = "highMask";
          }

          if (curField == "lowMask") {
            rangeDef["subset"] = token;
          }
          else if (curField == "highMask") {
            if (rangeDef["subset"] !== undefined) {
              rangeDef["subset"] += `,${token}`;
            } else {
              rangeDef["subset"] = token;
            }
          } else if (curField == "nls") {
            if (rangeDef[curField]) rangeDef[curField] += "_" + token;
            else rangeDef[curField] = token;
          } else if (curField !== null && curField !== undefined) {
            rangeDef[curField] = Number(token.replace("m", "-"));
          }
        }
        return rangeDef;
      }
  }


  public get name(): string {
    return camelCase(this.label ?? this.id);
  }

  primaryDataType() : { uom: number, enum: false; min: number; max: number; step?: number; precision?: number; } | { uom: number, enum: true; indexId: string; values: { [x: number]: string; }; }
  {
    return Object.values(this.dataType)[0];
  }

  #parseSubset(
    e: EditorDef
  ): { enum: true; values: { [x: number]: string; }; } | { enum: false; min: number; max: number; } {
    if ("subset" in e.range) {
      if (e.range.subset.includes(",")) {
        var values = {};
        for (const v of e.range.subset.split(",")) {
          let val = Number(v);
          if(Number.isNaN(val))
          {
            let [k, q] = v.split("-");
            for (let i = Number(k); i <= Number(q); i++) {
              values[i] = "";
            }
          }
          else
          {
            values[Number(v)] = "";
          }

        }
        return { enum: true, values: values };
      }
      if (e.range.subset.includes("-")) {
        const r = e.range.subset.split("-");
        return { enum: false, min: Number(r[0]), max: Number(r[1]) };
      }
    }
  }
  applyEditorDef(e: EditorDef) {
    if (e.id === this.editorId) {
      var d = {};
      for (const rangeDef of toArray(e.range)) {
        if ("subset" in rangeDef) {
          d[rangeDef.uom] = { uom: rangeDef.uom, indexId: rangeDef.nls, ...this.#parseSubset(e) };
        } else {
          d[rangeDef.uom] = {
            uom: rangeDef.uom,
            enum: rangeDef.nls !== undefined && rangeDef.nls !== null ? true : false,
            min: rangeDef.min,
            max: rangeDef.max,
            step: rangeDef.step ?? undefined,
            precision: rangeDef.prec ?? undefined,
            indexId: rangeDef.nls ?? undefined,
            returnType: rangeDef.nls ? EnumDefinition.get(this.classDef.family, rangeDef.nls, rangeDef.uom, this.classDef.id)?.name : undefined
          };
        }

      }
      this.dataType = d;
    }
  }

  applyIndexDef(e: { [x: string]: { [y: number]: string; }; }) {
    if (this.dataType) {
      for (const uom in this.dataType) {
        var s = this.dataType[uom];
        if (s.enum && e[s.indexId]) {
          for (const v in s.values) {
            s.values[v] = e[s.indexId][v];
          }
        }
      }
    }
  }

  toJSON() {
    return {
      label: this.label,
      hidden: this.hidden,
      id: this.id,
      editorId: this.editorId,
      dataType: this.dataType,
      name: this.name,
    };
  }
}

export class DriverDefinition extends NodeMemberDefinition<Driver.Type> {
  constructor (def: DriverDef, classDef: NodeClassDefinition<any>) {
    super(classDef, def);
    this.id = def.id;
    this.hidden = def.hide === "T";
    this.editorId = def.editor;
  }

  applyNLSRecord(nls: NLSGenericRecord | NLSDriverRecord) {
    if (nls.type === NLSRecordType.Driver) {
      if (nls.driver === this.id) {
        if (nls.property === "NAME") {
          this.label = nls.value;
        }
      }
    } else if (nls.type === NLSRecordType.Generic) {
      if (nls.key === this.id) {
        if (nls.property === "NAME") {
          this.label == this.label ?? nls.value;
        }
      }
    }
  }

  createClassProperty() {
    return ;
  }
}

export class CommandDefinition extends NodeMemberDefinition<string> {
  optional: boolean;

  parameters?: { [x: string]: ParameterDefinition; };
  initialValue?: Driver.Type;

  override get name(): string {
    if(Object.values(this.classDef.drivers).find(d => d.name === super.name))
    {
      return "update" + capitalize(super.name);
    }
    return super.name;
  }

  constructor (def: AcceptCommandDef, classDef: NodeClassDefinition<any>) {
    super(classDef);
    this.id = def.id;
    if(def.p)
    {
        this.parameters = {};

        for (const p of toArray(def.p)) {

          if (p.id === "") {
            this.editorId = p.editor;
            this.initialValue = p.init as Driver.Type;
            this.optional = p.optional === "T";
            p.id = "value";
          }
          this.parameters[p.id] = new ParameterDefinition(p,classDef);
        }
    }
  }

  applyNLSRecord(nls: NLSGenericRecord | NLSCommandRecord | NLSCommandParameterRecord) {
    if (nls.type === NLSRecordType.Command) {
      if (nls.command === this.id) {
        if (nls.property === "NAME") {
          this.label = nls.value;
        }
      }
    } else if (nls.type === NLSRecordType.Generic) {
      if (nls.key === this.id) {
        if (nls.property === "NAME") {
          this.label == this.label ?? nls.value;
        }
      }
      if (this.parameters && this.parameters[nls.key]) {
        this.parameters[nls.key].applyNLSRecord(nls);
      }
    } else if (nls.type === NLSRecordType.CommandParameter) {
      if (this.parameters && this.parameters[nls.commandParameter]) {
        this.parameters[nls.commandParameter].applyNLSRecord(nls);
      }
    }
  }

  override applyEditorDef(e: EditorDef): void {
     super.applyEditorDef(e);
     for (const p in this.parameters) {
       this.parameters[p].applyEditorDef(e);
     }
  }

  override applyIndexDef(e: { [x: string]: { [y: number]: string; }; }): void {
    super.applyIndexDef(e);
    for (const p in this.parameters) {
      this.parameters[p].applyIndexDef(e);
    }
  }

  // applyEditorDef(e: EditorDef) {
  //   if (e.id === this.editorId) {
  //     var d = {};
  //     for (const rangeDef of toArray(e.range)) {
  //       if ("subset" in rangeDef) {
  //         d[rangeDef.uom] = { indexId: rangeDef.nls, values: rangeDef.subset.split(',') };
  //       } else {
  //         d[rangeDef.uom] = { min: rangeDef.min, max: rangeDef.max, step: rangeDef.step, prec: rangeDef.prec };
  //       }
  //     }
  //     this.dataType = d;
  //   }
  //
  override toJSON() {
    return {
      label: this.label,
      hidden: this.hidden,
      id: this.id,
      editorId: this.editorId,
      dataType: this.dataType,
      name: this.name,
      optional: this.optional,
      parameters: this.parameters,
      initialValue: this.initialValue
    };
  }
}

export class ParameterDefinition extends NodeMemberDefinition<string> {
  initialValue: Driver.Type;
  optional: boolean;

  constructor (def: ParamDef, classDef: NodeClassDefinition<any>) {
    super(classDef,def);
    this.id = def.id;

    this.editorId = def.editor;
    this.initialValue = def.init as Driver.Type;
    this.optional = def.optional === "T";
  }
  applyNLSRecord(nls: NLSCommandParameterRecord | NLSGenericRecord) {
    if (nls.property === "NAME") {
      this.label = nls.value;
    }
  }


  // applyEditorDef(e: EditorDef) {
  //   if (e.id === this.editorId) {
  //     var d = {};
  //     for (const rangeDef of toArray(e.range)) {
  //       if ("subset" in rangeDef) {
  //         d[rangeDef.uom] = { indexId: rangeDef.nls, values: rangeDef.subset };
  //       } else {
  //         d[rangeDef.uom] = { min: rangeDef.min, max: rangeDef.max, step: rangeDef.step, prec: rangeDef.prec };
  //       }
  //     }
  //     this.dataType = d;
  //   }
  // }


}

export class EventDefinition extends NodeMemberDefinition<string> {
  constructor (def: SendCommandDef, classDef: NodeClassDefinition<any>) {
    super(classDef);
    this.id = def.id;
  }

  applyNLSRecord(nls: NLSCommandRecord | NLSGenericRecord) {
    if (nls.type === NLSRecordType.Command) {
      if (nls.command === this.id) {
        if (nls.property === "NAME") {
          this.label = nls.value;
        }
      }
    } else if (nls.type === NLSRecordType.Generic) {
      if (nls.key === this.id) {
        if (nls.property === "NAME") {
          this.label == this.label ?? nls.value;
        }
      }
    }
  }

    override toJSON()     {

        return {
          label: this.label,
          hidden: this.hidden,
          id: this.id,
          editorId: this.editorId,
          dataType: this.dataType,
          name: this.name
        }
    }

}


export namespace NodeClassDefinition
{
    export const Map = NodeClassMap;

    export function generate<T extends Family>(family: T, nodeDefs: NodeDef[]): { [x: string]: NodeClassDefinition<T>; }
    {
        if(nodeDefs)
        {
            var n = buildNodeClassDefinitions(nodeDefs, family);
            NodeClassMap.set(family, n);
            return n;
        }
    }

    export function load(path: string)
    {
          for (const file of new Set(fs.readdirSync(path + "/generated").concat(fs.readdirSync(path + "/custom")))) {
            let fam = file.replace(".json", "");
            const family = Family[fam];
            let nodeClassDefs: {
              [x: string]: NodeClassDefinition<Family>;
            } = {};
            if (fs.existsSync(`${path}/generated/${fam}.json`)) {
              nodeClassDefs = JSON.parse(fs.readFileSync(`${path}/generated/${fam}.json`, "utf8")) as {
                [x: string]: NodeClassDefinition<Family>;
              };

            }
            if (fs.existsSync(`${path}/custom/${fam}.json`)) {
              merge(
                nodeClassDefs,
                JSON.parse(fs.readFileSync(`${path}/custom/${fam}.json`, "utf8")) as {
                  [x: string]: NodeClassDefinition<Family>;
                }
              );
            }
            populateClassDefinitions(nodeClassDefs);
            NodeClassMap.set(family, nodeClassDefs);
          }
        return NodeClassMap;

      function populateClassDefinitions(nodeClassDefs: { [x: string]: NodeClassDefinition<Family>; }) {
        for (var entry of Object.values(nodeClassDefs)) {
          for (var driver of Object.values(entry.drivers)) {
            driver.classDef = entry;
          }
          for (var command of Object.values(entry.commands)) {
            command.classDef = entry;
            if(command.parameters)
              for (var param of Object.values(command.parameters)) {
                param.classDef = entry;
              }
          }
        }
      }
    }

    export function save(path: string)
    {

    }


}