/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { Insteon } from "../../../Definitions/index.js";
import type { DriverState } from "../../../Model/DriverState.js";
import { NodeFactory } from "../../NodeFactory.js";

const nodeDefId = "I3PaddleFlags";

type Commands = I3PaddleFlags.Commands;
type Drivers = I3PaddleFlags.Drivers;

export class I3PaddleFlagsNode extends Base<Drivers, Commands> implements I3PaddleFlags.Interface {
	public override readonly commands = {
		GV0: this.updateMode,
		GV1: this.updateProgramLock,
		GV2: this.updateResumeDim,
		GV4: this.updateKeyBeep,
		GV5: this.updateDisableRf,
		GV6: this.updateButtonLock,
		GV7: this.updateErrorBlink,
		QUERY: this.query,
		WDU: this.writeChanges
	};
	static override nodeDefId = "I3PaddleFlags";
	static override implements = ["I3PaddleFlags"];
	declare readonly nodeDefId: "I3PaddleFlags";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Boolean, label: "Mode", name: "mode" });
		this.drivers.GV1 = Driver.create("GV1", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Boolean, label: "Program Lock", name: "programLock" });
		this.drivers.GV2 = Driver.create("GV2", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Boolean, label: "Resume Dim", name: "resumeDim" });
		this.drivers.GV4 = Driver.create("GV4", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Boolean, label: "Key Beep", name: "keyBeep" });
		this.drivers.GV5 = Driver.create("GV5", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Boolean, label: "Disable RF", name: "disableRf" });
		this.drivers.GV6 = Driver.create("GV6", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Boolean, label: "Button Lock", name: "buttonLock" });
		this.drivers.GV7 = Driver.create("GV7", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Boolean, label: "Error Blink", name: "errorBlink" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async updateMode(value: Insteon.I3RelayDim) { return this.sendCommand("GV0", value); }
	async updateProgramLock(value: Insteon.I3OnOff) { return this.sendCommand("GV1", value); }
	async updateResumeDim(value: Insteon.I3OnOff) { return this.sendCommand("GV2", value); }
	async updateKeyBeep(value: Insteon.I3OnOff) { return this.sendCommand("GV4", value); }
	async updateDisableRf(value: Insteon.I3OnOff) { return this.sendCommand("GV5", value); }
	async updateButtonLock(value: Insteon.I3OnOff) { return this.sendCommand("GV6", value); }
	async updateErrorBlink(value: Insteon.I3OnOff) { return this.sendCommand("GV7", value); }
	async query() { return this.sendCommand("QUERY"); }
	async writeChanges() { return this.sendCommand("WDU"); }
	public get mode(): Insteon.I3RelayDim {
		return this.drivers.ST?.value;
	}
	public get programLock(): Insteon.I3OnOff {
		return this.drivers.GV1?.value;
	}
	public get resumeDim(): Insteon.I3OnOff {
		return this.drivers.GV2?.value;
	}
	public get keyBeep(): Insteon.I3OnOff {
		return this.drivers.GV4?.value;
	}
	public get disableRf(): Insteon.I3OnOff {
		return this.drivers.GV5?.value;
	}
	public get buttonLock(): Insteon.I3OnOff {
		return this.drivers.GV6?.value;
	}
	public get errorBlink(): Insteon.I3OnOff {
		return this.drivers.GV7?.value;
	}
	public get responding(): Insteon.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(I3PaddleFlagsNode);

export namespace I3PaddleFlags {
	export interface Interface extends Omit<InstanceType<typeof I3PaddleFlagsNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "I3PaddleFlags";
	}
	export function is(node: ISYNode<any, any, any, any>): node is I3PaddleFlagsNode { return ["I3PaddleFlags"].includes(node.nodeDefId); }
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is I3PaddleFlagsNode {
		return ["I3PaddleFlags", "I3KeypadFlags"].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new I3PaddleFlagsNode(isy, nodeInfo);
	}
	export const Node = I3PaddleFlagsNode;
	export type Commands = {
		GV0: ((value: Insteon.I3RelayDim) => Promise<boolean>) & {
			label: "Mode";
			name: "updateMode";
		};
		GV1: ((value: Insteon.I3OnOff) => Promise<boolean>) & {
			label: "Program Lock";
			name: "updateProgramLock";
		};
		GV2: ((value: Insteon.I3OnOff) => Promise<boolean>) & {
			label: "Resume Dim";
			name: "updateResumeDim";
		};
		GV4: ((value: Insteon.I3OnOff) => Promise<boolean>) & {
			label: "Key Beep";
			name: "updateKeyBeep";
		};
		GV5: ((value: Insteon.I3OnOff) => Promise<boolean>) & {
			label: "Disable RF";
			name: "updateDisableRf";
		};
		GV6: ((value: Insteon.I3OnOff) => Promise<boolean>) & {
			label: "Button Lock";
			name: "updateButtonLock";
		};
		GV7: ((value: Insteon.I3OnOff) => Promise<boolean>) & {
			label: "Error Blink";
			name: "updateErrorBlink";
		};
		QUERY: (() => Promise<boolean>) & {
			label: "Query";
			name: "query";
		};
		WDU: (() => Promise<boolean>) & {
			label: "Write Changes";
			name: "writeChanges";
		};
	};
	export type Drivers = {
		ST: {
			uom: UnitOfMeasure.Boolean;
			value: Insteon.I3RelayDim;
			label: "Mode";
			name: "mode";
		};
		GV1: {
			uom: UnitOfMeasure.Boolean;
			value: Insteon.I3OnOff;
			label: "Program Lock";
			name: "programLock";
		};
		GV2: {
			uom: UnitOfMeasure.Boolean;
			value: Insteon.I3OnOff;
			label: "Resume Dim";
			name: "resumeDim";
		};
		GV4: {
			uom: UnitOfMeasure.Boolean;
			value: Insteon.I3OnOff;
			label: "Key Beep";
			name: "keyBeep";
		};
		GV5: {
			uom: UnitOfMeasure.Boolean;
			value: Insteon.I3OnOff;
			label: "Disable RF";
			name: "disableRf";
		};
		GV6: {
			uom: UnitOfMeasure.Boolean;
			value: Insteon.I3OnOff;
			label: "Button Lock";
			name: "buttonLock";
		};
		GV7: {
			uom: UnitOfMeasure.Boolean;
			value: Insteon.I3OnOff;
			label: "Error Blink";
			name: "errorBlink";
		};
		ERR: {
			uom: UnitOfMeasure.Index;
			value: Insteon.Error;
			label: "Responding";
			name: "responding";
		};
	};
}
