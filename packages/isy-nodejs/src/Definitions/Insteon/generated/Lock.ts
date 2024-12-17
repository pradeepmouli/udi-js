import exp from 'constants';

export enum Lock {
    Unlocked = 0,
    Locked = 100
}


export namespace Lock {
	export function toString(value: number): string {
		switch (value) {
			case Lock.Unlocked: return "Unlocked";
			case Lock.Locked: return "Locked";
			default: return value.toString();
		}
	}
	export function toEnum(value: string): number {
		switch (value) {
			case "Unlocked": return Lock.Unlocked;
			case "Locked": return Lock.Locked;
			default: return parseInt(value);
		}
	}

	export function toBoolean(value: Lock): boolean {
		return value === Lock.Locked;
	}

	export function fromBoolean(value: boolean): Lock {
		return value ? Lock.Locked : Lock.Unlocked;
	}
}