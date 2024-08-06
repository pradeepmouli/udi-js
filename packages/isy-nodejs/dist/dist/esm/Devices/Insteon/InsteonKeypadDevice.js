import { InsteonRelayDevice } from './InsteonRelayDevice.js';
import 'winston';
export class InsteonKeypadButtonDevice extends InsteonRelayDevice {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
}
