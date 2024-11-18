import { Converter } from '../../Converters.js';
function isParameterCollection(value) {
    return value !== undefined && value.name === undefined;
}
export var Command;
(function (Command) {
    function getCommandFunctionSignature(command, node, parameters) {
        if (parameters === null) {
            return function () {
                return node.sendCommand(command);
            };
        }
        else if (isParameterCollection(parameters)) {
            let cmd = function (params) {
                for (let key in params) {
                    let p = parameters[key];
                    if (p.converter) {
                        params[key] = p.converter(params[key]);
                    }
                }
                return node.sendCommand(command, params);
            };
            for (let key in parameters) {
                let p = parameters[key];
                cmd.parameters[key] = p;
                let srvUom = node.drivers[p.driver]?.serverUom;
                if (node.drivers[parameters[key].driver]?.serverUom) {
                    cmd.parameters[key].serverUom = node.drivers[parameters[key].driver].serverUom;
                    if (srvUom) {
                        cmd.parameters[key].converter = Converter.get(p.uom, srvUom).to;
                        cmd.parameters[key].serverUom = srvUom;
                    }
                }
            }
            return cmd;
        }
        else if (parameters.name) {
            let cmd = function (value) {
                if (parameters.converter) {
                    value = parameters.converter(value);
                }
                return node.sendCommand(command, { value: value });
            };
            let srvUom = node.drivers[parameters.driver]?.serverUom;
            if (srvUom) {
                cmd.serverUom = srvUom;
                cmd.converter = Converter.get(parameters.uom, srvUom).to;
            }
            cmd.uom = parameters.uom;
            return cmd;
        }
    }
    function create(command, node, label, name, parameters = null) {
        let cmd = getCommandFunctionSignature(command, node, parameters);
        cmd.label = label;
        cmd.name = name;
        cmd.id = command;
        return cmd;
    }
    Command.create = create;
})(Command || (Command = {}));
//# sourceMappingURL=Commands.js.map