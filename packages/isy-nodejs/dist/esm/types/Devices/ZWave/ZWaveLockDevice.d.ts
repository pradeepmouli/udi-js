import { ISY } from '../../ISY.js';
import 'winston';
declare const ZwaveLockDevice_base: any;
export declare class ZwaveLockDevice extends ZwaveLockDevice_base {
    constructor(isy: ISY, deviceNode: any);
    sendLockCommand(lockState: any, resultHandler: any): void;
    get isLocked(): any;
    updateIsLocked(isLocked: boolean): Promise<any>;
    sendNonSecureLockCommand(lockState: any): Promise<any>;
    sendSecureLockCommand(lockState: any): Promise<any>;
}
export {};
//# sourceMappingURL=ZWaveLockDevice.d.ts.map