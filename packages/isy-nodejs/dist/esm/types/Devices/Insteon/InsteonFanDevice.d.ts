import { Family } from '../../Definitions/Global/Families.js';
import { ISY } from '../../ISY.js';
import 'winston';
import type { NodeInfo, StaticNodeInfo } from '../../Model/NodeInfo.js';
import { CompositeDevice } from '../CompositeDevice.js';
import { DimmerLamp } from './Generated/DimmerLamp.js';
import { FanLincMotor } from './Generated/FanLincMotor.js';
export declare class InsteonFanMotorDevice extends FanLincMotor.Node {
    constructor(isy: ISY, deviceNode: StaticNodeInfo);
    get isOn(): boolean;
    get fanSpeed(): import("../../Definitions/Insteon/index.js").FanLevel;
    updateFanSpeed(level: number): Promise<any>;
    updateIsOn(isOn: boolean): Promise<void>;
}
declare const FanDevice_base: import("type-fest").Constructor<CompositeDevice<Family, {
    [x: string]: import("../ISYDeviceNode.js").ISYDeviceNode<any, any, any, any>;
}, import("../ISYDeviceNode.js").ISYDeviceNode<any, any, any, any>>>;
export declare class FanDevice extends FanDevice_base {
    constructor(isy: ISY, deviceNode: NodeInfo);
}
export declare namespace Fan {
    const Device: typeof FanDevice;
    const Motor: typeof FanLincMotor;
    const Light: typeof DimmerLamp;
}
export {};
//# sourceMappingURL=InsteonFanDevice.d.ts.map