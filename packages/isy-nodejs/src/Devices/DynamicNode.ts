import { Driver, type Family } from '../Definitions/index.js';
import type { ISY } from '../ISY.js';
import { ISYNode } from '../ISYNode.js';
import type { DriverState } from '../Model/DriverState.js';
import type { NodeDef } from '../Model/NodeDef.js';
import type { NodeInfo } from '../Model/NodeInfo.js';
import { ISYDeviceNode } from './ISYDeviceNode.js';

export abstract class DynamicNode<T extends Family.ZWave | Family.ZigBee,D extends ISYNode.DriverSignatures,C,E extends ISYNode.EventSignatures> extends ISYDeviceNode<T,D,C,E> {

	abstract getNodeDef(nodeDefId: string) : Promise<NodeDef>;

	constructor(isy: ISY, node: NodeInfo<T>) {
		super(isy, node);
		this.getNodeDef(node.nodeDefId).then((def) => {
			for(let st in this.drivers) {
				if(!((def?.sts.st) as Array<any>).find((s) => s.id === st)) {
					delete this.drivers[st];
				}
			}
			for(let cmd in this.commands) {
				if(!((def?.cmds.accepts.cmd) as Array<any>).find((c) => c.id === cmd)) {
					delete this.commands[cmd];
				}
			}
		});

	}

	/*override handleEvent(event: { control?: any; data?: any; node?: any; action?: any; fmtAct?: any; }): boolean {
		if(event.node !== this.address) {
			return false;
		}
		if()
		return false;
	}*/
}