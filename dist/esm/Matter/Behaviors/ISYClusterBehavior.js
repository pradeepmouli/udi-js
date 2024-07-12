import { ISYBridgedDeviceBehavior } from './ISYBridgedDeviceBehavior.js';
export function ISYClusterBehavior(base, p) {
    return class extends base {
        _device;
        async initialize(_options) {
            await super.initialize(_options);
            if (this.agent.load(ISYBridgedDeviceBehavior)) {
                var behavior = this.agent.get(ISYBridgedDeviceBehavior);
                this._device = behavior.device;
                this.reactTo(behavior.events.propertyChanged, this.handlePropertyChange);
                //this._device.on("PropertyChanged", this.handlePropertyChange.bind(this));
            }
        }
        async [Symbol.asyncDispose]() {
            //this._device.removeListener('PropertyChanged', this.handlePropertyChange.bind(this));
        }
        get device() {
            return this._device = this._device ?? this.agent.get(ISYBridgedDeviceBehavior).device;
        }
        handlePropertyChange({ driver, newValue, oldValue, formattedValue }) {
        }
    };
} //@ts-ignore
