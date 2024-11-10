import { Insteon } from './Devices/Insteon/index.js';
import { Family } from './Definitions/Global/Families.js';
import { Commands, LinkType } from './ISYConstants.js';
import { ISYNode } from './ISYNode.js';
import {  ISYDevice } from './ISYDevice.js';
import type { ISY } from './ISY.js';
import type { Driver } from './Definitions/Global/Drivers.js';
import type { Command } from './Definitions/Global/Commands.js';
import type { NodeInfo, StaticNodeInfo } from './Model/NodeInfo.js';

interface SceneInfo extends StaticNodeInfo
 {
	members?: {
		link: any;
	};
	flag?: any;
	nodeDefId?: string;
	address: string;
	name: string;
	family?: Family;
	parent?: any;
	enabled: boolean;
	startDelay: number;
}

export class ISYScene extends ISYNode<Family.Scene, Driver.Signatures<'ST'>,Command.Signatures<'DON' | 'DOF'>> {

	public connectionType: string;
	public batteryOperated: boolean;
	public deviceType: any;
	public deviceFriendlyName: string;
	public members: ISYDevice<any,any,any>[];
	public typeCode: string;
	constructor(isy: ISY, scene: SceneInfo) {
		super(isy, scene as SceneInfo);
		// this.logger(JSON.stringify(scene));
		this.typeCode = '';
		this.connectionType = 'Insteon Wired';
		this.batteryOperated = false;

		this.deviceFriendlyName = 'ISY Scene';
		this.members = [];
		this.isDimmable = false;
		if (Array.isArray(scene.members?.link)) {
			for (const node of scene.members.link) {
				if ('_' in node) {
					// childDevices.push(node._);
					// childDevices.push(object)
					const s = node._;
					const d = isy.getDevice(s);

					if (d !== null && d !== undefined) { d.addLink(this); }

					if (d instanceof Insteon.Dimmer && node.type !== LinkType.Controller) { this.isDimmable = true; }
					this.members.push(d);
				}
			}
		} else if (scene.members?.link) {
			if ('_' in scene.members.link) {
				const node = scene.members.link._;
				this.logger(JSON.stringify(node));
				// childDevices.push(node._);
				// childDevices.push(object)
				const s = scene.members.link._;
				const d = isy.getDevice(s);
				if (d) { d.addLink(this);
				// tslint:disable-next-line: triple-equals
				if ((d.isDimmable && node.type != LinkType.Controller) || this.isDimmable) { this.isDimmable = true; }
				this.members.push(d);
				}
			}
		}
		// check dimmability this.dimmable = Array.apply(p => p.dimmable);
		this.recalculateState();
	}
	// Get the current light state
	get isOn() {
		for (const device of this.members) {
			if (device instanceof Insteon.Relay)  {
				if (device.drivers.ST?.value != 0) {
					return true;
				}
			}
		}
		return false;
	}

	get brightnessLevel() {
		let lightDeviceCount = 0;
		let blevel = 0;
		for (const device of this.members) {
			if (device instanceof Insteon.Dimmer) {
				lightDeviceCount++;
				//blevel += device.brightnessLevel;
			} else if (device instanceof Insteon.Relay) {
				lightDeviceCount++;
				blevel += device.drivers.ST ? 100 : 0;
			}
		}
		if (lightDeviceCount > 0) {
			return Math.floor(blevel / lightDeviceCount);
		} else {
			return 0;
		}
	}
	// Current light dim state is always calculated
	public recalculateState() {
		this.markAsChanged();
		return true;
	}
	public markAsChanged() {
		this.lastChanged = new Date();
		this.emit('propertyChanged', 'isOn', this.isOn, this.isOn, this.isOn ? 'on' : 'off');

		if (this.isDimmable) {
			this.emit('propertyChanged', 'brightnesslevel', this.brightnessLevel, this.brightnessLevel, this.brightnessLevel + '%');

		}
	}
	public async updateIsOn(lightState: boolean) {
		return this.isy.sendNodeCommand(this, lightState ? Commands.On : Commands.Off);
	}
	public async updateBrightnessLevel(level) {
		return this.isy.sendNodeCommand(this, level > 0 ? Commands.On : Commands.Off, level);
	}
	public getAreAllLightsInSpecifiedState(state) {
		for (const device of this.members) {
			if (device instanceof Insteon.Relay) {
				if (device.drivers.ST !== state) {
					return false;
				}
			}
		}
		return true;
	}


}
