import type { Family } from '../Definitions/index.js';
import * as Insteon from './Insteon/index.js';
import { ZWaveBaseDevice } from './ZWave/ZWaveBaseDevice.js';
import * as ZWave from './ZWave/index.js';
export declare const Devices: {
    Insteon: typeof Insteon;
    ZWave: {
        Base: typeof ZWaveBaseDevice;
    };
    ZigBee: {};
};
export * as Insteon from './Insteon/index.js';
export * as ZWave from './ZWave/index.js';
export declare namespace Devices {
    type Insteon = typeof Insteon;
    type ZWave = typeof ZWave;
    type ZigBee = {};
}
export type Devices<T extends Family.Insteon | Family.ZWave | Family.ZigBee> = (typeof Devices)[`Insteon`];
export default Devices;
//# sourceMappingURL=index.d.ts.map