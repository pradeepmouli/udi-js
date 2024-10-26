import type { NodeInfo } from '../../Model/NodeInfo.js';
import { ISY } from '../../ISY.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';
export declare class InsteonLeakSensorDevice extends InsteonBaseDevice {
    constructor(isy: ISY, deviceNode: NodeInfo);
    get isDry(): import("../../Definitions/index.js").Driver<"ST", import("../../Definitions/index.js").UnitOfMeasure.Percent, number, import("../../Definitions/index.js").UnitOfMeasure.Percent, "status", "Status", string>;
}
//# sourceMappingURL=InsteonLeakSensorDevice.d.ts.map