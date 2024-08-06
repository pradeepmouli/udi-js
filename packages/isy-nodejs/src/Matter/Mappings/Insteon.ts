import { OnOffCluster } from "@project-chip/matter.js/cluster";
import { DriverType } from "../../Definitions/Global/Drivers.js";
import { Family, type t } from "../../Definitions/Global/Families.js";
import { Insteon } from "../../Devices/Insteon/index.js";
import { Devices} from "../../Devices/index.js";
import {
  MappingRegistry,
  type ClusterTypeMapping,
  type FamilyToClusterMap,
  type DeviceToClusterMap,
  type DeviceToClusterMap2,
  type EndpointMapping
} from "../../Model/ClusterMap.js";
import { DeviceTypeDefinition, DeviceTypes, OnOffBaseDevice } from "@project-chip/matter.js/device";
import { OnOffLightDevice } from "@project-chip/matter.js/devices/OnOffLightDevice";

//import InsteonMap from "./Insteon.json";
import { DimmableLightDevice } from "@project-chip/matter.js/devices/DimmableLightDevice";
import { Converters } from '../../Converters.js';
import type { InsteonRelaySwitchDevice } from '../../Devices/Insteon/InsteonRelaySwitchDevice.js';
import { LevelControl } from '@project-chip/matter.js/elements';


//@ts-ignore
const map: FamilyToClusterMap<Family.Insteon> = {
  Relay: {
    deviceType: OnOffLightDevice,
    mapping: {

      OnOff: {
        attributes: {
          onOff: { driver: "ST", converter: "Converters.Standard.LevelFrom0To255?.Boolean?.to"},
        },
        commands: { on: 'DON', off: DriverType.Off },
      },



    } as EndpointMapping<OnOffLightDevice,Insteon.Relay>,
  } ,
  RelaySwitch: {
    deviceType: OnOffLightDevice,
    mapping: {
      OnOff: {
        attributes: {
          onOff: "ST",
        },
        commands: { on: DriverType.On, off: DriverType.Off },
      },
    },
  } ,
  Dimmer: {
    deviceType: DimmableLightDevice,
    mapping: {
      OnOff: {
        attributes: {
          onOff: { driver: "ST" },
        },
        commands: { on: "DON", off: DriverType.Off },
      },
      LevelControl: {
        attributes: {
          currentLevel: { driver: DriverType.Status },
        },
        commands: { moveToLevel: {command: 'DON'}},
      },
    },
  },
};

MappingRegistry.register(map);
