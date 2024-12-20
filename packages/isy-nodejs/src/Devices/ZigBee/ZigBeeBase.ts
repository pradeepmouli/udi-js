import type { Merge } from '@matter/general';
import 'winston';
import type { Driver } from '../../Definitions/Global/Drivers.js';
import { Family, Insteon } from '../../Definitions/Global/Families.js';
import { ISY } from '../../ISY.js';
import { ISYNode } from '../../ISYNode.js';
import { NodeInfo } from '../../Model/NodeInfo.js';
import { byteToDegree, byteToPct, pctToByte } from '../../Utils.js';
import { DynamicNode } from '../DynamicNode.js';
import { ISYDeviceNode } from '../ISYDeviceNode.js';
import type { NodeDef } from '../../Model/NodeDef.js';

// import { InsteonNLS } from './insteonfam'
export class ZigBeeBase<D extends ISYNode.DriverSignatures, C extends ISYNode.CommandSignatures, E extends ISYNode.EventSignatures = {}> extends DynamicNode<Family.ZigBee, D, C, E> {
	static override family: Family.ZigBee = Family.ZigBee;
	public async getNodeDef(nodeDefId: string): Promise<NodeDef> {
		return (await this.isy.sendRequest(`zmatter/zb/node/${this.address}/def/get`,{trailingSlash: false})).nodeDef;
	}
}
