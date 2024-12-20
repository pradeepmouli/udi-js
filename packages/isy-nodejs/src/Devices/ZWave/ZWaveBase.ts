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
export class ZWaveBase<D extends ISYNode.DriverSignatures, C extends ISYNode.CommandSignatures, E extends ISYNode.EventSignatures = {}> extends DynamicNode<Family.ZWave, D, C, E> {
	static override family: Family.ZWave = Family.ZWave;

	public async getNodeDef(nodeDefId: string): Promise<NodeDef> {
		return (await this.isy.sendRequest<{nodeDef: NodeDef}>(`zmatter/zwave/node/${this.address}/def/get`,{trailingSlash: false})).nodeDef;
	}

	public override convertFrom(value: any, uom: number): any {
		switch (uom) {
			case 101:
				return byteToDegree(value);
			case 100:
				return byteToPct(value);
			case 17:
				return value / 10;
			default:
				return super.convertFrom(value, uom);
		}
	}
	public override convertTo(value: any, uom: number): any {
		const nuom = super.convertTo(value, uom);
		switch (uom) {
			case 101:
				return nuom * 2;
			case 100:
				return pctToByte(nuom);
			case 17:
				return Math.round(value * 10);
			default:
				return nuom;
		}
	}
}
