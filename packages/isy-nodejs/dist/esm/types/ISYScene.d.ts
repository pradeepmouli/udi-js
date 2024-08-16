import { Family } from './Definitions/Global/Families.js';
import { ISYNode } from './ISYNode.js';
import { type ISYDevice } from './ISYDevice.js';
import type { ISY } from './ISY.js';
import type { Driver } from './Definitions/Global/Drivers.js';
import type { Command } from './Definitions/Global/Commands.js';
import type { NodeInfo } from './Model/NodeInfo.js';
interface SceneInfo extends NodeInfo {
    members?: {
        link: any;
    };
    flag?: any;
    nodeDefId?: string;
    address: string;
    name: string;
    family?: Family;
    parent?: any;
    enabled: boolean;
    startDelay: number;
}
export declare class ISYScene extends ISYNode<Family.Scene, Driver.Signatures<'ST'>, Command.Signatures<'DON' | 'DOF'>, string> {
    connectionType: string;
    batteryOperated: boolean;
    deviceType: any;
    deviceFriendlyName: string;
    members: ISYDevice<any, any, any>[];
    typeCode: string;
    constructor(isy: ISY, scene: SceneInfo);
    get isOn(): boolean;
    get brightnessLevel(): number;
    recalculateState(): boolean;
    markAsChanged(): void;
    updateIsOn(lightState: boolean): Promise<any>;
    updateBrightnessLevel(level: any): Promise<any>;
    getAreAllLightsInSpecifiedState(state: any): boolean;
}
export {};
//# sourceMappingURL=ISYScene.d.ts.map