import { EventEmitter } from 'events';
import { ISY } from './ISY.js';
import { VariableType } from './ISYConstants.js';
type Variable<T extends VariableType> = T extends VariableType.Integer ? Number : String;
export declare class ISYVariable<P extends VariableType> extends EventEmitter {
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
    updateValue(value: Variable<P>): Promise<void>;
}
export {};
