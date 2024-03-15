import { Family, Insteon } from '../../Families';
import { ISY } from '../../ISY';
import { UnitOfMeasure as UOM } from '../../UOM';
import { byteToDegree, byteToPct, pctToByte } from '../../Utils';
import { ISYDevice } from '../ISYDevice';

// import { InsteonNLS } from './insteonfam'
export class InsteonBaseDevice extends ISYDevice<Family.Insteon> {
	constructor(isy: ISY, deviceNode: { family: any; type?: string; enabled: any; deviceClass?: any; pnode?: any; property?: any; flag?: any; nodeDefId?: string; address?: string; name?: string; parent?: any; ELK_ID?: string; }) {

		super(isy, deviceNode);
		this.family = Family.Insteon;
		//// this.productName = InsteonNLS.getDeviceDescription(String.fromCharCode(category,device,version));
		//his.childDevices = {};
	}
	public override convertFrom(value: any, uom: UOM): any {
		switch (uom) {
			case UOM.DegreeX2:
				return byteToDegree(value);
			case UOM.LevelFrom0To255:
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
		return this.sendCommand(this, 'BEEP');
	}
}
