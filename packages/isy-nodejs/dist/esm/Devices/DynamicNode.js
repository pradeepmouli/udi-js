import { ISYDeviceNode } from './ISYDeviceNode.js';
export class DynamicNode extends ISYDeviceNode {
    constructor(isy, node) {
        super(isy, node);
        this.getNodeDef().then((def) => {
            for (let st in this.drivers) {
                if (!(def.sts.st).find((s) => s.id === st)) {
                    delete this.drivers[st];
                }
            }
            for (let cmd in this.commands) {
                if (!(def.cmds.accepts.cmd).find((c) => c.id === cmd)) {
                    delete this.commands[cmd];
                }
            }
        });
    }
}
//# sourceMappingURL=DynamicNode.js.map