import type { Family } from '../../Definitions/Global/Families.js';
import {ISYNode} from '../../ISYNode.js'
import { ISYDeviceNode } from '../ISYDeviceNode.js';

export class Base<D extends ISYNode.DriverSignatures,C extends ISYNode.CommandSignatures> extends ISYDeviceNode<Family.Scene,D,C> {}