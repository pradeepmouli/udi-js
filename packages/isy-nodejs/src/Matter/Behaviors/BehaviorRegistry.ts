import { Behavior, type ClusterBehavior } from '@matter/node';
import type { LabelsOf, RelaxTypes } from '../../Utils.js';

import type { ISYNode } from '../../ISYNode.js';
import { NodeFactory } from '../../Devices/NodeFactory.js';
import { Registry } from '../../Registry.js';
import type { Constructor } from 'type-fest';
import type { ISYDeviceNode } from '../../Devices/ISYDeviceNode.js';
import { Family } from '../../Definitions/Global/Families.js';



export namespace BehaviorRegistry
{

	const registry = new Registry<string, Behavior.Type>();

	export function register<T extends Behavior.Type, F extends Family, P extends ISYNode<F>>(behavior: T & {cluster: {name: string}, nodeClass: Constructor<P>}, family?: keyof typeof Family): void
	{
		if(family)
		{
			registry.register(behavior.cluster.name.toLowerCase(), behavior, family);
			return;
		}
		registry.register(behavior.cluster.name.toLowerCase(), behavior, behavior.nodeClass as unknown as typeof ISYNode);
	}

	export function get<T extends ISYDeviceNode<any,any,any,any>>(node: T, cluster: string): Behavior.Type
	{
		return registry.get(node, cluster.toLowerCase());
	}

	/*const registry: {[x:string]: Behavior.Type} = {};
	const nodeLevelRegistry: {[x:string]: {[x:string]: Behavior.Type}} = {};



	register<T extends Behavior.Type>(behavior: T & {cluster: {name: string}, nodeClass: {nodeDefId}} ): void
	{
		registry[behavior.cluster.name.toLowerCase()] = behavior;
		nodeLevelRegistry[behavior.nodeClass.nodeDefId] = nodeLevelRegistry[behavior.
		nodeClass.nodeDefId] ?? {};
		nodeLevelRegistry[behavior.nodeClass.nodeDefId][behavior.cluster.name.toLowerCase()] = behavior;

	}

	 function get(nodeClass: typeof ISYNode, cluster: string): Behavior.Type
	{
		if(nodeLevelRegistry[nodeClass.nodeDefId])
			return nodeLevelRegistry[nodeClass.nodeDefId][cluster.toLowerCase()];
		else
			for (const nodeDefId in NodeFactory.getImplements(nodeClass))
			{
				if(nodeLevelRegistry[nodeDefId][cluster.toLowerCase()])
					return nodeLevelRegistry[nodeDefId][cluster.toLowerCase()];
			}
		return registry[cluster.toLowerCase()];

	}*/


}