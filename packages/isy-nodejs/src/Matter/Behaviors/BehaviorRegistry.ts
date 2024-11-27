import { ClusterBehavior, type Behavior } from '@matter/node';
import type { RelaxTypes } from '../../Utils.js';
import type { Constructor } from '../../Devices/Constructor.js';



export namespace BehaviorRegistry
{


	const registry: {[x:string]: Constructor<ClusterBehavior>} = {};

	type ClusterBehaviorType = RelaxTypes<Omit<typeof ClusterBehavior, "withInterface" | "unimplemented">>;

	export function register<T extends Behavior.Type>(behavior: {cluster: {name: string}} & Constructor<ClusterBehavior>): void
	{
		registry[behavior.cluster.name.toLowerCase()] = behavior;
	}

	export function get(cluster: string): Constructor<ClusterBehavior>
	{
		return registry[cluster.toLowerCase()];
	}


}