
import { ISY } from '../ISY.js';
import  { ISYNode } from '../ISYNode.js';
import type { NodeDef } from '../Model/NodeDef.js';
import { isDynamic, type NodeInfo } from '../Model/NodeInfo.js';
import type { Constructor } from './Constructor.js';
import type { IdentityOf } from '../Utils.js';
import { Family } from '../Definitions/index.js';



export namespace NodeFactory {
	export const registry: NodeClassRegistry = {};




	export function register<F extends keyof typeof Family>(nodeClass: typeof ISYNode<(typeof Family)[F], any, any, any>, id: string = nodeClass.nodeDefId) {
		let s: FamilyNodeClassRegistry<(typeof Family)[F]>;

		s = registry[Family[nodeClass.family]] ?? (registry[nodeClass.family] = new Map());
		s.set(nodeClass.nodeDefId, nodeClass);
	}

	export function getForNodeDefId<F extends keyof typeof Family>(family: F, nodeDefId: string): Constructor<ISYNode<(typeof Family)[F], any, any, any>> {
		return registry[family]?.get(nodeDefId);
	}

	export function getForNLSId<F extends keyof typeof Family>(family: F, nodeDefId: string): Constructor<ISYNode<(typeof Family)[F], any, any, any>> {
		return registry[family].get(nodeDefId);
	}

	export async function get<F extends keyof typeof Family>(node: NodeInfo<typeof Family[F]>, isy: ISY = ISY.instance): Promise<Constructor<ISYNode<typeof Family[F], any, any, any>>> {
		if (!isDynamic(node))
		{
			return Promise.resolve(getForNodeDefId(Family[node.family] as F, node.nodeDefId));
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
export type FamilyNodeClassRegistry<T extends Family> = Map<string, Constructor<ISYNode<T,any,any,any>>>;

export type NodeClassRegistry = { [x in Extract<keyof typeof Family,string>]?: FamilyNodeClassRegistry<typeof Family[x]>};