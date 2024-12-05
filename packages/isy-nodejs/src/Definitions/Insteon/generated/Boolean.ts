export enum Boolean {
    False = 0,
    True = 255
}

export namespace Boolean {
	export function toBoolean(value: Boolean): boolean {
		return value === Boolean.True;
	}
	export function fromBoolean(value: boolean): Boolean {
		return value ? Boolean.True : Boolean.False;
	}
}
