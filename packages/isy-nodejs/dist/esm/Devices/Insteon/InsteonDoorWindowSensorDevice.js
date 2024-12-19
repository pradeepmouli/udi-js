import 'winston';
import { BinaryAlarm } from './Generated/BinaryAlarm.js';
import { CompositeDevice } from '../CompositeDevice.js';
const nodes = {
    contactSensor: BinaryAlarm.Node,
    heartbeat: BinaryAlarm.Node,
    lowBattery: BinaryAlarm.Node
};
//@ts-ignore
export class DoorWindowSensorDevice extends CompositeDevice.of({ contactSensor: BinaryAlarm, heartbeat: BinaryAlarm, lowBattery: BinaryAlarm }, { contactSensor: 1, heartbeat: 3, lowBattery: 4 }) {
    constructor(isy, ...node) {
        super(isy, ...node);
    }
}
export var DoorWindowSensor;
(function (DoorWindowSensor) {
    class Class extends DoorWindowSensorDevice {
    }
    DoorWindowSensor.Class = Class;
    DoorWindowSensor.ContactSensor = BinaryAlarm;
    DoorWindowSensor.Heartbeat = BinaryAlarm;
    DoorWindowSensor.LowBattery = BinaryAlarm;
})(DoorWindowSensor || (DoorWindowSensor = {}));
//# sourceMappingURL=InsteonDoorWindowSensorDevice.js.map