import { InsteonRelayDevice } from './InsteonRelayDevice.js';
import 'winston';
export class InsteonOnOffOutletDevice extends InsteonRelayDevice {
    outlet1;
    outlet2;
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
        this.outlet1 = new InsteonRelayDevice(isy, deviceNode);
        this.outlet1.on('PropertyChanged', (p, v, f) => this.handlePropertyChange("outlet1." + p, v, f));
        super.addChild(this.outlet1);
    }
    addChild(childDevice) {
        super.addChild(childDevice);
        this.outlet2 = childDevice;
        this.outlet2.on('PropertyChanged', (p, v, f) => this.handlePropertyChange("outlet2." + p, v, f));
        // if(childDevice)
    }
}
//# sourceMappingURL=InsteonOnOffOutletDevice.js.map