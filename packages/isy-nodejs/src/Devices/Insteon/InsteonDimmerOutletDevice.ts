import type { NodeInfo } from '../../Model/NodeInfo.js';
import type { Family, ISY } from '../../ISY.js';
import { DimmerLamp } from './Generated/DimmerLamp.js';


export class InsteonDimmerOutletDevice extends DimmerLamp.Node{
	constructor (isy: ISY, deviceNode: NodeInfo<Family.Insteon>) {
		super(isy, deviceNode);
	}
}
