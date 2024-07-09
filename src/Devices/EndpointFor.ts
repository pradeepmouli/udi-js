import { Endpoint } from '@project-chip/matter.js/endpoint';
import { SupportedBehaviors, type Behaviors } from '@project-chip/matter.js/endpoint/properties';
import { Behavior } from '@project-chip/matter.js/behavior';
import { MutableEndpoint,EndpointType} from '@project-chip/matter.js/endpoint/type';
import { EndpointOptions, OnOffBaseDevice } from '@project-chip/matter.js/device';
import type { ClusterBehavior, ClusterInterface } from '@project-chip/matter.js/behavior/cluster';
import { BasicInformation, BasicInformationCluster, type Cluster, type ClusterType } from '@project-chip/matter.js/cluster';
import type { ClientMonitoringBehavior } from '@project-chip/matter.js/behaviors/client-monitoring';
import type { Constructor } from './Constructor.js';
import type { ISYDeviceNode, ISYNode } from '../ISYNode.js';
import type { Session } from '@project-chip/matter.js/session';
import type { StateType } from '@project-chip/matter.js/behavior/state';
import type { ClusterDatasource, MutableCluster } from '@project-chip/matter.js/cluster';

import { addValueWithOverflow, type Identity, type MaybePromise } from '@project-chip/matter.js/util';
import { ISY, InsteonRelayDevice, type ISYDevice } from '../ISY.js';
import { BasicInformationBehavior, BasicInformationServer } from '@project-chip/matter.js/behaviors/basic-information';
import { IdentifyBehavior } from '@project-chip/matter.js/behaviors/identify';
import { IndexBehavior } from '@project-chip/matter.js/behavior/system/index';
import { OnOffLightDevice, OnOffLightRequirements } from '@project-chip/matter.js/devices/OnOffLightDevice';
import { OnOffBehavior, OnOffServer } from '@project-chip/matter.js/behaviors/on-off';
import type { Insteon } from '../Definitions/Families.js';
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

export type EndpointFor<K extends Behavior.Type, K1 extends Behavior.Type = K, K2 extends Behavior.Type = K, K3 extends Behavior.Type = K> = { events: SupportedBehaviors.EventsOf<SupportedBehaviors.MapOf<[K, K1, K2, K3]>>} & MutableEndpoint.With<EndpointType.Empty, SupportedBehaviors.MapOf<[K, K1, K2, K3]>>

/*set: (values: SupportedBehaviors.StatePatchOf<SupportedBehaviors.MapOf<[K, K1, K2]>>) => void; }*/
export type BehaviorsOf <K extends ClusterType.Of<ClusterType.Options<{}>>, K1 extends ClusterType = K, K2 extends ClusterType = K, K3 extends ClusterType = K> = [ClusterBehavior.Type<K>,ClusterBehavior.Type<K1>,ClusterBehavior.Type<K2>,ClusterBehavior.Type<K3>]

export type SupportedBehaviorsOf <K extends ClusterType.Of<ClusterType.Options<{}>>, K1 extends ClusterType = K, K2 extends ClusterType = K, K3 extends ClusterType = K> =
SupportedBehaviors.MapOf<BehaviorsOf<K, K1,K2,K3>>

export type EndpointForCluster<K extends ClusterType.Of<ClusterType.Options<{}>>, K1 extends ClusterType = K, K2 extends ClusterType = K, K3 extends ClusterType = K> = { events: SupportedBehaviors.EventsOf<SupportedBehaviorsOf<K,K1,K2,K3>>; set: (values: SupportedBehaviors.StatePatchOf<SupportedBehaviorsOf<K, K1, K2,K3>>) => void; }

export const MatterEndpoint= <P extends EndpointType & MutableEndpoint, T extends Constructor<ISYDeviceNode<any>>>(base: T, endpointType: P) =>
{


	return class extends base
	{

		endpointType: P = endpointType;



		createEndpoint<K extends SupportedBehaviors>() : Endpoint {

			var p = this.endpointType.with(BridgedDeviceBasicInformationServer);

		 	const id = this.address.replaceAll(' ', '_').replaceAll('.', ' ');

			return new Endpoint(p,{id: id, address: this.address, bridgedDeviceBasicInformation: {

				nodeLabel: this.displayName.rightWithToken(32,' '),
                productName: this.productName.rightWithToken(32,' '),
                productLabel: this.model.leftWithToken(64,' '),
                serialNumber: id,
                reachable: this.enabled,
            }});



		}



}
}

export const ISYClusterBehavior = <T extends Constructor<ClusterBehavior>,P extends ISYDeviceNode<any,string,string>>(base: T, p: Identity<P>) =>
{


	return class extends base implements DeviceBehavior<P>
	{

    device: P;

    override initialize(_options?: {}): MaybePromise {
        super.initialize(_options);
        var address = this.agent.endpoint.stateOf(BridgedDeviceBasicInformationServer).uniqueId;
        this.device = ISY.instance.getDevice(address);
        if(this.device)
        {
          this.device.on("PropertyChanged", (propertyName, newValue, _oldValue, formattedValue) => this.handlePropertyChange(propertyName, newValue, _oldValue, formattedValue));
        }
    }


    handlePropertyChange(propertyName: string, value: any, newValue: any, formattedValue: string) {




    }
  } as T & Constructor<DeviceBehavior<P>>;
};
//@ts-ignore

// <reference path="MatterDevice.js" />
// @ts-ignore

interface DeviceBehavior<P>
{
  device: P,
  handlePropertyChange(propertyName: string, value: any, newValue: any, formattedValue: string): void;
}

const IRD = InsteonRelayDevice;

export class ISYOnOffBehavior extends ISYClusterBehavior(OnOffLightRequirements.OnOffServer,InsteonRelayDevice.prototype)
// @ts-ignore
{





    override async on() {

      await super.on();

      return super.device.updateIsOn(true);
    }

    override async off() {
      await super.off();
      return this.device.updateIsOn(false);
    }

    override async toggle() {
      return await this.device.updateIsOn(!this.device.isOn);
    }

    override handlePropertyChange(propertyName: string, value: any, newValue: any, formattedValue: string): void {
        this.state.onOff = newValue > 0;

        this.events.onOff$Changed.emit(newValue, value,this.context)

    }


}

//@ts-ignore
   const BISY = BridgedDeviceBasicInformationBehavior.alter({attributes: {address: {optional: false}}});


  export class BridgedISYNodeInformationServer extends BISY
  {

    override initialize(): MaybePromise<void> {



        return super.initialize();


    }
  }