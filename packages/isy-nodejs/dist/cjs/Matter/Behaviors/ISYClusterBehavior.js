"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ISYClusterBehavior = ISYClusterBehavior;
require("@project-chip/matter.js/device");
const Converters_js_1 = require("../../Converters.js");
const ISYBridgedDeviceBehavior_js_1 = require("./ISYBridgedDeviceBehavior.js");
// #endregion Type aliases (6)
// #region Functions (1)
function ISYClusterBehavior(base, p) {
    return class ISYClusterBehavior extends base {
        _device;
        handlers = {};
        bridgedDeviceBehavior;
        ///public map: ClusterMapping<ToClusterTypeByName<ClusterForBehavior<ConstructedType<typeof base>>["name"]>,ISYDeviceNode<any, any, any>>;
        map;
        async initialize(_options) {
            await super.initialize(_options);
            var behavior = (await this.agent.load(ISYBridgedDeviceBehavior_js_1.ISYBridgedDeviceBehavior));
            this.bridgedDeviceBehavior = behavior;
            //var behavior = this.agent.get(ISYBridgedDeviceBehavior);
            this._device = behavior.device;
            //@ts-ignore
            this.map = behavior.mapForBehavior(this);
            for (const key2 in this.map.attributes) {
                let val = this.map.attributes[key2];
                let driverObj = null;
                if (typeof val === 'string' || typeof val === 'symbol' || typeof val === 'number') {
                    driverObj = this._device.drivers[val];
                    this.handlers[val] = (newValue, oldValue, formattedValue) => {
                        this.state[key2] = newValue;
                    };
                }
                else if (val.driver) {
                    driverObj = this._device.drivers[val.driver];
                    let { driver, converter } = val;
                    const convFunc = Converters_js_1.Converter.get(converter)?.from;
                    this.handlers[driver] = (newValue, oldValue, formattedValue) => {
                        if (convFunc)
                            this.state[key2] = convFunc(newValue);
                        else
                            this.state[key2] = newValue;
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
            return (this._device = this._device ?? this.agent.get(ISYBridgedDeviceBehavior_js_1.ISYBridgedDeviceBehavior).device);
        }
        async handlePropertyChange({ driver, newValue, oldValue, formattedValue }) {
            // for (const key2 in this.map.attributes) {
            await this.initialize();
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