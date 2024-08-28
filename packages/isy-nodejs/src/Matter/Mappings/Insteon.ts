import { OnOffCluster } from "@project-chip/matter.js/cluster";
import { DriverType } from "../../Definitions/Global/Drivers.js";
import { Family, type t } from "../../Definitions/Global/Families.js";
import { Insteon } from "../../Devices/Insteon/index.js";
import { Devices} from "../../Devices/index.js";
import {
  MappingRegistry,
  type FamilyToClusterMap,
  type DeviceToClusterMap,
  type EndpointMapping
} from "../../Model/ClusterMap.js";
import { DeviceTypeDefinition, DeviceTypes, OnOffBaseDevice } from "@project-chip/matter.js/device";
import { OnOffLightDevice } from "@project-chip/matter.js/devices/OnOffLightDevice";

//import InsteonMap from "./Insteon.json";
import { DimmableLightDevice } from "@project-chip/matter.js/devices/DimmableLightDevice";
import { Converters } from '../../Converters.js';
import type { InsteonRelaySwitchDevice } from '../../Devices/Insteon/InsteonRelaySwitchDevice.js';



const map: FamilyToClusterMap<Family.Insteon> = {
  Relay: {
    deviceType: OnOffLightDevice,
    mapping: {

      OnOff: {
        attributes: {
          onOff: { driver: "ST"},
        },
        commands: { on: 'DON'},
      },



    }
  } ,
  RelaySwitch: {
    deviceType: OnOffLightDevice,
    mapping: {
      OnOff: {
        attributes: {
          onOff: "ST",
        },
        commands: { on: "DON"},
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
        commands: { on: "DON" },
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
