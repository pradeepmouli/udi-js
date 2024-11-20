import { EnumDefinition } from "isy-nodejs/Model/EnumDefinition";
import winston from "winston";
import { Family } from 'isy-nodejs/Definitions/index';
export declare const logger: winston.Logger;
export declare function generateEnumDefs(): Promise<void>;
export declare function generateEnums(): Promise<void>;
export declare function generateEnumsForFamily(enumDefs: {
    [x: string]: EnumDefinition<Family>;
}, family: Family): Promise<void>;
export declare function generateNodeClassDefs(): Promise<void>;
export declare function generateNodeClasses(): void;
//# sourceMappingURL=generate-nodeclasses.d.ts.map