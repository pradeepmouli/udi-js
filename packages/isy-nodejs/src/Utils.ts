import axios, { AxiosRequestConfig } from 'axios';

import * as log4js from '@log4js-node/log4js-api';
import winston, { Logger, format } from 'winston';

import { Axios } from 'axios';
import { EventEmitter as BaseEventEmitter } from 'events';
import { Category } from './Definitions/Global/Categories.js';

//import { get } from 'http';
import PackageJson from '@npmcli/package-json';
import type { Identity } from '@project-chip/matter.js/util';
import { existsSync } from 'fs';
import path from 'path';
import { isBoxedPrimitive } from 'util/types';
import { Family, type Driver, type DriverType, type EnumLiteral } from './Definitions/index.js';
import { EventType } from './Events/EventType.js';

export type StringKeys<T> = Extract<keyof T, string>;

export function getEnumValueByEnumKey<E extends { [index: string]: number }, T extends keyof E>(enumType: E, enumKey: T): E[T] {
	return enumType[enumKey];
}

export function getEnumKeyByEnumValue<E extends { [index: string]: number }, T extends E[keyof E]>(enumType: E, enumValue: E[T]): T {
	return Object.keys(enumType).find((key) => enumType[key] === enumValue) as unknown as T;
}

export type ValuesOf<TEnum extends number | string | boolean | bigint> = `${TEnum}` extends `${infer R extends number}` ? R : `${TEnum}`;

type s = ValuesOf<Family>;

type test = IdentityOf<Family>;
export type IdentityOf<T> = T extends (...args: any[]) => infer R ? R : T;

export type LabelsOf<TEnum> = keyof IdentityOf<TEnum>;
type d = LabelsOf<Family>;

export type MaybeArray<T> = T | T[];

export type ObjectToUnion<T> = T[keyof T];

export function toArray<T>(value: MaybeArray<T>): T[] {
	if (undefined === value) return [];
	return Array.isArray(value) ? value : [value];
}

export function fromArray<T>(...value: T[]): MaybeArray<T> {
	if (value.length === 1) {
		return value[0] ?? undefined;
	}
	return value;
}

export function byteToPct(value) {
	return Math.round((value * 100) / 255);
}

export function pctToByte(value) {
	return Math.round((value * 255) / 100);
}

export function byteToDegree(value) {
	return Math.fround(value / 2);
}

let lastrequest = Promise.resolve();

declare module 'winston' {
	interface Logger extends LoggerLike {}
}

declare global {
	interface String {
		// #region Public Methods (6)

		left(numChars: number): string;
		leftWithToken(numChars: number, token?: string): string;
		remove(string: string): string;
		removeAll(string: string): string;
		right(numChars: number): string;
		rightWithToken(numChars: number, token?: string): string;

		// #endregion Public Methods (6)
	}
}

export interface LoggerLike extends Partial<log4js.Logger> {
	//default(msg: any): void;
}
// `${`${const origCreateLogger = winston.createLogger.bind(winston)
// Logger.prototwinston.createLogger = (options) =>
// {
// let logger =  winston.createLogger(options);
// logger.prototype = logger.log.bind(logger);
// }
// }`}`

export function valueOf<E, T extends Extract<keyof E, string>>(e: E, val: T): E[T] {
	return e[val];
}

export function clone(logger: Logger, label: string): Logger {
	return winston.createLogger({
		format: format.label({ label }),
		transports: logger.transports,
		level: logger.level,
		levels: logger.levels,
		exitOnError: logger.exitOnError,
		exceptionHandlers: logger.exceptions,
		...logger
	});

	// `${const copy1 = { ...logger };copy1.prefix = copy1.prefix = prefix ?? logger.prototype;

	// const copy = logger.info.bind(copy1) as Logging;
	// Object.assign(copy, logger);
	// copy.prefix = prefix ?? logger.prefix;

	// copy.isDebugEnabled = () => ISYPlatform.Instance.debugLoggingEnabled;

	// copy.isErrorEnabled = () => true;

	// copy.isWarnEnabled = () => true;

	// copy.isFatalEnabled = () => true;

	// copy.isTraceEnabled = () => true;

	// // copy._log = logger._log.bind(copy);
	// copy.debug = logger.debug.bind(copy);
	// // copy.fatal = logger..bind(copy);
	// copy.info = logger.info.bind(copy);
	// copy.error = logger.error.bind(copy);
	// copy.warn = logger.warn.bind(copy);

	// copy.trace = ((message: ConcatArray<string>, ...args: any[]) => {
	// 	// onst newMsg = chalk.dim(msg);
	// 	if (copy.isTraceEnabled) {
	// 		copy.log.apply(this, ['trace'].concat(message).concat(args));
	// 	}
	// }).bind(copy);

	// copy.fatal = ((message: ConcatArray<string>, ...args: any[]) => {
	// 	// onst newMsg = chalk.dim(msg);
	// 	if (logger?.isFatalEnabled) {
	// 		logger.log.apply(this, ['fatal'].concat(message).concat(args));
	// 	}
	// }).bind(copy);}`

	//return copy;
}

// export function wire(logger: Logger) {
// 	logger.isDebugEnabled = () => ISYPlatform.Instance.debugLoggingEnabled;

// 	logger.isErrorEnabled = () => true;

// 	logger.isWarnEnabled = () => true;

// 	logger.isFatalEnabled = () => true;

// 	logger.isTraceEnabled = () => true;

// 	logger.trace = ((message, ...args: any[]) => {
// 		// onst newMsg = chalk.dim(msg);
// 		if (logger.isTraceEnabled()) {
// 			logger.log.apply(this, ['trace'].concat(message).concat(args));
// 		}
// 	}).bind(logger);

// 	logger.fatal = ((message, ...args: any[]) => {
// 		// onst newMsg = chalk.dim(msg);
// 		if (logger.isFatalEnabled()) {
// 			logger.log.apply(this, ['fatal'].concat(message).concat(args));
// 		}
// 	}).bind(logger);

// }

type TEventType = keyof typeof EventType;

export interface PropertyChangedEventEmitter extends EventEmitter<'PropertyChanged'> {
	// #region Public Methods (1)

	on(event: 'PropertyChanged', listener: (propertyName: string, newValue: any, oldValue: any, formattedValue: string) => void): this;

	// #endregion Public Methods (1)
}

export class EventEmitter<T extends TEventType> extends BaseEventEmitter {
	// #region Public Methods (1)

	public override on(event: T, listener: ((propertyName: string, newValue: any, oldValue: any, formattedValue: string) => any) | ((controlName: string) => any)): this {
		return super.on(event, listener);
	}

	// #endregion Public Methods (1)
}

export function right(this: string, numChars: number) {
	var l = this.length;
	return this.substring(length - numChars);
}

export function left(this: string, numChars: number) {
	return this.substring(0, numChars - 1);
}

export function rightWithToken(this: string, maxNumChars: number, token: string = ' ') {
	var s = this.split(token);
	var sb = s.pop();
	var sp = s.pop();
	while (sp !== undefined && sb.length + sp.length + token.length <= maxNumChars) {
		sb = sp + token + sb;
		sp = s.pop();
	}
}

export function leftWithToken(this: string, maxNumChars: number, token: string = ' ') {
	var s = this.split(token).reverse();
	var sb = s.pop();
	var sp = s.pop();
	while (sp !== undefined && sb.length + sp?.length + token.length <= maxNumChars) {
		sb = sb + token + sp;

		sp = s.pop();
	}
}

export function remove(this: string, searchValue: string | RegExp) {
	return this.replace(searchValue, '');
}

export function removeAll(this: string, searchValue: string | RegExp) {
	return this.replaceAll(searchValue, '');
}

export function parseTypeCode(typeCode: `${string}.${string}.${string}.${string}`): { category: Category; deviceCode: number; firmwareVersion: number; minorVersion: number } {
	try {
		const s = typeCode.split('.');

		let output = { category: Number(s[0]), deviceCode: Number(s[1]), firmwareVersion: Number(Number(s[2]).toString(16)), minorVersion: Number(Number(s[3]).toString(16)) };

		return output;
	} catch (err) {
		return null;
	}
}

export function getCategory(device: { type: string }) {
	try {
		const s = device.type.split('.');
		return Number(s[0]);
	} catch (err) {
		return Category.Unknown;
	}
}
export function getSubcategory(device: { type: string }) {
	try {
		const s = device.type.split('.');
		return Number(s[1]);
	} catch (err) {
		return Category.Unknown;
	}
}

function getImportMeta() {
	try {
		//@ts-ignore
		return import.meta;
	} catch (err) {
		//@ts-ignore
		let { dirname, filename } = { dirname: __dirname, filename: __filename };

		return { dirname, filename };
	}
}
export async function findPackageJson(currentPath: string = getImportMeta()?.dirname): Promise<PackageJson> {
	while (currentPath !== '/') {
		const packageJsonPath = path.join(currentPath, 'package.json');
		if (existsSync(packageJsonPath)) {
			return await PackageJson.load(currentPath);
		}
		currentPath = path.join(currentPath, '..');
	}
	return null;
}
