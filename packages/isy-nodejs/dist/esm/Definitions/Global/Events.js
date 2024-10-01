import EventEmitter from 'events';
//import { ISYNoCommandSignatures, DriverSignatures } from '../../ISYNode.js';
export var Event;
(function (Event) {
    create: (isy, eventData) => ISYEvent;
    class NodeEventEmitter extends EventEmitter {
        // #region Constructors (1)
        constructor(node) {
            super({ captureRejections: true });
        }
    }
    Event.NodeEventEmitter = NodeEventEmitter;
    function createEmitter(node) {
        var f = new NodeEventEmitter(node);
        for (let evt in node.events) {
            const ev = node.events[evt];
            //f[`on${ev.name}`] = f.on.bind(f, ev.name);
        }
        return f;
    }
    Event.createEmitter = createEmitter;
    class ISYEvent {
        // #region Properties (2)
        action;
        eventInfo;
        // #endregion Properties (2)
        // #region Constructors (1)
        constructor(eventData) {
            this.action = eventData.action;
            this.eventInfo = eventData.eventInfo;
        }
    }
    Event.ISYEvent = ISYEvent;
    class NodeEvent extends ISYEvent {
        // #region Properties (1)
        nodeAddress;
        // #endregion Properties (1)
        // #region Constructors (1)
        constructor(eventData) {
            super(eventData);
            this.nodeAddress = eventData.node;
        }
    }
    Event.NodeEvent = NodeEvent;
    class VariableEvent extends ISYEvent {
        // #region Properties (1)
        variableName;
        // #endregion Properties (1)
        // #region Constructors (1)
        constructor(eventData) {
            super(eventData);
            this.variableName = eventData.variable;
        }
    }
    Event.VariableEvent = VariableEvent;
    class SystemEvent extends ISYEvent {
        // #region Constructors (1)
        constructor(eventData) {
            super(eventData);
        }
    }
    Event.SystemEvent = SystemEvent;
    class DeviceEvent extends ISYEvent {
        // #region Properties (1)
        deviceAddress;
        // #endregion Properties (1)
        // #region Constructors (1)
        constructor(eventData) {
            super(eventData);
            this.deviceAddress = eventData.device;
        }
    }
    Event.DeviceEvent = DeviceEvent;
})(Event || (Event = {}));
//# sourceMappingURL=Events.js.map