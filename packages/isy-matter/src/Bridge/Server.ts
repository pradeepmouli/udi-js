import { LogLevel, logLevelFromString, Logger as MatterLogger } from '@matter/general';
import { ClusterBehavior, Endpoint, EndpointServer, Environment, MutableEndpoint, ServerNode, StorageService, VendorId } from '@matter/main';
import { AggregatorEndpoint } from '@matter/main/endpoints/aggregator';
import { logEndpoint } from '@matter/main/protocol';
import { QrCode } from '@matter/main/types';
import PackageJson from '@project-chip/matter.js/package.json' with { type: 'json' };
import path from 'path';
import { format, loggers } from 'winston';
import { DeviceNode, ISY } from 'isy-nodejs/ISY';
import '../Mappings/index.js';
import '../Behaviors/Insteon/index.js';
import { MappingRegistry } from '../Mappings/MappingRegistry.js';
import { BehaviorRegistry } from '../Behaviors/BehaviorRegistry.js';
import type { ISYNode } from 'isy-nodejs/ISYNode';
import  'isy-nodejs/Utils';



// #region Interfaces (1)

export let instance: ServerNode;

//@ts-ignore
export let version: string = PackageJson.version;
export interface Config {
	// #region Properties (8)

	discriminator: number;
	passcode: number;
	port: number;
	productId: number;
	productName?: string;
	uniqueId: string;
	vendorId: number;
	vendorName?: string;

	ipv4?: boolean;

	ipv6?: boolean;

	DeviceOptions?: DeviceOptions[];

	// #endregion Properties (8)
}

export interface DeviceOptions {
	applyTo:
		| {
				classes: (typeof ISYNode<any, any, any, any>)[];
		  }
		| { nodeDefs: string[] }
		| { addresses: string[] }
		| { deviceTypes: string[] }
		| { predicate: (node: ISYNode<any, any, any, any>) => boolean };
	options: {
		exclude?: boolean;
		label: string;
		//@ts-expect-error
		mappings: { [x in typeof ISYNode<any, any, any, any> as x['name']]: DeviceToClusterMap<InstanceType<x>, any> };
	};
}

// #endregion Interfaces (1)

// #region Functions (3)

let t: MutableEndpoint;

export function create(isy?: ISY, config?: Config): Promise<ServerNode> {
	return createMatterServer(isy, config);
}

export function appliesTo(node: ISYNode<any>, deviceOptions: DeviceOptions): boolean {
	if ('classes' in deviceOptions.applyTo) {
		return deviceOptions.applyTo.classes?.some((x) => node instanceof x);
	} else if ('nodeDefs' in deviceOptions.applyTo) {
		return deviceOptions.applyTo.nodeDefs.includes(node.nodeDefId);
	} else if ('addresses' in deviceOptions.applyTo) {
		return deviceOptions.applyTo.addresses?.includes(node.address);
	} else if ('deviceTypes' in deviceOptions.applyTo && node instanceof DeviceNode) {
		return deviceOptions.applyTo.deviceTypes?.includes(node.typeCode as string);
	} else if ('predicate' in deviceOptions.applyTo) {
		return deviceOptions.applyTo.predicate(node);
	}
}

export function getDeviceOptions(node: ISYNode<any>, deviceOptions: DeviceOptions[]): DeviceOptions['options'] {
	if (deviceOptions) {
		if (Array.isArray(deviceOptions)) {
			for (const options of deviceOptions) {
				if (appliesTo(node, options)) {
					return options.options; //TODO: rank by specificity
				}
			}
		}
		for (const options of deviceOptions) {
			if (appliesTo(node, options)) {
				return options.options; //TODO: rank by specificity
			}
		}
	}
	return undefined;
}

export async function createMatterServer(isy?: ISY, config?: Config): Promise<ServerNode> {
	var logger = loggers.add('matter', {
		transports: isy.logger.transports,
		levels: isy.logger.levels,
		format: format.label({ label: 'Matter' })
	});
	if (isy === undefined) {
		isy = ISY.instance;
	}

	try {
		MatterLogger.addLogger(
			'polyLogger',
			(lvl, message) => {
				let msg = message.slice(23).remove(LogLevel[lvl]).trimStart();
				let level = LogLevel[lvl].toLowerCase().replace('notice', 'info');
				if (msg.startsWith('EndpointStructureLogger')) {
					if (lvl === LogLevel.INFO) level = 'debug';
				}
				logger.log(level, msg);
			},
			/*Preserve existing formatting, but trim off date*/
			{
				defaultLogLevel: logLevelFromString(logger.level),
				logFormat: 'plain'
			}
		);
	} finally {
		MatterLogger.defaultLogLevel = logLevelFromString(logger.level);
	}

	config = await initializeConfiguration(isy, config);

	logger.info(`Matter config: ${JSON.stringify(config)}`);
	MatterLogger.removeLogger('default'); /*Remove existing logging*/
	let server = await ServerNode.create({
		// Required: Give the Node a unique ID which is used to store the state of this node
		id: config.uniqueId,

		// Provide Network relevant configuration like the port
		// Optional when operating only one device on a host, Default port is 5540
		network: {
			port: config.port,

			ipv4: config.ipv4,
			discoveryCapabilities: {
				onIpNetwork: true
			}
		},

		// Provide Commissioning relevant settings
		// Optional for development/testing purposes
		commissioning: {
			passcode: config.passcode,
			discriminator: config.discriminator
		},

		// Provide Node announcement settings
		// Optional: If Ommitted some development defaults are used
		productDescription: {
			name: isy.model,
			deviceType: AggregatorEndpoint.deviceType
		},

		// Provide defaults for the BasicInformation cluster on the Root endpoint
		// Optional: If Omitted some development defaults are used
		basicInformation: {
			vendorName: isy.vendorName,
			vendorId: VendorId(config.vendorId),
			nodeLabel: config.productName,
			productName: config.productName,
			productLabel: config.productName,
			productId: config.productId,
			softwareVersionString: isy.firmwareVersion,
			serialNumber: isy.id,
			uniqueId: config.uniqueId
		}
	});

	logger.info(`Bridge server added`);

	/**
	 * Matter Nodes are a composition of endpoints. Create and add a single multiple endpoint to the node to make it a
	 * composed device. This example uses the OnOffLightDevice or OnOffPlugInUnitDevice depending on the value of the type
	 * parameter. It also assigns each Endpoint a unique ID to store the endpoint number for it in the storage to restore
	 * the device on restart.
	 *
	 * In this case we directly use the default command implementation from matter.js. Check out the DeviceNodeFull example
	 * to see how to customize the command handlers.
	 */

	const aggregator = new Endpoint(AggregatorEndpoint, { id: 'aggregator' });

	await server.add(aggregator);

	logger.info(`Bridge aggregator added`);
	let endpoints = 0;
	for (const node of isy.nodeMap.values()) {
		let device = node as DeviceNode.Any;
		if(device.parentAddress !== device.address)
		{
			continue;
		}
		try {
			let deviceOptions = getDeviceOptions(node, config.DeviceOptions);
			if (deviceOptions?.label) {
				device.label = deviceOptions.label;
			}
			if (deviceOptions?.exclude) {
				continue;
			}
			let uniqueId = `${device.address.replaceAll(' ', '_').replaceAll('.', '_')}`;
			if (device.enabled) {
				//const name = `OnOff ${isASocket ? "Socket" : "Light"} ${i}`;

				//@ts-ignore
				//of (DimmableLightDevice.with(BridgedDeviceBasicInformationServer, ISYBridgedDeviceBehavior, ISYOnOffBehavior, ISYDimmableBehavior)) | typeof (OnOffLightDevice.with(BridgedDeviceBasicInformationServer, ISYBridgedDeviceBehavior, ISYOnOffBehavior));*/
				let deviceType = MappingRegistry.getMapping(device)?.deviceType;


				let baseBehavior = deviceType;

				let b = deviceType?.behaviors;
				if(baseBehavior)
				{
					for (let s in b)
					{
						let behavior = deviceType.behaviors[s] as ClusterBehavior.Type;
						if(behavior.cluster && behavior.cluster.name !== 'Unknown')
						{
							let b = BehaviorRegistry.get(device,behavior.cluster.name);
							if(b)
							{
								baseBehavior = baseBehavior.with(b);
							}
						}
					}
				}

				/*if (DimmerLamp.isImplementedBy(device)) {
					baseBehavior = deviceType?.with(RelayOnOffBehavior, DimmerLevelControlBehavior);
					// if(device instanceof InsteonSwitchDevice)
					// {
					//     baseBehavior = DimmerSwitchDevice.with(BridgedDeviceBasicInformationServer);
				} else if (RelayLamp.isImplementedBy(device)) {
					baseBehavior = deviceType?.with(RelayOnOffBehavior);
					// if(device instanceof InsteonSwitchDevice)
					// {
					//     baseBehavior = OnOffLightSwitchDevice.with(BridgedDeviceBasicInformationServer);
					// }
				}*/

				if (baseBehavior !== undefined) {
					logger.info(`Device ${device.label} (${device.address}) with NodeDefId = ${device.nodeDefId} mapped to ${deviceType.name}`);
					//@ts-ignore
					const endpoint = new Endpoint(baseBehavior, {
						id: uniqueId,
						isyNode: {
							address: device.address
						},

						bridgedDeviceBasicInformation: {
							nodeLabel: device.label.rightWithToken(32),
							vendorName: device instanceof DeviceNode ? device.manufacturer : isy.vendorName,
							vendorId: VendorId(config.vendorId),

							productName: device.productName.leftWithToken(32),
							productLabel: device.model.leftWithToken(64),

							hardwareVersion: Number(device.version),
							hardwareVersionString: `v.${device.version}`,
							softwareVersion: Number(device.version),
							softwareVersionString: `v.${device.version}`,

							serialNumber: uniqueId,
							reachable: true,
							uniqueId: device.address
						}
					});

					await aggregator.add(endpoint);
					logger.info(`Endpoint added ${JSON.stringify(endpoint.id)} for ${device.label} (${device.address})`);
					endpoints++;
					//endpoints.push({0:endpoint,1:device});
				}
				//endpoint.lifecycle.ready.on(()=> device.initialize(endpoint as any));
			}
		} catch (e) {
			logger.error(`Error adding endpoint for ${device.label} (${device.address}): ${e.message}`);
		}

		/**
		 * Register state change handlers and events of the endpoint for identify and onoff states to react to the commands.
		 *
		 * If the code in these change handlers fail then the change is also rolled back and not executed and an error is
		 * reported back to the controller.
		 */
	}
	logger.info(`${endpoints} endpoints added to bridge.`);
	/**
	 * In order to start the node and announce it into the network we use the run method which resolves when the node goes
	 * offline again because we do not need anything more here. See the Full example for other starting options.
	 * The QR Code is printed automatically.
	 */

	logger.info('Bringing server online');
	await server.start();

	logger.info('Matter Server is online');
	/**
	 * Log the endpoint structure for debugging reasons and to allow to verify anything is correct
	 */

	//MatterLogger.setLogger("EndpointStructureLogger", ((level, message) => logger.log(Level[level], message)));

	//logEndpoint(EndpointServer.forEndpoint(server));
	//if(logger.isTraceEnabled())
	// logEndpoint(EndpointServer.forEndpoint(server), {logAttributePrimitiveValues: true, logAttributeObjectValues: true});
	//else if(logger.isDebugEnabled())
	// {
	logEndpoint(EndpointServer.forEndpoint(server), { logAttributePrimitiveValues: true, logAttributeObjectValues: false, logClusterGlobalAttributes: false });
	// }
	if (server.lifecycle.isOnline) {
		const { qrPairingCode, manualPairingCode } = server.state.commissioning.pairingCodes;

		logger.info('\n' + QrCode.get(qrPairingCode));
		logger.info(`QR Code URL: https://project-chip.github.io/connectedhomeip/qrcode.html?data=${qrPairingCode}`);
		logger.info(`Manual pairing code: ${manualPairingCode}`);
	}
	instance = server;
	return server;
}

type PairingCodeData = {
	qrPairingCode: string;
	manualPairingCode: string;
	renderedQrPairingCode: string;
	url: string | URL;
};

export function getPairingCode(server: ServerNode = instance): PairingCodeData {
	let codes = server.state.commissioning.pairingCodes as PairingCodeData;
	codes.renderedQrPairingCode = QrCode.get(codes.qrPairingCode);
	codes.url = `https://project-chip.github.io/connectedhomeip/qrcode.html?data=${codes.qrPairingCode}`;
	return codes;
}

async function initializeConfiguration(isy: ISY, config?: Config): Promise<Config> {
	var logger = isy.logger;

	const environment = Environment.default;
	const storageService = environment.get(StorageService);
	const storagePath = path.resolve(isy.storagePath, 'matter');

	environment.vars.set('storage.path', storagePath);

	environment.vars.use(() => {
		storageService.location = storagePath;
	});

	logger.info(`Matter storage location: ${storageService.location} (Directory)`);
	//logger.info(`Matter storage service type: ${storageService.factory.name}`);

	const deviceStorage = (await storageService.open('bridge')).createContext('data');

	if (config.passcode) {
		environment.vars.set('passcode', config.passcode);
	}

	if (config.discriminator) {
		environment.vars.set('discriminator', config.discriminator);
	}

	if (config.vendorId) {
		environment.vars.set('vendorid', config.vendorId);
	}

	if (config.productId) {
		environment.vars.set('productid', config.productId);
	}

	environment.vars.set('uniqueid', isy.id.replaceAll(':', '_'));

	//logger.info(`Matter configuration: ${JSON.stringify(environment.vars)}`);

	const vendorName = isy.vendorName;
	const passcode = environment.vars.number('passcode') ?? (await deviceStorage.get('passcode', 20202021));
	const discriminator = environment.vars.number('discriminator') ?? (await deviceStorage.get('discriminator', 3840));
	// product name / id and vendor id should match what is in the device certificate
	const vendorId = environment.vars.number('vendorid') ?? (await deviceStorage.get('vendorid', 0xfff1));
	const productId = environment.vars.number('productid') ?? (await deviceStorage.get('productid', isy.productId));
	const productName = environment.vars.string('productname') ?? (await deviceStorage.get('productname', isy.productName));
	const port = environment.vars.number('port') ?? 5540;
	const uniqueId = environment.vars.string('uniqueid') ?? (await deviceStorage.get('uniqueid', isy.id.replaceAll(':', '_')));

	// Persist basic data to keep them also on restart
	await deviceStorage.set({
		passcode,
		discriminator,
		vendorid: vendorId,
		productid: productId,
		productName: productName,
		uniqueid: uniqueId
	});

	return {
		//deviceName,
		vendorName,
		passcode,
		discriminator,
		vendorId,
		productName,
		productId,
		port,
		uniqueId,
		ipv4: config.ipv4 ?? true,
		ipv6: config.ipv6 ?? true
	};
}

// #endregion Functions (3)
