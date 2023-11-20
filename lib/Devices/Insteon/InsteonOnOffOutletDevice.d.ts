import { ISYDevice, Family } from '../../ISY';
import { ISY } from '../../ISY.1';
import { InsteonRelayDevice } from './InsteonRelayDevice';
export declare class InsteonOnOffOutletDevice extends InsteonRelayDevice {
    outlet1: InsteonRelayDevice;
    outlet2: InsteonRelayDevice;
    constructor(isy: ISY, deviceNode: any);
    addChild(childDevice: ISYDevice<Family.Insteon>): void;
}
