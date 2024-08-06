import type { NodeInfo } from '../../Definitions/NodeInfo.js';
import type { ISY } from '../../ISY.js';
import { InsteonDimmableDevice } from './InsteonDimmableDevice.js';
import 'winston';
export class InsteonBallastDimmerDevice extends InsteonDimmableDevice {
    constructor (isy: ISY, deviceNode: NodeInfo){
        super(isy, deviceNode);
    }
}
