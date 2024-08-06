import { existsSync, mkdirSync, readFile, readFileSync, writeFileSync } from "fs";
import { buildNodeClasses } from "isy-nodejs/CodeGeneration/NodeClassFactory";
import { Family } from "isy-nodejs/ISY";
import { buildNodeClassDefinitions, type NodeClassDefinition } from "isy-nodejs/Model/ClassDefinition";
import { buildEnums } from "isy-nodejs/CodeGeneration/EnumFactory";
import {buildEnumDefinitions, type EnumDefinition} from "isy-nodejs/Model/EnumDefinition";
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
// Zero padding
function zPad2(str: number) {
    return str.toString().padStart(2, "0");
}
// Creates a debug.log symLink to the real log file to be used by Polyglot UI
// Log message formatter

export async function generateEnumDefs() {
    let enumMap = buildEnumDefinitions(NLSIndexMap);
    for(const [family,enumDef] of enumMap)
    {
        if (!existsSync("./resources/enumDefs/generated/")) {
            mkdirSync("./resources/enumDefs/generated", { recursive: true });
        }
        writeFileSync(`./resources/enumDefs/generated/${Family[family]}.json`, JSON.stringify(enumDef, null, 2));
        generateEnums(enumDef, family);
    }
}

export async function generateEnums(enumDefs: { [x: string]: EnumDefinition<Family> }, family: Family) {

    try
    {
    const enums = buildEnums(enumDefs);
      if (!existsSync(`../../packages/isy-nodejs/src/Definitions/${Family[family]}`))
        mkdirSync(`../../packages/isy-nodejs/src/Definitions/${Family[family]}`, { recursive: true });
    for (const c of enums) {
      try {
        var f = ts.createSourceFile(
          `../../packages/isy-nodejs/src/Definitions/${Family[family]}/${c.name}.ts`,
          "",
          ts.ScriptTarget.ES2022,
          false,
          ts.ScriptKind.TS
        );
        //@ts-expect-error
        f.statements = c.statements;
        let r = ts.createPrinter();
         writeFileSync(`../../packages/isy-nodejs/src/Definitions/${Family[family]}/${c.name}.ts`, r.printFile(f));
      } catch (e) {
        logger.error(`Error creating ${Family[family]} ${c.name} enum: ${e.message}`, e.stack);
      }
    }
    }
    catch(e)
    {
        logger.error(`Error generating enums for ${Family[family]}: ${e.message}`, e.stack);
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
            classDefs = buildNodeClassDefinitions(nodeDefs, family, NLSRecordMap, EditorDefMap, NLSIndexMap);
            if (!existsSync("./resources/nodeClassDefs/generated/")) {
                mkdirSync("./resources/nodeClassDefs/generated", { recursive: true });
            }
            writeFileSync(`./resources/nodeClassDefs/generated/${Family[family]}.json`, JSON.stringify(classDefs, null, 2));

        } catch (e) {
            logger.error(`Error generating node class definitions for ${Family[family]}: ${e.message}`, e.stack);
        }

        generateNodeClasses(classDefs, family);
    }
}

function generateNodeClasses(classDefs: { [x: string]: NodeClassDefinition<Family>; }, family: Family) {
    const classes = buildNodeClasses(classDefs);
    if (!existsSync(`../../packages/isy-nodejs/src/Devices/${Family[family]}/Generated`))
       mkdirSync(`../../packages/isy-nodejs/src/Devices/${Family[family]}/Generated`, { recursive: true });
    for (const c of classes) {
        try {
            var f = ts.createSourceFile(
              `../../packages/isy-nodejs/src/Devices/${Family[family]}/Generated/${c.name}.ts`,
              "",
              ts.ScriptTarget.ES2022,
              false,
              ts.ScriptKind.TS
            );
            //@ts-expect-error
            f.statements = c.statements;
            let r = ts.createPrinter();
            writeFileSync(
              `../../packages/isy-nodejs/src/Devices/${Family[family]}/Generated/${c.name}.ts`,
              r.printFile(f)
            );
        } catch (e) {
            logger.error(`Error creating ${Family[family]} ${c.name} class: ${e.message}`, e.stack);
        }
    }
}
