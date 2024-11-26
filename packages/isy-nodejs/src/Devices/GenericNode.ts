import { Driver } from '../Definitions/index.js';
import type { ISY } from '../ISY.js';
import { ISYNode } from '../ISYNode.js';
import type { DriverState } from '../Model/DriverState.js';
import type { NodeInfo } from '../Model/NodeInfo.js';
import { ISYDeviceNode } from './ISYDeviceNode.js';

export class GenericNode extends ISYDeviceNode<any,any,any,any> {
	constructor(isy: ISY, node: NodeInfo) {
		super(isy, node);
		for(const prop in node.state) {
			this.drivers[prop] = Driver.create(prop as never, this,node.state[prop]);
		}

	}

	override applyStatus(prop: DriverState): void {
		if(!this.drivers[prop.id]) {
			this.drivers[prop.id] = Driver.create(prop.id as never, this,prop,{uom: prop.uom, label: prop.name  as string ?? prop.id as string, name: prop.name as string ?? prop.id as string});
		}
		super.applyStatus(prop);
	}

	/*override handleEvent(event: { control?: any; data?: any; node?: any; action?: any; fmtAct?: any; }): boolean {
		if(event.node !== this.address) {
			return false;
		}
		if()
		return false;
	}*/
}