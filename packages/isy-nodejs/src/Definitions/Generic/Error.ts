import type { Converter } from '../../Converters.js';

export enum Error {
    True = 0,
    False = 1
}

export namespace Error {
	export const Boolean : Converter<boolean,Error> = {
		from: (value: boolean): Error => value ? Error.True : Error.False,
		to: (value: Error): boolean => value === Error.True
	}

	export const Index : Converter<Error,number> = {
		from: (value: Error): number => value,
		to: (value: number): Error => value
	}





}
