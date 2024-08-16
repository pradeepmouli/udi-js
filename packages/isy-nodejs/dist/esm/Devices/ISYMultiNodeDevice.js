export class ISYMultiNodeDevice {
    commands;
    readProperty(propertyName) {
        throw new Error('Method not implemented.');
    }
    sendCommand(command, parameters) {
        throw new Error('Method not implemented.');
    }
    updateProperty(propertyName, value) {
        throw new Error('Method not implemented.');
    }
    handleControlTrigger(controlName) {
        throw new Error('Method not implemented.');
    }
    _parentDevice;
    children;
    convertTo(value, uom, propertyName) {
        throw new Error('Method not implemented.');
    }
    convertFrom(value, uom, propertyName) {
        throw new Error('Method not implemented.');
    }
    addLink(isyScene) {
        throw new Error('Method not implemented.');
    }
    addChild(childDevice) {
        throw new Error('Method not implemented.');
    }
    readProperties() {
        throw new Error('Method not implemented.');
    }
    refresh() {
        throw new Error('Method not implemented.');
    }
    refreshNotes() {
        throw new Error('Method not implemented.');
    }
    parseResult(node) {
        throw new Error('Method not implemented.');
    }
    handlePropertyChange(propertyName, value, uom, prec, formattedValue) {
        throw new Error('Method not implemented.');
    }
    logger(arg0) {
        throw new Error('Method not implemented.');
    }
    handleEvent(evt) {
        throw new Error('Method not implemented.');
    }
    on(arg0, arg1) {
        throw new Error('Method not implemented.');
    }
    name;
    drivers;
    address;
    family;
    typeCode;
    deviceClass;
    parentAddress;
    category;
    subCategory;
    type;
    scenes;
    hidden;
    enabled;
    productName;
    model;
    modelNumber;
    version;
    isDimmable;
    label;
}
//# sourceMappingURL=ISYMultiNodeDevice.js.map