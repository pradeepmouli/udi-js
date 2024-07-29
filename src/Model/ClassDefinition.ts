import typescript, { factory, type ClassDeclaration } from "typescript";
import { NodeDef, type AcceptCommandDef, DriverDef, SendCommandDef } from "./NodeDef.js";
import { Family } from "../Definitions/Global/Families.js";
import type { Driver } from "../Definitions/Global/Drivers.js";
import { Command } from "@project-chip/matter.js/cluster";
import { toArray } from "../Utils.js";
import { camelize,  } from '@project-chip/matter.js/util';
import {
  NLSCommandParameterRecord,
  NLSCommandRecord,
  NLSDriverRecord,
  NLSGenericRecord,
  NLSRecord,
  NLSRecordMap,
  type NLSRecordType,
} from "./NLS.js";
import { EditorDefMap, type EditorDef } from './EditorDef.js';
import type { UnitOfMeasure } from '../Definitions/Global/UOM.js';


const ts = typescript.factory;


export function buildNodeClassDefinitions<T extends Family>(nodeDefs: NodeDef[], family: T) {
  const map: { [x: string]: NodeClassDefinition<T> } = {};
  for (const nodeDef of nodeDefs) {
    var f = new NodeClassDefinition(nodeDef, family);
    f.applyNLS();
    f.applyEditorDefs();
  }
  return map;



}


export class NodeClassDefinition<T extends Family> {
  id: string;
  nlsId: string;
  drivers: { [x in Driver.Type]?: DriverDefinition };
  commands: { [x: string]: CommandDefinition };
  events: { [x: string]: EventDefinition };
  family: T;
  label: string;
  get name(): string
  {
    return camelize(this.label);
  }

  constructor(nodeDef: NodeDef, family: T) {
    this.id = nodeDef.id;
    this.nlsId = nodeDef.nls;
    this.family = family;
    this.drivers = {};
    for (const st of toArray(nodeDef.sts.st)) {
      this.drivers[st.id as Driver.Type] = new DriverDefinition(st);
      //   Object.defineProperty(this.drivers, st.id, {
      //                 value: new DriverDefinition(st),
      //                 enumerable: true,
      //                 writable: true,
      //                 configurable: true});
    }

    for (const cmd of toArray(nodeDef.cmds.accepts.cmd)) {
      this.commands[cmd.id] = new CommandDefinition(cmd);
      //   Object.defineProperty(this.drivers, st.id, {
      //                 value: new DriverDefinition(st),
      //                 enumerable: true,
      //                 writable: true,
      //                 configurable: true});
    }
    for (const cmd of toArray(nodeDef.cmds.sends.cmd)) {
      this.events[cmd.id] = new EventDefinition(cmd);
      //   Object.defineProperty(this.drivers, st.id, {
      //                 value: new DriverDefinition(st),
      //                 enumerable: true,
      //                 writable: true,
      //                 configurable: true});
    }

  }

  applyEditorDefs() {


      var f = EditorDefMap.get(this.family);
      if(f)
      {
          for (const driver of Object.values(this.drivers)) {
            var d = f[driver.editorId];
            driver.applyEditorDef(d);
          }
          for (const cmd of Object.values(this.commands)) {
            var c = f[cmd.editorId];
            cmd.applyEditorDef(c);
          }
      }

  }

  applyNLS() {
    if(NLSRecordMap.has(Family.Generic))
    {
        this.applyNLSMap(NLSRecordMap.get(Family.Generic));
    }
    if(NLSRecordMap.has(this.family))
    {
        this.applyNLSMap(NLSRecordMap.get(this.family));
    }
  }

  applyNLSMap(nlsm: Map<string, { [x in NLSRecordType]? : NLSRecord<x>[] }>) {
    let nls = null;
    if (nlsm.has("Generic")) {
        nls = nlsm.get("Generic");
    }

    this.applyNLSRecords(nls);
    if(this.nlsId && nlsm.has(this.nlsId))
    {
        nls = nlsm.get(this.nlsId);
        this.applyNLSRecords(nls);
    }
  }

  private applyNLSRecords(nls: { GEN: any; DRV: any; CMD: any; CMDP: any; ND: any }) {
    for (const entry of nls.GEN) {
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
    for (const entry of nls.DRV) {
      if (this.drivers.hasOwnProperty(entry.driver)) {
        this.drivers[entry.driver].applyNLSRecord(entry);
      }
    }
    for (const entry of nls.CMD) {
      if (this.commands.hasOwnProperty(entry.command)) {
        this.commands[entry.command].applyNLSRecord(entry);
      }
    }
    for (const entry of nls.CMDP) {
      for (const cmd in this.commands) {
        this.commands[cmd].applyNLSRecord(entry);
      }
    }
    for (const entry of nls.ND)
    {
        let t = entry as NLSRecord<NLSRecordType.NodeDef> as {nodeDefId?, property?, value}
        this.label = t.value;
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

abstract class NodeMemberDefinition<TId> {
  label: string;
  hidden: boolean;
  id: TId;
  editorId: string;

    get name(): string {
    return camelize(this.label);
  }

}

class DriverDefinition extends NodeMemberDefinition<Driver.Type> {

  dataType: {[x in keyof typeof UnitOfMeasure]?: {min: number, max: number, step?: number, prec?: number} | {"indexId": string, values: [number,string][]}};


  constructor(def: DriverDef) {
    super();
    this.id = def.id;
    this.hidden = def.hide === "T";
    this.editorId = def.editor;
  }

  applyNLSRecord(nls: NLSGenericRecord | NLSDriverRecord) {
    if (nls instanceof NLSDriverRecord) {
      if (nls.driver === this.id) {
        if (nls.property === "NAME") {
          this.label = nls.value;
        }
      }
    } else if (nls instanceof NLSGenericRecord) {
      if (nls.command === this.id) {
        if (nls.property === "NAME") {
          this.label == this.label ?? nls.value;
        }
      }
    }
  }



  applyEditorDef(e: EditorDef) {
    if(e.id === this.editorId)
    {
      var d = {}
      for(const rangeDef of toArray(e.range))
      {
        if('subset' in rangeDef)
        {
          d[rangeDef.uom] = {indexId: rangeDef.nls, values: rangeDef.subset};
        }
        else
        {
          d[rangeDef.uom] = {min: rangeDef.min, max: rangeDef.max, step: rangeDef.step, prec: rangeDef.prec};
        }
      }
      this.dataType = d;
    }
  }
}

class CommandDefinition extends NodeMemberDefinition<string> {
  optional: boolean;

  parameters?: ParameterDefinition[];
  initialValue?: Driver.Type;
  dataType: {};
  constructor(def: AcceptCommandDef) {
    super();
    this.id = def.id;

    for (const p of toArray(def.p)) {
      if (p.id === "") {
        this.editorId = p.editor;
        this.initialValue = p.init as Driver.Type;

        if (this.parameters === undefined) {
          this.parameters = [];
        }
        this.parameters.push(new ParameterDefinition(p));
      }
    }
  }
  applyNLSRecord(nls: NLSGenericRecord | NLSCommandRecord | NLSCommandParameterRecord) {
    if (nls instanceof NLSCommandRecord) {
      if (nls.command === this.id) {
        if (nls.property === "NAME") {
          this.label = nls.value;
        }
      }
    } else if (nls instanceof NLSGenericRecord) {
      if (nls.command === this.id) {
        if (nls.property === "NAME") {
          this.label == this.label ?? nls.value;
        }
      }
    } else if (nls instanceof NLSCommandParameterRecord) {
      for (const param of this.parameters) {
        param.applyNLSRecord(nls);
      }
    }
  }

  applyEditorDef(e: EditorDef) {
    if (e.id === this.editorId) {
      var d = {};
      for (const rangeDef of toArray(e.range)) {
        if ("subset" in rangeDef) {
          d[rangeDef.uom] = { indexId: rangeDef.nls, values: rangeDef.subset.split(',') };
        } else {
          d[rangeDef.uom] = { min: rangeDef.min, max: rangeDef.max, step: rangeDef.step, prec: rangeDef.prec };
        }
      }
      this.dataType = d;
    }
  }


}

class ParameterDefinition extends NodeMemberDefinition<string> {
  initialValue: Driver.Type;
  optional: boolean;
  dataType: {};
  constructor(def) {
    super();
    this.id = def.id;

    this.editorId = def.editor;
    this.initialValue = def.init as Driver.Type;
    this.optional = def.optional === "T";
  }
  applyNLSRecord(nls: NLSCommandParameterRecord) {
    if (nls.commandParameter === this.id) {
      if (nls.property === "NAME") {
        this.label = nls.value;
      }
    }
  }
  applyEditorDef(e: EditorDef) {
    if (e.id === this.editorId) {
      var d = {};
      for (const rangeDef of toArray(e.range)) {
        if ("subset" in rangeDef) {
          d[rangeDef.uom] = { indexId: rangeDef.nls, values: rangeDef.subset };
        } else {
          d[rangeDef.uom] = { min: rangeDef.min, max: rangeDef.max, step: rangeDef.step, prec: rangeDef.prec };
        }
      }
      this.dataType = d;
    }
  }
}

class EventDefinition extends NodeMemberDefinition<string> {

  constructor(def: SendCommandDef) {
    super();
    this.id = def.id;
  }

  applyNLSRecord(nls: NLSCommandRecord) {
    if (nls.command === this.id) {
      if (nls.property === "NAME") {
        this.label = nls.value;
      }
    }
  }
}

// [
//   ts.createClassDeclaration(
//     undefined,
//     [ts.createModifier(ts.SyntaxKind.PublicKeyword)],
//     ts.createIdentifier("$id"),
//     undefined,
//     [
//       ts.createHeritageClause(ts.SyntaxKind.ExtendsKeyword, [
//         ts.createExpressionWithTypeArguments(undefined, ts.createIdentifier("$familyBaseDevice")),
//       ]),
//       ts.createHeritageClause(ts.SyntaxKind.FirstFutureReservedWord, [
//         ts.createExpressionWithTypeArguments(undefined, ts.createIdentifier("$interface1")),
//         ts.createExpressionWithTypeArguments(undefined, ts.createIdentifier("$interface2")),
//         ts.createExpressionWithTypeArguments(
//           [
//             ts.createTypeReferenceNode(ts.createIdentifier("$family"), undefined),
//             ts.createUnionTypeNode([
//               ts.createTypeReferenceNode(ts.createIdentifier("$driver1"), undefined),
//               ts.createTypeReferenceNode(ts.createIdentifier("$driver2"), undefined),
//               ts.createTypeReferenceNode(ts.createIdentifier("$driver3"), undefined),
//             ]),
//             ts.createTypeReferenceNode(ts.createIdentifier("$command1"), undefined),
//             ts.createTypeReferenceNode(ts.createIdentifier("$command2"), undefined),
//             ts.createTypeReferenceNode(ts.createIdentifier("$command3"), undefined),
//           ],
//           ts.createIdentifier("ISYDevice")
//         ),
//       ]),
//     ],
//     [
//       ts.createProperty(
//         undefined,
//         undefined,
//         ts.createIdentifier("nodeDefId"),
//         undefined,
//         undefined,
//         ts.createIdentifier("$nodeDefId")
//       ),
//       ts.createProperty(
//         undefined,
//         undefined,
//         ts.createIdentifier("drivers"),
//         undefined,
//         ts.createTypeLiteralNode([
//           ts.createPropertySignature(
//             undefined,
//             ts.createIdentifier("$driver1"),
//             undefined,
//             ts.createTypeReferenceNode(ts.createIdentifier("$driver1type"), undefined),
//             undefined
//           ),
//           ts.createPropertySignature(
//             undefined,
//             ts.createIdentifier("$driver2"),
//             undefined,
//             ts.createTypeReferenceNode(ts.createIdentifier("$driver2type"), undefined),
//             undefined
//           ),
//           ts.createPropertySignature(
//             undefined,
//             ts.createIdentifier("$driver3"),
//             undefined,
//             ts.createTypeReferenceNode(ts.createIdentifier("$driver3type"), undefined),
//             undefined
//           ),
//         ]),
//         undefined
//       ),
//       ts.createProperty(
//         undefined,
//         undefined,
//         ts.createIdentifier("commands"),
//         undefined,
//         ts.createTypeLiteralNode([
//           ts.createPropertySignature(
//             undefined,
//             ts.createIdentifier("$command1"),
//             undefined,
//             ts.createFunctionTypeNode(
//               undefined,
//               [
//                 ts.createParameter(
//                   undefined,
//                   undefined,
//                   undefined,
//                   ts.createIdentifier("$command1p1"),
//                   undefined,
//                   undefined,
//                   undefined
//                 ),
//                 ts.createParameter(
//                   undefined,
//                   undefined,
//                   undefined,
//                   ts.createIdentifier("$command1p2"),
//                   undefined,
//                   undefined,
//                   undefined
//                 ),
//                 ts.createParameter(
//                   undefined,
//                   undefined,
//                   undefined,
//                   ts.createIdentifier("$command1p3"),
//                   undefined,
//                   undefined,
//                   undefined
//                 ),
//               ],
//               ts.createTypeReferenceNode(ts.createIdentifier("Promise"), [
//                 ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
//               ])
//             ),
//             undefined
//           ),
//           ts.createPropertySignature(
//             undefined,
//             ts.createIdentifier("$command2"),
//             undefined,
//             ts.createFunctionTypeNode(
//               undefined,
//               [
//                 ts.createParameter(
//                   undefined,
//                   undefined,
//                   undefined,
//                   ts.createIdentifier("$command2p1"),
//                   undefined,
//                   undefined,
//                   undefined
//                 ),
//                 ts.createParameter(
//                   undefined,
//                   undefined,
//                   undefined,
//                   ts.createIdentifier("$command2p2"),
//                   undefined,
//                   undefined,
//                   undefined
//                 ),
//                 ts.createParameter(
//                   undefined,
//                   undefined,
//                   undefined,
//                   ts.createIdentifier("$command2p3"),
//                   undefined,
//                   undefined,
//                   undefined
//                 ),
//               ],
//               ts.createTypeReferenceNode(ts.createIdentifier("Promise"), [
//                 ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
//               ])
//             ),
//             undefined
//           ),
//           ts.createPropertySignature(
//             undefined,
//             ts.createIdentifier("$command3"),
//             undefined,
//             ts.createFunctionTypeNode(
//               undefined,
//               [
//                 ts.createParameter(
//                   undefined,
//                   undefined,
//                   undefined,
//                   ts.createIdentifier("$command1p1"),
//                   undefined,
//                   undefined,
//                   undefined
//                 ),
//                 ts.createParameter(
//                   undefined,
//                   undefined,
//                   undefined,
//                   ts.createIdentifier("$command1p2"),
//                   undefined,
//                   undefined,
//                   undefined
//                 ),
//                 ts.createParameter(
//                   undefined,
//                   undefined,
//                   undefined,
//                   ts.createIdentifier("$command1p3"),
//                   undefined,
//                   undefined,
//                   undefined
//                 ),
//               ],
//               ts.createTypeReferenceNode(ts.createIdentifier("Promise"), [
//                 ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
//               ])
//             ),
//             undefined
//           ),
//         ]),
//         undefined
//       ),
//     ]
//   ),
// ];
