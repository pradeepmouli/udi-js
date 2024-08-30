import { Family, Insteon } from '../../Definitions/Global/Families.js';
import { ISY } from '../../ISY.js';
import { UnitOfMeasure as UOM, UnitOfMeasure } from '../../Definitions/Global/UOM.js'
import { byteToDegree, byteToPct, pctToByte, type StringKeys } from '../../Utils.js';
import { NodeInfo } from '../../Model/NodeInfo.js';
import { ISYDeviceNode } from '../ISYDeviceNode.js';
import { ISYNode } from '../../ISYNode.js';
import 'winston';
import type { Driver, DriverType } from '../../Definitions/Global/Drivers.js';
import { Converters } from '../../Converters.js';
import type { Command } from '../../Definitions/Global/Commands.js';

import type { Merge } from '@project-chip/matter.js/util';

// import { InsteonNLS } from './insteonfam.js'
export class InsteonBaseDevice<D extends ISYNode.DriverSignatures = {}, C extends ISYNode.CommandSignatures = {}> extends ISYDeviceNode<
  Family.Insteon,
  Merge<Driver.Signatures<"ST">,D>,
  C
> {
  constructor(isy: ISY, deviceNode: NodeInfo) {
    super(isy, deviceNode);
    this.family = Family.Insteon;

    //// this.productName = InsteonNLS.getDeviceDescription(String.fromCharCode(category,device,version));
    //his.childDevices = {};
  }




  public override convertFrom(value: any, uom: UnitOfMeasure, driver: keyof D = null): any {
    switch (uom) {
      case UOM.DegreeX2:
        return byteToDegree(value);
      case UOM.LevelFrom0To255:
        return Converters.Standard.LevelFrom0To255.Percent.to(value);
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
}
