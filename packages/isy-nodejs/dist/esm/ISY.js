import { writeFile } from 'fs';
import axios from 'axios';
import { EventEmitter } from 'events';
import { format, Logger, loggers } from 'winston';
import WebSocket from 'ws';
import { Parser } from 'xml2js';
import { parseBooleans, parseNumbers } from 'xml2js/lib/processors.js';
import { DeviceFactory } from './Devices/DeviceFactory.js';
import { ELKAlarmPanelDevice } from './Devices/Elk/ElkAlarmPanelDevice.js';
import { EventType } from './Events/EventType.js';
import { ISYDeviceNode } from './Devices/ISYDeviceNode.js';
import { ISYScene } from './ISYScene.js';
import { ISYVariable } from './ISYVariable.js';
import { VariableType } from './VariableType.js';
import * as Utils from './Utils.js';
import { XMLParser } from 'fast-xml-parser';
import path from 'path';
import { CompositeDevice } from './Devices/CompositeDevice.js';
import { GenericNode } from './Devices/GenericNode.js';
import { NodeFactory } from './Devices/NodeFactory.js';
import { ISYError } from './ISYError.js';
import { findPackageJson } from './Utils.js';
class ISYInitializationError extends ISYError {
    step;
    constructor(messageOrError, step) {
        super(messageOrError);
        this.name = 'ISYInitializationError';
        this.step = step;
    }
}
const defaultParserOptions = {
    explicitArray: false,
    mergeAttrs: true,
    attrValueProcessors: [parseNumbers, parseBooleans],
    valueProcessors: [parseNumbers, parseBooleans],
    tagNameProcessors: [(tagName) => (tagName === 'st' || tagName === 'cmd' || tagName === 'nodeDef' ? '' : tagName)]
};
const defaultXMLParserOptions = {
    parseAttributeValue: true,
    allowBooleanAttributes: true,
    attributeNamePrefix: '',
    attributesGroupName: false,
    ignoreAttributes: false,
    // updateTag(tagName, jPath, attrs) {
    // 	//if(tagName === 'st' || tagName === 'cmd' || tagName === 'nodeDef')
    // 	//	return false;
    // 	//return tagName;
    // },
    textNodeName: '_',
    commentPropName: '$comment',
    cdataPropName: '$cdata',
    ignoreDeclaration: true,
    tagValueProcessor: (tagName, tagValue, jPath, hasAttributes, isLeafNode) => {
        if (tagValue === '')
            return null;
        return tagValue;
    },
    isArray(tagName, jPath, isLeafNode, isAttribute) {
        if (tagName === 'property')
            return true;
        return false;
    }
};
axios.defaults.transitional.forcedJSONParsing = false;
let s = ISYDeviceNode;
const parser = new Parser(defaultParserOptions);
export let Controls = {};
export class ISY extends EventEmitter {
    // #region Properties (30)
    credentials;
    deviceList = new Map();
    deviceMap = new Map();
    displayNameFormat;
    elkEnabled;
    enableWebSocket;
    folderMap = new Map();
    host;
    nodeMap = new Map();
    port;
    protocol;
    sceneList = new Map();
    storagePath;
    variableList = new Map();
    wsprotocol = 'ws';
    zoneMap = new Map();
    static instance;
    configInfo;
    elkAlarmPanel;
    guardianTimer;
    id;
    lastActivity;
    logger;
    model;
    nodesLoaded = false;
    productId = 5226;
    productName = 'eisy';
    firmwareVersion;
    vendorName = 'Universal Devices, Inc.';
    webSocket;
    apiVersion;
    socketPath;
    axiosOptions;
    // #endregion Properties (30)
    // #region Constructors (1)
    constructor(config, logger = new Logger(), storagePath) {
        super();
        this.enableWebSocket = config.enableWebSocket ?? true;
        this.storagePath = storagePath ?? './';
        this.displayNameFormat = config.displayNameFormat ?? '${location ?? folder} ${spokenName ?? name}';
        this.host = config.host;
        this.port = config.port;
        this.credentials = {
            username: config.username,
            password: config.password
        };
        this.protocol = config.protocol;
        this.wsprotocol = config.protocol === 'https' ? 'wss' : 'ws';
        this.socketPath = config.socketPath;
        this.axiosOptions = {
            baseURL: `${this.protocol}://${this.host}:${this.port}`,
            validateStatus: (status) => status >= 200 && status < 300
        };
        if (this.socketPath) {
            this.axiosOptions.socketPath = this.socketPath;
        }
        else {
            this.axiosOptions.auth = { username: this.credentials.username, password: this.credentials.password };
        }
        this.webSocketOptions = { origin: 'com.universal-devices.websockets.isy' };
        if (this.socketPath) {
            this.webSocketOptions.socketPath = this.socketPath;
        }
        else {
            this.webSocketOptions.auth = `${this.credentials.username}:${this.credentials.password}`;
        }
        //this.elkEnabled = config.elkEnabled ?? false;
        this.nodesLoaded = false;
        var fopts = format((info) => {
            info.message = JSON.stringify(info.message);
            return info;
        })({ label: 'ISY' });
        this.logger = loggers.add('isy', {
            transports: logger.transports,
            levels: logger.levels,
            format: format.label({ label: 'ISY' })
        });
        this.guardianTimer = null;
        if (this.elkEnabled) {
            this.elkAlarmPanel = new ELKAlarmPanelDevice(this, 1);
        }
        ISY.instance = this;
    }
    // #endregion Constructors (1)
    // #region Public Getters And Setters (2)
    get address() {
        return `${this.host}:${this.port}`;
    }
    get isDebugEnabled() {
        return this.logger?.isDebugEnabled();
    }
    // #endregion Public Getters And Setters (2)
    // #region Public Methods (24)
    [Symbol.dispose]() {
        this.close();
    }
    emit(event, node) {
        return super.emit(event, node);
    }
    getDevice(address, parentsOnly = false) {
        let s = this.deviceList.get(address);
        if (!parentsOnly) {
            if (s === null) {
                s = this.deviceList[`${address.substr(0, address.length - 1)} 1`];
            }
        }
        else {
            while (s.parentAddress !== undefined && s.parentAddress !== s.address && s.parentAddress !== null) {
                s = this.deviceList[s.parentAddress];
            }
        }
        return s;
    }
    getElkAlarmPanel() {
        return this.elkAlarmPanel;
    }
    getNode(address, parentsOnly = false) {
        let s = this.nodeMap.get(address);
        if (!parentsOnly) {
            if (s === null) {
                s = this.nodeMap[`${address.substr(0, address.length - 1)} 1`];
            }
        }
        else {
            while (s.parentAddress !== undefined && s.parentAddress !== s.address && s.parentAddress !== null) {
                s = this.nodeMap[s.parentAddress];
            }
        }
        return s;
    }
    getScene(address) {
        return this.sceneList.get(address);
    }
    getVariable(type, id) {
        const key = this.#createVariableKey(type, id);
        if (this.variableList.has(key)) {
            return this.variableList[key];
        }
        return null;
    }
    getVariableList() {
        return this.variableList;
    }
    async handleInitializeError(step, reason) {
        this.logger.error(`Error initializing ISY (${step}): ${Utils.logStringify(reason)}`);
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
                        const impactedDevice = this.getNode(evt.node);
                        if (impactedDevice !== undefined && impactedDevice !== null) {
                            try {
                                impactedDevice.handleEvent(evt);
                            }
                            catch (e) {
                                this.logger.error(`Error handling event for ${impactedDevice.name}: ${e.message}`);
                            }
                        }
                        else {
                            this.logger.debug(`${EventType[stringControl]} Event for Unidentified Device: ${JSON.stringify(evt)}`);
                        }
                    }
                    else {
                        if (stringControl === EventType.NodeChanged) {
                            this.logger.debug(`Received Node Change Event: ${JSON.stringify(evt)}. These are currently unsupported.`);
                        }
                        this.logger.debug(`${EventType[Number(stringControl)]} Event: ${JSON.stringify(evt)}`);
                    }
                    break;
            }
        });
    }
    async initialize() {
        const that = this;
        try {
            this.apiVersion = (await findPackageJson()).version;
        }
        catch (e) {
            this.logger.error(`Unable to read package.json: ${e.message}`);
        }
        try {
            await this.loadConfig();
            await this.loadNodes();
            await this.refreshStatuses();
            await this.loadVariables(VariableType.Integer);
            await this.loadVariables(VariableType.State);
            await this.#finishInitialize(true);
            return true;
        }
        catch (e) {
            if (e instanceof ISYInitializationError) {
                if (e.step === 'variables') {
                    this.logger.warn(`Error loading variables: ${e.message}`);
                    await this.#finishInitialize(true);
                    return true;
                }
                this.logger.error(`Error initializing ISY during (${e.step}): ${e.message}`);
                return false;
            }
            else {
                this.logger.error(`Error initializing ISY: ${e.message}`);
                return false;
            }
        }
        finally {
            if (this.nodesLoaded !== true) {
                await that.#finishInitialize(false);
            }
        }
    }
    webSocketOptions;
    async initializeWebSocket() {
        try {
            const that = this;
            //const auth = `Basic ${Buffer.from(`${this.credentials.username}:${this.credentials.password}`).toString('base64')}`;
            let address = `${this.wsprotocol}://${this.address}/rest/subscribe`;
            if (this.socketPath) {
                address = `ws+unix:${this.socketPath}:/rest/subscribe`;
            }
            this.logger.info(`Opening webSocket: ${address}`);
            this.logger.info('Using the following websocket options: ' + JSON.stringify(this.webSocketOptions));
            if (this.webSocket) {
                try {
                    this.webSocket.close();
                }
                catch (e) {
                    this.logger.warn(`Error closing existing websocket: ${e.message}`);
                }
            }
            let p = new Promise((resolve, reject) => {
                let webSocket = new WebSocket(`${address}`, ['ISYSUB'], this.webSocketOptions);
                //this.webSocket.onmessage = (event) => {this.handleWebSocketMessage()
                webSocket
                    .on('open', () => {
                    this.logger.info('Websocket connection open');
                    resolve(webSocket);
                })
                    .on('message', (data, b) => {
                    that.logger.silly(`Received message: ${Utils.logStringify(data, 1)}`);
                    that.handleWebSocketMessage({ data: data });
                })
                    .on('error', (err, response) => {
                    that.logger.warn(`Websocket subscription error: ${err}`);
                    reject(new ISYInitializationError('Websocket subscription error', 'websocket'));
                })
                    .on('fail', (data, response) => {
                    that.logger.warn(`Websocket subscription failure: ${data}`);
                    reject(new Error('Websocket subscription failure'));
                })
                    .on('abort', () => {
                    that.logger.warn('Websocket subscription aborted.');
                    throw new Error('Websocket subscription aborted.');
                })
                    .on('timeout', (ms) => {
                    that.logger.warn(`Websocket subscription timed out after ${ms} milliseconds.`);
                    reject(new Error('Timeout contacting ISY'));
                    //throw new Error('Timeout contacting ISY');
                });
            });
            this.webSocket = await p;
        }
        catch (e) {
            throw new ISYInitializationError(e, 'websocket');
        }
    }
    async loadConfig() {
        try {
            this.logger.info('Loading ISY Config');
            const configuration = (await this.sendRequest('config')).configuration;
            if (this.isDebugEnabled) {
                writeFile(path.resolve(this.storagePath, 'ISYConfigDump.json'), JSON.stringify(configuration), this.logger.error);
            }
            const controls = configuration.controls;
            this.model = configuration.deviceSpecs.model;
            this.firmwareVersion = configuration.app_full_version;
            this.vendorName = configuration.deviceSpecs.make;
            this.productId = configuration.product.id;
            this.productName = configuration.product.desc;
            this.id = configuration.root.id;
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
            throw new ISYInitializationError(e, 'config');
        }
    }
    async loadNodes() {
        try {
            this.logger.info('Loading ISY Nodes');
            const result = await this.sendRequest('nodes');
            if (this.isDebugEnabled)
                writeFile(this.storagePath + '/ISYNodesDump.json', JSON.stringify(result), this.logger.error);
            await this.#readFolderNodes(result);
            await this.#readDeviceNodes(result);
            await this.#readSceneNodes(result);
            return result;
        }
        catch (e) {
            if (e instanceof ISYInitializationError) {
                throw e;
            }
            else {
                throw new ISYInitializationError(e, 'loadNodes');
            }
        }
    }
    async loadVariables(type) {
        try {
            const that = this;
            this.logger.info(`Loading ISY Variables of type: ${type}`);
            return this.sendRequest(`vars/definitions/${type}`)
                .then((result) => that.#createVariables(type, result))
                .then(() => that.sendRequest(`vars/get/${type}`))
                .then(that.#setVariableValues.bind(that));
        }
        catch {
            this.logger.warn('error loading variables');
        }
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
    on(event, listener) {
        return super.on(event, listener);
    }
    async refreshStatuses() {
        try {
            this.logger.info('Refreshing ISY Node Statuses');
            const that = this;
            const result = await that.sendRequest('status');
            if (that.isDebugEnabled) {
                writeFile(that.storagePath + '/ISYStatusDump.json', JSON.stringify(result), this.logger.error);
            }
            //this.logger.debug(result);
            for (const node of result.nodes.node) {
                let device = that.getNode(node.id);
                if (device !== null && device !== undefined) {
                    device.parseResult(node);
                }
            }
        }
        catch (e) {
            throw new Error(`Error refreshing statuses: ${JSON.stringify(e.message)}`);
        }
    }
    async sendGetVariable(id, type, handleResult) {
        const uriToUse = `vars/get/${type}/${id}`;
        return this.sendRequest(uriToUse).then((p) => handleResult(p.val, p.init));
    }
    async sendISYCommand(path) {
        // const uriToUse = `${this.protocol}://${this.address}/rest/${path}`;
        this.logger.info(`Sending command...${path}`);
        return this.sendRequest(path);
    }
    async sendNodeCommand(node, command, parameters) {
        let uriToUse = `nodes/${node.address}/cmd/${command}`;
        if (parameters !== null && parameters !== undefined) {
            if (typeof parameters == 'object') {
                var q = parameters;
                for (const paramName in q) {
                    if (paramName === 'value' || paramName === 'default') {
                        uriToUse += `/${q[paramName]}`;
                        continue;
                    }
                    else if (typeof q[paramName] === 'string' || typeof q[paramName] === 'number')
                        uriToUse += `/${paramName}/${q[paramName]}`;
                }
                //uriToUse += `/${q[((p : Record<string,number|number>) => `${p[]}/${p.paramValue}` ).join('/')}`;
            }
            else if (typeof parameters == 'number' || typeof parameters == 'string') {
                uriToUse += `/${parameters}`;
            }
        }
        this.logger.info(`${node.name}: sending ${command} command: ${uriToUse}`);
        return this.sendRequest(uriToUse);
    }
    async sendRequest(url, options = { trailingSlash: true }) {
        const requestLogLevel = options.requestLogLevel ?? 'debug';
        const responseLogLevel = options.responseLogLevel ?? 'silly';
        const finalUrl = `${this.protocol}://${this.address}/rest/${url}${options.trailingSlash ? '/' : ''}`;
        this.logger.log(requestLogLevel, `Sending request: ${finalUrl}`);
        const reqOps = { ...this.axiosOptions, ...options, url: path.join('/rest', url) };
        /*{
                auth: { username: this.credentials.username, password: this.credentials.password },
                baseURL: `${this.protocol}://${this.address}`,

            }*/
        try {
            const response = await axios.get(finalUrl, reqOps);
            if (response.data) {
                if (response.headers['content-type'].toString().includes('xml')) {
                    let curParser = parser;
                    if (options.parserOptions)
                        curParser = new Parser({ ...defaultParserOptions, ...options.parserOptions });
                    var altParser = new XMLParser(defaultXMLParserOptions);
                    var s = altParser.parse(response.data);
                    this.logger.log(requestLogLevel ?? 'debug', `Response: ${JSON.stringify(s)}`);
                    return s;
                }
                else if (response.headers['content-type'].toString().includes('json')) {
                    this.logger.log(responseLogLevel, `Response: ${JSON.stringify(response.data)}`);
                    return JSON.parse(response.data);
                }
                else {
                    this.logger.log(responseLogLevel, `Response Header: ${JSON.stringify(response.headers)} Response: ${JSON.stringify(response.data)}`);
                    return response.data;
                }
            }
        }
        catch (error) {
            if (options.throwOnError) {
                throw error;
            }
            else {
                if (options.errorLogLevel) {
                    this.logger.log(options.errorLogLevel, `Error sending request to ISY: ${error?.message}`);
                }
                else {
                    this.logger.error(`Error sending request to ISY: ${error?.message}`);
                }
            }
        }
    }
    async sendSetVariable(id, type, value, handleResult) {
        const uriToUse = `/rest/vars/set/${type}/${id}/${value}`;
        this.logger.info(`Sending ISY command...${uriToUse}`);
        return this.sendRequest(uriToUse);
    }
    #variableChangedHandler(variable) {
        this.logger.info(`Variable: ${variable.id} (${variable.type}) changed`);
    }
    close() {
        try {
            this.webSocket?.close();
        }
        catch (e) {
            this.logger.error(`Error closing websocket: ${e.message}`);
        }
    }
    // #endregion Public Methods (24)
    // #region Private Methods (11)
    #checkForFailure(response) {
        return response === null || response instanceof Error || (response.RestResponse !== undefined && response.RestResponse.status !== 200);
    }
    #createVariableKey(type, id) {
        return `${type}:${id}`;
    }
    #createVariables(type, result) {
        for (const variable of result.CList.e) {
            const id = Number(variable.id);
            const name = variable.name;
            const newVariable = new ISYVariable(this, id, name, type);
            this.variableList.set(this.#createVariableKey(type, id), newVariable);
        }
    }
    async #finishInitialize(success) {
        if (!this.nodesLoaded) {
            this.nodesLoaded = true;
            //initializeCompleted();
            if (success) {
                // if (this.elkEnabled) {
                // 	this.deviceList[this.elkAlarmPanel.address] = this.elkAlarmPanel;
                // }
                if (this.enableWebSocket) {
                    this.guardianTimer = setInterval(this.#guardian.bind(this), 60000);
                    return this.initializeWebSocket();
                }
            }
        }
    }
    async #guardian() {
        const timeNow = new Date();
        if (Number(timeNow) - Number(this.lastActivity) > 60000) {
            this.logger.info('Guardian: Detected no activity in more then 60 seconds. Reinitializing web sockets');
            await this.refreshStatuses();
            await this.initializeWebSocket();
        }
    }
    #loadElkInitialStatus(result) {
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
                    if (this.deviceList[zoneDevice.address] === null && zoneDevice.isPresent()) {
                        this.deviceList[zoneDevice.address] = zoneDevice;
                        // this.deviceIndex[zoneDevice.address] = zoneDevice;
                    }
                }
            }
        });
    }
    /* #loadElkNodes(result: any) {
        const document = new XmlDocument(result);
        const nodes = document.childNamed('areas').childNamed('area').childrenNamed('zone');
        for (let index = 0; index < nodes.length; index++) {
            const id = nodes[index].attr.id;
            const name = nodes[index].attr.name;
            const alarmDef = nodes[index].attr.alarmDef;
            const newDevice = new ElkAlarmSensorDevice(this, name, 1, id TODO: Handle CO Sensor vs. Door/Window Sensor );
            this.zoneMap[newDevice.zone] = newDevice;
        }
    } */
    async #readDeviceNodes(obj) {
        try {
            this.logger.info('Reading Device Nodes');
            for (const nodeInfo of obj.nodes.node) {
                try {
                    this.logger.debug(`Loading Device Node: ${JSON.stringify(nodeInfo)}`);
                    if (!this.deviceMap.has(nodeInfo.pnode)) {
                        const address = nodeInfo.address;
                        this.deviceMap[nodeInfo.pnode] = {
                            address
                        };
                    }
                    else {
                        this.deviceMap[nodeInfo.pnode].push(nodeInfo.address);
                    }
                    let newDevice = null;
                    // let deviceTypeInfo = this.isyTypeToTypeName(device.type, device.address);
                    // this.logger.info(JSON.stringify(deviceTypeInfo));
                    const enabled = nodeInfo.enabled ?? true;
                    const d = await NodeFactory.get(nodeInfo);
                    const m = DeviceFactory.getDeviceDetails(nodeInfo);
                    const cls = m.class ?? d;
                    nodeInfo.property = Array.isArray(nodeInfo.property) ? nodeInfo.property : [nodeInfo.property];
                    nodeInfo.state = nodeInfo.property.reduce((acc, p) => {
                        if (p && p?.id) {
                            p.name = p.name == '' ? undefined : p.name;
                            acc[p.id] = p;
                        }
                        return acc;
                    }, {});
                    if (cls) {
                        try {
                            newDevice = new cls(this, nodeInfo);
                        }
                        catch (e) {
                            this.logger.error(`Error creating device ${nodeInfo.name} with type ${nodeInfo.type} and nodedef ${nodeInfo.nodeDefId}: ${e.message}`);
                            continue;
                        }
                        //newDevice = new cls(this, nodeInfo) as ISYDeviceNode<any, any, any, any>;
                    }
                    if (m && newDevice) {
                        newDevice.productName = m.name;
                        newDevice.model = `(${m.modelNumber}) ${m.name} v.${m.version}`;
                        newDevice.modelNumber = m.modelNumber;
                        newDevice.version = m.version;
                    }
                    if (enabled) {
                        if (newDevice === null) {
                            this.logger.warn(`Device type resolution failed for ${nodeInfo.name} with type: ${nodeInfo.type} and nodedef: ${nodeInfo.nodeDefId}`);
                            newDevice = new GenericNode(this, nodeInfo);
                        }
                        else if (newDevice !== null) {
                            if (m.unsupported) {
                                this.logger.warn('Device not currently supported: ' + JSON.stringify(nodeInfo) + ' /n It has been mapped to: ' + d.name);
                            }
                            try {
                                //await newDevice.refreshNotes();
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
                        this.nodeMap.set(newDevice.address, CompositeDevice.isComposite(newDevice) ? newDevice.root : newDevice);
                        if (CompositeDevice.isComposite(newDevice)) {
                            if (this.deviceList.set)
                                this.deviceList.set(newDevice.address, newDevice);
                        }
                    }
                    else {
                        this.logger.info(`Ignoring disabled device: ${nodeInfo.name}`);
                    }
                }
                catch (e) {
                    this.logger.error(`Error loading device node: ${e.message}`);
                }
            }
            this.logger.info(`${this.nodeMap.size} nodes added.`);
            for (const node of this.nodeMap.values()) {
                if (node.parentAddress !== node.address) {
                    let parent = this.deviceList.get(node.parentAddress);
                    if (parent && CompositeDevice.isComposite(parent))
                        parent.addNode(node);
                }
                else if (!this.deviceList.has(node.address)) {
                    this.deviceList.set(node.address, node);
                }
            }
            this.logger.info(`${this.deviceList.size} unique devices added.`);
        }
        catch (e) {
            throw new ISYInitializationError(e, 'readDevices');
        }
    }
    async #readFolderNodes(result) {
        try {
            this.logger.info('Reading Folder Nodes');
            if (result?.nodes?.folder) {
                for (const folder of result.nodes.folder) {
                    this.logger.debug(`Loading Folder Node: ${JSON.stringify(folder)}`);
                    this.folderMap.set(folder.address, folder.name);
                }
            }
        }
        catch (e) {
            throw new ISYInitializationError(e, 'readFolders');
        }
    }
    async #readSceneNodes(result) {
        try {
            this.logger.info('Loading Scene Nodes');
            for (const scene of result.nodes?.group) {
                if (scene.name === 'ISY' || scene.name === 'IoX' || scene.name === 'Auto DR') {
                    continue;
                } // Skip ISY & Auto DR Scenes
                const newScene = new ISYScene(this, scene);
                try {
                    //await newScene.refreshNotes();
                }
                catch (e) {
                    this.logger.debug('No notes found.');
                }
                this.sceneList.set(newScene.address, newScene);
            }
            this.logger.info(`${this.sceneList.size} scenes added.`);
        }
        catch (e) {
            throw new ISYInitializationError(e, 'readScenes');
        }
    }
    #setVariableValues(result) {
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
}
export { ISYNode as Node } from './ISYNode.js';
export { ISYDeviceNode as DeviceNode } from './Devices/ISYDeviceNode.js';
export { CompositeDevice } from './Devices/CompositeDevice.js';
export { ISYScene as Scene } from './ISYScene.js';
export { ISYVariable as Variable } from './ISYVariable.js';
export { VariableType } from './VariableType.js';
export { ISYError } from './ISYError.js';
export * from './Converters.js';
export * from './Definitions/index.js';
export * as Devices from './Devices/index.js';
export * from './Model/index.js';
export * from './Utils.js';
export * from './ISYError.js';
//# sourceMappingURL=ISY.js.map