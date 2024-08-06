import { Family } from "isy-nodejs/ISY";
import { type EnumDefinition } from "isy-nodejs/Model/EnumDefinition";
import winston from "winston";
export declare const logger: winston.Logger;
export declare function generateEnumDefs(): Promise<void>;
export declare function generateEnums(enumDefs: {
    [x: string]: EnumDefinition<Family>;
}, family: Family): Promise<void>;
export declare function generateNodeClassDefs(): Promise<void>;
