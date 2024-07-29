
import { Family } from '../Definitions/Global/Families.js';
import { NodeInfo } from '../Definitions/NodeInfo.js';
import type { ISYDevice } from '../ISYNode.js';
import type { Constructor } from './Constructor.js';
import { InsteonDeviceFactory } from './Insteon/InsteonDeviceFactory.js';


export class DeviceFactory {

	public static getDeviceDetails(node: NodeInfo): { name: string; modelNumber?: string; version?: string; class?: Constructor<ISYDevice<Family>>; unsupported?: true } {


		if ((node.family ?? Family.Insteon) == Family.Insteon) {

			return InsteonDeviceFactory.getInsteonDeviceDetails(node);

		} else { return {name: 'Unsupported Device', class: null, unsupported: true} }
	}


}
