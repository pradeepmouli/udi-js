import 'winston';
import { ISY } from '../../ISY.js';
import type { NodeInfo } from '../../Model/NodeInfo.js';
import { RelayLamp } from './Generated/RelayLamp.js';
import { InsteonRelayDevice } from './InsteonRelayDevice.js';
import { CompositeDevice, CompositeOf } from '../CompositeDevice.js';
import type { ISYDevice } from '../../ISYDevice.js';

export class OnOffOutlet extends CompositeDevice.of({ top: RelayLamp, bottom: RelayLamp }, {top: 1, bottom: 2}) {
	constructor(isy: ISY, deviceNode: NodeInfo) {
		super(isy, deviceNode);
	}
}

export namespace OnOffOutlet {
		export function is(node: ISYDevice<any, any, any, any>): node is OnOffOutlet {
		return node instanceof OnOffOutlet;
	}
	export function create(isy: ISY, node: NodeInfo) {
		return new OnOffOutlet(isy, node);
	}

	export const Device = OnOffOutlet;

	export const Class = OnOffOutlet;

}
