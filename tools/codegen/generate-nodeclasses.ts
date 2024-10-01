import { existsSync, mkdirSync, readFile, readFileSync, writeFileSync } from "fs";
import { Project, IndentationText, NewLineKind, QuoteKind, createWrappedNode } from "ts-morph";
import { NodeClassFactory } from "isy-nodejs/CodeGeneration/NodeClassFactory";
import { Family } from "isy-nodejs/ISY";
import { NodeClassDefinition } from "isy-nodejs/Model/ClassDefinition";
import { buildEnums, EnumFactory } from "isy-nodejs/CodeGeneration/EnumFactory";
import { buildEnumDefinitions, EnumDefinition } from "isy-nodejs/Model/EnumDefinition";
import { EditorDefMap } from "isy-nodejs/Model/EditorDef";
import { NLSRecordMap, NLSIndexMap } from "isy-nodejs/Model/NLS";
import ts from "typescript";
import fs from "fs";
import type { NodeDef } from "isy-nodejs/Model/NodeDef";
import winston from "winston";
import { toArray } from "isy-nodejs/Utils";

const format = winston.format;
const myFormat = format.combine(
    format.splat(),
    winston.format.printf((info) => {
        const d = new Date();
        const dStr =
            d.getFullYear() +
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
    }),
    format.colorize({ all: true })
);
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
function zPad2(str: number) {
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
    for (const [family, defs] of enumDefs) {
        generateEnumsForFamily(defs, family);
    }
    //saveSourceFiles("../../packages/isy-nodejs/src/Definitions", enums);

}

export async function generateEnumsForFamily(enumDefs: { [x: string]: EnumDefinition<Family>; }, family: Family) {

    try {
        const enums = EnumFactory.generateAll();
        saveSourceFiles('../../packages/isy-nodejs/src/Definitions', family, enums);
    }
    catch (e) {
        logger.error(`Error generating enums for ${Family[family]}: ${e.message}`, e.stack);
    }

}

function saveSourceFiles(path: string, family: Family, enums: { family: Family; name: string; id: string; path: string; statements: ts.EnumDeclaration[]; }[]) {

     if (existsSync(`${path}/${Family[family]}/generated`)) {
				fs.rmdirSync(`${path}/${Family[family]}/generated`);
			}
			mkdirSync(`${path}/${Family[family]}/generated`, { recursive: true });
    for (const c of enums) {

        try {
            saveFile(path, c);
        } catch (e) {
            logger.error(`Error creating ${Family[family]} ${c.name} enum: ${e.message}`, e.stack);
        }
    }
}

export async function generateNodeClassDefs() {
    let files = fs.readdirSync("./resources/nodeDefs/", { withFileTypes: true, recursive: true });
    let nodeList = new Map<Family, NodeDef[]>();
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
                } catch (e) {
                    logger.error(`Error parsing file ${file.path}: ${e.message}`, e.stack);
                }
            }
        }
    }

    for (const [family, nodeDefs] of nodeList) {
        let classDefs: { [x: string]: NodeClassDefinition<Family>; } = {};


        try {
            classDefs = NodeClassDefinition.generate(family, nodeDefs);
            if (!existsSync("./resources/nodeClassDefs/generated/")) {
                mkdirSync("./resources/nodeClassDefs/generated", { recursive: true });
            }
            writeFileSync(`./resources/nodeClassDefs/generated/${Family[family]}.json`, JSON.stringify(classDefs, null, 2));

        } catch (e) {
            logger.error(`Error generating node class definitions for ${Family[family]}: ${e.message}`, e.stack);
        }


    }
}

function loadNodeClassDefs() {
    return NodeClassDefinition.load("./resources/nodeClassDefs");
}
const project = new Project({
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 }, manipulationSettings: {
        // TwoSpaces, FourSpaces, EightSpaces, or Tab
        indentationText: IndentationText.Tab,

        // LineFeed or CarriageReturnLineFeed
        newLineKind: NewLineKind.LineFeed,
        // Single or Double
        quoteKind: QuoteKind.Single,
        // Whether to change shorthand property assignments to property assignments
        // and add aliases to import & export specifiers (see more information in
        // the renaming section of the documentation).
        usePrefixAndSuffixTextForRename: false,
        // Whether to use trailing commas in multi-line scenarios where trailing
        // commas would be used.
        useTrailingCommas: false,
    },
});
export function generateNodeClasses() {
    let classDefs = loadNodeClassDefs();
    NodeClassFactory.basePath = "../../packages/isy-nodejs/src/Devices";
    for (const [family, defs] of classDefs) {
        generateNodeClassesForFamily(defs, family);
    }
}

function generateNodeClassesForFamily(classDefs: { [x: string]: NodeClassDefinition<Family>; }, family: Family) {
    const classes = NodeClassFactory.buildNodeClasses(classDefs);

    if (!existsSync(`../../packages/isy-nodejs/src/Devices/${Family[family]}/Generated`))
        mkdirSync(`../../packages/isy-nodejs/src/Devices/${Family[family]}/Generated`, { recursive: true });
    for (const c of classes) {
        try {
            c.sourceFile.saveSync();
            /* var f = project.createSourceFile(
                `../../packages/isy-nodejs/src/Devices/${Family[family]}/Generated/${c.name}.ts`,"",  {overwrite: true, }
                );*/

            //let r = ts.createPrinter();
            //writeFileSync(
            //`../../packages/isy-nodejs/src/Devices/${Family[family]}/Generated/${c.name}.ts`,
            //f.print()
            //);
        } catch (e) {
            logger.error(`Error creating ${Family[family]} ${c.name} class: ${e.message}`, e.stack);
        }
    }
}
function saveFile(path: string, c: { family: Family; name: string; id: string; path: string; statements: ts.EnumDeclaration[]; }) {
    var f = ts.createSourceFile(
        "",
        "",
        ts.ScriptTarget.ES2022,
        false,
        ts.ScriptKind.TS
    );
    //@ts-expect-error
    f.statements = c.statements;
    let r = ts.createPrinter();
    writeFileSync(`${path}${c.path}`, r.printFile(f));
}
