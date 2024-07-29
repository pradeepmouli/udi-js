import { Insteon } from "./Insteon/index.js";
import { ZWaveBaseDevice } from "./ZWave/ZWaveBaseDevice.js";
export const Devices = {
    Insteon: Insteon,
    ZWave: { Base: ZWaveBaseDevice },
    ZigBee: {},
};
export default Devices;
