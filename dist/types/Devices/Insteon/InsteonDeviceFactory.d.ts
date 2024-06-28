import { InsteonBaseDevice, ISYDevice } from '../../ISY.js';
import { NodeInfo } from '../ISYDevice.js';
export declare class InsteonDeviceFactory {
    static buildDeviceMap(): void;
    static getDeviceDetails(node: NodeInfo): {
        name: string;
        modelNumber?: string;
        version?: string;
        class?: typeof ISYDevice;
        unsupported?: true;
    };
    static getInsteonDeviceDetails(node: NodeInfo): {
        name: string;
        modelNumber?: string;
        version?: string;
        class: typeof ISYDevice;
        unsupported?: true;
    };
    static getNetworkBridgeInfo(deviceCode: number): {
        name: string;
        modelNumber: string;
        version: string;
        class: typeof ISYDevice;
    };
    static getIrrigationControlInfo(deviceCode: number): {
        name: string;
        modelNumber?: string;
        version?: string;
        class?: typeof ISYDevice;
    };
    static getSwitchLightInfo(deviceCode: number, subAddress: string): {
        name: string;
        modelNumber?: string;
        version?: string;
        class?: typeof InsteonBaseDevice;
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
