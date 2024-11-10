import 'winston';
import { Converter } from '../../Converters.js';
import type { Command } from '../../Definitions/Global/Commands.js';
import { Driver, DriverType } from '../../Definitions/Global/Drivers.js';
import { Family, Insteon } from '../../Definitions/Global/Families.js';
import { UnitOfMeasure as UOM, UnitOfMeasure } from '../../Definitions/Global/UOM.js';
import { ISY } from '../../ISY.js';
import { ISYNode } from '../../ISYNode.js';
import { NodeInfo } from '../../Model/NodeInfo.js';
import { byteToDegree, byteToPct, pctToByte, type StringKeys } from '../../Utils.js';
import { ISYDeviceNode } from '../ISYDeviceNode.js';

import type { Merge } from '@project-chip/matter.js/util';
import type { DriverState } from '../../Model/DriverState.js';

// import { InsteonNLS } from './insteonfam.js'
export class InsteonBaseDevice<D extends ISYNode.DriverSignatures = {}, C extends ISYNode.CommandSignatures = {}> extends ISYDeviceNode<
	Family.Insteon,
	Merge<{ ST: { name: 'status'; label: 'Status'; value: number; uom: UnitOfMeasure.Percent } }, D>,
	C
> {
	// #region Constructors (1)

	constructor(isy: ISY, deviceNode: NodeInfo) {
		super(isy, deviceNode);
		this.family = Family.Insteon;
		(this.drivers as any).ERR = Driver.create('ERR', this as any, deviceNode.property as DriverState, { uom: UnitOfMeasure.Index, label: 'Responding', name: 'responding' });
		//// this.productName = InsteonNLS.getDeviceDescription(String.fromCharCode(category,device,version));
		//his.childDevices = {};
	}

	// #endregion Constructors (1)

	// #region Public Methods (3)

	public override convertFrom(value: any, uom: UnitOfMeasure, driver: keyof D = null): any {
		switch (uom) {
			case UOM.DegreeX2:
				return byteToDegree(value);
			case UOM.LevelFrom0To255:
				return Converter.Standard.LevelFrom0To255.Percent.to(value);
			case UOM.Fahrenheit:
				return value / 10;
			default:
				return super.convertFrom(value, uom);
		}
	}

	public override convertTo(value: any, uom: UnitOfMeasure, propertyName: keyof D = null): any {
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
		// this.drivers(level);
	}

	// #endregion Public Methods (3)
}
