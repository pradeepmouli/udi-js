import type { NodeInfo } from '../../Model/NodeInfo.js';
import { ISY } from '../../ISY.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';
export declare class InsteonLeakSensorDevice extends InsteonBaseDevice {
    constructor(isy: ISY, deviceNode: NodeInfo);
    get isDry(): import("../../Definitions/index.js").Driver<"ST", import("../../Definitions/index.js").UnitOfMeasure, any, import("../../Definitions/index.js").UnitOfMeasure, string, string, string>;
}
//# sourceMappingURL=InsteonLeakSensorDevice.d.ts.map