import { Family as FamilyEnum } from '../../Definitions/index.js';
import type { ISY } from '../../ISY.js';
import { ISYNode } from '../../ISYNode.js';
import type { NodeInfo } from '../../Model/NodeInfo.js';
import { NodeFactory } from '../NodeFactory.js';


export class Base<Drivers extends ISYNode.DriverSignatures, Commands extends ISYNode.CommandSignatures> extends ISYNode<FamilyEnum.ZWave, Drivers, Commands> {
	constructor(isy: ISY, nodeInfo: NodeInfo) {

		super(isy, nodeInfo);
		this.family = FamilyEnum.ZWave;
	}

	public async getNodeDef()
	{
		return this.isy.sendRequest(`zmatter/zwave/node/${this.address}/def/get?full=true`)
	}

		//// this.productName = InsteonNLS.getDeviceDescription(String.fromCharCode(category,device,version))
}



export async function create(...nodeInfo: NodeInfo<FamilyEnum.ZWave>[])
{
	let nodes = [] as Base<any, any>[];

	for(const node of nodeInfo)
	{
		nodes.push(await NodeFactory.create(node) as unknown as Base<any, any>);
	}
	return nodes;
}

//export * from './Generated/index.js';