import type { Family } from '../Definitions/Global/Families.js';
export declare class EnumDefinition<T extends Family> {
    readonly family: T;
    readonly id: string;
    name: string;
    values: {
        [y: number]: string;
    };
    constructor(family: T, indexDef: {
        id: string;
        values: {
            [y: number]: string;
        };
    });
}
export declare const EnumDefinitionMap: Map<Family, {
    [x: string]: EnumDefinition<Family>;
}>;
export declare function buildEnumDefinitions(NLSIndexMap: Map<Family, {
    [x: string]: {
        [y: number]: string;
    };
}>): Map<Family, {
    [x: string]: EnumDefinition<Family>;
}>;
