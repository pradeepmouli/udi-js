import { EventEmitter } from 'events';
import { ISY } from './ISY.js';
import { VariableType } from './ISYConstants.js';
export declare class ISYVariable<P = VariableType.Integer | VariableType.State> extends EventEmitter {
    isy: ISY;
    id: number;
    name: string;
    value: any;
    init: any;
    type: P;
    lastChanged: Date;
    constructor(isy: ISY, id: number, name: string, type: VariableType);
    handleEvent(event: {
        eventInfo: {
            var: any;
        };
    }): void;
    updateValue(value: P): Promise<void>;
}
