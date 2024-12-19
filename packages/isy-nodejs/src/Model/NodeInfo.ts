import { Family, type Category } from '../Definitions/index.js';
import { Insteon, type ZWave } from '../Devices/index.js';
import { ISYNode } from '../ISYNode.js';
import { DeviceInfo } from '../Definitions/Global/Categories.js'


import type { DriverState } from './DriverState.js';

// #region Type aliases (1)

export type NodeInfo<T extends Family = Family> = (T extends Family.ZWave | Family.ZigBee ? DynamicNodeInfo<T> : StaticNodeInfo<T>) & { state?: { [x: string]: DriverState } };

// #endregion Type aliases (1)

// #region Interfaces (7)

interface Custom {
	// #region Properties (2)

	flags: string;
	val1: string;

	// #endregion Properties (2)
}

interface Devtype {
	// #region Properties (3)

	cat: string;
	gen: string;
	mfg: string;

	// #endregion Properties (3)
}

export interface DynamicNodeInfo<F extends Family.ZWave | Family.ZigBee> {
	// #region Properties (20)

	address: any;
	custom: Custom;
	dcPeriod: number;
	deviceClass?: any;
	devtype: Devtype;
	enabled?: boolean;
	endDelay: number;
	family?: F;
	flag?: any;
	hint: string;
	name: string;
	nodeDefId?: string;
	parent?: Parent;

	pnode: any;
	property?: DriverState[] | DriverState;

	rpnode: string;
	sgid: string;
	startDelay: number;
	type?: string;
	wattage: number;

	// #endregion Properties (20)
}

interface Node {
	// #region Properties (15)

	address: string;
	dcPeriod: string;
	deviceClass: string;
	enabled: string;
	endDelay: string;
	family: string;
	flag: string;
	hint: string;
	name: string;
	nodeDefId: string;
	parent: Parent;
	pnode: string;
	startDelay: string;
	type: string;
	wattage: string;

	// #endregion Properties (15)
}

interface Parent {
	// #region Properties (2)

	_: string;
	type: string;

	// #endregion Properties (2)
}

interface RootObject {
	// #region Properties (1)

	node: Node;

	// #endregion Properties (1)
}

export interface StaticNodeInfo<F extends Family> {
	// #region Properties (16)

	address: any;
	dcPeriod: number;
	deviceClass?: any;
	enabled?: boolean;
	endDelay: number;
	family?: F;
	flag?: any;
	hint: string;
	name: string;
	nodeDefId?: string;
	parent?: Parent;
	pnode: any;
	property?: DriverState[] | DriverState;
	startDelay: number;
	type?: string;
	wattage: number;

	// #endregion Properties (16)
}

// #endregion Interfaces (7)

// #region Functions (3)

export function isFamily<T extends Family>(nodeInfo: NodeInfo<any>, family: T): nodeInfo is NodeInfo<T> {
	return nodeInfo.family ?? 1 === family;
}

export function parseDeviceInfo<F extends Family>(nodeInfo: NodeInfo<F>) : NodeInfo<F> extends StaticNodeInfo<Family.Insteon> ? { category: Category.Insteon, model: number, firmwareVersion: string, firmwareRevision: string } : DeviceInfo<any, any,any>
{

	const type = nodeInfo.type === undefined || nodeInfo.type === '0.0.0.0' ? nodeInfo.hint : nodeInfo.type;
	const family = nodeInfo.family ?? nodeInfo.family == 0 ? Family.Insteon : nodeInfo.family;
	if(isFamily(nodeInfo, Family.Insteon))
	{
		const s = type.split('.');
		return { category: Number(s[0]), model: Number(s[1]), firmwareVersion: Number(Number(s[2]).toString(16)), firmwareRevision: Number(Number(s[3]).toString(16)) } as any;
	}
	else
	{
		const s = type.split('.');
		return { domain: Number(s[0]), category: Number(s[1]), subcategory: Number(s[1]), model: Number(s[2]) } as any;
	}

}

export function isDynamic(nodeInfo: NodeInfo<any>): nodeInfo is DynamicNodeInfo<any> {
	return [Family.ZWave, Family.ZigBee].includes(nodeInfo.family);
}

export function isStatic(nodeInfo: NodeInfo<any>): nodeInfo is StaticNodeInfo<any> {
	return !isDynamic(nodeInfo);
}

// #endregion Functions (3)
