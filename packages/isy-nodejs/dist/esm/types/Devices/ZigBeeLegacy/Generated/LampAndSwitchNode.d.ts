import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
export declare const nodeDefId = "RelayLoadControl";
type Commands = {
    DON: () => Promise<boolean>;
    DOF: () => Promise<boolean>;
    QUERY: () => Promise<boolean>;
    ADRPST: (value: ) => Promise<boolean>;
};
type Drivers = {
    ST?: {
        uom: ;
        value: ;
    };
    ERR?: {
        uom: ;
        value: ;
    };
};
export declare class LampAndSwitchNode extends ISYDeviceNode<Family.ZigBeeLegacy, keyof Drivers, keyof Commands> {
    readonly commands: Commands;
    drivers: Drivers;
    static nodeDefId: string;
    constructor(isy: ISY, nodeInfo: NodeInfo);
    on(): Promise<any>;
    off(): Promise<any>;
    query(): Promise<any>;
    adr(value: ): Promise<any>;
    get status(): {};
}
export {};
//# sourceMappingURL=LampAndSwitchNode.d.ts.map