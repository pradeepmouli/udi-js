import { Family } from '../Definitions/index.js';


import type { DriverState } from './DriverState.js';

// #region Type aliases (1)

export type NodeInfo<T extends Family = Family> = (T extends Family.ZWave | Family.ZigBee ? DynamicNodeInfo : StaticNodeInfo) & { state?: { [x: string]: DriverState } };

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

export interface DynamicNodeInfo {
	// #region Properties (20)

	address: any;
	custom: Custom;
	dcPeriod: number;
	deviceClass?: any;
	devtype: Devtype;
	enabled?: boolean;
	endDelay: number;
	family?: Family.ZWave;
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

export interface StaticNodeInfo {
	// #region Properties (16)

	address: any;
	dcPeriod: number;
	deviceClass?: any;
	enabled?: boolean;
	endDelay: number;
	family?: Family;
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

export function family<F extends Family>(nodeInfo: NodeInfo<any>): nodeInfo is NodeInfo<F> {
	if (nodeInfo.family === Family.ZWave) {
		return true;
	}
}

export function isDynamic(nodeInfo: NodeInfo<any>): nodeInfo is DynamicNodeInfo {
	return [Family.ZWave, Family.ZigBee].includes(nodeInfo.family);
}

export function isStatic(nodeInfo: NodeInfo<any>): nodeInfo is StaticNodeInfo {
	return !isDynamic(nodeInfo);
}

// #endregion Functions (3)
