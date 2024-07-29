"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ISYScene = void 0;
const index_js_1 = require("./Devices/Insteon/index.js");
const ISYConstants_js_1 = require("./ISYConstants.js");
const ISYNode_js_1 = require("./ISYNode.js");
class ISYScene extends ISYNode_js_1.ISYNode {
    type;
    connectionType;
    batteryOperated;
    deviceType;
    deviceFriendlyName;
    members;
    isDimmable;
    typeCode;
    constructor(isy, scene) {
        super(isy, scene);
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
                    if (d !== null && d !== undefined) {
                        d.addLink(this);
                    }
                    if (d instanceof index_js_1.Insteon.Dimmer && node.type !== ISYConstants_js_1.LinkType.Controller) {
                        this.isDimmable = true;
                    }
                    this.members.push(d);
                }
            }
        }
        else if (scene.members?.link) {
            if ('_' in scene.members.link) {
                const node = scene.members.link._;
                this.logger(JSON.stringify(node));
                // childDevices.push(node._);
                // childDevices.push(object)
                const s = scene.members.link._;
                const d = isy.getDevice(s);
                if (d) {
                    d.addLink(this);
                    // tslint:disable-next-line: triple-equals
                    if ((d.isDimmable && node.type != ISYConstants_js_1.LinkType.Controller) || this.isDimmable) {
                        this.isDimmable = true;
                    }
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
            if (device instanceof index_js_1.Insteon.Relay) {
                if (device.state) {
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
            if (device instanceof index_js_1.Insteon.Dimmer) {
                lightDeviceCount++;
                blevel += device.brightnessLevel;
            }
            else if (device instanceof index_js_1.Insteon.Relay) {
                lightDeviceCount++;
                blevel += device.state ? 100 : 0;
            }
        }
        if (lightDeviceCount > 0) {
            return Math.floor(blevel / lightDeviceCount);
        }
        else {
            return 0;
        }
    }
    // Current light dim state is always calculated
    recalculateState() {
        this.markAsChanged();
        return true;
    }
    markAsChanged() {
        this.lastChanged = new Date();
        this.emit('PropertyChanged', 'isOn', this.isOn, this.isOn, this.isOn ? 'on' : 'off');
        if (this.isDimmable) {
            this.emit('PropertyChanged', 'brightnesslevel', this.brightnessLevel, this.brightnessLevel, this.brightnessLevel + '%');
        }
    }
    async updateIsOn(lightState) {
        return this.isy.sendNodeCommand(this, lightState ? ISYConstants_js_1.Commands.On : ISYConstants_js_1.Commands.Off);
    }
    async updateBrightnessLevel(level) {
        return this.isy.sendNodeCommand(this, level > 0 ? ISYConstants_js_1.Commands.On : ISYConstants_js_1.Commands.Off, level);
    }
    getAreAllLightsInSpecifiedState(state) {
        for (const device of this.members) {
            if (device instanceof index_js_1.Insteon.Relay) {
                if (device.state !== state) {
                    return false;
                }
            }
        }
        return true;
    }
}
exports.ISYScene = ISYScene;
