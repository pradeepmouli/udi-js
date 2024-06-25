import { Family, Insteon } from '../../Families';
import { ISY } from '../../ISY.js';
import { UnitOfMeasure as UOM, UnitOfMeasure } from '../../UOM';
import { byteToDegree, byteToPct, pctToByte } from '../../Utils';
import { ISYDevice, NodeInfo } from '../ISYDevice';
import 'winston';

// import { InsteonNLS } from './insteonfam'
export class InsteonBaseDevice extends ISYDevice<Family.Insteon> {
	constructor(isy: ISY, deviceNode: NodeInfo) {

		super(isy, deviceNode);
		this.family = Family.Insteon;

		//// this.productName = InsteonNLS.getDeviceDescription(String.fromCharCode(category,device,version));
		//his.childDevices = {};
	}



	public override convertFrom(value: any, uom: UnitOfMeasure,): any {
		switch (uom) {
			case UOM.DegreeX2:
				return byteToDegree(value);
			case UOM.LevelFrom0To255:
				return byteToPct(value);
			case UOM.Fahrenheit:
				return value / 10;
			default:
				return super.convertFrom(value, uom);
		}
	}
	public override convertTo(value: any, uom: UnitOfMeasure): any {
		const nuom = super.convertTo(value, uom);
		switch (uom) {
			case UOM.DegreeX2:
				return nuom * 2;
			case UOM.LevelFrom0To255:
				return pctToByte(nuom);
			case UOM.Fahrenheit:
				return Math.round(value * 10);
			default:
				return nuom;
		}
	}
	public async sendBeep(level: number = 100): Promise<any> {
		return this.sendCommand('BEEP');
	}
}
