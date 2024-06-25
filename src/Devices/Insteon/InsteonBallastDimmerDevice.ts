import { InsteonDimmableDevice } from './InsteonDimmableDevice';
import 'winston';
export class InsteonBallastDimmerDevice extends InsteonDimmableDevice {
    constructor (isy: any, deviceNode: any) {
        super(isy, deviceNode);
    }
}
