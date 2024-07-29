import { Family } from "../ISY.js";
import Insteon from "./Insteon/index.js";
import { ZWaveBaseDevice } from "./ZWave/ZWaveBaseDevice.js";

export const Devices = {
  Insteon: Insteon,
  ZWave: { Base: ZWaveBaseDevice },
  ZigBee: {},
};

export type Devices<T extends Family.Insteon | Family.ZWave | Family.ZigBee> = (typeof Devices)[`Insteon`];

export type ToDevice<T extends keyof Devices<any>> = T extends keyof Devices<infer B> ? Devices<B>[`${T}`] : never;

export default Devices;
