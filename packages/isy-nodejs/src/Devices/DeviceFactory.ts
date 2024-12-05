
import { Family } from '../Definitions/Global/Families.js';
import { NodeInfo } from '../Model/NodeInfo.js';
import type { ISYDevice } from '../ISYDevice.js';
import type { Constructor } from './Constructor.js';
import { InsteonDeviceFactory } from './Insteon/InsteonDeviceFactory.js';
import type { StringKeys } from '../Utils.js';
import { ISYNode } from '../ISYNode.js';


export class DeviceFactory {

	public static getDeviceDetails(node: NodeInfo): { name: string; modelNumber?: string; version?: string; class?: Constructor<ISYDevice<Family,any,any,any>>; unsupported?: true } {


		if ((node.family ?? Family.Insteon) == Family.Insteon) {

			return InsteonDeviceFactory.getDeviceDetails(node) as any;

		} else { return {name: 'Unsupported Device', class: null, unsupported: true} }
	}


}
export namespace NodeFactory {

}
