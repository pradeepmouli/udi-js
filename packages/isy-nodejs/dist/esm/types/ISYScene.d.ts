import { Family } from './Definitions/Global/Families.js';
import { ISYNode, type ISYDevice } from './ISYNode.js';
import type { ISY } from './ISY.js';
interface SceneInfo {
    members?: {
        link: any;
    };
    flag?: any;
    nodeDefId?: string;
    address?: string;
    name?: string;
    family?: Family;
    parent?: any;
    enabled: boolean;
    ELK_ID?: string;
}
export declare class ISYScene extends ISYNode<'ST'> {
    type: string;
    connectionType: string;
    batteryOperated: boolean;
    deviceType: any;
    deviceFriendlyName: string;
    members: ISYDevice<any, any, any>[];
    isDimmable: boolean;
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