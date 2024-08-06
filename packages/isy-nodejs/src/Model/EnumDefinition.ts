import camelcase from 'camelcase';
import type { Family } from '../Definitions/Global/Families.js';
import { applyTranslations } from './NLS.js';
import { camelCase, pascalCase } from 'moderndash';


export class EnumDefinition<T extends Family> {
  public readonly family: T;
  public readonly id: string;
  public name: string;
  public values: { [y: number]: string } = {};
  constructor(family: T, indexDef: { id: string; values: { [y: number]: string } }) {
    this.family = family;
    this.id = indexDef.id;
    this.name = pascalCase(applyTranslations(family,indexDef.id.replace('IX_I_', '').replace('IX_', '').replace('IXA_','Alarm')));
    for (const [index, value] of Object.entries(indexDef.values)) {
      this.values[pascalCase(value)] = parseInt(index)
  }}

}

export const EnumDefinitionMap:  Map<Family, {[x:string]: EnumDefinition<Family>}> = new Map();

export function buildEnumDefinitions (NLSIndexMap: Map<Family, {[x:string]: {[y: number]:string}}>)
{
    let enumDefs = EnumDefinitionMap;
    for (const [family, indexDefs] of NLSIndexMap)
    {
        let familyEnumDefs : {[x:string]: EnumDefinition<Family>} = {};
        for (const id in indexDefs)
        {
            familyEnumDefs[id] = new EnumDefinition(family, { id, values: indexDefs[id] });
        }
        enumDefs.set(family, familyEnumDefs);
    }
    return enumDefs;
}
