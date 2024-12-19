import { Family } from '../../Definitions/Global/Families.js';
import { ISY } from '../../ISY.js';
import 'winston';
import type { NodeInfo } from '../../Model/NodeInfo.js';
import { CompositeDevice } from '../CompositeDevice.js';
import { DimmerLamp } from './Generated/DimmerLamp.js';
import { FanLincMotor } from './Generated/FanLincMotor.js';
declare const FanDevice_base: import("type-fest").Constructor<CompositeDevice<Family, {
    [x: string]: import("../../ISYNode.js").ISYNode.Factory<any>;
}, import("../../ISYNode.js").ISYNode.Factory<any>>>;
export declare class FanDevice extends FanDevice_base {
    constructor(isy: ISY, deviceNode: NodeInfo);
}
export declare namespace Fan {
    const Device: typeof FanDevice;
    const Class: typeof FanDevice;
    const Motor: typeof FanLincMotor;
    const Light: typeof DimmerLamp;
}
export {};
//# sourceMappingURL=InsteonFanDevice.d.ts.map