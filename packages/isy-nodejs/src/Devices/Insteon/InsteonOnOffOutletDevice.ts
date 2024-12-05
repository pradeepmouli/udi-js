import 'winston';
import { ISY } from '../../ISY.js';
import type { NodeInfo } from '../../Model/NodeInfo.js';
import { RelayLamp } from './Generated/RelayLamp.js';
import { InsteonRelayDevice } from './InsteonRelayDevice.js';
import { CompositeDevice, CompositeOf } from '../CompositeDevice.js';

export class OnOffOutlet extends CompositeDevice.of({ top: RelayLamp.Node, bottom: RelayLamp.Node }, {top: 1, bottom: 2}) {
	constructor(isy: ISY, deviceNode: NodeInfo) {
		super(isy, deviceNode);
	}
}
