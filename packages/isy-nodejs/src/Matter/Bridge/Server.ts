import '@project-chip/matter-node.js';
import { NodeJsEnvironment } from '@project-chip/matter-node.js/environment';
import { StorageBackendDisk } from '@project-chip/matter-node.js/storage';
import { BridgedDeviceBasicInformationServer } from '@project-chip/matter.js/behaviors/bridged-device-basic-information';
import { VendorId } from '@project-chip/matter.js/datatype';
import { Device, logEndpoint } from '@project-chip/matter.js/device';
import { Endpoint, EndpointServer } from '@project-chip/matter.js/endpoint';
import { DimmableLightDevice, OnOffLightDevice } from '@project-chip/matter.js/endpoint/definitions';
import type { SupportedBehaviors } from '@project-chip/matter.js/endpoint/properties';
import { MutableEndpoint } from '@project-chip/matter.js/endpoint/type';
import { AggregatorEndpoint } from '@project-chip/matter.js/endpoints/AggregatorEndpoint';
import { StorageService } from '@project-chip/matter.js/environment';
import { Level, levelFromString, Logger as MatterLogger } from '@project-chip/matter.js/log';
import { Devices } from '../../Devices/index.js';

import { ServerNode } from '@project-chip/matter.js/node';
//@ts-ignore
import PackageJson from '@project-chip/matter.js/package.json' with { type: 'json' };
import { QrCode } from '@project-chip/matter.js/schema';
import path, { resolve } from 'path';
import { format, loggers } from 'winston';
import type { ISYDeviceNode } from '../../Devices/ISYDeviceNode.js';
import { ISY } from '../../ISY.js';
import { ISYBridgedDeviceBehavior } from '../Behaviors/ISYBridgedDeviceBehavior.js';
import { ISYDimmableBehavior, ISYOnOffBehavior } from '../Behaviors/Insteon/ISYOnOffBehavior.js';
import '../Mappings/Insteon.js';

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

	// #endregion Properties (8)
}

// #endregion Interfaces (1)

// #region Functions (3)

export function create(isy?: ISY, config?: Config): Promise<ServerNode> {
	return createMatterServer(isy, config);
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
				let msg = message.slice(23).remove(Level[lvl]).trimStart();
				let level = Level[lvl].toLowerCase().replace('notice', 'info');
				if (msg.startsWith('EndpointStructureLogger')) {
					if (lvl === Level.INFO) level = 'debug';
				}
				logger.log(level, msg);
			},
			/*Preserve existing formatting, but trim off date*/
			{
				defaultLogLevel: levelFromString(logger.level),
				logFormat: 'plain'
			}
		);
	} finally {
		MatterLogger.defaultLogLevel = levelFromString(logger.level);
	}

	config = await initializeConfiguration(isy, config);

	logger.info(`Matter config read: ${JSON.stringify(config)}`);
	MatterLogger.removeLogger('default');
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

	logger.info(`Bridge Server Added`);

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

	logger.info(`Bridge Aggregator Added`);



	for (const node of isy.nodeMap.values()) {
		let device = node as ISYDeviceNode<any, any, any>;
		let serialNumber = `${device.address.replaceAll(' ', '_').replaceAll('.', '_')}`;
		if (device.enabled) {
			//const name = `OnOff ${isASocket ? "Socket" : "Light"} ${i}`;

			//@ts-ignore
			let baseBehavior: any;/*typeof (DimmableLightDevice.with(BridgedDeviceBasicInformationServer, ISYBridgedDeviceBehavior, ISYOnOffBehavior, ISYDimmableBehavior)) | typeof (OnOffLightDevice.with(BridgedDeviceBasicInformationServer, ISYBridgedDeviceBehavior, ISYOnOffBehavior));*/

			if (device instanceof Devices.Insteon.Dimmer || device instanceof Devices.Insteon.DimmerSwitch || device instanceof Devices.Insteon.KeypadDimmer) {
				baseBehavior = DimmableLightDevice.with(BridgedDeviceBasicInformationServer, ISYBridgedDeviceBehavior, ISYOnOffBehavior, ISYDimmableBehavior);
				// if(device instanceof InsteonSwitchDevice)
				// {
				//     baseBehavior = DimmerSwitchDevice.with(BridgedDeviceBasicInformationServer);
				// }
			} else if (device instanceof Devices.Insteon.Relay || device instanceof Devices.Insteon.RelaySwitch) {
				baseBehavior = OnOffLightDevice.with(BridgedDeviceBasicInformationServer, ISYBridgedDeviceBehavior, ISYOnOffBehavior);
				// if(device instanceof InsteonSwitchDevice)
				// {
				//     baseBehavior = OnOffLightSwitchDevice.with(BridgedDeviceBasicInformationServer);
				// }
			}

			if (baseBehavior !== undefined) {
				//@ts-ignore
				const endpoint = new Endpoint(baseBehavior, {
					id: serialNumber,
					isyNode: {
						address: device.address
					},

					bridgedDeviceBasicInformation: {
						nodeLabel: device.label.rightWithToken(32),
						vendorName: 'Insteon Technologies, Inc.',
						vendorId: VendorId(config.vendorId),
						productName: device.productName.leftWithToken(32),
						productLabel: device.model.leftWithToken(64),
						hardwareVersion: Number(device.version),
						hardwareVersionString: `v.${device.version}`,
						softwareVersion: Number(device.version),
						softwareVersionString: `v.${device.version}`,

						serialNumber: serialNumber,
						reachable: true,
						uniqueId: device.address
					}
				});

				await aggregator.add(endpoint);
				logger.info(`Endpoint Added ${JSON.stringify(endpoint.id)} for ${device.label} (${device.address})`);
				//endpoints.push({0:endpoint,1:device});
			}
			//endpoint.lifecycle.ready.on(()=> device.initialize(endpoint as any));
		}

		/**
		 * Register state change handlers and events of the endpoint for identify and onoff states to react to the commands.
		 *
		 * If the code in these change handlers fail then the change is also rolled back and not executed and an error is
		 * reported back to the controller.
		 */
	}

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
	/*for(let e of endpoints)
	{
	  e[1].initialize(e[0] as any);
	}*/
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

	const environment = NodeJsEnvironment();

	const storageService = environment.get(StorageService);
	environment.vars.set('storage.path', path.resolve(isy.storagePath, 'matter'));
	environment.vars.use(() => {
		const location = environment.vars.get('storage.path', environment.vars.get('path.root', '.'));
		storageService.location = location;
	});
	storageService.factory = (namespace) => new StorageBackendDisk(resolve(storageService.location ?? '.', namespace), environment.vars.get('storage.clear', false));
	logger.info(`Matter storage location: ${storageService.location} (Directory)`);

	const deviceStorage = (await storageService.open('device')).createContext('data');

	const vendorName = isy.vendorName;
	const passcode = config.passcode ?? environment.vars.number('passcode') ?? (await deviceStorage.get('passcode', 20202021));
	const discriminator = config.discriminator ?? environment.vars.number('discriminator') ?? (await deviceStorage.get('discriminator', 3840));
	// product name / id and vendor id should match what is in the device certificate
	const vendorId = config.vendorId ?? environment.vars.number('vendorid') ?? (await deviceStorage.get('vendorid', 0xfff1));
	const productId = config.productId ?? environment.vars.number('productid') ?? (await deviceStorage.get('productid', 0x8000));
	const productName = isy.productName;
	const port = config.port ?? environment.vars.number('port') ?? 5540;

	const uniqueId = isy.id.replaceAll(':', '_');
	//environment.vars.string("uniqueid") ?? (await deviceStorage.get("uniqueid", Time.nowMs().toString()));

	// Persist basic data to keep them also on restart
	await deviceStorage.set({
		passcode,
		discriminator,
		vendorid: vendorId,
		productid: productId,
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
