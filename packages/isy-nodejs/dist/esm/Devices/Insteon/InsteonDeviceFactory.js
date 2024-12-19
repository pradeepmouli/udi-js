import { Category as BaseCat } from '../../Definitions/Global/Categories.js';
import { isFamily, parseDeviceInfo } from '../../Model/NodeInfo.js';
import * as Insteon from './index.js';
import { Family } from '../../Definitions/index.js';
let Category = BaseCat.Insteon;
export class InsteonDeviceFactory {
    // public static buildDeviceMap() {
    // 	var fams = new Map<Family, FamilyDef<Family>>();
    // 	s.forEach((item) => {
    // 		var id = item.id as Family;
    // 		fams.set(id, { id: item.id, description: item.description, name: item.name, categories: new Map<string, CategoryDef<typeof id>>() });
    // 		var famDef = fams[id] as FamilyDef<Family>;
    // 		item.categories.forEach((element) => {
    // 			var catDef = { id: element.id, name: element.name, devices: new Map<string, DeviceDef<Family>> };
    // 			element.devices.forEach(
    // 				device => {
    // 					const r = this.getDeviceDetails({
    // 						family: item.id,
    // 						type: `${element.id}.${device.id}.0.0`,
    // 						address: '0 0 0 1',
    // 						nodeDefId: '',
    // 						enabled: undefined,
    // 						pnode: undefined,
    // 						name: '',
    // 						startDelay: 0,
    // 						hint: '',
    // 						endDelay: 0,
    // 						wattage: 0,
    // 						dcPeriod: 0
    // 					});
    // 					if (!r.unsupported) {
    // 						device.name = r.name;
    // 						device.modelNumber = r.modelNumber;
    // 						device.class = r.class.name;
    // 					}
    // 					catDef.devices.set(`${device.id}`, { id: device.id, modelNumber: device.modelNumber, name: device.name, class: r.class });
    // 				}
    // 			);
    // 			famDef.categories.set(element.name, catDef);
    // 			element.devices = element.devices.sort((a, b) => a.id - b.id);
    // 		});
    // 	}
    // 	);
    // 	writeFileSync("DeviceMapClean.json", JSON.stringify(fams));
    // }
    static getDeviceDetails(node) {
        const family = Number(node.family ?? '1');
        //let insteonFamilyDef = s[0] as FamilyDef<Family.Insteon>;
        if (isFamily(node, Family.Insteon)) {
            //insteonFamilyDef.categories.forEach(callbackfn))
            let n = this.getInsteonDeviceDetails(node);
            if (n.class) {
                if ('Node' in n.class) {
                    return { ...n, class: n.class.Node };
                }
                if ('Device' in n.class) {
                    return { ...n, class: n.class.Device };
                }
                if (n.class instanceof Function) {
                    return n;
                }
            }
        }
        return { name: "Unsupported Device", class: Insteon.Base, unsupported: true };
    }
    static getInsteonDeviceDetails(node) {
        const type = parseDeviceInfo(node);
        const subAddress = node.address.split(' ').pop();
        // const typeArray = typeCode.split('.');
        const category = type.category;
        const deviceCode = type.model;
        let deviceDetails = null;
        if (category === Category.Controller) {
            deviceDetails = InsteonDeviceFactory.getControllerInfo(deviceCode);
        }
        else if (category === 1) {
            deviceDetails = InsteonDeviceFactory.getDimLightInfo(deviceCode, subAddress, node);
        }
        else if (category === 2) {
            deviceDetails = InsteonDeviceFactory.getSwitchLightInfo(deviceCode, subAddress);
        }
        else if (category === 3) {
            deviceDetails = InsteonDeviceFactory.getNetworkBridgeInfo(deviceCode);
        }
        else if (category === 5) {
            deviceDetails = InsteonDeviceFactory.getClimateControlInfo(deviceCode);
        }
        else if (category === 4) {
            deviceDetails = InsteonDeviceFactory.getIrrigationControlInfo(deviceCode);
        }
        else if (category === 7) {
            deviceDetails = InsteonDeviceFactory.getIOControlInfo(deviceCode);
        }
        else if (category === 15) {
            deviceDetails = InsteonDeviceFactory.getAccessControlInfo(deviceCode);
        }
        else if (category === 16) {
            deviceDetails = InsteonDeviceFactory.getSHS(deviceCode, subAddress, node);
        }
        else if (category === 9) {
            deviceDetails = InsteonDeviceFactory.getEnergyManagement(deviceCode);
        }
        else if (category === 14) {
            deviceDetails = InsteonDeviceFactory.getWindowsCovering(deviceCode);
        }
        if (deviceDetails) {
            deviceDetails.version = type.firmwareVersion;
            if (deviceDetails.class === Insteon.OnOffOutlet && subAddress !== '1') {
                deviceDetails.class = Insteon.RelayLampSwitch.Node;
            }
        }
        if (!deviceDetails) {
            deviceDetails =
                { name: 'Unsupported Insteon Device', class: null, unsupported: true };
        }
        if (!deviceDetails.class) {
            deviceDetails.class = Insteon.Base;
            deviceDetails.unsupported = true;
        }
        return deviceDetails;
        // deviceDetails = deviceDetails + version.toString(16);
    }
    static getNetworkBridgeInfo(deviceCode) {
        const c = String.fromCharCode(deviceCode);
        let retVal = null;
        switch (c) {
            case String.fromCharCode(1):
                retVal = { name: 'PowerLinc Serial', modelNumber: '2414S' };
                break;
            case String.fromCharCode(2):
                retVal = { name: 'PowerLinc USB', modelNumber: '2414U' };
                break;
            case String.fromCharCode(3):
                retVal = { name: 'Icon PowerLinc Serial', modelNumber: '2814S' };
                break;
            case String.fromCharCode(4):
                retVal = { name: 'Icon PowerLinc USB', modelNumber: '2814U' };
                break;
            case String.fromCharCode(5):
                retVal = { name: 'PowerLine Modem', modelNumber: '2412S' };
                break;
            case String.fromCharCode(6):
                retVal = { name: 'IRLinc Receiver', modelNumber: '2411R' };
                break;
            case String.fromCharCode(7):
                retVal = { name: 'IRLinc Transmitter', modelNumber: '2411T' };
                break;
            case String.fromCharCode(11):
                retVal = { name: 'PowerLine Modem USB', modelNumber: '2412U' };
                break;
            case '\r':
                retVal = { name: 'EZX10-RF' };
                break;
            case String.fromCharCode(15):
                retVal = {
                    name: 'EZX10-IR'
                };
                break;
            case 'O':
                retVal = { name: 'PowerLine Modem', modelNumber: '12237DB' };
        }
        return retVal;
    }
    static getIrrigationControlInfo(deviceCode) {
        const c = String.fromCharCode(deviceCode);
        return c === String.fromCharCode(0) ? { name: 'EZRain/EZFlora Irrigation Controller' } : null;
    }
    static getSwitchLightInfo(deviceCode, subAddress) {
        const c = String.fromCharCode(deviceCode);
        let retVal = { name: 'Generic Insteon Relay' };
        switch (c) {
            case String.fromCharCode(6):
                retVal = { name: 'ApplianceLinc - Outdoor Plugin Module', modelNumber: '2456S3E' };
                break;
            case String.fromCharCode(7):
                retVal = { name: 'TimerLinc', modelNumber: '2456S3T' };
                break;
            case '\t':
                retVal = { name: 'ApplianceLinc', modelNumber: '2456S3' };
                break;
            case '\n':
                retVal = { name: 'SwitchLinc Relay', modelNumber: '2476ST', class: Insteon.RelayLampSwitch.Node };
                break;
            case String.fromCharCode(11):
                retVal.class = Insteon.RelayLampSwitch.Node;
                retVal.name = 'Icon On/Off Switch';
                retVal.modelNumber = '2876S';
                break;
            case '\f':
                retVal = { name: 'Icon Appliance Adapter', modelNumber: '2856S3' };
                break;
            case '\r':
                retVal = { name: 'ToggleLinc Relay', modelNumber: '2466S', class: Insteon.RelayLampSwitch.Node };
                break;
            case String.fromCharCode(26):
                retVal = { name: 'ToggleLinc Relay', modelNumber: '2466S', class: Insteon.RelayLampSwitch.Node };
                break;
            case String.fromCharCode(14):
                break;
            case ')':
                retVal = { name: 'SwitchLinc Relay Timer', modelNumber: '2476ST', class: Insteon.RelayLampSwitch.Node };
                break;
            case String.fromCharCode(17):
                retVal = {
                    name: 'EZSwitch30', class: Insteon.RelayLampSwitch.Node
                };
                break;
            case String.fromCharCode(15):
                retVal = { name: 'KeypadLinc Relay', modelNumber: '2486S/WH6', class: Insteon.KeypadRelay.Node };
                break;
            case String.fromCharCode(5):
                retVal = { name: 'KeypadLinc Relay (8 buttons)', modelNumber: '2486S/WH8', class: Insteon.KeypadRelay.Node };
                break;
            case String.fromCharCode(16):
                retVal = { name: 'In-LineLinc Relay', modelNumber: '2475S' };
                break;
            case String.fromCharCode(20):
                retVal = { name: 'In-LineLinc Relay W/ Sense', modelNumber: 'B2475S' };
                break;
            case String.fromCharCode(19):
                retVal = { name: 'Icon SwitchLinc Relay for Bell Canada', modelNumber: 'B2475S' };
                break;
            case '\b':
                retVal = { name: 'OutletLinc', modelNumber: '2473', class: Insteon.OnOffOutlet };
                break;
            case String.fromCharCode(18):
                retVal = { name: 'Companion Switch', modelNumber: '2474S', class: Insteon.RelayLampSwitch.Node };
                break;
            case String.fromCharCode(21):
                retVal = { name: 'SwitchLinc Relay W/ Sense', modelNumber: '2476S', class: Insteon.RelayLampSwitch.Node };
                break;
            case String.fromCharCode(23):
                retVal = { name: 'Icon Relay 3-Pin', modelNumber: '2856S3B', class: Insteon.RelayLampSwitch.Node };
                break;
            case String.fromCharCode(22):
                retVal = { name: ' Icon Relay Switch', modelNumber: '2876SB', class: Insteon.RelayLampSwitch.Node };
                break;
            case String.fromCharCode(24):
                retVal = { name: 'SwitchLinc Relay 220 V.', modelNumber: '2494S220', class: Insteon.RelayLampSwitch.Node };
                break;
            case String.fromCharCode(25):
                retVal = { name: 'SwitchLinc Relay 220 V. w/Beeper', modelNumber: '2494S220', class: Insteon.RelayLampSwitch.Node };
                break;
            case String.fromCharCode(28):
                retVal = { name: 'SwitchLinc Relay - Remote Control On/Off Switch', modelNumber: '2476S', class: Insteon.RelayLampSwitch.Node };
                break;
            case '%':
                retVal = { name: 'KeypadLinc Timer Relay (8 buttons)', modelNumber: '2484S/WH8', class: Insteon.KeypadRelay.Node };
                break;
            case ' ':
                retVal = { name: 'KeypadLinc Relay', modelNumber: '2486S/WH6-SP', class: Insteon.KeypadRelay.Node };
                break;
            case '!':
                retVal = { name: 'OutletLinc', modelNumber: '2473-SP', class: Insteon.OnOffOutlet };
                break;
            case '#':
                retVal = { name: 'SwitchLinc Relay - Remote Control On/Off Switch', modelNumber: '2476S-SP', class: Insteon.RelayLampSwitch.Node };
            case '"':
                retVal = { name: 'In-LineLinc Relay', modelNumber: '2475S-SP', class: Insteon.RelayLampSwitch.Node };
                break;
            case String.fromCharCode(30):
                retVal = { name: 'KeypadLinc Relay', modelNumber: '2487S', class: Insteon.KeypadRelay.Node };
                break;
            case ',':
                retVal = { name: 'Dual Band KeypadLinc Relay', modelNumber: '2487S', class: Insteon.KeypadRelay.Node };
                break;
            case String.fromCharCode(31):
                retVal = { name: 'Dual Band InlineLinc On/Off Switch', modelNumber: '2475SDB', class: Insteon.RelayLampSwitch.Node };
                break;
            case '*':
                retVal = { name: 'Dual Band SwitchLinc On/Off Switch', modelNumber: '2477S', class: Insteon.RelayLampSwitch.Node };
                break;
            case '/':
                retVal = { name: 'Micro Module On/Off', modelNumber: '2443-222' };
                break;
            case '1':
                retVal = { name: 'Micro Module On/Off', modelNumber: '2443-422' };
                break;
            case '2':
                retVal = { name: 'Micro Module On/Off', modelNumber: '2443-422' };
                break;
            case '<':
                retVal = { name: 'Micro Module On/Off', modelNumber: '2443-522' };
                break;
            case '.':
                retVal = { name: 'Din Rail Relay', modelNumber: '2453-222', class: Insteon.RelayLampSwitch.Node };
                break;
            case '3':
                retVal = { name: 'Din Rail Relay', modelNumber: '2453-422', class: Insteon.RelayLampSwitch.Node };
                break;
            case '4':
                retVal = { name: 'Din Rail Relay', modelNumber: '2453-522', class: Insteon.RelayLampSwitch.Node };
                break;
            case '=':
                retVal = { name: 'Din Rail Relay', modelNumber: '2453-522', class: Insteon.RelayLampSwitch.Node };
                break;
            case '7':
                retVal = { name: 'On/Off Module', modelNumber: '2635-222', };
                break;
            case '8':
                retVal = { name: 'On/Off Outdoor Module', modelNumber: '2634-222' };
                break;
            case '9':
                retVal = { name: 'On/Off Outlet', modelNumber: '2663-222' };
                break;
            case '-':
                retVal = { name: 'Plugin Relay', modelNumber: '2633-422' };
                break;
            case '0':
                retVal = { name: 'Plugin Relay', modelNumber: '2633-432' };
                break;
            case '5':
                retVal = { name: 'Plugin Relay', modelNumber: '2633-442' };
                break;
            case '6':
                retVal = { name: 'Plugin Relay', modelNumber: '2633-522' };
        }
        if (subAddress != '1' && retVal.class === Insteon.KeypadRelay.Node) {
            retVal.class = Insteon.KeypadButton.Node;
        }
        if (retVal.class === undefined) {
            retVal.class = Insteon.RelayLampSwitch.Node;
        }
        return retVal;
    }
    static getDimLightInfo(deviceCode, subAddress, node) {
        const c = String.fromCharCode(deviceCode);
        let retVal = { name: "Generic Insteon Dimmer" };
        switch (c) {
            case String.fromCharCode(0):
                retVal = { name: 'LampLinc', modelNumber: '2456D3' };
                break;
            case String.fromCharCode(1):
                retVal = { name: 'SwitchLinc Dimmer', modelNumber: '2476D', class: Insteon.DimmerLampSwitch.Node };
                break;
            case String.fromCharCode(2):
                retVal = { name: 'In-LineLinc Dimmable', modelNumber: '2475D' };
                break;
            case String.fromCharCode(3):
                retVal = { name: 'Icon Switch Dimmer', modelNumber: '2876D3' };
                break;
            case String.fromCharCode(4):
                retVal = { name: 'SwitchLinc Dimmer', modelNumber: '2476DH', class: Insteon.DimmerLampSwitch.Node };
                break;
            case String.fromCharCode(6):
                retVal = { name: 'LampLinc 2 Pin', modelNumber: '2456D2' };
                break;
            case '\t':
                retVal = { name: 'KeypadLinc Dimmer', modelNumber: '2486D' };
                break;
            case String.fromCharCode(7):
                retVal = { name: 'Icon LampLinc 2 Pin', modelNumber: '2856D2' };
                break;
            case '\n':
                retVal = { name: 'Icon In-Wall Controller', modelNumber: '2886D' };
                break;
            case '\r':
                retVal = { name: 'SocketLinc', modelNumber: '2454D' };
                break;
            case '\f':
                retVal = { name: 'KeypadLinc Dimmer 8 Button', modelNumber: '2486DWH8', class: Insteon.KeypadDimmer.Node };
                break;
            case String.fromCharCode(19):
                retVal = { name: 'Icon SwitchLinc Dimmer for Bell Canada' };
                break;
            case String.fromCharCode(23):
                break;
            case String.fromCharCode(31):
                retVal = { name: 'ToggleLinc Dimmer', modelNumber: '2466D', class: Insteon.DimmerLampSwitch.Node };
                break;
            case String.fromCharCode(24):
                retVal = { name: 'Companion Dimmer', modelNumber: '2474D' };
                break;
            case String.fromCharCode(26):
                retVal = { name: 'InlineLinc Dimmer', modelNumber: '2475D', class: Insteon.DimmerLampSwitch.Node };
                break;
            case String.fromCharCode(5):
                retVal = { name: 'KeypadLinc Countdown Timer', modelNumber: '2484DWH8' };
                break;
            case String.fromCharCode(27):
                retVal = { name: 'KeypadLinc Dimmer 6 Buttons', modelNumber: '2486D', class: Insteon.KeypadDimmer.Node };
                break;
            case String.fromCharCode(28):
                retVal = { name: 'KeypadLinc Dimmer 8 Buttons', modelNumber: '2486D', class: Insteon.KeypadDimmer.Node };
                break;
            case String.fromCharCode(25):
                retVal = { name: 'SwitchLinc Dimmer W/Beeper', modelNumber: '2476D' };
                break;
            case String.fromCharCode(14):
                retVal = { name: 'LampLinc BiPhy', modelNumber: 'B2457D2' };
                break;
            case String.fromCharCode(30):
                retVal = { name: 'Icon Dimmer', modelNumber: '2876DB' };
                break;
            case String.fromCharCode(29):
                retVal = { name: 'SwitchLinc Dimmer 1000W', modelNumber: '2476DH', class: Insteon.DimmerLampSwitch.Node };
                break;
            case '"':
                retVal = { name: 'LampLinc 2-Pin Dimmer', modelNumber: '2457D2X' };
                break;
            case 'U':
                retVal = { name: 'Dual Band Switchlinc Dimmer', modelNumber: '2432-622', class: Insteon.DimmerLampSwitch.Node };
                break;
            case ' ':
                retVal = { name: 'Dual Band SwitchLinc Dimmer', modelNumber: '2477D', class: Insteon.DimmerLampSwitch.Node };
                break;
            case '1':
                retVal = { name: 'Dual Band SwitchLinc Dimmer (240V)', modelNumber: '2478D', class: Insteon.DimmerLampSwitch.Node };
                break;
            case '-':
                retVal = { name: 'Dual Band SwitchLinc Dimmer', modelNumber: '2477DH', class: Insteon.DimmerLampSwitch.Node };
                break;
            case '\'':
                retVal = { name: 'Dual Band SwitchLinc Dimmer', modelNumber: '2477D-SP', class: Insteon.DimmerLampSwitch.Node };
                break;
            case '+':
                retVal = { name: 'Dual Band SwitchLinc Dimmer', modelNumber: '2477DH-SP', class: Insteon.DimmerLampSwitch.Node };
                break;
            case ')':
                retVal = { name: 'KeypadLinc Dimmer 8 Buttons', modelNumber: '2486D-SP', class: Insteon.DimmerLampSwitch.Node };
                break;
            case '*':
                retVal = { name: 'LampLinc 2-Pin Dimmer', modelNumber: '2457D2X-SP' };
                break;
            case ',':
                retVal = { name: 'InlineLinc Dimmer', modelNumber: '2475D-SP' };
                break;
            case '%':
                retVal = { name: 'Ballast Dimmer', modelNumber: '2475DA2' };
                break;
            case '=':
                retVal = { name: 'Ballast Dimmer', modelNumber: '2446-422' };
                break;
            case '>':
                retVal = { name: 'Ballast Dimmer', modelNumber: '2446-522' };
                break;
            case '.':
                retVal = { name: 'FanLinc', modelNumber: '2475F', class: Insteon.Fan };
                break;
            case '!':
                retVal = { name: 'Dual Band OutletLinc Dimmer', modelNumber: '2472D', class: Insteon.DimmerOutlet };
                break;
            case '0':
                retVal = { name: 'SwitchLinc Dimmer', modelNumber: '2476D', class: Insteon.DimmerLampSwitch.Node };
                break;
            case '$':
                retVal = { name: 'SwitchLinc Dimmer 2-Wire', modelNumber: '2474DWH', class: Insteon.DimmerLampSwitch.Node };
                break;
            case '2':
                retVal = { name: 'InLineLinc Dimmer', modelNumber: '2475DA1' };
                break;
            case ':':
                retVal = { name: 'Insteon LED Bulb 8 Watt (60W)', modelNumber: '2672-222' };
                break;
            case 'I':
                retVal = { name: 'Insteon LED Bulb PAR38 12 Watt', modelNumber: '2674-222' };
                break;
            case '5':
                retVal = { name: 'Micro Module Dimmer', modelNumber: '2442-222' };
                break;
            case '8':
                retVal = { name: 'Micro Module Dimmer', modelNumber: '2442-422' };
                break;
            case '9':
                retVal = { name: 'Micro Module Dimmer', modelNumber: '2442-522' };
                break;
            case 'S':
                retVal = { name: 'Micro Module Dimmer', modelNumber: '2442-522' };
                break;
            case '4':
                retVal = { name: 'Din Rail Dimmer', modelNumber: '2452-222' };
                break;
            case '6':
                retVal = { name: 'Din Rail Dimmer', modelNumber: '2452-422' };
                break;
            case '7':
                retVal = { name: 'Din Rail Dimmer', modelNumber: '2452-522' };
                break;
            case 'T':
                retVal = { name: 'Din Rail Dimmer', modelNumber: '2452-522' };
                break;
            case 'B':
                retVal = { name: 'KeypadLinc Dimmer 5 Buttons', modelNumber: '2334-2', class: Insteon.KeypadDimmer.Node };
                break;
            case 'A':
                retVal = { name: 'KeypadLinc Dimmer 8 Buttons', modelNumber: '2334-2', class: Insteon.KeypadDimmer.Node };
                break;
            case 'V':
                retVal = { name: 'KeypadLinc Dimmer 6 Buttons', modelNumber: '2334-632', class: Insteon.KeypadDimmer.Node };
                break;
            case String.fromCharCode(11):
                retVal = { name: 'Plugin Dimmer', modelNumber: '2632-422' };
                break;
            case String.fromCharCode(15):
                retVal = { name: 'Plugin Dimmer', modelNumber: '2632-432' };
                break;
            case String.fromCharCode(17):
                retVal = { name: 'Plugin Dimmer', modelNumber: '2632-442' };
                break;
            case 'P':
                retVal = { name: 'Plugin Dimmer', modelNumber: '2632-452' };
                break;
            case String.fromCharCode(18):
                retVal = { name: 'Plugin Dimmer', modelNumber: '2632-522' };
        }
        if (subAddress !== '1' && retVal.class === Insteon.KeypadDimmer.Node) {
            retVal.class = Insteon.KeypadButton.Node;
        }
        if (node.nodeDefId === 'FanLincMotor') {
            retVal.class = Insteon.FanLincMotor.Node;
        }
        if (retVal?.class === undefined) {
            retVal.class = Insteon.DimmerLamp.Node;
        }
        return retVal;
    }
    static getControllerInfo(deviceCode) {
        const c = String.fromCharCode(deviceCode);
        let retVal = null;
        switch (c) {
            case String.fromCharCode(0):
                retVal = { name: 'ControLinc', modelNumber: '2430' };
                break;
            case String.fromCharCode(5):
                retVal = { name: 'RemoteLinc', modelNumber: '2440' };
                break;
            case String.fromCharCode(14):
                retVal = { name: 'RemoteLinc EZ', modelNumber: '2440EZ' };
                break;
            case String.fromCharCode(6):
                retVal = { name: 'Icon Tabletop', modelNumber: '2830' };
                break;
            case '\t':
                retVal = { name: 'SignaLinc', modelNumber: '2442' };
                break;
            case String.fromCharCode(17):
                retVal = { name: 'RemoteLinc 2 Switch', modelNumber: '2342-242' };
                break;
            case String.fromCharCode(16):
                retVal = { name: 'RemoteLinc 2 Keypad, 4 Scene', modelNumber: '2342-232' };
                break;
            case String.fromCharCode(18):
                retVal = { name: 'RemoteLinc 2 Keypad, 8 Scene', modelNumber: '2342-222' };
                break;
            case String.fromCharCode(20):
                retVal = { name: 'Mini Remote Keypad, 4 Scene', modelNumber: '2342-432' };
                break;
            case String.fromCharCode(21):
                retVal = { name: 'Mini Remote Switch', modelNumber: '2342-442' };
                break;
            case String.fromCharCode(22):
                retVal = { name: 'Mini Remote Keypad, 8 Scene', modelNumber: '2342-422' };
                break;
            case String.fromCharCode(23):
                retVal = { name: 'Mini Remote Keypad, 4 Scene', modelNumber: '2342-532' };
                break;
            case String.fromCharCode(24):
                retVal = { name: 'Mini Remote Keypad, 8 Scene', modelNumber: '2342-522' };
                break;
            case String.fromCharCode(25):
                retVal = { name: 'Mini Remote Switch', modelNumber: '2342-542' };
                break;
            case String.fromCharCode(26):
                retVal = { name: 'Mini Remote Keypad, 8 Scene', modelNumber: '2342-222' };
                break;
            case String.fromCharCode(27):
                retVal = { name: 'Mini Remote Keypad, 4 Scene', modelNumber: '2342-232' };
                break;
            case String.fromCharCode(28):
                retVal = { name: 'Mini Remote Switch', modelNumber: '2342-242' };
        }
        return retVal;
    }
    static getIOControlInfo(deviceCode) {
        const c = String.fromCharCode(deviceCode);
        let retVal = null;
        switch (c) {
            case String.fromCharCode(0):
                retVal = { name: 'IOLinc', modelNumber: '2450' };
                break;
            case String.fromCharCode(3):
                retVal = { name: 'Compacta EZIO 2x4: INSTEON I/O Controller' };
                break;
            case String.fromCharCode(4):
                retVal = {
                    name: 'Compacta EZIO8SA: INSTEON I/O Controller'
                };
                break;
            case String.fromCharCode(2):
                retVal = {
                    name: 'Compacta EZIO8T: INSTEON I/O Controller'
                };
                break;
            case String.fromCharCode(5):
                retVal = {
                    name: 'Compacta EZSnSRF'
                };
                break;
            case String.fromCharCode(6):
                retVal = {
                    name: 'Compacta EZSnSRF Interface'
                };
                break;
            case String.fromCharCode(7):
                retVal = {
                    name: 'Compacta EZIO6I'
                };
                break;
            case '\b':
                retVal = {
                    name: 'Compacta EZIO4O'
                };
                break;
            case '\t':
                retVal = { name: 'SynchroLinc', modelNumber: '2423A5' };
                break;
            case '\r':
                retVal = { name: 'IOLinc (Refurbished)', modelNumber: '2450' };
                break;
            case String.fromCharCode(14):
                retVal = { name: 'I/O Module', modelNumber: '2248-222' };
                break;
            case String.fromCharCode(15):
                retVal = { name: 'I/O Module', modelNumber: '2248-422' };
                break;
            case String.fromCharCode(16):
                retVal = { name: 'I/O Module', modelNumber: '2248-442' };
                break;
            case String.fromCharCode(17):
                retVal = { name: 'I/O Module', modelNumber: '2248-522' };
                break;
            case String.fromCharCode(18):
                retVal = { name: 'IOLinc', modelNumber: '2822-222' };
                break;
            case String.fromCharCode(19):
                retVal = { name: 'IOLinc', modelNumber: '2822-422' };
                break;
            case String.fromCharCode(20):
                retVal = { name: 'IOLinc', modelNumber: '2822-442' };
                break;
            case String.fromCharCode(21):
                retVal = { name: 'IOLinc', modelNumber: '2822-522' };
                break;
            case String.fromCharCode(22):
                retVal = { name: 'Contact Closure', modelNumber: '2822-222' };
                break;
            case String.fromCharCode(23):
                retVal = { name: 'Contact Closure', modelNumber: '2822-422' };
                break;
            case String.fromCharCode(24):
                retVal = { name: 'Contact Closure', modelNumber: '2822-442' };
                break;
            case String.fromCharCode(25):
                retVal = { name: 'Contact Closure', modelNumber: '2822-522' };
                break;
            case String.fromCharCode(26):
                retVal = { name: 'Alert Module', modelNumber: '2867-222' };
                break;
            case String.fromCharCode(30):
                retVal = { name: 'Siren', modelNumber: '2868-222' };
                break;
            case ' ':
                retVal = { name: 'Siren', modelNumber: '2868-622' };
        }
        return retVal;
    }
    static getSHS(deviceCode, subAddress, node) {
        const c = String.fromCharCode(deviceCode);
        let retVal = null;
        switch (c) {
            case String.fromCharCode(1):
                retVal = { name: 'INSTEON Motion Sensor', modelNumber: '2842-222', class: Insteon.MotionSensor };
                break;
            case String.fromCharCode(4):
                retVal = { name: 'INSTEON Motion Sensor', modelNumber: '2842-422', class: Insteon.MotionSensor };
                break;
            case String.fromCharCode(5):
                retVal = { name: 'INSTEON Motion Sensor', modelNumber: '2842-522', class: Insteon.MotionSensor };
                break;
            case String.fromCharCode(3):
                retVal = { name: 'INSTEON Motion Sensor', modelNumber: '2420M-SP', class: Insteon.MotionSensor };
                break;
            case String.fromCharCode(2):
                retVal = { name: 'TriggerLinc', modelNumber: '2421', class: Insteon.MotionSensor };
                break;
            case '\t':
                retVal = { name: 'Open/Close Sensor', modelNumber: '2843-222', class: Insteon.DoorWindowSensor.Class };
                break;
            case String.fromCharCode(6):
                retVal = { name: 'Open/Close Sensor', modelNumber: '2843-422', class: Insteon.DoorWindowSensor.Class };
                break;
            case String.fromCharCode(7):
                break;
            case String.fromCharCode(25):
                retVal = { name: 'Open/Close Sensor', modelNumber: '2843-522', class: Insteon.DoorWindowSensor.Class };
                break;
            case '\b':
                retVal = { name: 'Leak Sensor', modelNumber: '2852-222', class: Insteon.LeakSensor };
                break;
            case '\r':
                retVal = { name: 'Leak Sensor', modelNumber: '2852-422', class: Insteon.LeakSensor };
                break;
            case String.fromCharCode(14):
                retVal = { name: 'Leak Sensor', modelNumber: '2852-522', class: Insteon.LeakSensor };
                break;
            case String.fromCharCode(26):
                retVal = { name: 'Leak Sensor', modelNumber: '2852-522', class: Insteon.LeakSensor };
                break;
            case '\n':
                retVal = { name: 'INSTEON Smoke Sensor', modelNumber: '', class: Insteon.SmokeSensor };
                break;
            case String.fromCharCode(17):
                retVal = { name: 'INSTEON Hidden Door Sensor', modelNumber: '2845-222', class: Insteon.DoorWindowSensor };
                break;
            case String.fromCharCode(20):
                retVal = { name: 'INSTEON Hidden Door Sensor', modelNumber: '2845-422', class: Insteon.DoorWindowSensor };
                break;
            case String.fromCharCode(21):
                break;
            case String.fromCharCode(27):
                retVal = { name: 'INSTEON Hidden Door Sensor', modelNumber: '2845-522', class: Insteon.DoorWindowSensor };
                break;
            case String.fromCharCode(22):
                retVal = { name: 'Insteon Motion Sensor II', modelNumber: '2844-222', class: Insteon.MotionSensor };
                break;
            case String.fromCharCode(24):
                retVal = { name: 'Insteon Motion Sensor II', modelNumber: '2844-522', class: Insteon.MotionSensor };
        }
        if ((node.nodeDefId === 'BinaryAlarm' || node.nodeDefId === 'BinaryAlarm_ADV') && subAddress !== '1') {
            if (retVal) {
                retVal.class = Insteon.Base;
            }
        }
        return retVal;
    }
    static getClimateControlInfo(deviceCode) {
        const c = String.fromCharCode(deviceCode);
        let retVal = null;
        switch (c) {
            case String.fromCharCode(0):
                retVal = {
                    name: 'BROAN SMSC080 Exhaust Fan'
                };
                break;
            case String.fromCharCode(2):
                retVal = {
                    name: 'BROAN SMSC110 Exhaust Fan'
                };
                break;
            case String.fromCharCode(5):
                retVal = {
                    name: 'BROAN, Venmar, Best Rangehoods'
                };
                break;
            case String.fromCharCode(1):
                retVal = {
                    name: 'Compacta EZTherm'
                };
                break;
            case String.fromCharCode(4):
                retVal = {
                    name: 'Compacta EZTherm'
                };
                break;
            case String.fromCharCode(3):
                retVal = { name: 'INSTEON Thermostat Adapter', modelNumber: '2441V' };
                break;
            case '\t':
                retVal = { name: 'INSTEON Thermostat Adapter', modelNumber: '2441V-SP' };
                break;
            case String.fromCharCode(11):
                retVal = { name: 'INSTEON Thermostat', modelNumber: '2441TH' };
                break;
            case String.fromCharCode(15):
                retVal = { name: 'INSTEON Thermostat', modelNumber: '2732-422' };
                break;
            case String.fromCharCode(16):
                retVal = { name: 'INSTEON Thermostat', modelNumber: '2732-522' };
                break;
            case String.fromCharCode(17):
                retVal = { name: 'INSTEON Thermostat', modelNumber: '2732-432' };
                break;
            case String.fromCharCode(18):
                retVal = { name: 'INSTEON Thermostat', modelNumber: '2732-532' };
                break;
            case String.fromCharCode(19):
                retVal = { name: 'INSTEON Thermostat Heat Pump', modelNumber: '2732-242' };
                break;
            case String.fromCharCode(20):
                retVal = { name: 'INSTEON Thermostat Heat Pump for Europe', modelNumber: '2732-442' };
                break;
            case String.fromCharCode(21):
                retVal = { name: 'INSTEON Thermostat Heat Pump for Aus/NZ', modelNumber: '2732-542' };
                break;
            case String.fromCharCode(22):
                retVal = { name: 'INSTEON Thermostat 2.0 (HVAC/HP)', modelNumber: '2732-222' };
                break;
            case String.fromCharCode(23):
                retVal = { name: 'INSTEON Thermostat 2.0 (HVAC/HP) for Europe', modelNumber: '2732-422' };
                break;
            case String.fromCharCode(24):
                retVal = { name: 'INSTEON Thermostat 2.0 (HVAC/HP) for Aus/NZ', modelNumber: '(2732-522)' };
                break;
            case '\n':
                retVal = { name: 'INSTEON Wireless Thermostat', modelNumber: '2441ZTH' };
                break;
            case String.fromCharCode(14):
                retVal = { name: 'All-In-One INSTEON Thermostat Adapter', modelNumber: '2491T' };
        }
        if (retVal?.class === undefined) {
            retVal.class = Insteon.Thermostat.Node;
        }
        return retVal;
    }
    static getAccessControlInfo(deviceCode) {
        const c = String.fromCharCode(deviceCode);
        const retVal = { name: '', modelNumber: '', class: Insteon.DoorLock.Node };
        switch (c) {
            case String.fromCharCode(6):
                retVal.name = 'MorningLinc';
                break;
            case '\n':
                retVal.name = 'Lock Controller';
        }
        return retVal;
    }
    static getEnergyManagement(deviceCode) {
        const c = String.fromCharCode(deviceCode);
        let retVal = null;
        switch (c) {
            case String.fromCharCode(0):
                retVal = {
                    name: 'ZBPCM (iMeter Solo compat.)'
                };
                break;
            case String.fromCharCode(7):
                retVal = { name: 'iMeter Solo', modelNumber: '2423A1' };
                break;
            case String.fromCharCode(11):
                retVal = {
                    name: 'Dual Band Normally Closed 240V Load Controller', modelNumber: '2477SA2'
                };
                break;
            case '\n':
                retVal = { name: 'Dual Band Normally Open 240V Load Controller', modelNumber: '2477SA1' };
                break;
            case '\r':
                retVal = {
                    name: 'Energy Display', modelNumber: '(2448A2)'
                };
        }
        return retVal;
    }
    static getWindowsCovering(deviceCode) {
        const c = String.fromCharCode(deviceCode);
        let retVal = null;
        switch (c) {
            case String.fromCharCode(1):
                retVal = { name: 'Micro Module Open/Close', modelNumber: '2444-222' };
                break;
            case String.fromCharCode(2):
                retVal = { name: 'Micro Module Open/Close', modelNumber: '2444-422' };
                break;
            case String.fromCharCode(3):
                retVal = { name: 'Micro Module Open/Close', modelNumber: '2444-522' };
                break;
            case String.fromCharCode(7):
                retVal = { name: 'Micro Module Open/Close', modelNumber: '2444-522' };
        }
        return retVal;
    }
}
//# sourceMappingURL=InsteonDeviceFactory.js.map