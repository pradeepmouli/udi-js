import * as log4js from '@log4js-node/log4js-api';
import { Logger } from 'winston';
import { EventEmitter as BaseEventEmitter } from 'events';
import { Category } from './Definitions/Global/Categories.js';
import { EventType } from './Events/EventType.js';
export type StringKeys<T> = Extract<keyof T, string>;
export declare function getEnumValueByEnumKey<E extends {
    [index: string]: number;
}, T extends keyof E>(enumType: E, enumKey: T): E[T];
export declare function getEnumKeyByEnumValue<E extends {
    [index: string]: number;
}, T extends E[keyof E]>(enumType: E, enumValue: E[T]): T;
export type ValuesOf<TEnum extends number | string | boolean | bigint> = `${TEnum}` extends `${infer R extends number}` ? R : `${TEnum}`;
export type IdentityOf<T> = T extends (...args: any[]) => infer R ? R : T;
export type LabelsOf<TEnum> = keyof IdentityOf<TEnum>;
export type MaybeArray<T> = T | T[];
export type ObjectToUnion<T> = T[keyof T];
export declare function toArray<T>(value: MaybeArray<T>): T[];
export declare function fromArray<T>(...value: T[]): MaybeArray<T>;
export declare function byteToPct(value: any): number;
export declare function pctToByte(value: any): number;
export declare function byteToDegree(value: any): number;
declare module 'winston' {
    interface Logger extends LoggerLike {
    }
}
declare global {
    interface String {
        left(numChars: number): string;
        leftWithToken(numChars: number, token?: string): string;
        remove(string: string): string;
        removeAll(string: string): string;
        right(numChars: number): string;
        rightWithToken(numChars: number, token?: string): string;
    }
}
export interface LoggerLike extends Partial<log4js.Logger> {
}
export declare function valueOf<E, T extends Extract<keyof E, string>>(e: E, val: T): E[T];
export declare function clone(logger: Logger, label: string): Logger;
type TEventType = keyof typeof EventType;
export interface PropertyChangedEventEmitter extends EventEmitter<'PropertyChanged'> {
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
    category: Category;
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
//# sourceMappingURL=Utils.d.ts.map