import type { Family } from '../../Definitions/Global/Families.js';
import {ISYNode} from '../../ISYNode.js'

export class Base<D extends ISYNode.DriverSignatures,C extends ISYNode.CommandSignatures> extends ISYNode<Family.Scene,D,C> {}