import '@project-chip/matter.js/device';
import { ISYBridgedDeviceBehavior } from "./ISYBridgedDeviceBehavior.js";
export function ISYClusterBehavior(base, p) {
    return class ISYClusterBehavior extends base {
        _device;
        handlers = {};
        ///public map: ClusterMapping<ToClusterTypeByName<ClusterForBehavior<ConstructedType<typeof base>>["name"]>,ISYDeviceNode<any, any, any>>;
        map;
        async initialize(_options) {
            await super.initialize(_options);
            var behavior = await this.agent.load(ISYBridgedDeviceBehavior);
            //var behavior = this.agent.get(ISYBridgedDeviceBehavior);
            this._device = behavior.device;
            this.map = behavior.mapForBehavior(this);
            for (const key2 in this.map.attributes) {
                if (typeof this.map.attributes[key2] === "string") {
                    this.handlers[this.map.attributes[key2]] = (newValue, oldValue, formattedValue) => {
                        this.state[key2] = newValue;
                    };
                }
                else if (this.map.attributes[key2].driver) {
                    let { driver, converter } = this.map.attributes[key2];
                    this.handlers[driver] = (newValue, oldValue, formattedValue) => {
                        this.state[key2] = converter(newValue);
                    };
                }
            }
            this.reactTo(behavior.events.propertyChanged, this.handlePropertyChange, { lock: false });
            //this._device.on("PropertyChanged", this.handlePropertyChange.bind(this));
        }
        get device() {
            return (this._device = this._device ?? this.agent.get(ISYBridgedDeviceBehavior).device);
        }
        handlePropertyChange({ driver, newValue, oldValue, formattedValue }) {
            // for (const key2 in this.map.attributes) {
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
//# sourceMappingURL=ISYClusterBehavior.js.map