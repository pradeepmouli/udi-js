import WebSocket from 'faye-websocket';
import { writeFile } from 'fs';

import { Parser, type ParserOptions } from 'xml2js';
import { parseBooleans, parseNumbers } from 'xml2js/lib/processors.js';
import { XmlDocument } from 'xmldoc';

import axios from 'axios';
import { EventEmitter } from 'events';
import winston, { format, Logger, loggers, type LeveledLogMethod } from 'winston';
import { Category } from './Definitions/Global/Categories.js';
import { Family } from './Definitions/Global/Families.js';
import type { NodeInfo } from './Model/NodeInfo.js';
import { DeviceFactory } from './Devices/DeviceFactory.js';
import { ELKAlarmPanelDevice } from './Devices/Elk/ElkAlarmPanelDevice.js';
import { ElkAlarmSensorDevice } from './Devices/Elk/ElkAlarmSensorDevice.js';
import { InsteonBaseDevice } from './Devices/Insteon/InsteonBaseDevice.js';
import { InsteonOutletDevice } from './Devices/Insteon/InsteonDevice.js';
import { InsteonDimmableDevice } from './Devices/Insteon/InsteonDimmableDevice.js';
import { InsteonDimmerOutletDevice } from './Devices/Insteon/InsteonDimmerOutletDevice.js';
import { InsteonDimmerSwitchDevice } from './Devices/Insteon/InsteonDimmerSwitchDevice.js';
import { InsteonDoorWindowSensorDevice } from './Devices/Insteon/InsteonDoorWindowSensorDevice.js';
import { InsteonFanDevice, InsteonFanMotorDevice } from './Devices/Insteon/InsteonFanDevice.js';
import { InsteonKeypadButtonDevice } from './Devices/Insteon/InsteonKeypadDevice.js';
import { InsteonKeypadDimmerDevice } from './Devices/Insteon/InsteonKeypadDimmerDevice.js';
import { InsteonKeypadRelayDevice } from './Devices/Insteon/InsteonKeypadRelayDevice.js';
import { InsteonLeakSensorDevice } from './Devices/Insteon/InsteonLeakSensorDevice.js';
import { InsteonLockDevice } from './Devices/Insteon/InsteonLockDevice.js';
import { InsteonMotionSensorDevice } from './Devices/Insteon/InsteonMotionSensorDevice.js';
import { InsteonOnOffOutletDevice } from './Devices/Insteon/InsteonOnOffOutletDevice.js';
import { InsteonRelayDevice } from './Devices/Insteon/InsteonRelayDevice.js';
import { InsteonSmokeSensorDevice } from './Devices/Insteon/InsteonSmokeSensorDevice.js';
import { InsteonThermostatDevice } from './Devices/Insteon/InsteonThermostatDevice.js';
import { EventType } from './Events/EventType.js';
import { NodeType, Props, States, VariableType } from './ISYConstants.js';
import { ISYNode } from './ISYNode.js';
import { ISYDeviceNode } from './Devices/ISYDeviceNode.js';
import { type ISYDevice } from './ISYDevice.js';
import { ISYScene } from './ISYScene.js';
import { ISYVariable } from './ISYVariable.js';

import * as Utils from './Utils.js';

import { X2jOptions, XMLParser } from 'fast-xml-parser';
import { NodeFactory } from './Devices/NodeFactory.js';

export {
	Category as Categories,
	ELKAlarmPanelDevice,
	ElkAlarmSensorDevice,
	Family,
	InsteonBaseDevice,
	InsteonDimmableDevice,
	InsteonDimmerOutletDevice,
	InsteonDimmerSwitchDevice,
	InsteonDoorWindowSensorDevice,
	InsteonFanDevice,
	InsteonFanMotorDevice,
	InsteonKeypadButtonDevice,
	InsteonKeypadDimmerDevice,
	InsteonKeypadRelayDevice,
	InsteonLeakSensorDevice,
	InsteonLockDevice,
	InsteonMotionSensorDevice,
	InsteonOnOffOutletDevice,
	InsteonOutletDevice,
	InsteonRelayDevice,
	InsteonSmokeSensorDevice,
	InsteonThermostatDevice,
	ISYDeviceNode as ISYDevice,
	ISYNode,
	ISYScene,
	ISYVariable,
	NodeType,
	Props,
	States,
	Utils,
	VariableType
};

const defaultParserOptions: ParserOptions = {
	explicitArray: false,
	mergeAttrs: true,

	attrValueProcessors: [parseNumbers, parseBooleans],
	valueProcessors: [parseNumbers, parseBooleans],
	tagNameProcessors: [(tagName) => (tagName === 'st' || tagName === 'cmd' || tagName === 'nodeDef' ? '' : tagName)]
};

const defaultXMLParserOptions: X2jOptions = {
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
		if (tagValue === '') return null;
		return tagValue;
	},
	isArray(tagName, jPath, isLeafNode, isAttribute) {
		if (tagName === 'property') return true;
		return false;
	}
};

axios.defaults.transitional.forcedJSONParsing = false;

const parser = new Parser(defaultParserOptions);

export let Controls = {};

export class ISY extends EventEmitter implements Disposable {
	// #region Properties (30)

	public readonly credentials: { username: string; password: string };
	public readonly deviceList: Map<string, ISYDevice<any, any, any, any>> = new Map();
	public readonly deviceMap: Map<string, string[]> = new Map();
	public readonly displayNameFormat: string;
	public readonly elkEnabled: boolean;
	public readonly enableWebSocket: boolean;
	public readonly folderMap: Map<string, string> = new Map();
	public readonly host: string;
	public readonly nodeMap: Map<string, ISYNode<any, any, any, any>> = new Map();
	public readonly port: number;
	public readonly protocol: string;
	public readonly sceneList: Map<string, ISYScene> = new Map();
	public readonly storagePath: string;
	public readonly variableList: Map<string, ISYVariable<VariableType>> = new Map();
	public readonly wsprotocol: 'ws' | 'wss' = 'ws';
	public readonly zoneMap: Map<string, ElkAlarmSensorDevice> = new Map();

	public static instance: ISY;

	public configInfo: any;
	public elkAlarmPanel: ELKAlarmPanelDevice;
	public guardianTimer: any;
	public id: string;
	public lastActivity: any;
	public logger: Logger;
	public model: any;
	public nodesLoaded: boolean = false;
	public productId = 5226;
	public productName = 'eisy';
	public serverVersion: any;
	public vendorName = 'Universal Devices, Inc.';
	public webSocket: WebSocket.Client;

	// #endregion Properties (30)

	// #region Constructors (1)

	constructor(
		config: {
			host: string;
			port: number;
			protocol: 'http' | 'https';
			username: string;
			password: string;
			enableWebSocket?: boolean;
			displayNameFormat?: string;
			elkEnabled?: boolean;
		},
		logger: Logger = new Logger(),
		storagePath?: string
	) {
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
		this.elkEnabled = config.elkEnabled ?? false;

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

	public get address() {
		return `${this.host}:${this.port}`;
	}

	public get isDebugEnabled() {
		return this.logger?.isDebugEnabled();
	}

	// #endregion Public Getters And Setters (2)

	// #region Public Methods (22)

	public override emit(event: 'InitializeCompleted' | 'NodeAdded' | 'NodeRemoved' | 'NodeChanged', node?: ISYNode<any, any, any, any>): boolean {
		return super.emit(event, node);
	}

	public getDevice<T extends ISYDevice<any, any, any, any> = ISYDevice<any, any, any, any>>(address: string, parentsOnly = false): T {
		let s = this.deviceList.get(address);
		if (!parentsOnly) {
			if (s === null) {
				s = this.deviceList[`${address.substr(0, address.length - 1)} 1`];
			}
		} else {
			while (s.parentAddress !== undefined && s.parentAddress !== s.address && s.parentAddress !== null) {
				s = this.deviceList[s.parentAddress];
			}
		}

		return s as T;
	}

	public getNode<T extends ISYNode<any, any, any, any> = ISYNode<any, any, any, any>>(address: string, parentsOnly = false): T {
		let s = this.nodeMap.get(address);
		if (!parentsOnly) {
			if (s === null) {
				s = this.nodeMap[`${address.substr(0, address.length - 1)} 1`];
			}
		} else {
			while (s.parentAddress !== undefined && s.parentAddress !== s.address && s.parentAddress !== null) {
				s = this.nodeMap[s.parentAddress];
			}
		}

		return s as T;
	}

	public getElkAlarmPanel() {
		return this.elkAlarmPanel;
	}

	public getScene(address: string) {
		return this.sceneList.get(address);
	}

	public getVariable<P extends VariableType>(type: P, id: number): ISYVariable<P> {
		const key = this.#createVariableKey(type, id);
		if (this.variableList.has(key)) {
			return this.variableList[key];
		}
		return null;
	}

	public getVariableList() {
		return this.variableList;
	}

	public async handleInitializeError(step: string, reason: any): Promise<any> {
		this.logger.error(`Error initializing ISY (${step}): ${JSON.stringify(reason)}`);
		return Promise.reject(reason);
	}

	public handleWebSocketMessage(event: { data: any }) {
		this.lastActivity = new Date();

		parser.parseString(event.data, (err: any, res: { Event: any }) => {
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
			} else if (evt.action instanceof Number || evt.action instanceof String) {
				actionValue = Number(evt.action);
			}
			const stringControl = Number((evt.control as string)?.replace('_', ''));
			switch (stringControl) {
				case EventType.Elk:
					if (actionValue === 2) {
						this.elkAlarmPanel.handleEvent(event);
					} else if (actionValue === 3) {
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
							} catch (e) {
								this.logger.error(`Error handling event for ${impactedDevice.name}: ${e.message}`);
							}
						} else {
							this.logger.warn(`${EventType[stringControl]} Event for Unidentified Device: ${JSON.stringify(evt)}`);
						}
					} else {
						if (stringControl === EventType.NodeChanged) {
							this.logger.info(`Received Node Change Event: ${JSON.stringify(evt)}. These are currently unsupported.`);
						}
						this.logger.debug(`${EventType[Number(stringControl)]} Event: ${JSON.stringify(evt)}`);
					}

					break;
			}
		});
	}

	public async initialize(): Promise<any> {
		const that = this;
		try {
			await this.loadConfig();
			await this.loadNodes();
			await this.loadVariables(VariableType.Integer);
			await this.loadVariables(VariableType.State);
			await this.refreshStatuses();
			await this.#finishInitialize(true);
		} catch (e) {
			this.handleInitializeError('initialize', e);
		} finally {
			if (this.nodesLoaded !== true) {
				that.#finishInitialize(false);
			}
		}
		return Promise.resolve(true);
	}

	public initializeWebSocket() {
		const that = this;
		const auth = `Basic ${Buffer.from(`${this.credentials.username}:${this.credentials.password}`).toString('base64')}`;
		this.logger.info(`Opening webSocket: ${this.wsprotocol}://${this.address}/rest/subscribe`);
		if (this.webSocket) {
			try {
				this.webSocket.close();
			} catch (e) {
				this.logger.warn(`Error closing existing websocket: ${e.message}`);
			}
		}
		this.webSocket = new WebSocket.Client(`${this.wsprotocol}://${this.address}/rest/subscribe`, ['ISYSUB'], {
			headers: {
				Origin: 'com.universal-devices.websockets.isy',
				Authorization: auth
			},
			ping: 10
		});

		this.lastActivity = new Date();

		this.webSocket
			.on('message', (event: any) => {
				that.logger.silly(`Received message: ${JSON.stringify(event.data, null, 2)}`);
				that.handleWebSocketMessage(event);
			})
			.on('error', (err: any, response: any) => {
				that.logger.warn(`Websocket subscription error: ${JSON.stringify(err.message)}`);
				/// throw new Error('Error calling ISY' + err);
			})
			.on('fail', (data: string, response: any) => {
				that.logger.warn(`Websocket subscription failure: ${data}`);
				throw new Error('Failed calling ISY');
			})
			.on('abort', () => {
				that.logger.warn('Websocket subscription aborted.');
				throw new Error('Call to ISY was aborted');
			})
			.on('timeout', (ms: string) => {
				that.logger.warn(`Websocket subscription timed out after ${ms} milliseconds.`);
				throw new Error('Timeout contacting ISY');
			});
	}

	public async loadConfig(): Promise<any> {
		try {
			this.logger.info('Loading ISY Config');
			const configuration = (await this.sendRequest('config')).configuration;
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
		} catch (e) {
			this.handleInitializeError('config', e);
			throw Error(`Error Loading Config: ${(e as Error).message}`);
		}
	}

	public async loadNodes(): Promise<any> {
		try {
			const result = await this.sendRequest('nodes');
			if (this.isDebugEnabled) writeFile(this.storagePath + '/ISYNodesDump.json', JSON.stringify(result), this.logger.error);

			await this.#readFolderNodes(result).catch((p) => this.logger.error('Error Loading Folders', p));
			await this.#readDeviceNodes(result).catch((p) => this.logger.error('Error Loading Devices', p));
			await this.#readSceneNodes(result).catch((p) => this.logger.error('Error Loading Scenes', p));
			return result;
		} catch (e) {
			throw new Error(`Error loading nodes: ${(e as Error).message}`);
		}
	}

	public async loadVariables(type: VariableType): Promise<any> {
		const that = this;
		return this.sendRequest(`vars/definitions/${type}`)
			.then((result) => that.#createVariables(type, result))
			.then(() => that.sendRequest(`vars/get/${type}`))
			.then(that.#setVariableValues.bind(that));
	}

	public nodeChangedHandler(node: ELKAlarmPanelDevice | ElkAlarmSensorDevice, propertyName = null) {
		const that = this;
		if (this.nodesLoaded) {
			// this.logger.info(`Node: ${node.address} changed`);
			// if (this.changeCallback !== undefined && this.changeCallback !== null) {
			// t//his.changeCallback(that, node, propertyName);
			// }
		}
	}

	public override on(event: 'InitializeCompleted' | 'NodeAdded' | 'NodeRemoved' | 'NodeChanged', listener: (node?: ISYNode<any, any, any, any>) => void): this {
		return super.on(event, listener);
	}

	public async refreshStatuses() {
		try {
			const that = this;
			const result = await that.sendRequest('status');
			if (that.isDebugEnabled) {
				writeFile(that.storagePath + '/ISYStatusDump.json', JSON.stringify(result), this.logger.error);
			}
			this.logger.debug(result);
			for (const node of result.nodes.node) {
				this.logger.debug(node);
				let device = that.getDevice(node.id) as unknown as ISYNode<any, any, any, any>;
				if (device !== null && device !== undefined) {
					//   let child = device.children.find((p) => p.address === node.id);
					//   if (child) {
					//     //Case FanLinc where we treat the light as a child of the fan.
					//     device = child;
					//   }
					device.parseResult(node.property);

					//   if (Array.isArray(node.property)) {
					//     for (let prop of node.property) {
					// 		device.applyStatus(prop)
					//     //   device.local[prop.id] = device.convertFrom(prop.value, prop.uom);
					//     //   device.formatted[prop.id] = prop.formatted;
					//     //   device.uom[prop.id] = prop.uom;
					//     //   device.logger(
					//     //     `Property ${Controls[prop.id].label} (${prop.id}) initialized to: ${device.local[prop.id]} (${
					//     //       device.formatted[prop.id]
					//     //     })`
					//     //   );
					//     }
					//   } else if (node.property) {
					//     device.local[node.property.id] = device.convertFrom(node.property.value, node.property.uom);
					//     device.formatted[node.property.id] = node.property.formatted;
					//     device.uom[node.property.id] = node.property.uom;
					//     device.logger(
					//       `Property ${Controls[node.property.id].label} (${node.property.id}) initialized to: ${
					//         device.local[node.property.id]
					//       } (${device.formatted[node.property.id]})`
					//     );
					//   }
				}
			}
		} catch (e) {
			throw new Error(`Error refreshing statuses: ${JSON.stringify(e.message)}`);
		}
	}

	public async sendGetVariable(id: any, type: any, handleResult: (arg0: number, arg1: number) => void) {
		const uriToUse = `${this.protocol}://${this.address}/rest/vars/get/${type}/${id}`;
		this.logger.info(`Sending ISY command...${uriToUse}`);

		return this.sendRequest(uriToUse).then((p) => handleResult(p.val, p.init));
	}

	public async sendISYCommand(path: string): Promise<any> {
		// const uriToUse = `${this.protocol}://${this.address}/rest/${path}`;
		this.logger.info(`Sending command...${path}`);

		return this.sendRequest(path);
	}

	public async sendNodeCommand<P extends string | symbol, N extends ISYNode<any, any, any, any>>(node: N, command: string, parameters?: Record<P, string | number> | string | number): Promise<any> {
		let uriToUse = `nodes/${node.address}/cmd/${command}`;
		if (parameters !== null && parameters !== undefined) {
			if (typeof parameters == 'object') {
				var q = parameters as Record<P, string | number>;
				for (const paramName of Object.getOwnPropertyNames(q)) {
					uriToUse += `/${paramName}/${q[paramName]}`;
				}

				//uriToUse += `/${q[((p : Record<string,number|number>) => `${p[]}/${p.paramValue}` ).join('/')}`;
			} else if (typeof parameters == 'number' || typeof parameters == 'string') {
				uriToUse += `/${parameters}`;
			}
		}
		this.logger.info(`${node.name}: sending ${command} command: ${uriToUse}`);
		return this.sendRequest(uriToUse);
	}

	public async sendRequest(
		url: string,
		options: {
			parserOptions?: ParserOptions;
			trailingSlash: boolean;
			requestLogLevel?: any;
			responseLogLevel?: any;
		} = { trailingSlash: true }
	): Promise<any> {
		const requestLogLevel = options.requestLogLevel ?? winston.config.cli.levels.debug;
		const responseLogLevel = options.responseLogLevel ?? winston.config.cli.levels.silly;
		url = `${this.protocol}://${this.address}/rest/${url}${options.trailingSlash ? '/' : ''}`;
		this.logger.log(`Sending request: ${url}`, requestLogLevel);
		try {
			const response = await axios.get(url, {
				auth: { username: this.credentials.username, password: this.credentials.password }
			});
			if (response.data) {
				if (response.headers['content-type'].toString().includes('xml')) {
					let curParser = parser;
					if (options.parserOptions) curParser = new Parser({ ...defaultParserOptions, ...options.parserOptions });
					var altParser = new XMLParser(defaultXMLParserOptions);
					var s = altParser.parse(response.data);
					this.logger.log(`Response: ${JSON.stringify(s)}`, requestLogLevel ?? 'debug');
					return s;
				} else if (response.headers['content-type'].toString().includes('json')) {
					this.logger.log(`Response: ${JSON.stringify(response.data)}`, requestLogLevel ?? 'debug');
					return JSON.parse(response.data);
				} else {
					this.logger.log(`Response Header: ${JSON.stringify(response.headers)} Response: ${JSON.stringify(response.data)}`, responseLogLevel ?? 'debug');
					return response.data;
				}
			}
		} catch (error) {
			this.logger.error(`Error sending request to ISY: ${error?.message}`);
			throw new Error(`Error sending request to ISY: ${JSON.stringify(error)}`);
		}
	}

	public async sendSetVariable(id: any, type: any, value: any, handleResult: { (success: any): void; (arg0: boolean): void; (arg0: boolean): void }) {
		const uriToUse = `/rest/vars/set/${type}/${id}/${value}`;
		this.logger.info(`Sending ISY command...${uriToUse}`);

		return this.sendRequest(uriToUse);
	}

	public variableChangedHandler(variable: { id: string; type: string }) {
		this.logger.info(`Variable: ${variable.id} (${variable.type}) changed`);
	}

	// #endregion Public Methods (22)

	// #region Private Methods (11)

	#checkForFailure(response: any): boolean {
		return response === null || response instanceof Error || (response.RestResponse !== undefined && response.RestResponse.status !== 200);
	}

	#createVariableKey(type: VariableType, id: number) {
		return `${type}:${id}`;
	}

	#createVariables(type: VariableType, result: any) {
		for (const variable of result.CList.e) {
			const id = Number(variable.id);
			const name = variable.name;
			const newVariable = new ISYVariable(this, id, name, type);
			this.variableList.set(this.#createVariableKey(type, id), newVariable);
		}
	}

	#finishInitialize(success: boolean) {
		if (!this.nodesLoaded) {
			this.nodesLoaded = true;
			//initializeCompleted();
			if (success) {
				// if (this.elkEnabled) {
				// 	this.deviceList[this.elkAlarmPanel.address] = this.elkAlarmPanel;
				// }
				if (this.enableWebSocket) {
					this.guardianTimer = setInterval(this.#guardian.bind(this), 60000);
					this.initializeWebSocket();
				}
			}
		}
	}

	#guardian() {
		const timeNow = new Date();

		if (Number(timeNow) - Number(this.lastActivity) > 60000) {
			this.logger.info('Guardian: Detected no activity in more then 60 seconds. Reinitializing web sockets');
			this.initializeWebSocket();
		}
	}

	#loadElkInitialStatus(result: any) {
		const p = new Parser({
			explicitArray: false,
			mergeAttrs: true
		});
		p.parseString(result, (err: any, res: { ae: any; ze: any }) => {
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

	#loadElkNodes(result: any) {
		const document = new XmlDocument(result);
		const nodes = document.childNamed('areas').childNamed('area').childrenNamed('zone');
		for (let index = 0; index < nodes.length; index++) {
			const id = nodes[index].attr.id;
			const name = nodes[index].attr.name;
			const alarmDef = nodes[index].attr.alarmDef;
			const newDevice = new ElkAlarmSensorDevice(this, name, 1, id /*TODO: Handle CO Sensor vs. Door/Window Sensor */);
			this.zoneMap[newDevice.zone] = newDevice;
		}
	}

	async #readDeviceNodes(obj: { nodes: { node: NodeInfo[] } }) {
		this.logger.info('Loading Device Nodes');

		for (const nodeInfo of obj.nodes.node) {
			try {
				this.logger.debug(`Loading Device Node: ${JSON.stringify(nodeInfo)}`);
				if (!this.deviceMap.has(nodeInfo.pnode)) {
					const address = nodeInfo.address;
					this.deviceMap[nodeInfo.pnode] = {
						address
					};
				} else {
					this.deviceMap[nodeInfo.pnode].push(nodeInfo.address);
				}
				let newDevice: ISYDeviceNode<any, any, any, any> = null;

				// let deviceTypeInfo = this.isyTypeToTypeName(device.type, device.address);
				// this.logger.info(JSON.stringify(deviceTypeInfo));

				const enabled = nodeInfo.enabled ?? true;
				const d = await NodeFactory.get(nodeInfo);
				const m = DeviceFactory.getDeviceDetails(nodeInfo);

				if (d) {
					newDevice = new d(this, nodeInfo) as ISYDeviceNode<any, any, any, any>;
				}
				if (m) {
					newDevice = newDevice ?? (new m.class(this, nodeInfo) as unknown as ISYDeviceNode<any, any, any, any>);
					newDevice.productName = m.name;
					newDevice.model = `(${m.modelNumber}) ${m.name} v.${m.version}`;
					newDevice.modelNumber = m.modelNumber;
					newDevice.version = m.version;
				}
				if (enabled) {
					if (newDevice === null) {
						this.logger.warn(`Device type resolution failed for ${nodeInfo.name} with type: ${nodeInfo.type} and nodedef: ${nodeInfo.nodeDefId}`);
						newDevice = new ISYDeviceNode<any, any, any, any>(this, nodeInfo);
					} else if (newDevice !== null) {
						if (m.unsupported) {
							this.logger.warn('Device not currently supported: ' + JSON.stringify(nodeInfo) + ' /n It has been mapped to: ' + d.name);
						}
						try {
							await newDevice.refreshNotes();
						} catch (e) {
							this.logger.debug('No notes found.');
						}

						// if (!newDevice.hidden) {
						// }

						// this.deviceList.push(newDevice);
					} else {
					}
					this.nodeMap.set(newDevice.address, newDevice);
				} else {
					this.logger.info(`Ignoring disabled device: ${nodeInfo.name}`);
				}
			} catch (e) {
				this.logger.error(`Error loading device node: ${e.message}`);
			}
		}

		this.logger.info(`${this.nodeMap.size} devices added.`);
	}

	async #readFolderNodes(result: { nodes: { folder: any } }) {
		this.logger.info('Loading Folder Nodes');
		if (result?.nodes?.folder) {
			for (const folder of result.nodes.folder) {
				this.logger.info(`Loading Folder Node: ${JSON.stringify(folder)}`);
				this.folderMap.set(folder.address, folder.name);
			}
		}
	}

	async #readSceneNodes(result: { nodes: { group: any } }) {
		this.logger.info('Loading Scene Nodes');
		for (const scene of result.nodes?.group) {
			if (scene.name === 'ISY' || scene.name === 'IoX' || scene.name === 'Auto DR') {
				continue;
			} // Skip ISY & Auto DR Scenes

			const newScene = new ISYScene(this, scene);
			try {
				await newScene.refreshNotes();
			} catch (e) {
				this.logger.debug('No notes found.');
			}
			this.sceneList.set(newScene.address, newScene);
		}
	}

	#setVariableValues(result: any) {
		for (const vals of result.vars.var) {
			const type = Number(vals.type) as VariableType;
			const id = Number(vals.id);
			const variable = this.getVariable(type, id);
			if (variable) {
				variable.init = vals.init;
				variable.value = vals.val;
				variable.lastChanged = new Date(vals.ts);
			}
		}
	}

	[Symbol.dispose](): void {
		try {
			this.webSocket.close();
		} catch (e) {
			this.logger.error(`Error closing websocket: ${e.message}`);
		}
	}

	// #endregion Private Methods (11)
}
