"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.version = exports.instance = void 0;
exports.create = create;
exports.createMatterServer = createMatterServer;
exports.getPairingCode = getPairingCode;
require("@project-chip/matter-node.js");
const environment_1 = require("@project-chip/matter-node.js/environment");
const storage_1 = require("@project-chip/matter-node.js/storage");
const bridged_device_basic_information_1 = require("@project-chip/matter.js/behaviors/bridged-device-basic-information");
const datatype_1 = require("@project-chip/matter.js/datatype");
const device_1 = require("@project-chip/matter.js/device");
const endpoint_1 = require("@project-chip/matter.js/endpoint");
const definitions_1 = require("@project-chip/matter.js/endpoint/definitions");
const AggregatorEndpoint_1 = require("@project-chip/matter.js/endpoints/AggregatorEndpoint");
const environment_2 = require("@project-chip/matter.js/environment");
const log_1 = require("@project-chip/matter.js/log");
const node_1 = require("@project-chip/matter.js/node");
const package_json_1 = __importDefault(require("@project-chip/matter.js/package.json"));
const schema_1 = require("@project-chip/matter.js/schema");
const path_1 = __importStar(require("path"));
const ISY_js_1 = require("../../ISY.js");
const ISYBridgedDeviceBehavior_js_1 = require("../Behaviors/ISYBridgedDeviceBehavior.js");
const ISYOnOffBehavior_js_1 = require("../Behaviors/ISYOnOffBehavior.js");
require("../Mappings/Insteon.js");
const winston_1 = require("winston");
//@ts-ignore
exports.version = package_json_1.default.version;
// #endregion Interfaces (1)
// #region Functions (3)
function create(isy, config) {
    return createMatterServer(isy, config);
}
async function createMatterServer(isy, config) {
    var logger = winston_1.loggers.add('matter', {
        transports: isy.logger.transports,
        levels: isy.logger.levels,
        format: winston_1.format.label({ label: 'Matter' })
    });
    if (isy === undefined) {
        isy = ISY_js_1.ISY.instance;
    }
    try {
        log_1.Logger.addLogger('polyLogger', (lvl, message) => {
            let msg = message.slice(23).remove(log_1.Level[lvl]).trimStart();
            let level = log_1.Level[lvl].toLowerCase().replace('notice', 'info');
            if (msg.startsWith('EndpointStructureLogger')) {
                if (lvl === log_1.Level.INFO)
                    level = 'debug';
            }
            logger.log(level, msg);
        }, 
        /*Preserve existing formatting, but trim off date*/
        {
            defaultLogLevel: (0, log_1.levelFromString)(logger.level),
            logFormat: 'plain'
        });
    }
    finally {
        log_1.Logger.defaultLogLevel = (0, log_1.levelFromString)(logger.level);
    }
    config = await initializeConfiguration(isy, config);
    logger.info(`Matter config read: ${JSON.stringify(config)}`);
    log_1.Logger.removeLogger('default');
    let server = await node_1.ServerNode.create({
        // Required: Give the Node a unique ID which is used to store the state of this node
        id: config.uniqueId,
        // Provide Network relevant configuration like the port
        // Optional when operating only one device on a host, Default port is 5540
        network: {
            port: config.port,
            //ipv4: false,
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
            deviceType: AggregatorEndpoint_1.AggregatorEndpoint.deviceType
        },
        // Provide defaults for the BasicInformation cluster on the Root endpoint
        // Optional: If Omitted some development defaults are used
        basicInformation: {
            vendorName: isy.vendorName,
            vendorId: (0, datatype_1.VendorId)(config.vendorId),
            nodeLabel: config.productName,
            productName: config.productName,
            productLabel: config.productName,
            productId: config.productId,
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
    const aggregator = new endpoint_1.Endpoint(AggregatorEndpoint_1.AggregatorEndpoint, { id: 'aggregator' });
    await server.add(aggregator);
    logger.info(`Bridge Aggregator Added`);
    const endpoints = [];
    for (const node of isy.nodeMap.values()) {
        let device = node;
        let serialNumber = `${device.address.replaceAll(' ', '_').replaceAll('.', '_')}`;
        if (device.enabled && !(device instanceof ISY_js_1.InsteonKeypadButtonDevice)) {
            //const name = `OnOff ${isASocket ? "Socket" : "Light"} ${i}`;
            //@ts-ignore
            let baseBehavior;
            if (device instanceof ISY_js_1.InsteonDimmableDevice) {
                baseBehavior = definitions_1.DimmableLightDevice.with(bridged_device_basic_information_1.BridgedDeviceBasicInformationServer, ISYBridgedDeviceBehavior_js_1.ISYBridgedDeviceBehavior, ISYOnOffBehavior_js_1.ISYOnOffBehavior, ISYOnOffBehavior_js_1.ISYDimmableBehavior);
                // if(device instanceof InsteonSwitchDevice)
                // {
                //     baseBehavior = DimmerSwitchDevice.with(BridgedDeviceBasicInformationServer);
                // }
            }
            else if (device instanceof ISY_js_1.InsteonRelayDevice) {
                baseBehavior = definitions_1.OnOffLightDevice.with(bridged_device_basic_information_1.BridgedDeviceBasicInformationServer, ISYBridgedDeviceBehavior_js_1.ISYBridgedDeviceBehavior, ISYOnOffBehavior_js_1.ISYOnOffBehavior);
                // if(device instanceof InsteonSwitchDevice)
                // {
                //     baseBehavior = OnOffLightSwitchDevice.with(BridgedDeviceBasicInformationServer);
                // }
            }
            if (baseBehavior !== undefined) {
                //@ts-ignore
                const endpoint = new endpoint_1.Endpoint(baseBehavior, {
                    id: serialNumber,
                    isyNode: {
                        address: device.address
                    },
                    bridgedDeviceBasicInformation: {
                        nodeLabel: device.label.rightWithToken(32),
                        vendorName: 'Insteon Technologies, Inc.',
                        vendorId: (0, datatype_1.VendorId)(config.vendorId),
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
    (0, device_1.logEndpoint)(endpoint_1.EndpointServer.forEndpoint(server), { logAttributePrimitiveValues: true, logAttributeObjectValues: false, logClusterGlobalAttributes: false });
    // }
    if (server.lifecycle.isOnline) {
        const { qrPairingCode, manualPairingCode } = server.state.commissioning.pairingCodes;
        logger.info('\n' + schema_1.QrCode.get(qrPairingCode));
        logger.info(`QR Code URL: https://project-chip.github.io/connectedhomeip/qrcode.html?data=${qrPairingCode}`);
        logger.info(`Manual pairing code: ${manualPairingCode}`);
    }
    /*for(let e of endpoints)
    {
      e[1].initialize(e[0] as any);
    }*/
    exports.instance = server;
    return server;
}
function getPairingCode(server = exports.instance) {
    let codes = server.state.commissioning.pairingCodes;
    codes.renderedQrPairingCode = schema_1.QrCode.get(codes.qrPairingCode);
    codes.url = `https://project-chip.github.io/connectedhomeip/qrcode.html?data=${codes.qrPairingCode}`;
    return codes;
}
async function initializeConfiguration(isy, config) {
    var logger = isy.logger;
    const environment = (0, environment_1.NodeJsEnvironment)();
    const storageService = environment.get(environment_2.StorageService);
    environment.vars.set('storage.path', path_1.default.resolve(isy.storagePath, 'matter'));
    environment.vars.use(() => {
        const location = environment.vars.get('storage.path', environment.vars.get('path.root', '.'));
        storageService.location = location;
    });
    storageService.factory = (namespace) => new storage_1.StorageBackendDisk((0, path_1.resolve)(storageService.location ?? '.', namespace), environment.vars.get('storage.clear', false));
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
        uniqueId
    };
}
// #endregion Functions (3)
//# sourceMappingURL=Server.js.map