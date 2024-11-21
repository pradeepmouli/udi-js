import * as Insteon from './Insteon/index.js';
import { NodeFactory } from './NodeFactory.js';
import { ZWaveBaseDevice } from './ZWave/ZWaveBaseDevice.js';
export const Devices = {
    Insteon: Insteon,
    ZWave: { Base: ZWaveBaseDevice },
    ZigBee: {}
};
Insteon.AlertModuleArmed.Node;
export * as Insteon from './Insteon/index.js';
export * as ZWave from './ZWave/index.js';
/*export type ToDevice<T extends keyof Devices<any>> = T extends keyof Devices<infer B> ? Devices<B>[`${T}`] : never;*/
NodeFactory.sortImplementsRegistry();
export default Devices;
//# sourceMappingURL=index.js.map