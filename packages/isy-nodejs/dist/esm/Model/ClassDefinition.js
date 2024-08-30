import { Family } from "../Definitions/Global/Families.js";
import { toArray } from "../Utils.js";
import { capitalize } from "@project-chip/matter.js/util";
import { camelCase, merge, pascalCase } from 'moderndash';
import { NLSRecordType, NLS, IndexDef, } from "./NLS.js";
import { EditorDef } from "./EditorDef.js";
import { EnumDefinition } from './EnumDefinition.js';
import * as fs from 'fs';
const NodeClassMap = new Map();
function buildNodeClassDefinitions(nodeDefs, family) {
    const map = {};
    for (const nodeDef of nodeDefs) {
        var f = new NodeClassDefinition(nodeDef, family);
        f.applyNLS();
        f.applyEditorDefs();
        f.applyIndexDefs();
        for (const driver of Object.values(f.drivers)) {
            for (const cmd of Object.values(f.commands)) {
                if (cmd.initialValue == driver.id) {
                    driver.readonly = false;
                    break;
                }
                if (cmd.parameters)
                    for (const cmdp of Object.values(cmd.parameters)) {
                        if (cmdp.initialValue === driver.id) {
                            driver.readonly = false;
                            break;
                        }
                    }
            }
        }
        map[f.id] = f;
    }
    return map;
}
export class NodeClassDefinition {
    applyIndexDefs() {
        let NLSIndexMap = IndexDef.Map;
        if (NLSIndexMap.has(Family.Generic)) {
            this.applyIndexMap(NLSIndexMap.get(Family.Generic));
        }
        if (NLSIndexMap.has(this.family)) {
            this.applyIndexMap(NLSIndexMap.get(this.family));
        }
    }
    applyIndexMap(indexDef) {
        for (const driver in this.drivers) {
            this.drivers[driver].applyIndexDef(indexDef);
        }
        for (const cmd in this.commands) {
            this.commands[cmd].applyIndexDef(indexDef);
        }
        for (const cmd in this.events) {
            this.events[cmd].applyIndexDef(indexDef);
        }
    }
    id;
    nlsId;
    drivers = {};
    commands = {};
    events = {};
    family;
    label;
    dynamic;
    get name() {
        return `${pascalCase(this.label ?? this.id ?? "Unknown")}`;
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
            name: this.name,
            dynamic: this.dynamic
        };
    }
    constructor(nodeDef, family) {
        this.id = nodeDef.id;
        this.nlsId = nodeDef.nls;
        this.family = family;
        for (const st of toArray(nodeDef.sts?.st)) {
            this.drivers[st.id] = new DriverDefinition(st, this);
            //   Object.defineProperty(this.drivers, st.id, {
            //                 value: new DriverDefinition(st),
            //                 enumerable: true,
            //                 writable: true,
            //                 configurable: true});
        }
        for (const cmd of toArray(nodeDef.cmds?.accepts?.cmd)) {
            this.commands[cmd.id] = new CommandDefinition(cmd, this);
            //   Object.defineProperty(this.drivers, st.id, {
            //                 value: new DriverDefinition(st),
            //                 enumerable: true,
            //                 writable: true,
            //                 configurable: true});
        }
        for (const cmd of toArray(nodeDef.cmds?.sends?.cmd)) {
            this.events[cmd.id] = new EventDefinition(cmd, this);
            //   Object.defineProperty(this.drivers, st.id, {
            //                 value: new DriverDefinition(st),
            //                 enumerable: true,
            //                 writable: true,
            //                 configurable: true});
        }
    }
    applyEditorDefs() {
        for (const driver of Object.values(this.drivers)) {
            if (driver.editorId) {
                let d = EditorDef.get(this.family, driver.editorId);
                if (d)
                    driver.applyEditorDef(d);
            }
        }
        for (const cmd of Object.values(this.commands)) {
            if (cmd.editorId) {
                let d = EditorDef.get(this.family, cmd.editorId);
                if (d)
                    cmd.applyEditorDef(d);
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
    applyNLSMap(nlsm) {
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
    applyNLSRecords(nls) {
        for (const entry of nls.GEN ?? []) {
            //if (this.commands.hasOwnProperty(entry.key)) {
            for (const cmd in this.commands) {
                this.commands[cmd].applyNLSRecord(entry);
            }
            //}
            if (this.events.hasOwnProperty(entry.control)) {
                this.events[entry.control].applyNLSRecord(entry);
            }
            if (this.drivers.hasOwnProperty(entry.control)) {
                this.drivers[entry.control].applyNLSRecord(entry);
            }
        }
        for (const entry of nls.ST ?? []) {
            var e = entry;
            if (this.drivers.hasOwnProperty(e.control)) {
                this.drivers[e.control].applyNLSRecord(e);
            }
        }
        for (const entry of nls.CMD ?? []) {
            var c = entry;
            if (this.commands.hasOwnProperty(c.control)) {
                this.commands[c.control].applyNLSRecord(c);
            }
        }
        for (const entry of nls.CMDP ?? []) {
            var cp = entry;
            for (const cmd in this.commands) {
                this.commands[cmd].applyNLSRecord(cp);
            }
        }
        for (const entry of nls.CMDPN ?? []) {
            var cp = entry;
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
        }
        else if (nls.ND) {
            let ND = nls.ND;
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
        }
        else if (nls.NDN) {
            let ND = nls.NDN;
            if (ND.nlsId == this.nlsId) {
                this.label = ND.value;
            }
        }
    }
}
export class NodeMemberDefinition {
    label;
    hidden;
    id;
    editorId;
    dataType;
    optional;
    classDef;
    constructor(classDef, def) {
        this.classDef = classDef;
        if (def) {
            this.editorId = def.editor;
            this.dataType = {};
            var r = this.parseEditorId(def.editor);
            if (r)
                this.applyEditorDef({ id: def.editor, range: r });
        }
    }
    selectValue(currentValue, newValue, nlsId) {
        if (currentValue === undefined || currentValue === null) {
            return newValue;
        }
        else if (this.classDef.nlsId == nlsId) {
            return newValue;
        }
        return currentValue;
    }
    parseEditorId(e) {
        if (e.startsWith("_")) {
            var rangeDef = {};
            let field = "uom";
            const tokens = e.split("_").slice(1);
            for (let token of tokens) {
                const curField = field;
                if (token == "R") {
                    field = "min";
                    continue;
                }
                else if (token == "S") {
                    field = "lowMask";
                    continue;
                }
                else if (token == "N") {
                    field = "nls";
                    continue;
                }
                if (curField == "uom") {
                    field = "prec";
                }
                else if (curField == "prec" || curField == "max" || curField == "highMask") {
                    field = null;
                }
                else if (curField == "min") {
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
                    }
                    else {
                        rangeDef["subset"] = token;
                    }
                }
                else if (curField == "nls") {
                    if (rangeDef[curField])
                        rangeDef[curField] += "_" + token;
                    else
                        rangeDef[curField] = token;
                }
                else if (curField !== null && curField !== undefined) {
                    rangeDef[curField] = Number(token.replace("m", "-"));
                }
            }
            return rangeDef;
        }
    }
    get name() {
        return camelCase(this.label ?? this.id);
    }
    primaryDataType() {
        return Object.values(this.dataType)[0];
    }
    #parseSubset(e) {
        if ("subset" in e.range) {
            if (e.range.subset.includes(",")) {
                var values = {};
                for (const v of e.range.subset.split(",")) {
                    let val = Number(v);
                    if (Number.isNaN(val)) {
                        let [k, q] = v.split("-");
                        for (let i = Number(k); i <= Number(q); i++) {
                            values[i] = "";
                        }
                    }
                    else {
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
    applyEditorDef(e) {
        if (e.id === this.editorId) {
            var d = {};
            for (const rangeDef of toArray(e.range)) {
                if ("subset" in rangeDef) {
                    d[rangeDef.uom] = { uom: rangeDef.uom, indexId: rangeDef.nls, ...this.#parseSubset(e) };
                }
                else {
                    d[rangeDef.uom] = {
                        uom: rangeDef.uom,
                        enum: false,
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
    applyIndexDef(e) {
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
            optional: this.optional,
            id: this.id,
            editorId: this.editorId,
            dataType: this.dataType,
            name: this.name,
        };
    }
}
export class DriverDefinition extends NodeMemberDefinition {
    readonly = true;
    constructor(def, classDef) {
        super(classDef, def);
        this.id = def.id;
        this.hidden = def.hide === 'T';
        this.editorId = def.editor;
        this.optional = false;
    }
    applyNLSRecord(nls) {
        if (nls.type === NLSRecordType.Driver) {
            if (nls.control === this.id) {
                if (nls.property === 'NAME') {
                    this.label = this.selectValue(this.label, nls.value, nls.nlsId);
                }
            }
        }
        else if (nls.type === NLSRecordType.Generic) {
            if (nls.control === this.id) {
                if (nls.property === 'NAME') {
                    this.label = this.selectValue(this.label, nls.value, nls.nlsId);
                }
            }
        }
    }
    toJSON() {
        return {
            label: this.label,
            hidden: this.hidden,
            optional: this.optional,
            readonly: this.readonly,
            id: this.id,
            editorId: this.editorId,
            dataType: this.dataType,
            name: this.name
        };
    }
}
export class CommandDefinition extends NodeMemberDefinition {
    parameters;
    initialValue;
    get name() {
        if (Object.values(this.classDef.drivers).find(d => d.name === super.name)) {
            return "update" + capitalize(super.name);
        }
        return super.name;
    }
    constructor(def, classDef) {
        super(classDef);
        this.id = def.id;
        if (def.p) {
            this.parameters = {};
            for (const p of toArray(def.p)) {
                if (p.id === "") {
                    this.editorId = p.editor;
                    this.initialValue = p.init;
                    this.optional = p.optional === "T";
                    p.id = "value";
                }
                this.parameters[p.id] = new ParameterDefinition(p, classDef);
            }
        }
    }
    applyNLSRecord(nls) {
        if (nls.type === NLSRecordType.Command) {
            if (nls.control === this.id) {
                if (nls.property === "NAME") {
                    this.label = this.selectValue(this.label, nls.value, nls.nlsId);
                }
            }
        }
        else if (nls.type === NLSRecordType.Generic) {
            if (nls.control === this.id) {
                if (nls.property === "NAME") {
                    this.label = this.selectValue(this.label, nls.value, nls.nlsId);
                }
            }
            if (this.parameters && this.parameters[nls.control]) {
                this.parameters[nls.control].applyNLSRecord(nls);
            }
        }
        else if (nls.type === NLSRecordType.CommandParameter || nls.type === NLSRecordType.CommandParameterNLS) {
            if (this.parameters && this.parameters[nls.control]) {
                this.parameters[nls.control].applyNLSRecord(nls);
            }
        }
    }
    applyEditorDef(e) {
        super.applyEditorDef(e);
        for (const p in this.parameters) {
            this.parameters[p].applyEditorDef(e);
        }
    }
    applyIndexDef(e) {
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
    toJSON() {
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
export class ParameterDefinition extends NodeMemberDefinition {
    initialValue;
    constructor(def, classDef) {
        super(classDef, def);
        this.id = def.id;
        this.editorId = def.editor;
        this.initialValue = def.init;
        this.optional = def.optional === "T";
    }
    applyNLSRecord(nls) {
        if (nls.property === "NAME") {
            this.label = this.selectValue(this.label, nls.value, nls.nlsId);
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
            optional: this.optional,
            initialValue: this.initialValue
        };
    }
}
export class EventDefinition extends NodeMemberDefinition {
    constructor(def, classDef) {
        super(classDef);
        this.id = def.id;
    }
    applyNLSRecord(nls) {
        if (nls.type === NLSRecordType.Command) {
            if (nls.control === this.id) {
                if (nls.property === "NAME") {
                    this.label = this.selectValue(this.label, nls.value, nls.nlsId);
                }
            }
        }
        else if (nls.type === NLSRecordType.Generic) {
            if (nls.control === this.id) {
                if (nls.property === "NAME") {
                    this.label = this.selectValue(this.label, nls.value, nls.nlsId);
                }
            }
        }
    }
}
(function (NodeClassDefinition) {
    NodeClassDefinition.Map = NodeClassMap;
    function generate(family, nodeDefs) {
        if (nodeDefs) {
            var n = buildNodeClassDefinitions(nodeDefs, family);
            NodeClassMap.set(family, n);
            return n;
        }
    }
    NodeClassDefinition.generate = generate;
    function load(path) {
        for (const file of new Set(fs.readdirSync(path + "/generated").concat(fs.readdirSync(path + "/overrides")))) {
            let fam = file.replace(".json", "");
            const family = Family[fam];
            let nodeClassDefs = {};
            if (fs.existsSync(`${path}/generated/${fam}.json`)) {
                nodeClassDefs = JSON.parse(fs.readFileSync(`${path}/generated/${fam}.json`, "utf8"));
            }
            if (fs.existsSync(`${path}/overrides/${fam}.json`)) {
                nodeClassDefs = merge(nodeClassDefs, JSON.parse(fs.readFileSync(`${path}/overrides/${fam}.json`, "utf8")));
            }
            populateClassDefinitions(nodeClassDefs);
            NodeClassMap.set(family, nodeClassDefs);
        }
        return NodeClassMap;
        function populateClassDefinitions(nodeClassDefs) {
            for (var entry of Object.values(nodeClassDefs)) {
                for (var driver of Object.values(entry.drivers)) {
                    driver.classDef = entry;
                }
                for (var command of Object.values(entry.commands)) {
                    command.classDef = entry;
                    if (command.parameters)
                        for (var param of Object.values(command.parameters)) {
                            param.classDef = entry;
                        }
                }
            }
        }
    }
    NodeClassDefinition.load = load;
    function save(path) {
    }
    NodeClassDefinition.save = save;
})(NodeClassDefinition || (NodeClassDefinition = {}));
//# sourceMappingURL=ClassDefinition.js.map