import { InsteonRelayDevice } from "../../Devices/Insteon/InsteonRelayDevice.js"
import { OnOffLightRequirements } from "@project-chip/matter.js/devices/OnOffLightDevice";
import { ISYClusterBehavior } from "./ISYClusterBehavior.js";
import { OnOffLightSwitchDevice } from '@project-chip/matter.js/devices/OnOffLightSwitchDevice';
import type { MaybePromise } from '@project-chip/matter.js/util';




export class ISYOnOffBehavior extends ISYClusterBehavior(OnOffLightRequirements.OnOffServer, InsteonRelayDevice)
{

    override async initialize(_options?: {}) {
        await super.initialize(_options);
        this.state.onOff = await this.device.state;



    }
  override async on() {
    // await super.on();

     this.device.state = true;
  }

  override async off() {
    //await super.off();
     this.device.state = false;
  }

  override async toggle() {
    this.device.state = !(await this.device.state);
  }

  override handlePropertyChange({ driver, newValue, oldValue, formattedValue }: { driver: string; newValue: any; oldValue: any; formattedValue: string; }): void {
    if (driver === 'ST') {
        //this.asAdmin(() => this.state.onOff = newValue > 0);
        //this.endpoint.set({values: {onOff: newValue > 0}});
       // super.on()
      this.state.onOff = newValue > 0;

      //this.events.onOff$Changed.emit(newValue, value, this.context);
    }

  }


}
