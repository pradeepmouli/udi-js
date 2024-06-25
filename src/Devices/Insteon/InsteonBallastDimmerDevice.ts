import { InsteonDimmableDevice } from './InsteonDimmableDevice.js';
import 'winston';
export class InsteonBallastDimmerDevice extends InsteonDimmableDevice {
    constructor (isy: any, deviceNode: any) {
        super(isy, deviceNode);
    }
}
