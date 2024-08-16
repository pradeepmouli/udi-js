import { ISYDeviceNode } from "../../../ISYNode.js";
export const nodeDefId = "KEYPAD_BTN";
export class SwitchNode extends ISYDeviceNode {
    commands = {};
    drivers = {};
    static nodeDefId = "KEYPAD_BTN";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
    }
}
//# sourceMappingURL=SwitchNode.js.map