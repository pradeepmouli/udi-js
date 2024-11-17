import { Converter } from '../../Converters.js';
import type { ISYNode } from '../../ISYNode.js';
import type { Driver } from './Drivers.js';
import type { UnitOfMeasure } from './UOM.js';

/*export class Command<T extends string> extends Function {

	constructor(public readonly label: string) {
		super();
	}

	public async execute(...args: any[]): Promise<Boolean> {
		return this(...args);
	}
}*/

export interface Parameter<P, T> {
	id: P;
	name: string;

	label: string;
	value?: T;
	uom: UnitOfMeasure;
	serverUom?: UnitOfMeasure;

	converter?: (value: T) => T;

	driver: string;
}



type ParameterCollection = { [K: string]: Parameter<typeof K, any> };


function isParameterCollection(value: any): value is ParameterCollection {
	return value !== undefined && value.name === undefined;
}

export type Command<C extends string, N = C, L = N, P extends { [K: string]: Parameter<typeof K, any> } | Parameter<string,any> = null> =
	P extends null ? { id: C; label: L; name: N }
	: P extends Parameter<string,any> ? {id: C; label: L; name: N; uom: P['uom']; serverUom?: P['serverUom']; converter?: (value: P['value']) => P['value']; driver: P['driver']} : P extends ParameterCollection ?
	 {
			// #region Properties (8)

			(params: { [x in keyof P]: P[x]["value"] }): Promise<boolean>;
			id: C;
			label: L;
			name: N;
			parameters: P;

			// #endregion Properties (8)

			// #region Public Methods (2)

			// #endregion Public Methods (2)
			//override on('change', listener: (value: any) => void): this;
		} : never;

export namespace Command {
	export type Signature<F extends { name } = CallableFunction, L extends string = string, N extends string = string> = F & { label: L; name: N };

	export type Signatures<C extends string> = { [K in C]: Signature<(...args: any[]) => Promise<Boolean>, string, string> };

	export type NoExtraKeys<U> = U extends infer F ? F : never;

	export type NoExtend<F, T> = F extends T ? F : never;

	export type For<N extends string, L extends string, T> = T extends Signature<infer F, L, N> ? F : T;

	//type test2 = ForAll<Signatures<"BEEP">>

	//extends CallableFunction ? Omit<T, "label"| "name"> | T : never;
	type test = For<'beep', 'Beep', Commands['BEEP']>;

	//type test2 = keyof Commands["BEEP"]

	export type ForAll<T extends Signatures<any>> = {
		[K in keyof T]: For<T[K]['name'], T[K]['label'], T[K]>;
	};



	function getCommandFunctionSignature<P extends { [x: string]: Parameter<string, any> } | Parameter<string, any> | null> (command: string, node: ISYNode<any,any,any,any>,parameters?: P): Function {
		if (parameters === null) {
			return function (): Promise<boolean> {
				return node.sendCommand(command);
			};
		}

		else if (isParameterCollection(parameters)) {
			let cmd = function (params: { [x in keyof P]: typeof parameters[x]['value'] }): Promise<boolean> {
				for (let key in params) {
					let p = parameters[key];
					if (p.converter) {
						params[key] = p.converter(params[key]);
					}
				}
				return node.sendCommand(command, params);
			} as any;
			for (let key in parameters) {
				let p = parameters[key];
				cmd.parameters[key] = p;
				let srvUom = node.drivers[p.driver]?.serverUom;
				if (node.drivers[parameters[key].driver]?.serverUom) {
					cmd.parameters[key].serverUom = node.drivers[parameters[key].driver].serverUom;
					if (srvUom) {
						cmd.parameters[key].converter = Converter.get(p.uom, srvUom).to;
						cmd.parameters[key].serverUom = srvUom;
					}
				}
			}
			return cmd;
		}
		else if(parameters.name) {
			let cmd = function (value: P['value']): Promise<boolean> {
				if(parameters.converter) {
					value = parameters.converter(value);
				}
				return node.sendCommand(command, { value: value });
			} as any
			let srvUom = node.drivers[parameters.driver]?.serverUom;
			if (srvUom) {
				cmd.serverUom = srvUom;
				cmd.converter = Converter.get(parameters.uom, srvUom).to;
			}
			cmd.uom = parameters.uom;
			return cmd;
		}

	}

	export function create<
		C extends string,
		N = string,
		L = string,
		P extends ParameterCollection | Parameter<any,any> | null = null
	>(command: C, node: ISYNode<any, any, any, any>, label: L, name: N, parameters: P = null): Command<C, N, L, P> {

		let cmd: Command<C, N, L, P> =
		getCommandFunctionSignature(command, node, parameters) as Command<C, N, L, P>;
		cmd.label = label;
		cmd.name = name;
		cmd.id = command;
		return cmd;
	}

	type Commands = {
		BEEP: ((value: number) => Promise<boolean>) & { label: 'Beep'; name: 'beep' };
		BL: ((value: number) => Promise<boolean>) & { label: 'Backlight'; name: 'backlight' };
		WDU: (() => Promise<boolean>) & { label: 'Backlight'; name: 'backlight' };
	};
}
