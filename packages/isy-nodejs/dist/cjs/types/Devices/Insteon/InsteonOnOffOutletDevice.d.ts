import type { NodeInfo } from '../../Model/NodeInfo.js';
import { ISY } from '../../ISY.js';
import { InsteonRelayDevice } from './InsteonRelayDevice.js';
import 'winston';
export declare class InsteonOnOffOutletDevice extends InsteonRelayDevice {
    outlet1: InsteonRelayDevice;
    outlet2: InsteonRelayDevice;
    constructor(isy: ISY, deviceNode: NodeInfo);
    addChild(childDevice: any): void;
}
//# sourceMappingURL=InsteonOnOffOutletDevice.d.ts.map