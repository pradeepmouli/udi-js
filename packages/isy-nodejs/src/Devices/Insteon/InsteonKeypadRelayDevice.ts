import type { NodeInfo } from '../../Definitions/NodeInfo.js';
import type { ISY } from '../../ISY.js';
import { KeypadDevice } from './InsteonDevice.js';
import { InsteonRelayDevice } from './InsteonRelayDevice.js';
import 'winston';
export class InsteonKeypadRelayDevice extends KeypadDevice(InsteonRelayDevice) {
	constructor (isy: ISY, deviceNode: NodeInfo) {
		super(isy, deviceNode);
	}
}
