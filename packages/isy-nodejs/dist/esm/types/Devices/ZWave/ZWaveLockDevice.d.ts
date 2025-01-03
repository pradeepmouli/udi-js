import { type Driver } from '../../Definitions/index.js';
import { ISY } from '../../ISY.js';
import 'winston';
import { ZWaveBase } from './ZWaveBase.js';
export declare class ZwaveLockDevice extends ZWaveBase<Driver.Signatures<'ST'>, any, any> {
    constructor(isy: ISY, deviceNode: any);
    sendLockCommand(lockState: any, resultHandler: any): void;
    get isLocked(): boolean;
    updateIsLocked(isLocked: boolean): Promise<void>;
    sendNonSecureLockCommand(lockState: any): Promise<any>;
    sendSecureLockCommand(lockState: any): Promise<any>;
}
//# sourceMappingURL=ZWaveLockDevice.d.ts.map