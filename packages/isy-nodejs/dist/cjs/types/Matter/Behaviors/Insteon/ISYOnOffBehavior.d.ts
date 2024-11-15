import type { MaybePromise } from '@project-chip/matter.js/util';
import { InsteonRelayDevice } from '../../../Devices/Insteon/InsteonRelayDevice.js';
import { type PropertyChange } from '../ISYClusterBehavior.js';
declare const ISYOnOffBehavior_base: any;
export declare class ISYOnOffBehavior extends ISYOnOffBehavior_base {
    initialize(_options?: {}): Promise<void>;
    on: () => Promise<void>;
    off(): Promise<void>;
    handlePropertyChange({ driver, newValue, oldValue, formattedValue }: PropertyChange<InsteonRelayDevice>): Promise<any>;
}
declare const ISYDimmableBehavior_base: any;
export declare class ISYDimmableBehavior extends ISYDimmableBehavior_base {
    initialize(_options?: {}): Promise<void>;
    setLevel(level: number): MaybePromise<void>;
}
export {};
//# sourceMappingURL=ISYOnOffBehavior.d.ts.map