import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';
export declare class InsteonLockDevice extends InsteonBaseDevice {
    sendLockCommand(lockState: any, resultHandler: any): void;
    get isLocked(): boolean;
    updateIsLocked(isLocked: boolean): Promise<void>;
    sendNonSecureLockCommand(lockState: any): Promise<any>;
    sendSecureLockCommand(lockState: any): Promise<any>;
}
//# sourceMappingURL=InsteonLockDevice.d.ts.map