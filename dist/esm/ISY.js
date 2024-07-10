import WebSocket from 'faye-websocket';
import { writeFile } from 'fs';
import { Parser } from 'xml2js';
import { parseBooleans, parseNumbers } from 'xml2js/lib/processors.js';
import { XmlDocument } from 'xmldoc';
import axios from 'axios';
import { Categories } from './Categories.js';
import { DeviceFactory } from './Devices/DeviceFactory.js';
import { ELKAlarmPanelDevice } from './Devices/Elk/ElkAlarmPanelDevice.js';
import { ElkAlarmSensorDevice } from "./Devices/Elk/ElkAlarmSensorDevice.js";
import { InsteonBaseDevice } from './Devices/Insteon/InsteonBaseDevice.js';
import { InsteonOutletDevice } from './Devices/Insteon/InsteonDevice.js';
import { InsteonDimmableDevice } from './Devices/Insteon/InsteonDimmableDevice.js';
import { InsteonDimmerSwitchDevice } from './Devices/Insteon/InsteonDimmerSwitchDevice.js';
import { InsteonDoorWindowSensorDevice } from './Devices/Insteon/InsteonDoorWindowSensorDevice.js';
import { InsteonFanDevice, InsteonFanMotorDevice } from './Devices/Insteon/InsteonFanDevice.js';
import { InsteonKeypadRelayDevice } from "./Devices/Insteon/InsteonKeypadRelayDevice.js";
import { InsteonKeypadDimmerDevice } from "./Devices/Insteon/InsteonKeypadDimmerDevice.js";
import { InsteonLeakSensorDevice } from './Devices/Insteon/InsteonLeakSensorDevice.js';
import { InsteonLockDevice } from './Devices/Insteon/InsteonLockDevice.js';
import { InsteonMotionSensorDevice } from './Devices/Insteon/InsteonMotionSensorDevice.js';
import { InsteonRelayDevice } from './Devices/Insteon/InsteonRelayDevice.js';
import { InsteonThermostatDevice } from './Devices/Insteon/InsteonThermostatDevice.js';
import { ISYDeviceNode } from './ISYNode.js';
import { Family } from './Definitions/Families.js';
import { EventType } from "./Events/EventType.js";
import { NodeType, Props, States, VariableType } from './ISYConstants.js';
import { ISYNode } from './ISYNode.js';
import { ISYScene } from './ISYScene.js';
import { ISYVariable } from './ISYVariable.js';
import { InsteonOnOffOutletDevice } from './Devices/Insteon/InsteonOnOffOutletDevice.js';
import { InsteonSmokeSensorDevice } from './Devices/Insteon/InsteonSmokeSensorDevice.js';
import { InsteonDimmerOutletDevice } from './Devices/Insteon/InsteonDimmerOutletDevice.js';
import { InsteonKeypadButtonDevice } from './Devices/Insteon/InsteonKeypadDevice.js';
import { EventEmitter } from 'events';
import { Logger, loggers, format } from 'winston';
import * as Utils from './Utils.js';
export { ISYScene, States, Family, VariableType, Categories, Props, ISYVariable, InsteonBaseDevice, InsteonOutletDevice, ISYDeviceNode as ISYDevice, InsteonKeypadDimmerDevice, InsteonKeypadRelayDevice, InsteonKeypadButtonDevice, InsteonDimmableDevice, InsteonFanDevice, InsteonFanMotorDevice, InsteonLeakSensorDevice, InsteonSmokeSensorDevice, InsteonDimmerOutletDevice, InsteonOnOffOutletDevice, InsteonLockDevice, InsteonThermostatDevice, InsteonDoorWindowSensorDevice, InsteonDimmerSwitchDevice, InsteonRelayDevice, InsteonMotionSensorDevice, ISYNode, NodeType, ElkAlarmSensorDevice, ELKAlarmPanelDevice, Utils };
const parser = new Parser({
    explicitArray: false,
    mergeAttrs: true,
    attrValueProcessors: [parseNumbers, parseBooleans],
    valueProcessors: [parseNumbers, parseBooleans]
});
export let Controls = {};
export class ISY extends EventEmitter {
    deviceList = new Map();
    deviceMap = new Map();
    sceneList = new Map();
    folderMap = new Map();
    webSocket;
    zoneMap = new Map();
    protocol;
    host;
    port;
    get address() {
        return `${this.host}:${this.port}`;
    }
    id;
    vendorName = "Universal Devices, Inc.";
    productId = 5226;
    productName = "eisy";
    restlerOptions;
    credentials;
    variableList = new Map();
    nodesLoaded = false;
    wsprotocol = 'ws';
    elkEnabled;
    get isDebugEnabled() {
        return this.logger?.isDebugEnabled();
    }
    displayNameFormat;
    guardianTimer;
    elkAlarmPanel;
    logger;
    lastActivity;
    model;
    serverVersion;
    storagePath;
    configInfo;
    static instance;
    constructor(config, logger = new Logger(), storagePath) {
        super();
        this.storagePath = storagePath ?? './';
        this.displayNameFormat = config.displayNameFormat ?? '${location ?? folder} ${spokenName ?? name}';
        this.host = config.host;
        this.port = config.port;
        this.credentials = {
            username: config.username,
            password: config.password
        };
        this.protocol = config.protocol;
        this.wsprotocol = 'ws';
        this.elkEnabled = config.elkEnabled ?? false;
        this.nodesLoaded = false;
        var fopts = format((info) => { info.message = JSON.stringify(info.message); return info; })({ label: 'ISY' });
        this.logger = loggers.add('isy', { transports: logger.transports, level: logger.level, format: format.label({ label: 'ISY' }) });
        this.guardianTimer = null;
        if (this.elkEnabled) {
            this.elkAlarmPanel = new ELKAlarmPanelDevice(this, 1);
        }
        ISY.instance = this;
    }
    emit(event, node) {
        return super.emit(event, node);
    }
    on(event, listener) {
        return super.on(event, listener);
    }
    async callISY(url) {
        url = `${this.protocol}://${this.address}/rest/${url}/`;
        this.logger.info(`Sending request: ${url}`);
        const xml = await axios.get(url, { auth: { username: this.credentials.username, password: this.credentials.password } });
        return await parser.parseStringPromise(xml.data).then((result) => {
            if (this.checkForFailure(result)) {
                // this.logger.info(`Error calling ISY: ${JSON.stringify(response)}`);
                throw new Error(`Error calling ISY: ${JSON.stringify(result)}`);
            }
            return result;
        }, (reason) => {
            throw new Error(`Error calling ISY: ${JSON.stringify(reason)}`);
        });
    }
    nodeChangedHandler(node, propertyName = null) {
        const that = this;
        if (this.nodesLoaded) {
            // this.logger.info(`Node: ${node.address} changed`);
            // if (this.changeCallback !== undefined && this.changeCallback !== null) {
            // t//his.changeCallback(that, node, propertyName);
            // }
        }
    }
    getElkAlarmPanel() {
        return this.elkAlarmPanel;
    }
    async loadNodes() {
        try {
            const result = await this.callISY('nodes');
            if (this.isDebugEnabled)
                writeFile(this.storagePath + '/ISYNodesDump.json', JSON.stringify(result), this.logger.error);
            await this.readFolderNodes(result).catch(p => this.logger.error('Error Loading Folders', p));
            await this.readDeviceNodes(result).catch(p => this.logger.error('Error Loading Devices', p));
            await this.readSceneNodes(result).catch(p => this.logger.error('Error Loading Scenes', p));
            return result;
        }
        catch (e) {
            throw new Error(`Error loading nodes: ${e.message}`);
        }
    }
    async readFolderNodes(result) {
        this.logger.info('Loading Folder Nodes');
        if (result?.nodes?.folder) {
            for (const folder of result.nodes.folder) {
                this.logger.info(`Loading Folder Node: ${JSON.stringify(folder)}`);
                this.folderMap.set(folder.address, folder.name);
            }
        }
    }
    async readSceneNodes(result) {
        this.logger.info('Loading Scene Nodes');
        for (const scene of result.nodes?.group) {
            if (scene.name === 'ISY' || scene.name === 'Auto DR') {
                continue;
            } // Skip ISY & Auto DR Scenes
            const newScene = new ISYScene(this, scene);
            try {
                await newScene.refreshNotes();
            }
            catch (e) {
                this.logger.debug('No notes found.');
            }
            this.sceneList.set(newScene.address, newScene);
        }
    }
    async readDeviceNodes(obj) {
        this.logger.info('Loading Device Nodes');
        for (const device of obj.nodes.node) {
            this.logger.debug(`Loading Device Node: ${JSON.stringify(device)}`);
            if (!this.deviceMap.has(device.pnode)) {
                const address = device.address;
                this.deviceMap[device.pnode] = {
                    address
                };
            }
            else {
                this.deviceMap[device.pnode].push(device.address);
            }
            let newDevice = null;
            // let deviceTypeInfo = this.isyTypeToTypeName(device.type, device.address);
            // this.logger.info(JSON.stringify(deviceTypeInfo));
            const enabled = device.enabled ?? true;
            const d = DeviceFactory.getDeviceDetails(device);
            if (d.class) {
                newDevice = new d.class(this, device);
                newDevice.productName = d.name;
                newDevice.model = `(${d.modelNumber}) ${d.name} v.${d.version}`;
                newDevice.modelNumber = d.modelNumber;
                newDevice.version = d.version;
            }
            if (enabled) {
                if (newDevice === null) {
                    this.logger.warn(`Device type resolution failed for ${device.name} with type: ${device.type} and nodedef: ${device.nodeDefId}`);
                    newDevice = new ISYDeviceNode(this, device);
                }
                else if (newDevice !== null) {
                    if (d.unsupported) {
                        this.logger.warn('Device not currently supported: ' + JSON.stringify(device) + ' /n It has been mapped to: ' + d.class.name);
                    }
                    try {
                        await newDevice.refreshNotes();
                    }
                    catch (e) {
                        this.logger.debug('No notes found.');
                    }
                    // if (!newDevice.hidden) {
                    // }
                    // this.deviceList.push(newDevice);
                }
                else {
                }
                this.deviceList.set(newDevice.address, newDevice);
            }
            else {
                this.logger.info(`Ignoring disabled device: ${device.name}`);
            }
        }
        this.logger.info(`${this.deviceList.size} devices added.`);
    }
    loadElkNodes(result) {
        const document = new XmlDocument(result);
        const nodes = document
            .childNamed('areas')
            .childNamed('area')
            .childrenNamed('zone');
        for (let index = 0; index < nodes.length; index++) {
            const id = nodes[index].attr.id;
            const name = nodes[index].attr.name;
            const alarmDef = nodes[index].attr.alarmDef;
            const newDevice = new ElkAlarmSensorDevice(this, name, 1, id /*TODO: Handle CO Sensor vs. Door/Window Sensor */);
            this.zoneMap[newDevice.zone] = newDevice;
        }
    }
    loadElkInitialStatus(result) {
        const p = new Parser({
            explicitArray: false,
            mergeAttrs: true
        });
        p.parseString(result, (err, res) => {
            if (err) {
                throw err;
            }
            for (const nodes of res.ae) {
                this.elkAlarmPanel.setFromAreaUpdate(nodes);
            }
            for (const nodes of res.ze) {
                const id = nodes.zone;
                const zoneDevice = this.zoneMap[id];
                if (zoneDevice !== null) {
                    zoneDevice.setFromZoneUpdate(nodes);
                    if (this.deviceList[zoneDevice.address] === null &&
                        zoneDevice.isPresent()) {
                        this.deviceList[zoneDevice.address] = zoneDevice;
                        // this.deviceIndex[zoneDevice.address] = zoneDevice;
                    }
                }
            }
        });
    }
    finishInitialize(success) {
        if (!this.nodesLoaded) {
            this.nodesLoaded = true;
            //initializeCompleted();
            if (success) {
                if (this.elkEnabled) {
                    this.deviceList[this.elkAlarmPanel.address] = this.elkAlarmPanel;
                }
                this.guardianTimer = setInterval(this.guardian.bind(this), 60000);
                this.initializeWebSocket();
            }
        }
    }
    guardian() {
        const timeNow = new Date();
        if (Number(timeNow) - Number(this.lastActivity) > 60000) {
            this.logger.info('Guardian: Detected no activity in more then 60 seconds. Reinitializing web sockets');
            this.initializeWebSocket();
        }
    }
    variableChangedHandler(variable) {
        this.logger.info(`Variable: ${variable.id} (${variable.type}) changed`);
    }
    checkForFailure(response) {
        return (response === null ||
            response instanceof Error ||
            response.RestResponse !== undefined && response.RestResponse.status !== 200);
    }
    async loadVariables(type) {
        const that = this;
        return this.callISY(`vars/definitions/${type}`).then((result) => that.createVariables(type, result))
            .then(() => that.callISY(`vars/get/${type}`)).then(that.setVariableValues.bind(that));
    }
    async loadConfig() {
        try {
            this.logger.info('Loading ISY Config');
            const configuration = (await this.callISY('config')).configuration;
            if (this.isDebugEnabled) {
                writeFile(this.storagePath + '/ISYConfigDump.json', JSON.stringify(configuration), this.logger.error);
            }
            const controls = configuration.controls;
            this.model = configuration.deviceSpecs.model;
            this.serverVersion = configuration.app_version;
            this.vendorName = configuration.deviceSpecs.make;
            this.productId = configuration.product.id;
            this.productName = configuration.product.desc;
            this.id = configuration.root.id;
            // TODO: Check Installed Features
            // this.logger.info(result.configuration);
            if (controls !== undefined) {
                // this.logger.info(controls.control);
                // var arr = new Array(controls.control);
                for (const ctl of controls.control) {
                    // this.logger.info(ctl);
                    Controls[ctl.name] = ctl;
                }
            }
            return configuration;
        }
        catch (e) {
            throw Error(`Error Loading Config: ${e.message}`);
        }
    }
    getVariableList() {
        return this.variableList;
    }
    getVariable(type, id) {
        const key = this.createVariableKey(type, id);
        if (this.variableList.has(key)) {
            return this.variableList[key];
        }
        return null;
    }
    createVariableKey(type, id) {
        return `${type}:${id}`;
    }
    createVariables(type, result) {
        for (const variable of result.CList.e) {
            const id = Number(variable.id);
            const name = variable.name;
            const newVariable = new ISYVariable(this, id, name, type);
            this.variableList.set(this.createVariableKey(type, id), newVariable);
        }
    }
    setVariableValues(result) {
        for (const vals of result.vars.var) {
            const type = Number(vals.type);
            const id = Number(vals.id);
            const variable = this.getVariable(type, id);
            if (variable) {
                variable.init = vals.init;
                variable.value = vals.val;
                variable.lastChanged = new Date(vals.ts);
            }
        }
    }
    async refreshStatuses() {
        try {
            const that = this;
            const result = await that.callISY('status');
            if (that.isDebugEnabled) {
                writeFile(that.storagePath + '/ISYStatusDump.json', JSON.stringify(result), this.logger.error);
            }
            this.logger.debug(result);
            for (const node of result.nodes.node) {
                this.logger.debug(node);
                let device = that.getDevice(node.id);
                if (device !== null && device !== undefined) {
                    let child = device.children.find(p => p.address === node.id);
                    if (child) {
                        //Case FanLinc where we treat the light as a child of the fan.
                        device = child;
                    }
                    if (Array.isArray(node.property)) {
                        for (let prop of node.property) {
                            device.local[prop.id] = device.convertFrom(prop.value, prop.uom);
                            device.formatted[prop.id] = prop.formatted;
                            device.uom[prop.id] = prop.uom;
                            device.logger(`Property ${Controls[prop.id].label} (${prop.id}) initialized to: ${device.local[prop.id]} (${device.formatted[prop.id]})`);
                        }
                    }
                    else if (node.property) {
                        device.local[node.property.id] = device.convertFrom(node.property.value, node.property.uom);
                        device.formatted[node.property.id] = node.property.formatted;
                        device.uom[node.property.id] = node.property.uom;
                        device.logger(`Property ${Controls[node.property.id].label} (${node.property.id}) initialized to: ${device.local[node.property.id]} (${device.formatted[node.property.id]})`);
                    }
                }
                ;
            }
        }
        catch (e) {
            throw new Error(`Error refreshing statuses: ${JSON.stringify(e.message)}`);
        }
    }
    async initialize() {
        const that = this;
        const options = {
            username: this.credentials.username,
            password: this.credentials.password
        };
        try {
            await this.loadConfig();
            await this.loadNodes();
            await this.loadVariables(VariableType.Integer);
            await this.loadVariables(VariableType.State);
            await this.refreshStatuses().then(() => {
                if (this.elkEnabled) {
                    // get(
                    // 	`${this.protocol}://${that.address}/rest/elk/get/topology`,
                    // 	options
                    // ).on('complete', (result: { message: string; }, response: any) => {
                    // 	if (that.checkForFailure(response)) {
                    // 		that.logger.info('Error loading from elk: ' + result.message);
                    // 		throw new Error(
                    // 			'Unable to contact the ELK to get the topology'
                    // 		);
                    // 	} else {
                    // 		that.loadElkNodes(result);
                    // 		get(
                    // 			`${that.protocol}://${that.address}/rest/elk/get/status`,
                    // 			options
                    // 		).on('complete', (result: { message: string; }, response: any) => {
                    // 			if (that.checkForFailure(response)) {
                    // 				that.logger.info(`Error:${result.message}`);
                    // 				throw new Error(
                    // 					'Unable to get the status from the elk'
                    // 				);
                    // 			} else {
                    // 				that.loadElkInitialStatus(result);
                    // 				that.finishInitialize(true, initializeCompleted);
                    // 			}
                    // 		});
                    // 	}
                    // });
                }
                else {
                    that.finishInitialize(true);
                }
            });
        }
        catch (e) {
            throw (e);
        }
        finally {
            if (this.nodesLoaded !== true) {
                that.finishInitialize(true);
            }
        }
        return Promise.resolve(true);
    }
    async handleInitializeError(step, reason) {
        this.logger.error(`Error initializing ISY (${step}): ${JSON.stringify(reason)}`);
        return Promise.reject(reason);
    }
    handleWebSocketMessage(event) {
        this.lastActivity = new Date();
        parser.parseString(event.data, (err, res) => {
            if (err) {
                throw err;
            }
            const evt = res.Event;
            if (evt === undefined || evt.control === undefined) {
                return;
            }
            let actionValue = 0;
            if (evt.action instanceof Object) {
                actionValue = evt.action._;
            }
            else if (evt.action instanceof Number || evt.action instanceof String) {
                actionValue = Number(evt.action);
            }
            const stringControl = Number(evt.control?.replace('_', ''));
            switch (stringControl) {
                case EventType.Elk:
                    if (actionValue === 2) {
                        this.elkAlarmPanel.handleEvent(event);
                    }
                    else if (actionValue === 3) {
                        const zeElement = evt.eventInfo.ze;
                        const zoneId = zeElement.zone;
                        const zoneDevice = this.zoneMap[zoneId];
                        if (zoneDevice !== null) {
                            if (zoneDevice.handleEvent(event)) {
                                this.nodeChangedHandler(zoneDevice);
                            }
                        }
                    }
                    break;
                case EventType.Trigger:
                    if (actionValue === 6) {
                        const varNode = evt.eventInfo.var;
                        const id = varNode.id;
                        const type = varNode.type;
                        this.getVariable(type, id)?.handleEvent(evt);
                    }
                    break;
                case EventType.Heartbeat:
                    this.logger.debug(`Received ${EventType[Number(stringControl)]} Signal from ISY: ${JSON.stringify(evt)}`);
                    break;
                default:
                    if (evt.node !== '' && evt.node !== undefined && evt.node !== null) {
                        //
                        const impactedDevice = this.getDevice(evt.node);
                        if (impactedDevice !== undefined && impactedDevice !== null) {
                            impactedDevice.handleEvent(evt);
                        }
                        else {
                            this.logger.warn(`${EventType[stringControl]} Event for Unidentified Device: ${JSON.stringify(evt)}`);
                        }
                    }
                    else {
                        if (stringControl === EventType.NodeChanged) {
                            this.logger.info(`Received Node Change Event: ${JSON.stringify(evt)}. These are currently unsupported.`);
                        }
                        this.logger.debug(`${EventType[Number(stringControl)]} Event: ${JSON.stringify(evt)}`);
                    }
                    break;
            }
        });
    }
    initializeWebSocket() {
        const that = this;
        const auth = `Basic ${Buffer.from(`${this.credentials.username}:${this.credentials.password}`).toString('base64')}`;
        this.logger.info(`Connecting to: ${this.wsprotocol}://${this.address}/rest/subscribe`);
        this.webSocket = new WebSocket.Client(`${this.wsprotocol}://${this.address}/rest/subscribe`, ['ISYSUB'], {
            headers: {
                Origin: 'com.universal-devices.websockets.isy',
                Authorization: auth
            },
            ping: 10
        });
        this.lastActivity = new Date();
        this.webSocket
            .on('message', (event) => {
            that.handleWebSocketMessage(event);
        })
            .on('error', (err, response) => {
            that.logger.info(`Websocket subscription error: ${JSON.stringify(err.message)}`);
            /// throw new Error('Error calling ISY' + err);
        })
            .on('fail', (data, response) => {
            that.logger.info(`Websocket subscription failure: ${data}`);
            throw new Error('Failed calling ISY');
        })
            .on('abort', () => {
            that.logger.info('Websocket subscription aborted.');
            throw new Error('Call to ISY was aborted');
        })
            .on('timeout', (ms) => {
            that.logger.info(`Websocket subscription timed out after ${ms} milliseconds.`);
            throw new Error('Timeout contacting ISY');
        });
    }
    getDevice(address, parentsOnly = false) {
        let s = this.deviceList.get(address);
        if (!parentsOnly) {
            if (s === null) {
                s = this.deviceList[`${address.substr(0, address.length - 1)} 1`];
            }
        }
        else {
            while (s.parentAddress !== undefined &&
                s.parentAddress !== s.address &&
                s.parentAddress !== null) {
                s = this.deviceList[s.parentAddress];
            }
        }
        return s;
    }
    getScene(address) {
        return this.sceneList.get(address);
    }
    async sendISYCommand(path) {
        // const uriToUse = `${this.protocol}://${this.address}/rest/${path}`;
        this.logger.info(`Sending command...${path}`);
        return this.callISY(path);
    }
    async sendNodeCommand(node, command, parameters) {
        let uriToUse = `nodes/${node.address}/cmd/${command}`;
        if (parameters !== null && parameters !== undefined) {
            if (typeof (parameters) == 'object') {
                var q = parameters;
                for (const paramName of Object.getOwnPropertyNames(q)) {
                    uriToUse += `/${paramName}/${q[paramName]}`;
                }
                //uriToUse += `/${q[((p : Record<string,number|number>) => `${p[]}/${p.paramValue}` ).join('/')}`;
            }
            else if (typeof (parameters) == 'number' || typeof (parameters) == 'string') {
                uriToUse += `/${parameters}`;
            }
        }
        this.logger.info(`${node.name}: sending ${command} command: ${uriToUse}`);
        return this.callISY(uriToUse);
    }
    async sendGetVariable(id, type, handleResult) {
        const uriToUse = `${this.protocol}://${this.address}/rest/vars/get/${type}/${id}`;
        this.logger.info(`Sending ISY command...${uriToUse}`);
        return this.callISY(uriToUse).then((p) => handleResult(p.val, p.init));
    }
    async sendSetVariable(id, type, value, handleResult) {
        const uriToUse = `/rest/vars/set/${type}/${id}/${value}`;
        this.logger.info(`Sending ISY command...${uriToUse}`);
        return this.callISY(uriToUse);
    }
}
