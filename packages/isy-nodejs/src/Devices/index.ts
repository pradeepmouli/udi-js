import { type Family } from '../Definitions/index.js';
import * as Insteon from './Insteon/index.js';
import { NodeFactory } from './NodeFactory.js';
import * as ZWave from './ZWave/index.js';
import * as ZigBee from './ZigBee/index.js';

export const Devices = {
	Insteon: Insteon,
	ZWave: ZWave,
	ZigBee: ZigBee
};

export * as Insteon from './Insteon/index.js';
export * as ZWave from './ZWave/index.js';
export * as ZigBee from './ZigBee/index.js';

export namespace Devices {
	export type Insteon = typeof Insteon;
	export type ZWave = typeof ZWave;
	export type ZigBee = {};
}

export type Devices<T extends Family.Insteon | Family.ZWave | Family.ZigBee> = (typeof Devices)[`Insteon`];

/*export type ToDevice<T extends keyof Devices<any>> = T extends keyof Devices<infer B> ? Devices<B>[`${T}`] : never;*/

NodeFactory.sortImplementsRegistry();
export default Devices;
