import type { NodeInfo } from '../../Model/NodeInfo.js';
import type { ISY } from '../../ISY.js';

import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';
import { BinaryAlarm } from './Generated/BinaryAlarm.js';
import { CompositeDevice } from '../CompositeDevice.js';
import { nodeDefId } from './KeypadButton.js';
import { OnLevelRelay } from '../../Definitions/Insteon/index.js';
import { NodeFactory } from '../NodeFactory.js';
import type { Family } from '../../Definitions/index.js';
import type { Identity } from '@matter/general';


const nodes = {
	contactSensor:  BinaryAlarm.Node,
	heartbeat:  BinaryAlarm.Node,
	lowBattery:  BinaryAlarm.Node
}
//@ts-ignore
export class DoorWindowSensorDevice extends CompositeDevice.of({contactSensor: BinaryAlarm, heartbeat: BinaryAlarm, lowBattery: BinaryAlarm}, {contactSensor: 1, heartbeat: 3, lowBattery: 4} )
{

	constructor (isy: ISY, ...node: NodeInfo[]) {
		super(isy, ...node);




	}

}

export namespace DoorWindowSensor {

	export class Class extends DoorWindowSensorDevice { }

	export const ContactSensor = BinaryAlarm;

	export const Heartbeat = BinaryAlarm;

	export const LowBattery = BinaryAlarm;

}
