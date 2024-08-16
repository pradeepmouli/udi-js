import { ISY } from '../../ISY.js';
import { NodeInfo } from '../../Model/NodeInfo.js';
import 'winston';
declare const InsteonSmokeSensorDevice_base: any;
export declare class InsteonSmokeSensorDevice extends InsteonSmokeSensorDevice_base {
    constructor(isy: ISY, deviceNode: NodeInfo);
    get smokeDetected(): any;
}
export {};
//# sourceMappingURL=InsteonSmokeSensorDevice.d.ts.map