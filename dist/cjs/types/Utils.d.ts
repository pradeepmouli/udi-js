import * as log4js from '@log4js-node/log4js-api';
import { Logger } from 'winston';
import { Categories } from './Definitions/Global/Categories.js';
import { EventEmitter as BaseEventEmitter } from 'events';
import { EventType } from './Events/EventType.js';
export declare function byteToPct(value: any): number;
export declare function pctToByte(value: any): number;
export declare function byteToDegree(value: any): number;
declare module 'winston' {
    interface Logger extends LoggerLike {
    }
}
declare global {
    interface String {
        remove(string: string): string;
        removeAll(string: string): string;
        right(numChars: number): string;
        left(numChars: number): string;
        rightWithToken(numChars: number, token?: string): string;
        leftWithToken(numChars: number, token?: string): string;
    }
}
export interface LoggerLike extends Partial<log4js.Logger> {
    (msg: any, level?: string, ...data: any[]): void;
}
export declare function clone(logger: Logger, label: string): Logger;
type TEventType = keyof typeof EventType;
export interface PropertyChangedEventEmitter extends EventEmitter<"PropertyChanged"> {
    on(event: 'PropertyChanged', listener: (propertyName: string, newValue: any, oldValue: any, formattedValue: string) => void): this;
}
export declare class EventEmitter<T extends TEventType> extends BaseEventEmitter {
    on(event: T, listener: ((propertyName: string, newValue: any, oldValue: any, formattedValue: string) => any) | ((controlName: string) => any)): this;
}
export declare function right(this: string, numChars: number): string;
export declare function left(this: string, numChars: number): string;
export declare function rightWithToken(this: string, maxNumChars: number, token?: string): void;
export declare function leftWithToken(this: string, maxNumChars: number, token?: string): void;
export declare function remove(this: string, searchValue: string | RegExp): string;
export declare function removeAll(this: string, searchValue: string | RegExp): string;
export declare function parseTypeCode(typeCode: `${string}.${string}.${string}.${string}`): {
    category: Categories;
    deviceCode: number;
    firmwareVersion: number;
    minorVersion: number;
};
export declare function getCategory(device: {
    type: string;
}): number;
export declare function getSubcategory(device: {
    type: string;
}): number;
export {};
