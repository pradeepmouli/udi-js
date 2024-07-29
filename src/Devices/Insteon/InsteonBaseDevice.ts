import { Family, Insteon } from '../../Definitions/Global/Families.js';
import { ISY } from '../../ISY.js';
import { UnitOfMeasure as UOM, UnitOfMeasure } from '../../Definitions/Global/UOM.js'
import { byteToDegree, byteToPct, pctToByte } from '../../Utils.js';
import { NodeInfo } from '../../Definitions/NodeInfo.js';
import { ISYDeviceNode } from '../../ISYNode.js';
import 'winston';
import type { Drivers } from '../../Definitions/Global/Drivers.js';

// import { InsteonNLS } from './insteonfam.js'
export class InsteonBaseDevice<D extends Drivers = Drivers,C extends string = string> extends ISYDeviceNode<Family.Insteon,D,C> {
	constructor(isy: ISY, deviceNode: NodeInfo) {

		super(isy, deviceNode);
		this.family = Family.Insteon;

		//// this.productName = InsteonNLS.getDeviceDescription(String.fromCharCode(category,device,version));
		//his.childDevices = {};
	}



	public override convertFrom(value: any, uom: UnitOfMeasure,propertyName: D = null): any {
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
	public override convertTo(value: any, uom: UnitOfMeasure,propertyName: Drivers = null): any {
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
