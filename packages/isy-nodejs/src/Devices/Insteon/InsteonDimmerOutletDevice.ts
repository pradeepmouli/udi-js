import type { NodeInfo } from '../../Model/NodeInfo.js';
import type { ISY } from '../../ISY.js';
import { DimmerLampNode } from './Generated/DimmerLamp.js';

export class InsteonDimmerOutletDevice extends DimmerLampNode {
	constructor (isy: ISY, deviceNode: NodeInfo) {
		super(isy, deviceNode);
	}
}
