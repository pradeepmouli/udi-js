import * as log4js from '@log4js-node/log4js-api';
import winston, { Logger, type LeveledLogMethod } from 'winston';
import { EventEmitter as BaseEventEmitter } from 'events';
import { Category } from './Definitions/Global/Categories.js';
import type { PackageJson } from '@npmcli/package-json';
import type { AxiosRequestConfig } from 'axios';
import { EventType } from './Events/EventType.js';
export type StringKeys<T> = Extract<keyof T, string>;
export type PickOfType<T, U> = {
    [K in keyof T]: T[K] extends U ? any extends T[K] ? never : K : undefined;
}[keyof T];
export type Paths<T> = T extends object ? {
    [K in keyof T]: `${Exclude<K, symbol>}${'' | `.${Paths<T[K]>}`}`;
}[keyof T] : never;
export type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export type Join<K, P> = K extends string | number ? P extends string | number ? `${K}${'' extends P ? '' : '.'}${P}` : never : never;
export type PathsWithLimit<T, D extends number = 10> = [
    D
] extends [never] ? never : T extends object ? {
    [K in keyof T]-?: K extends string | number ? `${K}` | Join<K, PathsWithLimit<T[K], Prev[D]>> : never;
}[keyof T] : '';
export type Leaves<T, D extends number = 10> = [
    D
] extends [never] ? never : T extends object ? {
    [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>>;
}[keyof T] : '';
export declare function getEnumValueByEnumKey<E extends {
    [index: string]: number;
}, T extends keyof E>(enumType: E, enumKey: T): E[T];
export type Replace<K extends string, T extends string, U extends string> = K extends `${infer L}${T}${infer R}` ? `${L}${U}${R}` : K;
export type Remove<K extends string, T extends string> = K extends `${infer L}${T}${infer R}` ? `${L}${R}` : K;
export type ReplaceAll<K extends string, T extends string, U extends string> = K extends `${infer L}${T}${infer R}` ? `${L}${U}${ReplaceAll<R, T, U>}` : K;
export declare function getEnumKeyByEnumValue<E extends {
    [index: string]: number;
}, T extends E[keyof E]>(enumType: E, enumValue: E[T]): T;
export type LogLevel = PickOfType<winston.Logger, LeveledLogMethod>;
export type ValuesOf<TEnum extends number | string | boolean | bigint> = `${TEnum}` extends `${infer R extends number}` ? R : `${TEnum}`;
export type IdentityOf<T> = T extends (...args: any[]) => infer R ? R : T;
export type LabelsOf<TEnum> = keyof IdentityOf<TEnum>;
export type MaybeArray<T> = T | T[];
export type ObjectToUnion<T> = T[keyof T];
export declare function toArray<T>(value: MaybeArray<T>): T[];
export declare function fromArray<T>(...value: T[]): MaybeArray<T>;
export type BaseRequestConfig = Pick<AxiosRequestConfig, 'auth' | 'baseURL' | 'socketPath'>;
export type ISYRequestConfig = Omit<AxiosRequestConfig, keyof BaseRequestConfig | 'method'>;
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
export declare function findPackageJson(currentPath?: string): Promise<PackageJson>;
export declare function logStringify(obj: any, indent?: number): string;
export type RelaxTypes<V> = V extends number ? number : V extends bigint ? bigint : V extends object ? V extends (...args: any[]) => any ? V : {
    [K in keyof V]: RelaxTypes<V[K]>;
} : V;
export {};
//# sourceMappingURL=Utils.d.ts.map