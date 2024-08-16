import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { buildNodeClasses } from "isy-nodejs/CodeGeneration/NodeClassFactory";
import { Family } from "isy-nodejs/ISY";
import { NodeClassDefinition } from "isy-nodejs/Model/ClassDefinition";
import { EnumFactory } from "isy-nodejs/CodeGeneration/EnumFactory";
import { buildEnumDefinitions, EnumDefinition } from "isy-nodejs/Model/EnumDefinition";
import { NLSIndexMap } from "isy-nodejs/Model/NLS";
import ts from "typescript";
import fs from "fs";
import winston from "winston";
import { toArray } from "isy-nodejs/Utils";
const format = winston.format;
const myFormat = format.combine(format.splat(), winston.format.printf((info) => {
    const d = new Date();
    const dStr = d.getFullYear() +
        "-" +
        zPad2(d.getMonth() + 1) +
        "-" +
        zPad2(d.getDate()) +
        " " +
        zPad2(d.getHours()) +
        ":" +
        zPad2(d.getMinutes()) +
        ":" +
        zPad2(d.getSeconds());
    return `${dStr} ${info.level}: ${info.label}: ${info.message}`;
}), format.colorize({ all: true }));
export const logger = winston.loggers.add("codegen", {
    format: winston.format.label({ label: "codegen" }),
    transports: [
        new winston.transports.Console({ level: "info", format: myFormat }),
        new winston.transports.File({ filename: "codegen.log", level: "debug", format: myFormat }),
    ],
    exitOnError: false,
    levels: winston.config.cli.levels,
});
winston.loggers.add('EnumFactory', {
    format: winston.format.label({ label: "EnumFactory" }),
    transports: [
        new winston.transports.Console({ level: "info", format: myFormat }),
        new winston.transports.File({ filename: "codegen.log", level: "debug", format: myFormat }),
    ],
    exitOnError: false,
    levels: winston.config.cli.levels,
});
winston.loggers.add('NodeClassFactory', {
    format: winston.format.label({ label: "NodeClassFactory" }),
    transports: [
        new winston.transports.Console({ level: "info", format: myFormat }),
        new winston.transports.File({ filename: "codegen.log", level: "debug", format: myFormat }),
    ],
    exitOnError: false,
    levels: winston.config.cli.levels,
});
// Zero padding
function zPad2(str) {
    return str.toString().padStart(2, "0");
}
// Creates a debug.log symLink to the real log file to be used by Polyglot UI
// Log message formatter
export async function generateEnumDefs() {
    let enumMap = buildEnumDefinitions(NLSIndexMap);
    for (const [family, enumDef] of enumMap) {
        if (!existsSync("./resources/enumDefs/generated/")) {
            mkdirSync("./resources/enumDefs/generated", { recursive: true });
        }
        writeFileSync(`./resources/enumDefs/generated/${Family[family]}.json`, JSON.stringify(enumDef, null, 2));
    }
}
function loadEnumDefs() {
    return EnumDefinition.load("./resources/enumDefs");
}
export async function generateEnums() {
    let enumDefs = loadEnumDefs();
    let enums = EnumFactory.generateAll();
    saveSourceFiles("../../packages/isy-nodejs/src/Definitions", enums);
}
export async function generateEnumsForFamily(enumDefs, family) {
    try {
        const enums = EnumFactory.generateAll();
        saveSourceFiles('../../packages/isy-nodejs/src/Definitions', enums);
    }
    catch (e) {
        logger.error(`Error generating enums for ${Family[family]}: ${e.message}`, e.stack);
    }
}
function saveSourceFiles(path, enums) {
    for (const c of enums) {
        if (existsSync(`${path}/${Family[c.family]}`))
            mkdirSync(`${path}/${Family[c.family]}`, { recursive: true });
        try {
            saveFile(path, c);
        }
        catch (e) {
            logger.error(`Error creating ${Family[c.family]} ${c.name} enum: ${e.message}`, e.stack);
        }
    }
}
export async function generateNodeClassDefs() {
    let files = fs.readdirSync("./resources/nodeDefs/", { withFileTypes: true, recursive: true });
    let nodeList = new Map();
    for (const file of files) {
        {
            if (file.isFile()) {
                try {
                    const nodeDefss = JSON.parse(readFileSync(`${file.path}/${file.name}`, "utf8")).nodeDefs;
                    const nodeDefs = toArray(nodeDefss.nodeDef ?? nodeDefss.nodedef);
                    const fam = Family[file.name.replace(".json", "")];
                    if (!nodeList.has(fam)) {
                        nodeList.set(fam, []);
                    }
                    for (const nodeDef of nodeDefs) {
                        nodeList.get(fam).push(nodeDef);
                    }
                }
                catch (e) {
                    logger.error(`Error parsing file ${file.path}: ${e.message}`, e.stack);
                }
            }
        }
    }
    for (const [family, nodeDefs] of nodeList) {
        let classDefs = {};
        try {
            classDefs = NodeClassDefinition.generate(family, nodeDefs);
            if (!existsSync("./resources/nodeClassDefs/generated/")) {
                mkdirSync("./resources/nodeClassDefs/generated", { recursive: true });
            }
            writeFileSync(`./resources/nodeClassDefs/generated/${Family[family]}.json`, JSON.stringify(classDefs, null, 2));
        }
        catch (e) {
            logger.error(`Error generating node class definitions for ${Family[family]}: ${e.message}`, e.stack);
        }
    }
}
function loadNodeClassDefs() {
    return NodeClassDefinition.load("./resources/nodeClassDefs");
}
export function generateNodeClasses() {
    let classDefs = loadNodeClassDefs();
    for (const [family, defs] of classDefs) {
        generateNodeClassesForFamily(defs, family);
    }
}
function generateNodeClassesForFamily(classDefs, family) {
    const classes = buildNodeClasses(classDefs);
    if (!existsSync(`../../packages/isy-nodejs/src/Devices/${Family[family]}/Generated`))
        mkdirSync(`../../packages/isy-nodejs/src/Devices/${Family[family]}/Generated`, { recursive: true });
    for (const c of classes) {
        try {
            var f = ts.createSourceFile(`../../packages/isy-nodejs/src/Devices/${Family[family]}/Generated/${c.name}.ts`, "", ts.ScriptTarget.ES2022, false, ts.ScriptKind.TS);
            //@ts-expect-error
            f.statements = c.statements;
            let r = ts.createPrinter();
            writeFileSync(`../../packages/isy-nodejs/src/Devices/${Family[family]}/Generated/${c.name}.ts`, r.printFile(f));
        }
        catch (e) {
            logger.error(`Error creating ${Family[family]} ${c.name} class: ${e.message}`, e.stack);
        }
    }
}
function saveFile(path, c) {
    var f = ts.createSourceFile(`${path}/${c.path}`, "", ts.ScriptTarget.ES2022, false, ts.ScriptKind.TS);
    //@ts-expect-error
    f.statements = c.statements;
    let r = ts.createPrinter();
    writeFileSync(`${path}/${c.path}`, r.printFile(f));
}
//# sourceMappingURL=generate-nodeclasses.js.map