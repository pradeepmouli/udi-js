import { EventType } from '../Events/EventType.js';
export declare enum Family {
    Elk = 0,
    Insteon = 1,
    UPB = 2,
    ZigBeeLegacy = 3,
    ZWaveLegacy = 4,
    AutoDR = 5,
    Scene = 6,
    UDI = 7,
    Brultech = 8,
    NCD = 9,
    Poly = 10,
    Lutron = 11,
    ZWave = 12,
    ZigBee = 14
}
export interface Insteon {
    family: Family.Insteon;
}
export type t = EventType.NodeChanged | EventType.PropertyChanged | EventType.ZWave | EventType.ZigBee;
