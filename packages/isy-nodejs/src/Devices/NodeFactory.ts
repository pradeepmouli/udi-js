
import { ISY } from '../ISY.js';
import  { ISYNode } from '../ISYNode.js';
import type { NodeDef } from '../Model/NodeDef.js';
import { isDynamic, type NodeInfo } from '../Model/NodeInfo.js';
import type { Constructor } from './Constructor.js';
import type { IdentityOf, StringKeys } from '../Utils.js';
import { Family, type EnumLiteral } from '../Definitions/index.js';



export namespace NodeFactory {
	export const registry: NodeClassRegistry = {};

	export type NodeClass<T extends Family | keyof typeof Family> = T extends Family? typeof ISYNode<T, any, any, any> : T extends keyof typeof Family ? typeof ISYNode<typeof Family[T] , any, any, any> : never;

	export const implementsRegistry: {[x in StringKeys<typeof Family>]?: {[x: string]: string[]}} = {};

	export function register<F extends keyof typeof Family>(nodeClass: NodeClass<F>, id: string = nodeClass.nodeDefId) {
		//let s; //FamilyNodeClassRegistry<(typeof Family)[F]>;
		let f = Family[nodeClass.family];
		let s = (registry[f] ?? (registry[f] = {})) as FamilyNodeClassRegistry<any>;
		s[id] = nodeClass;
		if (!implementsRegistry[f]) {
			implementsRegistry[f] = {};
		}
		implementsRegistry[f][id] = nodeClass.implements;


	}


	function compare(a: typeof ISYNode<any, any, any, any>, b: typeof ISYNode<any, any, any, any>)
	{
		if(a.nodeDefId === b.nodeDefId)
		{
			return 0;
		}
		if(a.implements.includes(b.nodeDefId))
			return 1;
		if(b.implements.includes(a.nodeDefId))
			return -1;
		return a.nodeDefId.localeCompare(b.nodeDefId);
	}

	export function sortImplementsRegistry()
	{
		for (let f in implementsRegistry) {
			let reg = implementsRegistry[f];
			for (let e in reg) {

				reg[e] = reg[e].sort((a,b) => compare(getForNodeDefId(f as keyof typeof Family, a), getForNodeDefId(f as keyof typeof Family, b)));
			}
		}
	}

	export function getImplements<F extends keyof typeof Family, T extends ISYNode<typeof Family[F],any,any,any>>(node: T) {
		return implementsRegistry[Family[node.family] as F][node.nodeDefId];
	}

	export function getForNode<F extends keyof typeof Family>(family: F, node: NodeInfo<typeof Family[F]>): NodeClass<F> {
		if(isDynamic(node))
		{
			return getForNodeDefId(family, node.sgid);
		}
		return getForNodeDefId(family, node.nodeDefId);
	}



	export function getForNodeDefId<F extends keyof typeof Family | Family>(family: F, nodeDefId: string): NodeClass<F> {
		if(typeof family === "string")
		{
			return registry[family as keyof typeof Family][nodeDefId] as NodeClass<F>;
		}
		else if(typeof family === "number")
		{
			return registry[Family[family] as keyof typeof Family][nodeDefId] as NodeClass<F>;
		}

	}




	export async function get<F extends keyof typeof Family>(node: NodeInfo<typeof Family[F]>, isy: ISY = ISY.instance): Promise<typeof ISYNode<typeof Family[F], any, any, any>> {
		if (!isDynamic(node))
		{
			return Promise.resolve(getForNodeDefId(Family[node.family ?? Family.Insteon]  as F, node.nodeDefId));
		}

		else {
			var nd = getForNodeDefId(Family[node.family] as F, node.sgid);
			if (nd) {
				return Promise.resolve(nd);
			}
			let n = (await isy.sendRequest(
				`zmatter/${node.family == Family.ZWave ? "zwave" : "zb"}/node/${node.address}/def/get?full=true`
			)) as NodeDef;
			let cls = ISYNode;
		    NodeFactory.register(cls,n.nls);
			return cls;


		}
	}



	export async function create<F extends Family>(nodeInfo: NodeInfo<F>, isy: ISY = ISY.instance): Promise<ISYNode<F, any, any, any>> {
		const nodeClass = await get(nodeInfo) as unknown as Constructor<ISYNode<F, any, any, any>>;
		if (nodeClass.name !== "ISYNode") {
			return new nodeClass(isy, nodeInfo);
		} else {
			throw new Error(`No class found for ${nodeInfo.family}.${nodeInfo.nodeDefId}`);
		}
	}
}
export type FamilyNodeClassRegistry<T extends Family> = {[x:string]:NodeFactory.NodeClass<T>};


type NodeClassRegistry = { [x in Extract<keyof typeof Family,string>]?: FamilyNodeClassRegistry<typeof Family[x]>};