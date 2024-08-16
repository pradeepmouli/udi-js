
import axios, { AxiosRequestConfig } from 'axios';


import * as log4js from '@log4js-node/log4js-api';
import winston, { Logger, format}from 'winston'

import { Category } from './Definitions/Global/Categories.js';
import { EventEmitter as BaseEventEmitter } from 'events';
import { Axios } from 'axios';



//import { get } from 'http';
import { EventType } from './Events/EventType.js';
import type { Identity } from '@project-chip/matter.js/util';
import { isBoxedPrimitive } from 'util/types';
import { Family } from './Definitions/index.js';

export interface Converter<F, T> {

  from: (value: F) => T;
  to: (value: T) => F;
}

export type StringKeys<T> = Extract<keyof T, string>;


export function invert<F, T>(converter: Converter<F, T>): Converter<T, F> {
  return {
    from: converter.to,
    to: converter.from,
  };
}



export type MaybeArray<T> = T | T[];


export function toArray<T>(value: MaybeArray<T>): T[] {
	if(undefined === value)	return [];
  return Array.isArray(value) ? value : [value];
}

export function fromArray<T>(...value: T[]): MaybeArray<T> {
  if(value.length === 1)
  {
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
	interface Logger extends LoggerLike{

	}


}

declare  global {
	interface String {
		remove(string: string) : string;
		removeAll(string: string) : string;

		right(numChars: number) : string;

		left(numChars: number) : string;

		rightWithToken(numChars: number, token?: string) : string;

		leftWithToken(numChars: number, token?: string): string;
	}


}

export interface LoggerLike extends Partial<log4js.Logger> {

	(msg: any, level?: string, ...data: any[]): void;
	//default(msg: any): void;

}
// `${`${const origCreateLogger = winston.createLogger.bind(winston)
// Logger.prototwinston.createLogger = (options) =>
// {
// let logger =  winston.createLogger(options);
// logger.prototype = logger.log.bind(logger);
// }
// }`}`


	export function valueOf<E,T extends Extract<keyof E, string>>(e: E, val: T) : E[T]
	{
		return e[val];
	}



export function clone(logger: Logger, label: string): Logger {


	return winston.createLogger({
		format: format.label({label}),
		transports: logger.transports,
		level: logger.level,
		levels: logger.levels,
		exitOnError: logger.exitOnError,
		exceptionHandlers: logger.exceptions,
		...logger
	})



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


type TEventType = keyof typeof EventType

export interface PropertyChangedEventEmitter extends EventEmitter<"PropertyChanged">
{

	on(event:'PropertyChanged', listener: (propertyName : string, newValue: any, oldValue: any, formattedValue: string) => void) : this;

}

export class EventEmitter<T extends TEventType> extends BaseEventEmitter
{
	override on(event: T, listener: ((propertyName: string, newValue: any, oldValue: any, formattedValue: string) => any) | ((controlName: string) => any)) : this
	{
		return super.on(event,listener);
	}
}

export function right(this: string, numChars: number)
{
	var l = this.length;
	return this.substring(length - numChars)
}

export function left(this: string, numChars: number)
{

	return this.substring(0,numChars - 1)
}

export function rightWithToken(this: string, maxNumChars: number, token: string = ' ')
{

	var s = this.split(token);
	var sb = s.pop();
	var sp = s.pop()
	while(sp !== undefined && sb.length + sp.length + token.length <= maxNumChars )
	{
		sb = sp + token + sb;
		sp = s.pop();
	}


}

export function leftWithToken(this: string, maxNumChars: number, token: string = ' ')
{
	var s = this.split(token).reverse();
	var sb = s.pop();
	var sp = s.pop();
	while(sp !== undefined && sb.length + sp?.length + token.length <= maxNumChars)
	{

		sb = sb + token + sp;

		sp = s.pop();
	}
}

export function remove(this: string, searchValue: string | RegExp)
{

	return this.replace(searchValue, '');
}

export function removeAll(this: string, searchValue: string | RegExp)
{

	return this.replaceAll(searchValue, '');
}


export function parseTypeCode(typeCode: `${string}.${string}.${string}.${string}`) : {category: Category, deviceCode: number, firmwareVersion: number, minorVersion: number }
{
	try {
		const s = typeCode.split('.');

		let output = { category: Number(s[0]), deviceCode: Number(s[1]), firmwareVersion: Number(Number(s[2]).toString(16)), minorVersion: Number(Number(s[3]).toString(16)) };

		return output;
	} catch (err) {

		return null;
	}
}

export function getCategory(device: { type: string; }) {
	try {
		const s = device.type.split('.');
		return Number(s[0]);
	} catch (err) {
		return Category.Unknown;
	}
}
export function getSubcategory(device: { type: string; }) {
	try {
		const s = device.type.split('.');
		return Number(s[1]);
	} catch (err) {
		return Category.Unknown;
	}
}
