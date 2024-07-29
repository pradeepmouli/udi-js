import { Family } from '../../Definitions/Global/Families.js';
import { ISY } from '../../ISY.js';
import { NodeInfo } from '../../Definitions/NodeInfo.js';
import { ISYDeviceNode } from '../../ISYNode.js';
import 'winston';
export declare class ZWaveBaseDevice extends ISYDeviceNode<Family.ZWave> {
    getNodeDef(): Promise<any>;
    constructor(isy: ISY, deviceNode: NodeInfo);
    convertFrom(value: any, uom: number): any;
    convertTo(value: any, uom: number): any;
    sendBeep(level?: number): Promise<any>;
}
