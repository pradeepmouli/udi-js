import { format } from 'util';
import { parseStringPromise } from 'xml2js';

import { ISYNode } from '../ISY.js';
import { InsteonLampDevice, InsteonSwitchDevice, KeypadDevice } from '../Devices/Insteon/InsteonDevice.js';
import * as DeviceMapJSON from './DeviceMap.json' with {type: 'json'}
import {DeviceMap} from '../Devices/DeviceMap.js'
import { userInfo } from 'os';
import { writeFile } from 'fs';

export let s = [DeviceMapJSON.default[0]];
