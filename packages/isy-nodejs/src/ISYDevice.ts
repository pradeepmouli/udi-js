import type { AnyTxtRecord } from 'dns';
import type { Command } from './Definitions/Global/Commands.js';
import type { Driver } from './Definitions/Global/Drivers.js';
import type { Category, Family } from './Definitions/index.js';
import type { CompositeDevice } from './Devices/CompositeDevice.js';
import { ISYDeviceNode } from './Devices/ISYDeviceNode.js';
import type { ISYNode } from './ISYNode.js';
import type { ISYScene } from './ISYScene.js';
import type { Factory } from './Utils.js';
import type { InstanceOf } from 'ts-morph';
import type { Constructor } from 'type-fest';

export interface ISYDevice<T extends Family, D, C, E> extends ISYDeviceInfo {
	// #region Properties (22)
	address: string;
	category: Category;
	commands: C;
	deviceClass: any;
	drivers: D;
	events: E;
	enabled: boolean;
	family: T;
	hidden: boolean;
	isDimmable: boolean;
	label: string;
	model: string;
	modelNumber: string;
	name: any;
	parentAddress: any;
	scenes: ISYScene[];
	subCategory: number;
	type: any;
	typeCode: string;
	version: string;

	// #endregion Properties (22)

	// #region Public Methods (18)

	// #endregion Public Methods (18)
}

export namespace ISYDevice
{
	export function isDevice<T extends Family, D extends ISYNode.DriverSignatures, C extends ISYNode.CommandSignatures, E extends ISYNode.EventSignatures>(
		device: ISYNode<T, D, C, E>
	): device is ISYDevice<T, D, C, E> & ISYNode<T, D, C, E> {
		return device instanceof ISYDeviceNode;
	}

	export function isNode<T extends Family, D extends ISYNode.DriverSignatures, C extends ISYNode.CommandSignatures, E extends ISYNode.EventSignatures>(
		device: ISYDevice<T, D, C, E>
	): device is ISYDevice<T, D, C, E> & ISYNode<T, D, C, E> {
		return device instanceof ISYDeviceNode;
	}


	export function isComposite<T extends Family, D extends Record<string,typeof ISYDeviceNode>, C,E>(
		device: ISYDevice<T, D, C, E>
	): device is ISYDevice<T,D,C,E> & CompositeDevice<T,any,any> {
		return 'root' in device;
	}

	export type DriverNamesOf<T extends ISYDevice<any,any,any,any>> = T extends CompositeDevice<any,any,any> ? CompositeDevice.DriverNamesOf<T> : ISYNode.DriverNamesOf<T>;

	export type CommandNamesOf<T extends ISYDevice<any,any,any,any>> = T extends CompositeDevice<any,any,any> ? CompositeDevice.CommandNamesOf<T> : T extends ISYNode ? ISYNode.CommandNamesOf<T> : never;

	export type Any = ISYDevice<any,any,any,any>;

	export type EventNamesOf<T extends ISYDevice.Any | Factory<ISYDevice.Any>> = InstanceTypeOf<T> extends CompositeDevice<any,any,any> ? CompositeDevice.EventNamesOf<InstanceTypeOf<T>> : T extends ISYNode ? ISYNode.EventNamesOf<T> : never;

	export type InstanceTypeOf<T> = T extends ISYDevice.Any ? T : T extends Factory<ISYDevice.Any> & {Node: Constructor<ISYDevice.Any>} ? InstanceType<T['Node']> : T extends {Device: Constructor<ISYDevice.Any>} ? InstanceType<T['Device']> : never;

}

export function isDevice<T extends Family, D extends ISYNode.DriverSignatures, C extends ISYNode.CommandSignatures, E extends ISYNode.EventSignatures>(
	device: ISYNode<T, D, C, E>
): device is ISYDevice<T, D, C, E> & ISYNode<T, D, C, E> {
	return device instanceof ISYDeviceNode;
}

export function isDeviceClass<T extends Family, D extends ISYNode.DriverSignatures, C extends ISYNode.CommandSignatures, E extends ISYNode.EventSignatures>(
	device: typeof ISYNode<T, D, C, E>
): device is (new (...args) => ISYDevice<T, D, C, E>) & typeof ISYNode<T, D, C, E> {
	return device.prototype instanceof ISYDeviceNode;
}

export interface ISYDeviceInfo {
	type: string;
	deviceClass: any;

	productName: string;

	productId: string | number;

	modelName: string;

	modelNumber: string;

	version: string;

	category: Category;

	subCategory: number;

	manufacturer: string;
}
