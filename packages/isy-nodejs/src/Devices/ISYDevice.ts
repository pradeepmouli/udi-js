import type { SupportedBehaviors } from '@matter/node';
import { ClusterBehavior } from '@project-chip/matter.js/behavior/cluster';
import type { Endpoint, EndpointType, MutableEndpoint } from '@project-chip/matter.js/endpoint';

import 'winston';

// export const ISYBinaryStateDevice = <K extends Family,D extends DriverSignatures, T extends Constructor<ISYDeviceNode<K,Driver.ToSignatures<'ST'>,any,any>>>(Base: T) => {
// 	return class extends Base implements ISYBinaryStateDevice{
// 		get state(): Promise<boolean> {
// 			return Promise.resolve(this.drivers.ST.value > 0);
// 			//return this.readProperty('ST').then(p => p.value  > 0);
// 		}

// 		override convertTo(value: any, uom: UnitOfMeasure, propertyName: StringKeys<D> = null) {
// 			if(uom === UnitOfMeasure.Boolean)
// 			{
// 				return value > 0 ? true : false;
// 			}
// 			else super.convertTo(value, uom);
// 		}

// 		public override convertFrom(value: any, uom: number, propertyName: D = null) {
// 			if(uom === UnitOfMeasure.Boolean)
// 			{
// 				if(value)
// 				{
// 					return States.On;
// 				}
// 				else
// 				{
// 					return States.Off;
// 				}
// 			}
// 			else super.convertFrom(value, uom);

// 		}
// 	};
// };

export interface ISYBinaryStateDevice {
	get state(): Promise<boolean>;
}

export interface ISYLevelDevice {
	get level(): number;
}

// export const ISYUpdateableBinaryStateDevice = <K extends Family, T extends Constructor<ISYDeviceNode<K,any,any,string>>>(
// 	Base: T
// ) => {
// 	return class extends Base implements ISYDevice<K,Driver.ToSignatures<'ST'>, any & {'DON': (...args) => boolean, 'DOF': (...args) => boolean}> {

// 		get state(): Promise<boolean> {
// 			return Promise.resolve(this.drivers > 0);
// 			//return this.readProperty('ST').then(p => p.value  > 0);
// 		}

// 		set state(value: boolean) {
// 			this.updateState(value)
// 		}

// 		public async On(): Promise<any> {
// 			return this.updateState(true);
// 		}

// 		public async Off(): Promise<any> {
// 			return this.updateState(false);
// 		}

// 		public async updateState(state: boolean): Promise<any> {
// 			if (this.local.ST > 0 !== state || this.pending.ST > 0 !== state) {
// 				this.pending.ST = state ? States.On : States.Off;

// 				return this.sendCommand(state ? 'DON' : 'DOF').then((p) => {
// 					//this.local.ST = this.pending.ST;
// 					this.pending.ST = null;
// 				});
// 			}
// 			return Promise.resolve();
// 		}
// 	};
// };

export interface MapsToEndpointType<T extends EndpointType> {
	initialize(endpoint: Endpoint<T>): void;
}

type BehaviorList<T extends ClusterBehavior> = SupportedBehaviors & T;

export interface MapsToEndpoint<T extends ClusterBehavior> {
	//@ts-ignore
	initialize<K extends MutableEndpoint.With<EndpointType.Empty, BehaviorList<T>>>(endpoint: Endpoint<K>): void;
}
