import { InsteonRelayDevice } from "../../Devices/Insteon/InsteonRelayDevice.js"
import { OnOffLightRequirements } from "@project-chip/matter.js/devices/OnOffLightDevice";
import { ISYClusterBehavior } from "./ISYClusterBehavior.js";
import { OnOffLightSwitchDevice } from '@project-chip/matter.js/devices/OnOffLightSwitchDevice';
import type { MaybePromise } from '@project-chip/matter.js/util';




export class ISYOnOffBehavior extends ISYClusterBehavior(OnOffLightRequirements.OnOffServer, InsteonRelayDevice)
{

    override async initialize(_options?: {}) {
        await super.initialize(_options);
        this.state.onOff = await this.device.isOn;
        


    }
  override async on() {
    // await super.on();

    return this.device.updateIsOn(true);
  }

  override async off() {
    //await super.off();
    return this.device.updateIsOn(false);
  }

  override async toggle() {
    return await this.device.updateIsOn(!this.device.isOn);
  }

  override handlePropertyChange(propertyName: string, value: any, newValue: any, formattedValue: string): void {
    if (propertyName === 'ST') {
      this.state.onOff = newValue > 0;

      //this.events.onOff$Changed.emit(newValue, value, this.context);
    }

  }


}
