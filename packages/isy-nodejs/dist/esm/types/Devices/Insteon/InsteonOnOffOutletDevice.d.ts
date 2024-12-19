import 'winston';
import { ISY } from '../../ISY.js';
import type { NodeInfo } from '../../Model/NodeInfo.js';
import { CompositeDevice } from '../CompositeDevice.js';
import type { ISYDevice } from '../../ISYDevice.js';
declare const OnOffOutlet_base: import("type-fest").Constructor<CompositeDevice<import("../../ISY.js").Family, {
    [x: string]: import("../../ISYNode.js").ISYNode.Factory<import("../../ISY.js").Family, any>;
}, import("../../ISYNode.js").ISYNode.Factory<import("../../ISY.js").Family, any>>>;
export declare class OnOffOutlet extends OnOffOutlet_base {
    constructor(isy: ISY, deviceNode: NodeInfo);
}
export declare namespace OnOffOutlet {
    function is(node: ISYDevice<any, any, any, any>): node is OnOffOutlet;
    function create(isy: ISY, node: NodeInfo): OnOffOutlet;
    const Device: typeof OnOffOutlet;
    const Class: typeof OnOffOutlet;
}
export {};
//# sourceMappingURL=InsteonOnOffOutletDevice.d.ts.map