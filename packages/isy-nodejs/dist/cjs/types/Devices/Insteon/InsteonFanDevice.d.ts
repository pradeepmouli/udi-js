import { ISY } from '../../ISY.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import { InsteonDimmableDevice } from './InsteonDimmableDevice.js';
import 'winston';
import type { NodeInfo } from '../../Model/NodeInfo.js';
export declare class InsteonFanMotorDevice extends InsteonBaseDevice {
    constructor(isy: ISY, deviceNode: NodeInfo);
    get isOn(): boolean;
    get fanSpeed(): number;
    updateFanSpeed(level: number): Promise<number>;
    updateIsOn(isOn: boolean): Promise<void>;
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
    updateFanSpeed(level: number): Promise<number>;
}
//# sourceMappingURL=InsteonFanDevice.d.ts.map