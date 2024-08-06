import { InsteonRelayDevice } from "../../Devices/Insteon/InsteonRelayDevice.js"
import { OnOffLightRequirements } from "@project-chip/matter.js/devices/OnOffLightDevice";
import { ISYClusterBehavior, ClusterForBehavior, type PropertyChange } from "./ISYClusterBehavior.js";
import { OnOffLightSwitchDevice } from '@project-chip/matter.js/devices/OnOffLightSwitchDevice';
import type { MaybePromise } from '@project-chip/matter.js/util';
import { MappingRegistry, type ClusterTypeMapping } from '../../Model/ClusterMap.js';
import type { MutableCluster, OnOffCluster } from '@project-chip/matter.js/cluster';
import type { OnOffBehavior, OnOffServer } from '@project-chip/matter.js/behaviors/on-off';
import type { LevelControlServer, LevelControlInterface } from '@project-chip/matter.js/behaviors/level-control';
import { DriverType } from '../../Definitions/Global/Drivers.js';
import { DimmableLightRequirements } from '@project-chip/matter.js/devices/DimmableLightDevice';
import { InsteonDimmableDevice } from '../../Devices/Insteon/InsteonDimmableDevice.js';

import {Converters} from '../../Converters.js';





export class ISYOnOffBehavior extends ISYClusterBehavior(OnOffLightRequirements.OnOffServer, InsteonRelayDevice)
{

    override async initialize(_options?: {}) {
        await super.initialize(_options);
        this.state.onOff = await this.device.state;



    }


  override on = async () => {
    await super.on();


     this.device.state = true;
  }

  override async off() {
    //await super.off();
     this.device.state = false;
  }

  override toggle =  async () => {
    this.device.state = !(await this.device.state);
  }

  override async handlePropertyChange({driver, newValue, oldValue, formattedValue}: PropertyChange<InsteonRelayDevice>) {
    if (driver === DriverType.Status) {
      this.state.onOff = newValue;

    }

    return super.handlePropertyChange({driver, newValue, oldValue, formattedValue});
  }


}


export class ISYDimmableBehavior extends ISYClusterBehavior(DimmableLightRequirements.LevelControlServer, InsteonDimmableDevice) {
  override async initialize(_options?: {}) {
    await super.initialize(_options);
    this.state.currentLevel = this.device.local.ST;
    this.state.onLevel = this.device.local.OL;

  }

  override setLevel(level: number): MaybePromise<void> {
    level = Converters.Matter.LevelFrom0To255.LightingLevel.to(level);
    if(level > 0)
    {
        return this.device.sendCommand('DON',level);
    }
    else
    {
        return this.device.sendCommand('DOF');
    }
  }
}