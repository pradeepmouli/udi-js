export enum Error {
    True = 0,
    False = 1
}

export namespace Error {
	export function toBoolean(value: Error): boolean {
		return value === Error.True;
	}
	export function fromBoolean(value: boolean): Error {
		return value ? Error.True : Error.False;
	}
}
