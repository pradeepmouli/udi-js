import camelcase from 'camelcase';
import { Family } from '../Definitions/Global/Families.js';
import { applyTranslations, NLSIndexMap } from './NLS.js';
import { camelCase, merge, pascalCase } from 'moderndash';

import { UnitOfMeasure } from '../Definitions/Global/UOM.js';
import fs from 'fs';


export class EnumDefinition<T extends Family> {
  public readonly family: T;
  public readonly id: string;
  public name: string;
  public values: { [y: number]: string } = {};
  public usages = new Set<`${string}:${keyof typeof UnitOfMeasure}`>();
  public booleanValues? : { true: number, false: number };
  constructor(family: T, indexDef: { id: string; values: { [y: number]: string } }) {
    this.family = family;
    this.id = indexDef.id;
    this.name = pascalCase(applyTranslations(family,indexDef.id.replace('IX_I_', '').replace('IX_', '').replace('IXA_','Alert')).replace('IXAV_','AlertValue'));
    for (const [index, value] of Object.entries(indexDef.values)) {
      this.values[pascalCase(value)] = parseInt(index)

  }}

}



export namespace EnumDefinition
{
    export function get<T extends Family>(family: T, id: string, uom: UnitOfMeasure, nodeDefId: string): EnumDefinition<T> | undefined
    {
        if(EnumDefinitionMap.has(family))
        {
           var enumDef = EnumDefinitionMap.get(family)[id];
           if(enumDef)
            {

                enumDef.usages.add(`${nodeDefId}:${UnitOfMeasure[uom] as keyof typeof UnitOfMeasure}`);
                return enumDef as EnumDefinition<T>;
            }

        }
    }

    export function generate<T extends Family = Family>(family? : T )
    {
        if(!family)
        {
            //return generateAll();
        }
        let enumDefs = EnumDefinitionMap;
        let indexDefs = NLSIndexMap.get(family);
        let familyEnumDefs: { [x: string]: EnumDefinition<Family> }
        for (const id in indexDefs) {
          familyEnumDefs[id] = new EnumDefinition(family, { id, values: indexDefs[id] });
        }
        enumDefs.set(family, familyEnumDefs);
        return enumDefs.get(family);
    }

   export function* generateAll(): any {
      for (const family of NLSIndexMap.keys())
      {
          yield generate(family);
      }
    }

    export function load(path: string)
    {
        if(!fs.existsSync(path+"/generated"))
        {
            fs.mkdirSync(path+"/generated", { recursive: true });
        }
        if(!fs.existsSync(path+"/custom"))
        {
            fs.mkdirSync(path+"/custom");
        }
        for(const file of new Set(fs.readdirSync(path + "/generated").concat(fs.readdirSync(path + "/custom"))))
        {
             const fam = file.replace(".json", "");
              const family = Family[fam];
              let enumDefs = {};
              if(fs.existsSync(`${path}/generated/${fam}.json`))
              {
                 enumDefs = JSON.parse(fs.readFileSync(`${path}/generated/${fam}.json`, "utf8")) as {
                   [x: string]: EnumDefinition<Family>;
                 };

              }

              if (fs.existsSync(`${path}/custom/${fam}.json`)) {
                merge(
                  enumDefs,
                  JSON.parse(fs.readFileSync(`${path}/custom/${fam}.json`, "utf8")) as {
                    [x: string]: EnumDefinition<Family>;
                  }
                );

              }
              for (const id in enumDefs)
                 {
                    enumDefs[id].usages = new Set();
                 }
              EnumDefinitionMap.set(family, enumDefs);
        }
        return EnumDefinitionMap;
    }
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
