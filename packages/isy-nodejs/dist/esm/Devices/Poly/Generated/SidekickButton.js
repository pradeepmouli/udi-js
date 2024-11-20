/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { Base } from "../index.js";
import { NodeFactory } from "../../NodeFactory.js";
export const nodeDefId = "KEYPAD_BTN";
export class SidekickButtonNode extends Base {
    commands = {};
    static nodeDefId = "KEYPAD_BTN";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
    }
}
NodeFactory.register(SidekickButtonNode);
export var SidekickButton;
(function (SidekickButton) {
    function is(node) {
        return node.nodeDefId === nodeDefId;
    }
    SidekickButton.is = is;
    function create(isy, nodeInfo) {
        return new SidekickButtonNode(isy, nodeInfo);
    }
    SidekickButton.create = create;
    SidekickButton.Node = SidekickButtonNode;
})(SidekickButton || (SidekickButton = {}));
