import { NodeInfo } from '../../Model/NodeInfo.js';
import * as Insteon from './index.js';
import { ISYNode } from '../../ISYNode.js';
import type { Constructor } from '../Constructor.js';
import { Family } from '../../Definitions/index.js';
import type { ISYDevice } from '../../ISYDevice.js';
export declare class InsteonDeviceFactory {
    static getDeviceDetails(node: NodeInfo): {
        name: string;
        modelNumber?: string;
        version?: string;
        class?: Constructor<ISYNode<Family.Insteon, any, any>> | Constructor<ISYDevice<Family.Insteon, any, any, any>>;
        unsupported?: true;
    };
    static getInsteonDeviceDetails(node: NodeInfo<Family.Insteon>): {
        name: string;
        modelNumber?: string;
        version?: string;
        class: {
            Node: Constructor<ISYNode<Family.Insteon, any, any>>;
        } | {
            Device: Constructor<ISYDevice<Family.Insteon, any, any, any>>;
        } | Constructor<ISYNode<Family.Insteon, any, any>>;
        unsupported?: true;
    };
    static getNetworkBridgeInfo(deviceCode: number): {
        name: string;
        modelNumber: string;
        version: string;
        class: Constructor<ISYNode<Family.Insteon, any, any>>;
    };
    static getIrrigationControlInfo(deviceCode: number): {
        name: string;
        modelNumber?: string;
        version?: string;
        class?: Insteon.Base;
    };
    static getSwitchLightInfo(deviceCode: number, subAddress: string): {
        name: string;
        modelNumber?: string;
        version?: string;
        class?: typeof Insteon.RelayLampSwitch.Node | typeof Insteon.KeypadRelay.Node | typeof Insteon.KeypadButton.Node | typeof Insteon.OnOffOutlet;
    };
    private static getDimLightInfo;
    private static getControllerInfo;
    private static getIOControlInfo;
    private static getSHS;
    private static getClimateControlInfo;
    private static getAccessControlInfo;
    private static getEnergyManagement;
    private static getWindowsCovering;
}
//# sourceMappingURL=InsteonDeviceFactory.d.ts.map