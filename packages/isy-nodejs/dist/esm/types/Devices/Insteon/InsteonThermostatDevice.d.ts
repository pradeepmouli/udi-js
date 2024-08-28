import { ISY } from '../../ISY.js';
import { NodeInfo } from '../../Model/NodeInfo.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import { Driver } from '../../Definitions/Global/Drivers.js';
import 'winston';
export declare class InsteonThermostatDevice extends InsteonBaseDevice<Driver.Signatures<'CLISPH' | 'CLISPC' | 'CLIMD' | 'CLIHUM' | 'CLIFS' | 'CLIFSH' | 'CLIFC' | 'CLITEMP' | 'CLISMD' | 'CLISFAN' | 'CLISMD' | 'CLISFAN' | 'CLISMD' | 'CLISFAN' | 'CLISMD' | 'CLISFAN'>> {
    constructor(isy: ISY, deviceNode: NodeInfo);
    get coolSetPoint(): never;
    get heatSetPoint(): never;
    get mode(): never;
    get operatingMode(): never;
    get fanMode(): never;
    get humidity(): never;
}
//# sourceMappingURL=InsteonThermostatDevice.d.ts.map