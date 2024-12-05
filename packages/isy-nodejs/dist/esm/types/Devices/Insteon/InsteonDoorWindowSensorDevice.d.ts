import type { NodeInfo } from '../../Model/NodeInfo.js';
import type { ISY } from '../../ISY.js';
import 'winston';
import { BinaryAlarm } from './Generated/BinaryAlarm.js';
import { CompositeDevice } from '../CompositeDevice.js';
import type { Family } from '../../Definitions/index.js';
declare const DoorWindowSensorDevice_base: import("type-fest").Constructor<CompositeDevice<Family, {
    [x: string]: import("../ISYDeviceNode.js").ISYDeviceNode<any, any, any, any>;
}, import("../ISYDeviceNode.js").ISYDeviceNode<any, any, any, any>>>;
export declare class DoorWindowSensorDevice extends DoorWindowSensorDevice_base {
    constructor(isy: ISY, ...node: NodeInfo[]);
}
export declare namespace DoorWindowSensor {
    class Device extends DoorWindowSensorDevice {
    }
    const ContactSensor: typeof BinaryAlarm;
    const Heartbeat: typeof BinaryAlarm;
    const LowBattery: typeof BinaryAlarm;
}
export {};
//# sourceMappingURL=InsteonDoorWindowSensorDevice.d.ts.map