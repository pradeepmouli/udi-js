import { Family } from '../Definitions/Families.js';
import { Commands, States } from '../ISYConstants.js';
import { EndpointType, MutableEndpoint } from '@project-chip/matter.js/endpoint/type';
import { Endpoint } from '@project-chip/matter.js/endpoint';
import { BridgedDeviceBasicInformationServer } from '@project-chip/matter.js/behaviors/bridged-device-basic-information';
import { SupportedBehaviors } from '@project-chip/matter.js/endpoint/properties';
import { ClusterBehavior } from '@project-chip/matter.js/behavior/cluster';
import 'winston'
import { ISYDeviceNode } from '../ISYNode.js';
import { Constructor } from './Constructor.js';
import type { BasicInformationBehavior } from '@project-chip/matter.js/behaviors/basic-information';
import type { BridgedDeviceBasicInformationCluster } from '@project-chip/matter.js/cluster';

export const ISYBinaryStateDevice = <K extends Family,D extends string, T extends Constructor<ISYDeviceNode<K,D|'ST'>>>(Base: T) => {
	return class extends Base {
		get state(): Promise<boolean> {
			return Promise.resolve(this.local['ST'] > 0);
			//return this.readProperty('ST').then(p => p.value  > 0);
		}
	};
};

export const ISYUpdateableBinaryStateDevice = <K extends Family,T extends Constructor<ISYDeviceNode<K>>>(
	Base: T
) => {
	return class extends Base {
		get state(): Promise<boolean> {
			return Promise.resolve(this.local['ST'] > 0);
			//return this.readProperty('ST').then(p => p.value  > 0);
		}


		public async updateState(state: boolean): Promise<any> {
			if (state !== await this.state || this.pending.ST > 0 !== await this.state) {
				this.pending.ST = state ? States.On : States.Off;
				return this.sendCommand(state ? Commands.On : Commands.Off).then((p) => {
					//this.local.ST = this.pending.ST;
					this.pending.ST = null;
				});
			}
			return Promise.resolve();
		}
	};
};


export interface MapsToEndpointType<T extends EndpointType>  {
	initialize(endpoint: Endpoint<T>): void;

}

type BehaviorList<T extends ClusterBehavior> = SupportedBehaviors & T;

export interface MapsToEndpoint<T extends ClusterBehavior>
{
	initialize<K extends MutableEndpoint.With<EndpointType.Empty,BehaviorList<T>>>(endpoint: Endpoint<K>): void;

}

export const ISYLevelDevice = <T extends Constructor<ISYDeviceNode<any>>>(base: T) =>
	class extends base {
		get level(): number {
			return this.local.ST;
		}
	};

// tslint:disable-next-line: variable-name

export const ISYUpdateableLevelDevice = <T extends Constructor<ISYDeviceNode<any>>>(base: T) =>
	class extends base {
		get level(): number {
			return this.local.ST;
		}

		public async updateLevel(level: number): Promise<any> {
			if (level != this.local.ST && level !== (this.pending.ST ?? this.local.ST)) {

				this.pending.ST = level;
				if (level > 0) {
					return this.sendCommand(
						Commands.On,
						this.convertTo(level, this.uom.ST)
					).then((p) => {
						//this.local.ST = this.pending.ST; *Wait to receive propertu update from subscription
						this.pending.ST = null;
					});
				} else {
					return this.sendCommand(Commands.Off).then((p) => {
						//this.local.ST = this.pending.ST; *Wait to receive propertu update from subscription
						this.pending.ST = null;
					});
				}
			}
			return Promise.resolve();
		}
	};
