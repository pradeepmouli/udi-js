import type { NodeInfo } from '../../Model/NodeInfo.js';
import { ISY, type Family } from '../../ISY.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';
export declare class InsteonLeakSensorDevice extends InsteonBaseDevice {
    constructor(isy: ISY, deviceNode: NodeInfo<Family.Insteon>);
    get isDry(): import("../../ISY.js").Driver<"ST", import("../../ISY.js").UnitOfMeasure, any, import("../../ISY.js").UnitOfMeasure, any, "ST", "ST">;
}
//# sourceMappingURL=InsteonLeakSensorDevice.d.ts.map