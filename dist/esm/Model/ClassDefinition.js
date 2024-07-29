import typescript from "typescript";
import { Family } from "../Definitions/Global/Families.js";
import { toArray } from "../Utils.js";
import { camelize, } from '@project-chip/matter.js/util';
import { NLSCommandParameterRecord, NLSCommandRecord, NLSDriverRecord, NLSGenericRecord, NLSRecordMap, } from "./NLS.js";
import { EditorDefMap } from './EditorDef.js';
const ts = typescript.factory;
export function buildNodeClassDefinitions(nodeDefs, family) {
    const map = {};
    for (const nodeDef of nodeDefs) {
        if(nodeDef)
        {
             var f = new NodeClassDefinition(nodeDef, family);
            f.applyNLS();
            f.applyEditorDefs();
        }
    }
    return map;
}
export class NodeClassDefinition {
    id;
    nlsId;
    drivers;
    commands;
    events;
    family;
    label;
    get name() {
        return camelize(this.label);
    }
    constructor(nodeDef, family) {
        this.id = nodeDef.id;
        this.nlsId = nodeDef.nls;
        this.family = family;
        this.drivers = {};
        for (const st of toArray(nodeDef.sts.st)) {
            this.drivers[st.id] = new DriverDefinition(st);
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
        if (f) {
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
        if (NLSRecordMap.has(Family.Generic)) {
            this.applyNLSMap(NLSRecordMap.get(Family.Generic));
        }
        if (NLSRecordMap.has(this.family)) {
            this.applyNLSMap(NLSRecordMap.get(this.family));
        }
    }
    applyNLSMap(nlsm) {
        let nls = null;
        if (nlsm.has("Generic")) {
            nls = nlsm.get("Generic");
        }
        this.applyNLSRecords(nls);
        if (this.nlsId && nlsm.has(this.nlsId)) {
            nls = nlsm.get(this.nlsId);
            this.applyNLSRecords(nls);
        }
    }
    applyNLSRecords(nls) {
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
        for (const entry of nls.ND) {
            let t = entry;
            this.label = t.value;
        }
    }
}
class NodeMemberDefinition {
    label;
    hidden;
    id;
    editorId;
    get name() {
        return camelize(this.label);
    }
}
class DriverDefinition extends NodeMemberDefinition {
    dataType;
    constructor(def) {
        super();
        this.id = def.id;
        this.hidden = def.hide === "T";
        this.editorId = def.editor;
    }
    applyNLSRecord(nls) {
        if (nls instanceof NLSDriverRecord) {
            if (nls.driver === this.id) {
                if (nls.property === "NAME") {
                    this.label = nls.value;
                }
            }
        }
        else if (nls instanceof NLSGenericRecord) {
            if (nls.command === this.id) {
                if (nls.property === "NAME") {
                    this.label == this.label ?? nls.value;
                }
            }
        }
    }
    applyEditorDef(e) {
        if (e.id === this.editorId) {
            var d = {};
            for (const rangeDef of toArray(e.range)) {
                if ('subset' in rangeDef) {
                    d[rangeDef.uom] = { indexId: rangeDef.nls, values: rangeDef.subset };
                }
                else {
                    d[rangeDef.uom] = { min: rangeDef.min, max: rangeDef.max, step: rangeDef.step, prec: rangeDef.prec };
                }
            }
            this.dataType = d;
        }
    }
}
class CommandDefinition extends NodeMemberDefinition {
    optional;
    parameters;
    initialValue;
    dataType;
    constructor(def) {
        super();
        this.id = def.id;
        for (const p of toArray(def.p)) {
            if (p.id === "") {
                this.editorId = p.editor;
                this.initialValue = p.init;
                if (this.parameters === undefined) {
                    this.parameters = [];
                }
                this.parameters.push(new ParameterDefinition(p));
            }
        }
    }
    applyNLSRecord(nls) {
        if (nls instanceof NLSCommandRecord) {
            if (nls.command === this.id) {
                if (nls.property === "NAME") {
                    this.label = nls.value;
                }
            }
        }
        else if (nls instanceof NLSGenericRecord) {
            if (nls.command === this.id) {
                if (nls.property === "NAME") {
                    this.label == this.label ?? nls.value;
                }
            }
        }
        else if (nls instanceof NLSCommandParameterRecord) {
            for (const param of this.parameters) {
                param.applyNLSRecord(nls);
            }
        }
    }
    applyEditorDef(e) {
        if (e.id === this.editorId) {
            var d = {};
            for (const rangeDef of toArray(e.range)) {
                if ("subset" in rangeDef) {
                    d[rangeDef.uom] = { indexId: rangeDef.nls, values: rangeDef.subset.split(',') };
                }
                else {
                    d[rangeDef.uom] = { min: rangeDef.min, max: rangeDef.max, step: rangeDef.step, prec: rangeDef.prec };
                }
            }
            this.dataType = d;
        }
    }
}
class ParameterDefinition extends NodeMemberDefinition {
    initialValue;
    optional;
    dataType;
    constructor(def) {
        super();
        this.id = def.id;
        this.editorId = def.editor;
        this.initialValue = def.init;
        this.optional = def.optional === "T";
    }
    applyNLSRecord(nls) {
        if (nls.commandParameter === this.id) {
            if (nls.property === "NAME") {
                this.label = nls.value;
            }
        }
    }
    applyEditorDef(e) {
        if (e.id === this.editorId) {
            var d = {};
            for (const rangeDef of toArray(e.range)) {
                if ("subset" in rangeDef) {
                    d[rangeDef.uom] = { indexId: rangeDef.nls, values: rangeDef.subset };
                }
                else {
                    d[rangeDef.uom] = { min: rangeDef.min, max: rangeDef.max, step: rangeDef.step, prec: rangeDef.prec };
                }
            }
            this.dataType = d;
        }
    }
}
class EventDefinition extends NodeMemberDefinition {
    constructor(def) {
        super();
        this.id = def.id;
    }
    applyNLSRecord(nls) {
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
