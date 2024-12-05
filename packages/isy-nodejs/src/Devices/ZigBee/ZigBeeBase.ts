import { Family, Insteon } from '../../Definitions/Global/Families.js';
import { ISY } from '../../ISY.js';
import { byteToDegree, byteToPct, pctToByte } from '../../Utils.js';
import { NodeInfo } from '../../Model/NodeInfo.js';
import { ISYDeviceNode } from '../ISYDeviceNode.js';
import { ISYNode } from '../../ISYNode.js';
import 'winston';
import type { Driver } from '../../Definitions/Global/Drivers.js';
import type { Merge } from '@matter/general';
import { DynamicNode } from '../DynamicNode.js';

// import { InsteonNLS } from './insteonfam'
export class ZigBeeBaseDevice<D extends ISYNode.DriverSignatures, C extends ISYNode.CommandSignatures, E extends ISYNode.EventSignatures = {}> extends DynamicNode<Family.ZWave,Merge<D,Driver.Signatures<'ST'>>,C,E > {

	public async getNodeDef()
	{
		return this.isy.sendRequest(`zmatter/zb/node/${this.address}/def/get?full=true`)
	}


	
}
