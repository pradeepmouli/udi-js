import 'winston';
declare const InsteonLockDevice_base: any;
export declare class InsteonLockDevice extends InsteonLockDevice_base {
    sendLockCommand(lockState: any, resultHandler: any): void;
    get isLocked(): any;
    updateIsLocked(isLocked: boolean): Promise<any>;
    sendNonSecureLockCommand(lockState: any): Promise<any>;
    sendSecureLockCommand(lockState: any): Promise<any>;
}
export {};
//# sourceMappingURL=InsteonLockDevice.d.ts.map