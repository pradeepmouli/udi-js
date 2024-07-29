import type { NodeInfo } from '../../Definitions/NodeInfo.js';
import { ISY } from '../../ISY.js';
import { InsteonRelayDevice } from './InsteonRelayDevice.js';
import 'winston';

export class InsteonOnOffOutletDevice extends InsteonRelayDevice {

	public outlet1: InsteonRelayDevice;
	public outlet2: InsteonRelayDevice;

	constructor(isy: ISY, deviceNode: NodeInfo) {
		super(isy, deviceNode);
		this.outlet1 = new InsteonRelayDevice(isy, deviceNode);
		this.outlet1.on('PropertyChanged',(p,v,f) => this.handlePropertyChange("outlet1."+ p, v, f));
		super.addChild(this.outlet1);

	}
	public override addChild(childDevice) {
		super.addChild(childDevice);
		this.outlet2 = childDevice as InsteonRelayDevice;
		this.outlet2.on('PropertyChanged', (p, v, f) => this.handlePropertyChange("outlet2." + p, v, f));
		// if(childDevice)
	}
}
