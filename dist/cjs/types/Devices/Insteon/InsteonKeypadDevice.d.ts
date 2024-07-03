import { ISY } from '../../ISY.js';
import { InsteonRelayDevice } from './InsteonRelayDevice.js';
import 'winston';
export declare class InsteonKeypadButtonDevice extends InsteonRelayDevice {
    constructor(isy: ISY, deviceNode: any);
}
