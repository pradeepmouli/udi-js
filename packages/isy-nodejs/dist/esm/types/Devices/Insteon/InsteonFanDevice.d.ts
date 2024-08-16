import { ISY } from '../../ISY.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import { InsteonDimmableDevice } from './InsteonDimmableDevice.js';
import 'winston';
import type { NodeInfo } from '../../Model/NodeInfo.js';
declare const InsteonFanMotorDevice_base: any;
export declare class InsteonFanMotorDevice extends InsteonFanMotorDevice_base {
    constructor(isy: ISY, deviceNode: NodeInfo);
    get isOn(): any;
    get fanSpeed(): any;
    updateFanSpeed(level: number): Promise<any>;
    updateIsOn(isOn: boolean): Promise<any>;
}
export declare class InsteonFanDevice extends InsteonBaseDevice {
    light?: InsteonDimmableDevice;
    motor: InsteonFanMotorDevice;
    constructor(isy: ISY, deviceNode: NodeInfo);
    handleEvent(event: {
        control?: string;
        data?: any;
        node?: any;
    }): boolean;
    addChild(childDevice: any): void;
    updateFanSpeed(level: number): Promise<any>;
    updatFanIsOn(isOn: boolean): Promise<void>;
}
export {};
//# sourceMappingURL=InsteonFanDevice.d.ts.map