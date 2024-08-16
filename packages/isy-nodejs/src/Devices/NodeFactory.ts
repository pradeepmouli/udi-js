import { Family, ISY } from '../ISY.js';
import type { ISYNode } from '../ISYNode.js';
import type { NodeDef } from '../Model/NodeDef.js';
import type { NodeInfo } from '../Model/NodeInfo.js';
import type { Constructor } from './Constructor.js';


export namespace NodeFactory {
	export const registry: NodeClassRegistry = {};

	export function isDynamic(node: NodeInfo) {
		return node.family in [Family.ZWave, Family.ZigBee];
	}

	export function isDynamicClass(node: NodeInfo): boolean {
		return node.family in [Family.ZWave, Family.ZigBee];
	}

	export function register<F extends keyof typeof Family>(nodeClass: typeof ISYNode<(typeof Family)[F], any, any, any>) {
		let s: FamilyNodeClassRegistry<(typeof Family)[F]>;

		s = registry[nodeClass.family] ?? (registry[nodeClass.family] = new Map());
		s.set(nodeClass.nodeDefId, nodeClass);
	}

	export function getForNodeDefId<F extends keyof typeof Family>(family: F, nodeDefId: string): Constructor<ISYNode<(typeof Family)[F], any, any, any>> {
		return registry[family]?.get(nodeDefId);
	}

	export function getForNLSId<F extends keyof typeof Family>(family: F, nodeDefId: string): Constructor<ISYNode<(typeof Family)[F], any, any, any>> {
		return registry[family]?.get(nodeDefId);
	}

	export async function get<F extends keyof typeof Family>(node: NodeInfo, isy: ISY = ISY.instance): Promise<Constructor<ISYNode<(typeof Family)[F], any, any, any>>> {
		if (!isDynamic(node))
			return getForNodeDefId(Family[node.family] as F, node.nodeDefId);

		else {

			let n = (await isy.sendRequest(
				`zmatter/${node.family == Family.ZWave ? "zwave" : "zb"}/node/${node.address}/def/get?full=true`
			)) as NodeDef;
			return getForNLSId(Family[node.family] as F, n.nls);


		}
	}

	export async function create(nodeInfo: NodeInfo, isy: ISY = ISY.instance): Promise<ISYNode<Family, any, any, any>> {
		const nodeClass = await get(nodeInfo);
		if (nodeClass) {
			return new nodeClass(isy, nodeInfo);
		} else {
			throw new Error(`No class found for ${nodeInfo.family}.${nodeInfo.nodeDefId}`);
		}
	}
}
export type FamilyNodeClassRegistry<T extends Family> = Map<string, Constructor<ISYNode<T,any,any,any>>>;

export type NodeClassRegistry = { [x in Extract<keyof typeof Family,string>]?: FamilyNodeClassRegistry<typeof Family[x]>};