import { Family } from "./Families.js";
import { PropertyStatus } from "./PropertyStatus.js";


export interface NodeInfo {
	family: Family;
	type?: string;
	enabled?: boolean;
	deviceClass?: any;
	pnode: any;
	property?: PropertyStatus[] | PropertyStatus;
	flag?: any;
	nodeDefId?: string;
	address: any;
	name: string;
	parent?: any;
	startDelay: number;
	hint: string;

	endDelay: number;
	wattage: number;
	dcPeriod: number;
}
