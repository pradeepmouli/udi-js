"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServerNode = createServerNode;
const node_1 = require("@project-chip/matter.js/node");
const ISY_js_1 = require("../../ISY.js");
const environment_1 = require("@project-chip/matter-node.js/environment");
const environment_2 = require("@project-chip/matter.js/environment");
const storage_1 = require("@project-chip/matter-node.js/storage");
const path_1 = require("path");
const bridged_device_basic_information_1 = require("@project-chip/matter.js/behaviors/bridged-device-basic-information");
const datatype_1 = require("@project-chip/matter.js/datatype");
const device_1 = require("@project-chip/matter.js/device");
const endpoint_1 = require("@project-chip/matter.js/endpoint");
const AggregatorEndpoint_1 = require("@project-chip/matter.js/endpoints/AggregatorEndpoint");
const log_1 = require("@project-chip/matter.js/log");
const schema_1 = require("@project-chip/matter.js/schema");
const ISYOnOffBehavior_js_1 = require("../Behaviors/ISYOnOffBehavior.js");
const definitions_1 = require("@project-chip/matter.js/endpoint/definitions");
//import {clone} from 'isy-nodejs/Utils';
//let { Utils } = await import ('isy-nodejs');
// function plainLogFormatter(now: Date, level: Level, facility: string, prefix: string, values: any[]) {
//     const creator = plaintextCreator();
//     const formattedValues = renderDiagnostic(values, {
//         ...creator,
//         key: text => creator.text(`${text}: `),
//         value: producer => creator.text(producer()),
//         strong: producer => creator.text(`*${producer()}*`),
//         weak: producer => creator.text(producer()),
//         status: (status, producer) => `${creator.text(statusIcon(status))}${producer()}`,
//         via: text => creator.text(text),
//     });
//     return `${formatTime(now)} ${Level[level]} ${facility} ${prefix}${formattedValues}`;
//
//let matterLogger = clone(logger,'matter.js');
//2024-07-03 16:30:43.693
async function createServerNode(isy = ISY_js_1.ISY.instance) {
    var logger = isy.logger;
    log_1.Logger.addLogger("polyLogger", (level, message) => logger.log(log_1.Level[level].toLowerCase().replace('notice', 'info'), message.slice(23).remove(log_1.Level[level]).trimStart()), /*Preserve existing formatting, but trim off date*/ {
        defaultLogLevel: (0, log_1.levelFromString)(logger.level),
        logFormat: 'plain'
    });
    log_1.Logger.defaultLogLevel = (0, log_1.levelFromString)(logger.level);
    var config = await getConfiguration(isy);
    logger.info(`Matter config read: ${JSON.stringify(config)}`);
    const server = await node_1.ServerNode.create({
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
            discriminator: config.discriminator,
        },
        // Provide Node announcement settings
        // Optional: If Ommitted some development defaults are used
        productDescription: {
            name: isy.model,
            deviceType: AggregatorEndpoint_1.AggregatorEndpoint.deviceType,
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
        },
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
    const aggregator = new endpoint_1.Endpoint(AggregatorEndpoint_1.AggregatorEndpoint, { id: "aggregator" });
    await server.add(aggregator);
    logger.info(`Bridge Aggregator Added`);
    const endpoints = [];
    for (const device of isy.deviceList.values()) {
        let serialNumber = `${device.address.replaceAll(' ', '_').replaceAll('.', '_')}`;
        if (device instanceof ISY_js_1.InsteonRelayDevice && device.enabled && !(device instanceof ISY_js_1.InsteonKeypadButtonDevice)) {
            //const name = `OnOff ${isASocket ? "Socket" : "Light"} ${i}`;
            let baseBehavior;
            if (device instanceof ISY_js_1.InsteonDimmableDevice) {
                baseBehavior = definitions_1.DimmableLightDevice.with(bridged_device_basic_information_1.BridgedDeviceBasicInformationServer);
                // if(device instanceof InsteonSwitchDevice)
                // {
                //     baseBehavior = DimmerSwitchDevice.with(BridgedDeviceBasicInformationServer);
                // }
            }
            else {
                baseBehavior = definitions_1.OnOffLightDevice.with(bridged_device_basic_information_1.BridgedDeviceBasicInformationServer).with(ISYOnOffBehavior_js_1.ISYOnOffBehavior);
                // if(device instanceof InsteonSwitchDevice)
                // {
                //     baseBehavior = OnOffLightSwitchDevice.with(BridgedDeviceBasicInformationServer);
                // }
            }
            const endpoint = new endpoint_1.Endpoint(baseBehavior, {
                id: serialNumber,
                address: device.address,
                bridgedDeviceBasicInformation: {
                    nodeLabel: device.displayName.rightWithToken(32),
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
            logger.info(`Endpoint Added ${JSON.stringify(endpoint.id)} for ${device.displayName} (${device.address})`);
            //endpoints.push({0:endpoint,1:device});
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
    await server.bringOnline();
    logger.info('Matter Server is online');
    /**
     * Log the endpoint structure for debugging reasons and to allow to verify anything is correct
     */
    //MatterLogger.setLogger("EndpointStructureLogger", ((level, message) => logger.log(Level[level], message)));
    //logEndpoint(EndpointServer.forEndpoint(server));
    (0, device_1.logEndpoint)(endpoint_1.EndpointServer.forEndpoint(server), { logAttributePrimitiveValues: true, logAttributeObjectValues: false });
    if (server.lifecycle.isOnline) {
        const { qrPairingCode, manualPairingCode } = server.state.commissioning.pairingCodes;
        logger.info(schema_1.QrCode.get(qrPairingCode));
        logger.info(`QR Code URL: https://project-chip.github.io/connectedhomeip/qrcode.html?data=${qrPairingCode}`);
        logger.info(`Manual pairing code: ${manualPairingCode}`);
    }
    /*for(let e of endpoints)
    {
      e[1].initialize(e[0] as any);
    }*/
    return new node_1.ServerNode(isy);
}
async function getConfiguration(isy) {
    var logger = isy.logger;
    /**
     * Collect all needed data
     *
     * This block collects all needed data from cli, environment or storage. Replace this with where ever your data come from.
     *
     * Note: This example uses the matter.js process storage system to store the device parameter data for convenience
     * and easy reuse. When you also do that be careful to not overlap with Matter-Server own storage contexts
     * (so maybe better not do it ;-)).
     */
    const environment = (0, environment_1.NodeJsEnvironment)();
    const storageService = environment.get(environment_2.StorageService);
    environment.vars.set("storage.path", ISY_js_1.ISY.instance.storagePath + "/matter");
    environment.vars.use(() => {
        const location = environment.vars.get("storage.path", environment.vars.get("path.root", "."));
        storageService.location = location;
    });
    storageService.factory = namespace => new storage_1.StorageBackendDisk((0, path_1.resolve)(storageService.location ?? ".", namespace), environment.vars.get("storage.clear", false));
    logger.info(`Matter storage location: ${storageService.location} (Directory)`);
    const deviceStorage = (await storageService.open("device")).createContext("data");
    const vendorName = isy.vendorName;
    const passcode = environment.vars.number("passcode") ?? (await deviceStorage.get("passcode", 20202021));
    const discriminator = environment.vars.number("discriminator") ?? (await deviceStorage.get("discriminator", 3840));
    // product name / id and vendor id should match what is in the device certificate
    const vendorId = environment.vars.number("vendorid") ?? (await deviceStorage.get("vendorid", 0xfff1));
    const productId = environment.vars.number("productid") ?? (await deviceStorage.get("productid", 0x8000));
    const productName = isy.productName;
    const port = environment.vars.number("port") ?? 5540;
    const uniqueId = isy.id;
    //environment.vars.string("uniqueid") ?? (await deviceStorage.get("uniqueid", Time.nowMs().toString()));
    // Persist basic data to keep them also on restart
    await deviceStorage.set({
        passcode,
        discriminator,
        vendorid: vendorId,
        productid: productId,
        uniqueid: uniqueId,
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
    };
}
