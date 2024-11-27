import '@project-chip/matter.js/device';
import { Converter } from '../../Converters.js';
import { ISYBridgedDeviceBehavior } from './ISYBridgedDeviceBehavior.js';
// #endregion Type aliases (6)
// #region Functions (1)
export function ISYClusterBehavior(base, p) {
    return class ISYClusterBehavior extends base {
        _device;
        handlers = {};
        bridgedDeviceBehavior;
        ///public map: ClusterMapping<ToClusterTypeByName<ClusterForBehavior<ConstructedType<typeof base>>["name"]>,ISYDeviceNode<any, any, any>>;
        map;
        async initialize(_options) {
            await super.initialize(_options);
            var behavior = (await this.agent.load(ISYBridgedDeviceBehavior));
            this.bridgedDeviceBehavior = behavior;
            //var behavior = this.agent.get(ISYBridgedDeviceBehavior);
            this._device = behavior.device;
            this._device.logger(`Initializing cluster behavior: ${this.constructor.name}`);
            //@ts-ignore
            this.map = behavior.mapForBehavior(this);
            for (const key2 in this.map.attributes) {
                let val = this.map.attributes[key2];
                let driverObj = null;
                if (typeof val === 'string' || typeof val === 'symbol' || typeof val === 'number') {
                    driverObj = this._device.drivers[val];
                    this.state[key2] = this._device.drivers[val].value;
                    this.handlers[val] = (newValue, oldValue, formattedValue) => {
                        this.state[key2] = newValue;
                    };
                }
                else if (val.driver) {
                    driverObj = this._device.drivers[val.driver];
                    let { driver, converter } = val;
                    const convFunc = Converter.get(converter)?.to;
                    if (!convFunc)
                        throw new Error(`Converter ${converter} not found`);
                    this.state[key2] = convFunc(this._device.drivers[driver].value);
                    this.handlers[driver] = (newValue, oldValue, formattedValue) => {
                        //this.device.logger(`Handling property change for ${driver} (${key2}) with value ${newValue}`);
                        //if (convFunc) this.state[key2 as string] = convFunc(newValue);
                        this.state[key2] = convFunc(newValue);
                    };
                }
                if (driverObj) {
                    let evt = `${driverObj.name}Changed`;
                    this.evt = this.handlers[driverObj.name];
                    this.reactTo(behavior.events[evt], this.handlePropertyChange, { lock: false });
                }
            }
            //this.reactTo(behavior.events.propertyChanged, this.handlePropertyChange, { lock: false });
            //this._device.on("PropertyChanged", this.handlePropertyChange.bind(this));
        }
        get device() {
            return (this._device = this._device ?? this.agent.get(ISYBridgedDeviceBehavior).device);
        }
        async handlePropertyChange({ driver, newValue, oldValue, formattedValue }) {
            // for (const key2 in this.map.attributes) {
            //await this.initialize();
            this.device.logger(`${this.constructor.name}: handling property change for ${String(driver)} with value ${newValue}`);
            if (this.handlers[driver]) {
                this.handlers[driver](newValue, oldValue, formattedValue);
            }
            //   if (typeof this.map.attributes[key2] === "string") {
            //     if(this.map.attributes[key2] == driver)
            //     {
            //         this.state[key2 as string] = newValue;
            //         return;
            //   } }else if (this.map.attributes[key2].driver == driver) {
            //     if (this.map.attributes[key2]?.driver == driver) {
            //       this.state[key2 as string] = this.map.attributes[key2].converter(newValue);
            //     }
            //   }
            // }
        }
    };
}
// #endregion Functions (1)
//# sourceMappingURL=ISYClusterBehavior.js.map