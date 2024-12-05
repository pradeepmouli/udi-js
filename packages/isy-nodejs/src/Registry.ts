import { Family } from './Definitions/index.js';
import { nodeDefId } from './Devices/Insteon/KeypadButton.js';
import { NodeFactory } from './Devices/NodeFactory.js';
import type { ISYDeviceInfo } from './ISYDevice.js';
import { ISYNode } from './ISYNode.js';
import type { StringKeys } from './Utils.js';

export class Registry<K extends keyof any,T> {

	Global: { [x in K]?: T } = {};
	FamilyLevel: { [x in StringKeys<typeof Family>]?: { [y in K]?: T } } = {};

	DeviceLevel: { [x: string]: { [y in K]?: T } } = {};
	NodeLevel: { [x: string]: { [y in K]?: T } } = {};


	registerGlobal(key: K, value: T): void {
		this.Global[key] = value;
	}

	registerFamilyLevel<F extends Family>(family: F & number, key: K, value: T): void {
		this.FamilyLevel[Family[family] as string] = this.FamilyLevel[Family[family] as string] ?? {};
		this.FamilyLevel[Family[family] as string]![key] = value;
	}

	registerDeviceLevel(device: string, key: K, value: T): void {
		this.DeviceLevel[device] = this.DeviceLevel[device] ?? {};
		this.DeviceLevel[device]![key] = value;
	}

	registerNodeLevel(nodeDefId: string, key: K, value: T): void {
		this.NodeLevel[nodeDefId] = this.NodeLevel[nodeDefId] ?? {};
		this.NodeLevel[nodeDefId]![key] = value;
	}

	register(key: K, value: T): void
	register(key: K, value: T, deviceType: string): void
	register(key: K, value: T, nodeClass: typeof ISYNode): void
	register(key: K, value: T, discriminant?: string | typeof ISYNode | Family ): void
	{
		if(discriminant === undefined)
		{
			this.registerGlobal(key, value);
			return;
		}
		if(typeof discriminant === 'string')
		{
			this.registerDeviceLevel(discriminant, key, value);
			return;
		}
		if(discriminant instanceof ISYNode.constructor)
		{
			this.registerNodeLevel(discriminant.nodeDefId, key, value);
			for (const nodeDefId in NodeFactory.getImplements(discriminant))
			{
				this.registerNodeLevel(nodeDefId, key, value);
			}
			this.registerFamilyLevel(discriminant.family, key, value);
			return;
		}

	}

	getGlobal(key: K): T | undefined {
		return this.Global[key];
	}

	getFamilyLevel<F extends Family>(family: F & number, key: K): T | undefined {
		return this.FamilyLevel[Family[family] as string]?.[key];
	}

	getDeviceLevel(device: string, key: K): T | undefined {
		return this.DeviceLevel[device]?.[key];
	}

	getNodeLevel(nodeDefId: string, key: K): T | undefined {
		 return this.NodeLevel[nodeDefId]?.[key];
	}

	get(device: ISYDeviceInfo & ISYNode, key: K): T | undefined
	{
		if(device.type)
		{
			let d = this.getDeviceLevel(device.type, key);
			if(d)
				return d;
		}

			let d = this.getNodeLevel(device.nodeDefId, key);
			if(d)
			{
				return d;
			}
			else
			{
				for (const nodeDefId in NodeFactory.getImplements(device))
				{
					let d = this.getNodeLevel(nodeDefId, key);
					if(d)
						return d;
				}
			}
		let f = this.getFamilyLevel(device.family, key);
		if(f)
			return f;
		return this.getGlobal(key);

	}



}