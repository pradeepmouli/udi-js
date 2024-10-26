"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("winston");
// export const ISYLevelDevice = <T extends Constructor<ISYDeviceNode<any,any,any,any>>>(base: T) =>
// 	class extends base {
// 		get level(): number {
// 			return super.drivers.ST?.value;
// 		}
// 	};
// tslint:disable-next-line: variable-name
// export const ISYUpdateableLevelDevice = <T extends Constructor<ISYDeviceNode<any,any,any>>>(base: T) =>
// 	class extends base {
// 		get level(): number {
// 			return this.local.ST;
// 		}
// 		public async updateLevel(level: number): Promise<any> {
// 			if (level != this.local.ST && level !== (this.pending.ST ?? this.local.ST)) {
// 				this.pending.ST = level;
// 				if (level > 0) {
// 					return this.sendCommand(
// 						Commands.On,
// 						this.convertTo(level, this.uom.ST)
// 					).then((p) => {
// 						//this.local.ST = this.pending.ST; *Wait to receive propertu update from subscription
// 						this.pending.ST = null;
// 					});
// 				} else {
// 					return this.sendCommand(Commands.Off).then((p) => {
// 						//this.local.ST = this.pending.ST; *Wait to receive propertu update from subscription
// 						this.pending.ST = null;
// 					});
// 				}
// 			}
// 			return Promise.resolve();
// 		}
// 	};
//# sourceMappingURL=ISYDevice.js.map