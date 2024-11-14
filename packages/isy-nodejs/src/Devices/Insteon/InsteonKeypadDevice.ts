import 'winston';
import { ISY } from '../../ISY.js';
import type { NodeInfo } from '../../Model/NodeInfo.js';
import { InsteonRelayDevice } from './InsteonRelayDevice.js';
import { KeypadButton } from './KeypadButton.js';

export class InsteonKeypadButtonDevice extends KeypadButton.Node {
	constructor(isy: ISY, deviceNode: NodeInfo) {
		super(isy, deviceNode);
	}
}
