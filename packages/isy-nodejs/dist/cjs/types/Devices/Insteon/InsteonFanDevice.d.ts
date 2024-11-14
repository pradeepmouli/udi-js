import { ISY } from '../../ISY.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import { InsteonDimmableDevice } from './InsteonDimmableDevice.js';
import 'winston';
import type { NodeInfo, StaticNodeInfo } from '../../Model/NodeInfo.js';
import { Command, Driver } from '../../Definitions/index.js';
export declare class InsteonFanMotorDevice extends InsteonBaseDevice<Driver.Signatures<'ST'>, Command.Signatures<'DON' | 'DOF'>> {
    constructor(isy: ISY, deviceNode: StaticNodeInfo);
    get isOn(): boolean;
    get fanSpeed(): any;
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