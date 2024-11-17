import { Endpoint } from '@project-chip/matter.js/endpoint';
import { SupportedBehaviors } from '@project-chip/matter.js/endpoint/properties';
import { Behavior } from '@project-chip/matter.js/behavior';
import { MutableEndpoint, EndpointType } from '@project-chip/matter.js/endpoint/type';
import type { ClusterBehavior } from '@project-chip/matter.js/behavior/cluster';
import { type ClusterType } from '@project-chip/matter.js/cluster';
import type { Constructor } from './Constructor.js';
import type { ISYDeviceNode } from '../Devices/ISYDeviceNode.js';

import { BridgedDeviceBasicInformationBehavior, BridgedDeviceBasicInformationServer } from '@project-chip/matter.js/behaviors/bridged-device-basic-information';


export type RelaxTypes<V> = V extends number
        ? number
        : V extends bigint
          ? bigint
          : V extends object
            ? V extends (...args: any[]) => any
                ? V
                : {
                      [K in keyof V]: RelaxTypes<V[K]>;
                  }
            : V;

export type RelaxedClusterType = RelaxTypes<ClusterType>
//@ts-ignore
export type EndpointFor<K extends Behavior.Type, K1 extends Behavior.Type = K, K2 extends Behavior.Type = K, K3 extends Behavior.Type = K> = { events: SupportedBehaviors.EventsOf<SupportedBehaviors.MapOf<[K, K1, K2, K3]>>} & MutableEndpoint.With<EndpointType.Empty, SupportedBehaviors.MapOf<[K, K1, K2, K3]>>

/*set: (values: SupportedBehaviors.StatePatchOf<SupportedBehaviors.MapOf<[K, K1, K2]>>) => void; }*/
export type BehaviorsOf <K extends ClusterType.Of<ClusterType.Options<{}>>, K1 extends ClusterType = K, K2 extends ClusterType = K, K3 extends ClusterType = K> = [ClusterBehavior.Type<K>,ClusterBehavior.Type<K1>,ClusterBehavior.Type<K2>,ClusterBehavior.Type<K3>]
//@ts-ignore
export type SupportedBehaviorsOf <K extends ClusterType.Of<ClusterType.Options<{}>>, K1 extends ClusterType = K, K2 extends ClusterType = K, K3 extends ClusterType = K> =
SupportedBehaviors.MapOf<BehaviorsOf<K, K1,K2,K3>>

export type EndpointForCluster<K extends ClusterType.Of<ClusterType.Options<{}>>, K1 extends ClusterType = K, K2 extends ClusterType = K, K3 extends ClusterType = K> = { events: SupportedBehaviors.EventsOf<SupportedBehaviorsOf<K,K1,K2,K3>>; set: (values: SupportedBehaviors.StatePatchOf<SupportedBehaviorsOf<K, K1, K2,K3>>) => void; }

export const MatterEndpoint= <P extends EndpointType & MutableEndpoint, T extends Constructor<ISYDeviceNode<any,any,any>>>(base: T, endpointType: P) =>
{


	return class extends base
	{

		endpointType: P = endpointType;



		createEndpoint<K extends SupportedBehaviors>() : Endpoint {

//@ts-ignore
			var p = this.endpointType.with(BridgedDeviceBasicInformationServer);

		 	const id = this.address.replaceAll(' ', '_').replaceAll('.', ' ');

			return new Endpoint(p,{id: id, address: this.address, bridgedDeviceBasicInformation: {

				nodeLabel: this.label.rightWithToken(32,' '),
                productName: this.productName.rightWithToken(32,' '),
                productLabel: this.model.leftWithToken(64,' '),
                serialNumber: id,
                reachable: this.enabled,
            }});



		}



}
}

 // @ts-ignore
   const BISY = BridgedDeviceBasicInformationBehavior.alter({attributes: {address: {optional: false}, ...BridgedDeviceBasicInformationServer.cluster.attributes}});


  export class BridgedISYNodeInformationServer extends BridgedDeviceBasicInformationServer
  {

    override async initialize(): Promise<void> {



        return super.initialize();



    }
  }

  export namespace BridgedISYNodeInformationServer {
    export class State extends BridgedDeviceBasicInformationServer.State {
        // Assume Device is online when it is added, but developers should set correctly if needed
        declare address: string;
    }
}
