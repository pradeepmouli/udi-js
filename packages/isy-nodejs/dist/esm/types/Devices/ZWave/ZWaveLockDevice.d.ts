import { ISY } from '../../ISY.js';
import { ZWaveBaseDevice } from './ZWaveBaseDevice.js';
import 'winston';
export declare class ZwaveLockDevice extends ZWaveBaseDevice {
    constructor(isy: ISY, deviceNode: any);
    sendLockCommand(lockState: any, resultHandler: any): void;
    get isLocked(): boolean;
    updateIsLocked(isLocked: boolean): Promise<void>;
    sendNonSecureLockCommand(lockState: any): Promise<any>;
    sendSecureLockCommand(lockState: any): Promise<any>;
}
//# sourceMappingURL=ZWaveLockDevice.d.ts.map