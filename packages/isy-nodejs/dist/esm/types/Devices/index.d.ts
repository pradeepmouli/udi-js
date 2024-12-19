import { type Family } from '../Definitions/index.js';
import * as Insteon from './Insteon/index.js';
import * as ZWave from './ZWave/index.js';
import * as ZigBee from './ZigBee/index.js';
export declare const Devices: {
    Insteon: typeof Insteon;
    ZWave: typeof ZWave;
    ZigBee: typeof ZigBee;
};
export * as Insteon from './Insteon/index.js';
export * as ZWave from './ZWave/index.js';
export * as ZigBee from './ZigBee/index.js';
export declare namespace Devices {
    type Insteon = typeof Insteon;
    type ZWave = typeof ZWave;
    type ZigBee = {};
}
export type Devices<T extends Family.Insteon | Family.ZWave | Family.ZigBee> = (typeof Devices)[`Insteon`];
export default Devices;
//# sourceMappingURL=index.d.ts.map