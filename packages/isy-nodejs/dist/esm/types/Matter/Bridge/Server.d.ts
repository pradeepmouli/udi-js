import { ServerNode } from '@matter/main';
import { ISY } from '../../ISY.js';
import type { ISYNode } from '../../ISYNode.js';
import '../Mappings/index.js';
export declare let instance: ServerNode;
export declare let version: string;
export interface Config {
    discriminator: number;
    passcode: number;
    port: number;
    productId: number;
    productName?: string;
    uniqueId: string;
    vendorId: number;
    vendorName?: string;
    ipv4?: boolean;
    ipv6?: boolean;
    DeviceOptions?: DeviceOptions[];
}
export interface DeviceOptions {
    applyTo: {
        classes: (typeof ISYNode<any, any, any, any>)[];
    } | {
        nodeDefs: string[];
    } | {
        addresses: string[];
    } | {
        deviceTypes: string[];
    } | {
        predicate: (node: ISYNode<any, any, any, any>) => boolean;
    };
    options: {
        exclude?: boolean;
        label: string;
        mappings: {
            [x in typeof ISYNode<any, any, any, any> as x['name']]: DeviceToClusterMap<InstanceType<x>, any>;
        };
    };
}
export declare function create(isy?: ISY, config?: Config): Promise<ServerNode>;
export declare function appliesTo(node: ISYNode<any>, deviceOptions: DeviceOptions): boolean;
export declare function getDeviceOptions(node: ISYNode<any>, deviceOptions: DeviceOptions[]): DeviceOptions['options'];
export declare function createMatterServer(isy?: ISY, config?: Config): Promise<ServerNode>;
type PairingCodeData = {
    qrPairingCode: string;
    manualPairingCode: string;
    renderedQrPairingCode: string;
    url: string | URL;
};
export declare function getPairingCode(server?: ServerNode): PairingCodeData;
export {};
//# sourceMappingURL=Server.d.ts.map