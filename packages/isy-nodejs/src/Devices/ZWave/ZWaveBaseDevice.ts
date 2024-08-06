import { Family, Insteon } from '../../Definitions/Global/Families.js';
import { ISY } from '../../ISY.js';
import { byteToDegree, byteToPct, pctToByte } from '../../Utils.js';
import { NodeInfo } from '../../Model/NodeInfo.js';
import { ISYDeviceNode } from '../../ISYNode.js';
import 'winston';
import type { Driver } from '../../Definitions/Global/Drivers.js';

// import { InsteonNLS } from './insteonfam'
export class ZWaveBaseDevice<D extends Driver.Literal = 'ST', C extends string = 'QUERY'> extends ISYDeviceNode<Family.ZWave,D,C> {

	public async getNodeDef()
	{
		return this.isy.sendRequest(`zmatter/zwave/node/${this.address}/def/get?full=true`)
	}

	constructor(isy: ISY, deviceNode: NodeInfo) {

		super(isy, deviceNode);
		this.family = Family.ZWave;

		//// this.productName = InsteonNLS.getDeviceDescription(String.fromCharCode(category,device,version));

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
	public async sendBeep(level: number = 100): Promise<any> {
		return this.sendCommand('BEEP');
	}
}
