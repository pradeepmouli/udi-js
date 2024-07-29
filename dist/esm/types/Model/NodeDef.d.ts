import { Drivers } from '../Definitions/Global/Drivers.js';
interface DriverDef {
    id: Drivers;
    editor: string;
    hide?: string;
}
interface SendCommandDef {
    id: string;
}
interface AcceptCommandDef {
    id: string;
    p?: {
        id: string;
        editor: string;
        init: string;
        optional?: string;
    };
}
export interface NodeDef {
    id: string;
    nls: string;
    sts: DriverDef[];
    cmds: {
        sends: SendCommandDef[];
        accepts: AcceptCommandDef[];
    };
}
export {};
