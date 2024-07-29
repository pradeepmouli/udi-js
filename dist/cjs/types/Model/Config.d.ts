export interface DeviceSpec {
    make: string;
    manufacturerURL: string;
    model: string;
    icon: string;
    archive: string;
    chart: string;
    queryOnInit: boolean;
    oneNodeAtATime: boolean;
    baseProtocolOptional: boolean;
}
export interface UpnpDevice {
    utype: string;
    version: number;
}
export interface UpnpService {
    utype: string;
    version: number;
}
export interface UpnpSpec {
    upnpDevice: UpnpDevice;
    upnpService: UpnpService;
}
export interface Control {
    iD: number;
    name: string;
    label: string;
    readOnly: boolean;
    isQueryAble: boolean;
    isNumeric: boolean;
    numericUnit: string;
}
export interface Control {
    control: Control[];
}
export interface Root {
    id: string;
    name: string;
}
export interface Product {
    id: number;
    desc: string;
}
export interface Feature {
    id: number;
    desc: string;
    isInstalled: boolean;
    isAvailable: boolean;
}
export interface Feature {
    feature: Feature[];
}
export interface BaseDriver {
    type: string;
    version: number;
}
export interface Security {
    _: string;
    v: number;
}
export interface Config {
    deviceSpecs: DeviceSpec;
    upnpSpecs: UpnpSpec;
    controls: Control;
    driver_timestamp: string;
    app: string;
    app_version: string;
    app_full_version: string;
    platform: string;
    build_timestamp: string;
    root: Root;
    product: Product;
    features: Feature;
    triggers: boolean;
    maxTriggers: number;
    variables: boolean;
    nodedefs: boolean;
    baseDriver: BaseDriver;
    security: Security;
    isDefaultCert: boolean;
    maxSSLStrength: number;
}
