import { Family } from '../../Families.js';
import { ISY } from '../../ISY.js';
import { NodeInfo } from '../ISYDevice.js';
import { ISYDevice } from '../../ISYNode.js';
import 'winston';
export declare class ZWaveBaseDevice extends ISYDevice<Family.ZWave> {
    getNodeDef(): Promise<any>;
    constructor(isy: ISY, deviceNode: NodeInfo);
    convertFrom(value: any, uom: number): any;
    convertTo(value: any, uom: number): any;
    sendBeep(level?: number): Promise<any>;
}
