import * as Insteon from '../../Devices/Insteon/index.js';
import { OnOffLightDevice, DimmableLightDevice, ContactSensorDevice } from '@matter/node/devices';
import { type ClusterMapping, type EndpointMapping } from './MappingRegistry.js';
import type { BooleanStateCluster } from '@project-chip/matter.js/cluster';
export declare let map: {
    DoorWindowSensor: {
        deviceType: ContactSensorDevice;
        mapping: {
            booleanState: ClusterMapping<BooleanStateCluster, InstanceType<typeof Insteon.DoorWindowSensor.Device>>;
        };
    };
    RelayLampSwitch: {
        deviceType: OnOffLightDevice;
        mapping: {
            OnOff: {
                attributes: {
                    onOff: {
                        driver: string;
                        converter: string;
                    };
                };
                commands: {
                    on: string;
                };
            };
        };
    };
    DimmerLamp: {
        deviceType: DimmableLightDevice;
        mapping: EndpointMapping<DimmableLightDevice, InstanceType<typeof Insteon.DimmerLamp.Node>>;
    };
    DimmerLampSwitch: {
        deviceType: DimmableLightDevice;
        mapping: EndpointMapping<DimmableLightDevice, InstanceType<typeof Insteon.DimmerLamp.Node>>;
    };
};
//# sourceMappingURL=Insteon.d.ts.map